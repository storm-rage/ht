<template>
  <div>
    <zj-content-container>
      <!--  凭证保理融资台账  -->
          <div class="zj-search-condition zj-m-b-20" style="border-bottom: none;">
            <zj-list-layout>
              <template slot="leftBtns">
                <vxe-button class="export" icon="el-icon-download" @click="toExport" :api="zjBtn.exportStatementAccountBill">导出</vxe-button>
              </template>
              <template slot="searchForm">
                <el-form ref="searchForm" :model="searchForm">
                  <el-form-item label="融资申请流水号：">
                    <el-input v-model.trim="searchForm.acctBillCode" @keyup.enter.native="search"></el-input>
                  </el-form-item>
                  <el-form-item label="供应商名称：">
                    <el-input v-model.trim="searchForm.companyName" @keyup.enter.native="search"></el-input>
                  </el-form-item>
                  <el-form-item label="核心企业名称：">
                    <el-input v-model.trim="searchForm.supplierName" @keyup.enter.native="search"></el-input>
                  </el-form-item>
                  <el-form-item label="起息日：">
                    <zj-date-range-picker
                      :startDate.sync="searchForm.checkBillDateStart"
                      :endDate.sync="searchForm.checkBillDateEnd"
                    ></zj-date-range-picker>
                  </el-form-item>
                  <el-form-item label="融资到期日：">
                    <zj-date-range-picker
                      :startDate.sync="searchForm.estimatedPaymentDateStart"
                      :endDate.sync="searchForm.estimatedPaymentDateEnd"
                    ></zj-date-range-picker>
                  </el-form-item>
                  <el-form-item label="融资本金：">
                    <zj-amount-range :startAmt.sync="searchForm.ebillAmtStart" :endAmt.sync="searchForm.ebillAmtEnd"></zj-amount-range>
                  </el-form-item>
                </el-form>
              </template>
              <zj-table ref="searchTable" :params="searchForm" :api="zjControl.queryStatementSrmAccountBillPage">

                <zj-table-column field="index" title="序号"/>
                <zj-table-column field="companyName" title="供应商名称"/>
                <zj-table-column field="supplierCode" title="核心企业名称"/>
                <zj-table-column field="supplierName" title="是否一级供应商"/>
                <zj-table-column title="融资申请流水号">
                  <template v-slot="{row}">
                    <zj-button type="text" @click="goChild('queryAccountBillDetail',row)">{{row.acctBillCode}}</zj-button>
                  </template>
                </zj-table-column>
                <zj-table-column field="checkBillDate" title="转让凭证金额" :formatter="money"/>
                <zj-table-column field="estimatedPaymentDate" title="融资比例" :formatter="rate"/>
                <zj-table-column field="estimatedPaymentDate" title="融资本金" :formatter="money"/>
                <zj-table-column field="checkBillAmt" title="起息日" :formatter="date"/>
                <zj-table-column field="isApplyVoucher" title="融资到期日" :formatter="date"/>
                <zj-table-column field="billSource" title="预计计息天数"/>
                <zj-table-column field="checkBillStatus" title="融资利率/月" :formatter="rate"/>
                <zj-table-column field="isSettle" title="预计利息" :formatter="money"/>
                <zj-table-column field="ebillCode" title="实际到期日" :formatter="date"/>
                <zj-table-column field="isBusPush" title="实际计息天数" />
                <zj-table-column field="isHbkPush" title="实际利息" :formatter="money"/>
                <zj-table-column field="isHbkPush" title="实际尾款金额" :formatter="money"/>
                <zj-table-column field="isHbkPush" title="年化本金" :formatter="money"/>
              </zj-table>
            </zj-list-layout>
          </div>
    </zj-content-container>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      zjControl: {
        exportStatementAccountBill:this.$api.billSearch.exportStatementAccountBill,//对账单查询-导出
        getDirectory:this.$api.billSearch.getDirectory,//数据字典
        queryStatementSrmAccountBillPage:this.$api.billSearch.queryStatementSrmAccountBillPage,//查询
      },
      searchForm: {
        acctBillCode: '',
        companyName: '',
        supplierName: '',
        checkBillDateStart: '',
        checkBillDateEnd: '',
        estimatedPaymentDateStart: '',
        estimatedPaymentDateEnd: '',
        isApplyVoucher: '',
        checkBillStatus: '',
        billSource: '',
        isSettle: '',
      },
      list: [
        {
          field1: 'scm00001',
          field2: '某某产品一号',
          field3: '上游',
          field4: '订单保理',
          field5: '2022.09.08 11:18:19',
          field6: '生效',
          field7: '是'
        }
      ],
      dictionary:{},
    };
  },
  methods: {
    getDictionary() {
      this.zjControl.getDirectory().then(res => {
        this.dictionary = Object.assign({}, res.data)
      })
    },
    toExport() {
      this.zjControl.exportStatementAccountBill()
    },
  },
  created() {
    this.getApi()
    this.getDictionary()
  }
};
</script>
