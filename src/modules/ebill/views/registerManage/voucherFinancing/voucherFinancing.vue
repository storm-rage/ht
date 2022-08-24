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
        <zj-table ref="searchTable" :api="zjControl.pzrzList" :params="searchForm" keep-source @checkbox-change="checkChange"
          @checkbox-all="checkChange" :edit-config="{
            trigger: 'manual',
            mode: 'row',
            icon: '-',
            autoClear: false,
            showStatus: true
          }">
          <!--   :dataList="list1"-->
          <zj-table-column type="checkbox" width="40" />
          <zj-table-column  title="融资流水号" >
            <template v-slot="{ row }">
               <zj-button type="text" @click="toEdit(row)">{{row.serialNo}}</zj-button>
            </template>
          </zj-table-column>
          <zj-table-column field="fromEntName" title="融资企业" />
          <zj-table-column field="financingProductType" title="融资产品名称" />
          <zj-table-column field="tranAmt" title="融资申请金额" />
          <zj-table-column field="applyDatetime" title="融资开始日" :formatter="date" />
          <zj-table-column field="expireDate" title="融资到期日" :formatter="date" />
          <zj-table-column field="registStatus" title="登记状态" />
          <zj-table-column field="outApplyNo" title="放款单号" />
        </zj-table>
      </zj-list-layout>


    </zj-content-container>
    <zj-workflow v-model="workflow">
      <el-row slot="right">
        <!-- <zj-button @click="toIssuance" >中登登记</zj-button>  
          <zj-button @click="toIssuance" >手工登记</zj-button> -->
        <zj-button>中登登记</zj-button>
        <zj-button>确认放款</zj-button>
        <zj-button>手工登记</zj-button>
      </el-row>
    </zj-workflow>
  </div>
</template>
<script>
export default {
  components: {},
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
      },
      dictionary: {},
      list1: [
        {
          id:"1",
          serialNo: 'scm00001',
          fromEntName: '某某产品一号',
          financingProductType: '上游',
          field4: '订单保理',
          field5: '2022.09.08 11:18:19',
          field6: '生效',
          state: '是'
        },
        {
          serialNo: 'scm00001',
          fromEntName: '某某产品一号',
          financingProductType: '上游',
          field4: '订单保理',
          field5: '2022.09.08 11:18:19',
          field6: '生效',
          state: '是'
        },
        {
          serialNo: 'scm00001',
          fromEntName: '某某产品一号',
          financingProductType: '上游',
          field4: '订单保理',
          field5: '2022.09.08 11:18:19',
          field6: '生效',
          state: '是'
        },
        {
          serialNo: 'scm00001',
          fromEntName: '某某产品一号',
          financingProductType: '上游',
          field4: '订单保理',
          field5: '2022.09.08 11:18:19',
          field6: '生效',
          state: '是'
        }
      ],
      tradeList: []
    };
  },
  created() {
    this.getApi();
    this.getDetail();
  },
  methods: {
    toEdit(row) {
      this.goChild('zhongdengManageDetailpz', row)
    },
    checkChange() {
      let checkArr = this.$refs.searchTable.getCheckboxRecords()
      console.log(checkArr, '勾选的值11111')
      this.list = checkArr
      console.log(this.list, '勾选的值22222')
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
