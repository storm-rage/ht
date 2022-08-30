<template>
  <zj-content-container>
    <!--  中登登记订单保理  -->
    <zj-list-layout>
      <template slot="rightBtns">
        <vxe-button class="reset" icon="el-icon-refresh" @click="resetSearch()">重置</vxe-button>
        <vxe-button class="search" icon="el-icon-search" @click="search(true, 'searchTable')">查询</vxe-button>
      </template>
      <template slot="searchForm">
        <el-form ref="searchForm" :model="searchForm">
          <el-form-item label="供应商名称：">
            <el-input v-model="searchForm.sellerNameLike" @keyup.enter.native="enterSearch" />
          </el-form-item>
          <el-form-item label="核心企业：">
            <el-input v-model="searchForm.buyerNameLike" @keyup.enter.native="enterSearch" />
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
      <zj-table ref="searchTable" :api="zjControl.orderPage" :params="searchForm" keep-source
        @checkbox-change="checkChange" @checkbox-all="checkChange" :edit-config="{
          trigger: 'manual',
          mode: 'row',
          icon: '-',
          autoClear: false,
          showStatus: true
        }">
        <!--   :dataList="list1"-->
        <zj-table-column type="checkbox" width="60" />
        <zj-table-column field="sellerName" title="供应商名称" />
        <zj-table-column field="buyerName" title="核心企业" />
        <zj-table-column field="cactoringLogo" title="保理标识" />
        <zj-table-column field="state" title="贸易关系状态" />
        <zj-table-column field="accountTransfer" title="应收账款转让期限" :formatter="date">
          <template v-slot="{ row }">
            {{ row.accountTransferStartDate }}~{{ row.accountTransferEndDate }}
          </template>
        </zj-table-column>
        <zj-table-column field="factoringCreditAmount" title="授信额度" />
        <zj-table-column field="factoringCredit" title="额度期限（月）">
          <template v-slot="{ row }">
            {{ row.factoringCreditStartDate }}~{{ row.factoringCreditEndDate }}
          </template>
        </zj-table-column>
        <zj-table-column field="registStatus" title="登记状态" />
        <zj-table-column title="操作" fixed="right" width="160">
          <template v-slot="{ row }">
            <zj-button type="text" @click="toEdit(row)">详情</zj-button>
            <!-- <zj-button type="text" @click="toEdit(row)">中登网登记</zj-button> -->
          </template>
        </zj-table-column>
      </zj-table>
    </zj-list-layout>
    <zj-workflow v-model="workflow">
      <el-row slot="right">
        <!-- <zj-button @click="toIssuance" >中登登记</zj-button>  
          <zj-button @click="toIssuance" >手工登记</zj-button> 
          this.$refs.frozenDialog.open(loginRes.frozenPhone)-->
        <zj-button @click="zdlogin">中登登记</zj-button>
        <zj-button @click="openDialog1">手工登记</zj-button>
        <!-- <zj-button @click="dialog">打开登录弹框</zj-button> -->

      </el-row>
    </zj-workflow>
    <!-- <loginDialog ref="loginDialog" :checkLogin="this.checkLogin" :idlist="this.idlist"></loginDialog> -->
    <loginDialog ref="loginDialog"></loginDialog>
    <artRegister ref="artRegister" :idlist="this.idlist"></artRegister>
  </zj-content-container>
</template>
<script>
import loginDialog from "../components/loginDialog";
import artRegister from "../components/artRegister";
export default {
  components: {
    loginDialog,
    artRegister
  },

  data() {
    return {
      workflow: '',
      searchForm: {
        sellerNameLike: '',
        buyerNameLike: '',
        productState: '',
      },
      zjControl: {
        orderPage: this.$api.zhongdengManage.orderPage, //订单保理列表
        getDictionary: this.$api.zhongdengManage.getDictionary,//字典
        registerDetails: this.$api.zhongdengManage.registerDetails,//手工登记详情
        uploadFile: this.$api.baseCommon.uploadFile,//手工登记详情
        registerSubmit: this.$api.zhongdengManage.registerSubmit,//手工登记提交
        checkLogin: this.$api.zhongdengManage.checkLogin,//校验登录
        getCode: this.$api.zhongdengManage.getCode,//获取验证码
        getPictureCode: this.$api.zhongdengManage.getPictureCode,//获取图形验证码
        zdLongin: this.$api.zhongdengManage.zdLongin,//登录中登
      },
      dictionary: {},

      list1: [
        {
          id: "1",
          buyerName: 'scm00001',
          sellerName: '某某产品一号',
          field3: '上游',
          field4: '订单保理',
          field5: '2022.09.08 11:18:19',
          field6: '生效',
          state: '是'
        },
      ],
      list: [],
      tradeList: [],
      idlist: [],

      // {
      //   type: "application/pdf",
      //   remarks: "死数据",
      //   name: "贸易关系(1).pdf",
      //   date: "Tue Aug 23 2022 18:56:33 GMT+0800(中国标准时间)"
      // }

      filemsg: {},
      checkLogin: {}

    };
  },
  created() {
    this.getApi();
    this.getDetail();
  },
  methods: {
    getmsg() {
      console.log(this.userData);
    },
    openDialog1() {
      if (this.idlist.length == 0) {
        this.$messageBox({
          type:'warning',
          content:'请至少选择一条'
        })
      } else {
        let bizType="01"
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
          type:'warning',
          content:'请至少选择一条'
        })
      } else {
        this.zjControl.checkLogin().then(res => {
          console.log(res.data);
          let row = {
            checkLogin: res.data,
            idlist: this.idlist,
            bizType: "01"
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


    // -------------------
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
    toContractDetail(row) {
      console.error(row);
      this.$router.push({ name: 'businessDetail' });
    },
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
    toEdit(row) {
      this.goChild('zhongdengManageDetaildd', row)
    },
    toEditQuota(row) { },
    goLogin(row) {
      this.goChild('zhongdengManagexq1', row)
    },
  }
};
</script>
