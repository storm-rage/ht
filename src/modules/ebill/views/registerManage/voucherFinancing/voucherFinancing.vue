<template>
  <div>
    <zj-content-container>
      <!--  中登登记凭证融资  -->

      <zj-list-layout>
        <template slot="searchForm">
          <el-form ref="searchForm" :model="searchForm">
            <el-form-item label="融资企业：">
              <el-input v-model="searchForm.fromEntNameLike" @keyup.enter.native="enterSearch" />
            </el-form-item>
            <el-form-item label="融资流水号：">
              <el-input v-model="searchForm.serialNo" @keyup.enter.native="enterSearch" />
            </el-form-item>
            <el-form-item label="登记状态：">
              <el-select v-model="searchForm.registStatus">
                <el-option label="全部" value="" />
                <el-option v-for="item in dictionary.registStatus" :key="item.code" :label="item.desc"
                  :value="item.code" />
              </el-select>
            </el-form-item>
          </el-form>
        </template>
        <zj-table ref="searchTable" :api="zjControl.pzrzList" :params="searchForm" keep-source
          @checkbox-change="checkChange" @checkbox-all="checkChange" :edit-config="{
            trigger: 'manual',
            mode: 'row',
            icon: '-',
            autoClear: false,
            showStatus: true
          }">
          <!--   :dataList="list1"-->
          <zj-table-column type="checkbox" width="40" />
          <zj-table-column title="融资流水号">
            <template v-slot="{ row }">
              <zj-button type="text" @click="toEdit(row)">{{ row.serialNo }}</zj-button>
            </template>
          </zj-table-column>
          <zj-table-column field="fromEntName" title="融资企业" />
          <zj-table-column field="financingProductType" title="融资产品名称" :formatter="
            (obj) => typeMap(dictionary.financingProductType, obj.cellValue)
          " />
          <zj-table-column field="tranAmt" title="融资申请金额" :formatter="money" />
          <zj-table-column field="applyDatetime" title="融资开始日" :formatter="date" />
          <zj-table-column field="expireDate" title="融资到期日" :formatter="date" />
          <zj-table-column field="registStatus" title="登记状态" :formatter="
            (obj) => typeMap(dictionary.registStatus, obj.cellValue)
          " />
          <zj-table-column field="outApplyNo" title="放款单号" />
        </zj-table>
      </zj-list-layout>


    </zj-content-container>
    <zj-workflow v-model="workflow">
      <el-row slot="right" class="buttoni">
        <zj-button type="primary" @click="zdlogin">中登登记</zj-button>
        <zj-button type="primary" @click="openDialog1">手工登记</zj-button>
        <zj-button type="primary" @click="daqian">确认放款</zj-button>
      </el-row>
    </zj-workflow>
    <loginDialog ref="loginDialog"></loginDialog>
    <artRegister ref="artRegister" :idlist="this.idlist"></artRegister>
  </div>
</template>
<script>
import loginDialog from "../components/loginDialog";
import artRegister from "../components/artRegister";
export default {
  components: {
    loginDialog,
    artRegister
  },
  created() {
    this.dictionary=this.mDictionary
    this.getDetail();
    this.getApi();
  },
  data() {
    return {
      workflow: '',
      searchForm: {
        fromEntNameLike: '',
        serialNo: '',
        registStatus: '',
      },
      zjControl: {
        pzrzList: this.$api.zhongdengManage.pzrzList, //凭证融资列表
        getDictionary: this.$api.zhongdengManage.getDictionary,//字典
        confirmLoan: this.$api.zhongdengManage.confirmLoan,//确认放款
        orderPage: this.$api.zhongdengManage.orderPage, //订单保理列表
        registerDetails: this.$api.zhongdengManage.registerDetails,//手工登记详情
        uploadFile: this.$api.baseCommon.uploadFile,//手工登记详情
        registerSubmit: this.$api.zhongdengManage.registerSubmit,//手工登记提交
        checkLogin: this.$api.zhongdengManage.checkLogin,//校验登录
        getCode: this.$api.zhongdengManage.getCode,//获取验证码
        getPictureCode: this.$api.zhongdengManage.getPictureCode,//获取图形验证码
        zdLongin: this.$api.zhongdengManage.zdLongin,//登录中登
        confirmLoan: this.$api.zhongdengManage.confirmLoan,//确认放款
      },
      dictionary: {},
      tradeList: [],
      idlist: [],
    };
  },
  
  methods: {
    daqian() {
      if (this.idlist.length == 0) {
        this.$messageBox({
          type: 'warning',
          content: '请至少选择一条'
        })
      } else {
        let params = {
          idList: this.idlist
        }
        this.zjControl.confirmLoan(params).then(res => {
          console.log(res.data);
          // this.$messageBox({
          //   type: 'success',
          //   content: '放款成功'
          // })
          if (res.data.errorMsg) {
            this.$messageBox({
              type: 'warning',
              content: `${res.data.errorMsg}`
            })
          } else {
            this.$messageBox({
              type: 'success',
              content: '放款成功'
            })
          }
        })
      }
    },
    openDialog1() {
      if (this.idlist.length == 0) {
        this.$messageBox({
          type: 'warning',
          content: '请至少选择一条'
        })
      } else {
        let bizType = "00"
        this.$refs.artRegister.open(bizType)
      }

    },
    dialog(row) {
      this.$refs.loginDialog.open(row)
    },
    // --------中登登记
    zdlogin() {
      if (this.idlist.length == 0) {
        this.$messageBox({
          type: 'warning',
          content: '请至少选择一条'
        })
      } else {
        this.zjControl.checkLogin().then(res => {
          console.log(res.data);
          let row = {
            checkLogin: res.data,
            idlist: this.idlist,
            bizType: "00"
          }
          this.checkLogin = res.data
          if (res.data.login == true) {
            this.goLogin(row)
          } else {
            this.dialog(row)
          }
        })
      }

    },
    goLogin(row) {
      this.goChild('zhongdengManagexq1', row)
    },
    toEdit(row) {
      // this.goChild('zhongdengManageDetailpz', row)
      this.goChild('zhongdengManageDetailpz',row={id:row.id,serialNo:row.serialNo,currentActiveTab:"voucherFinancing"})
    },
    checkChange() {
      this.idlist = []
      let checkArr = this.$refs.searchTable.getCheckboxRecords()
      // console.log(checkArr, '勾选的值11111')
      this.list = checkArr
      // console.log(this.list, '勾选的值22222')
      this.list.forEach(e => {
        this.idlist.push(e.id)
      })
      console.log(this.idlist);
    },
    getDetail() {
      this.zjControl.getDictionary().then(res => {
        this.dictionary = Object.assign({}, res.data)
      })
    },
    /**
     *
     * @param row
     */
    toContractDetail(row) {
      console.error(row);
      this.$router.push({ name: 'businessDetail' });
    },
    /**
     *
     * @param row
     */
    toContractSign(row) {
      console.log(row);
    },
    handleRadioChange({ row }) {
      this.tradeList.push({
        field1: '佛山市a有限公司',
        field2: '是',
        field3: '756756756767',
        field4: '非保理',
        field5: '12',
        field6: '1000',
        field7: '2000',
        field8: '正常'
      })
    },
    toDetail(row) {
      this.goChild('productInfoManageDetail', row)
    },

    toEditQuota(row) { },
    zdRegister() { },
    applyLoan() { },
  }
};
</script>
<style lang="less" scoped>
/deep/#ZjWorkflow {
  .workflow-top {
    .el-row {
      padding: 5px 0 0;
      text-align: center;
    }
  }

  .workflow-bottom {
    .right {
      width: 100%;
      text-align: center;
    }
  }
}
</style>
