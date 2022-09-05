<template>
    <zj-content-container>
      <!--  订单保理融资台账  -->
      <zj-content>
        <div class="zj-search-condition zj-m-b-20">
          <zj-list-layout>
            <template slot="leftBtns">
              <vxe-button class="export" icon="el-icon-download" @click="toExport" :api="zjBtn.exportStatementAccountBill">导出</vxe-button>
            </template>
            <template slot="searchForm">
              <el-form ref="searchForm" :model="searchForm">
                <el-form-item label="供应商名称：">
                  <el-input v-model.trim="searchForm.fromEntName" @keyup.enter.native="search"></el-input>
                </el-form-item>
                <el-form-item label="核心企业名称：">
                  <el-input v-model.trim="searchForm.buyerEntName" @keyup.enter.native="search"></el-input>
                </el-form-item>
                <el-form-item label="融资到期日：">
                  <zj-date-range-picker
                    :startDate.sync="searchForm.expireDateStart"
                    :endDate.sync="searchForm.expireDateEnd"
                  ></zj-date-range-picker>
                </el-form-item>
                <el-form-item label="起息日：">
                  <zj-date-range-picker
                    :startDate.sync="searchForm.estimateTimeStartStart"
                    :endDate.sync="searchForm.estimateTimeStartEnd"
                  ></zj-date-range-picker>
                </el-form-item>
                <el-form-item label="融资本金：">
                  <zj-amount-range :startAmt.sync="searchForm.tranAmtStart" :endAmt.sync="searchForm.tranAmtEnd"></zj-amount-range>
                </el-form-item>
                <el-form-item label="融资申请流水号：">
                  <el-input v-model.trim="searchForm.serialNo" @keyup.enter.native="search"></el-input>
                </el-form-item>
              </el-form>
            </template>
            <zj-table ref="searchTable" :params="searchForm" :api="zjControl.ddblPage">
              <zj-table-column type="seq" title="序号" width="60"/>
              <zj-table-column field="fromEntName" title="供应商名称"/>
              <zj-table-column field="buyerEntName" title="核心企业名称"/>
              <zj-table-column title="融资申请流水号">
                <template v-slot="{ row }">
                  <zj-button type="text" @click="goDetail(row)">{{ row.serialNo }}</zj-button>
                </template>
              </zj-table-column>
              <zj-table-column field="tranAmt" title="融资本金" :formatter="money"/>
              <zj-table-column field="applyDatetime" title="起息日" :formatter="date"/>
              <zj-table-column field="expireDate" title="到期日" :formatter="date"/>
              <zj-table-column field="interestRate" title="融资利率/月" :formatter="rate"/>
              <zj-table-column field="interestAmt" title="预计利息" :formatter="money"/>
              <zj-table-column field="repaymentDate" title="还款日期" :formatter="date"/>
              <zj-table-column field="repaymentInterestDays" title="计息天数" />
              <zj-table-column field="repaymentAmt" title="还款金额" :formatter="money"/>
              <zj-table-column field="repaymentPrincipalAmt" title="偿还本金" :formatter="money"/>
              <zj-table-column field="repaymentInterestAmt" title="偿还利息" :formatter="money"/>
              <zj-table-column field="unrepaymentPrincipalAmt" title="未偿还本金" :formatter="money"/>
              <zj-table-column field="yearAmt" title="年化本金" :formatter="money"/><!-- 少字段 -->
            </zj-table>
          </zj-list-layout>
        </div>
      </zj-content>
    </zj-content-container>
</template>
<script>
export default {
  name: 'billFinancingAccount',
  components: {},
  data() {
    return {
      zjControl: {
        exportddbl:this.$api.factoringLedger.exportddbl,//导出
        ddblPage:this.$api.factoringLedger.ddblPage,//查询
      },
      searchForm: {
        fromEntName: '',
        buyerEntName: '',
        expireDateStart: '',
        expireDateEnd: '',
        estimateTimeStartStart: '',
        estimateTimeStartEnd: '',
        tranAmtStart: '',
        tranAmtEnd: '',
        serialNo: '',
      },
      dictionary:{},
    };
  },
  methods: {
    goDetail(row){
      this.goChild('ddblFactoringLedgerDetail', row)
    },
    toExport() {
      this.zjControl.exportddbl(this.searchForm)
    },
  },
  created() {
    this.getApi()
  }
};
</script>
