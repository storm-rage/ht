<template>
  <div>
    <zj-content-container>
      <!--  凭证保理融资台账  -->
      <div class="zj-search-condition zj-m-b-20" style="border-bottom: none;">
        <zj-list-layout>
          <template slot="leftBtns">
            <vxe-button class="export" icon="el-icon-download" @click="toExport">导出</vxe-button>
            <!--:api="zjBtn.rdexport"  -->
          </template>
          <template slot="searchForm">
            <el-form ref="searchForm" :model="searchForm">
              <el-form-item label="融资申请流水号：">
                <el-input v-model.trim="searchForm.serialNo" @keyup.enter.native="search"></el-input>
              </el-form-item>
              <el-form-item label="供应商名称：">
                <el-input v-model.trim="searchForm.fromEntName" @keyup.enter.native="search"></el-input>
              </el-form-item>
              <el-form-item label="核心企业名称：">
                <el-input v-model.trim="searchForm.buyerEntName" @keyup.enter.native="search"></el-input>
              </el-form-item>
              <el-form-item label="起息日：">
                <zj-date-range-picker :startDate.sync="searchForm.estimateTimeStartStart"
                  :endDate.sync="searchForm.estimateTimeStartEnd"></zj-date-range-picker>
              </el-form-item>
              <el-form-item label="融资到期日：">
                <zj-date-range-picker :startDate.sync="searchForm.expireDateStart"
                  :endDate.sync="searchForm.expireDateEnd"></zj-date-range-picker>
              </el-form-item>
              <el-form-item label="融资本金：">
                <zj-amount-range :startAmt.sync="searchForm.tranAmtStart" :endAmt.sync="searchForm.tranAmtEnd">
                </zj-amount-range>
              </el-form-item>
            </el-form>
          </template>
          <zj-table ref="searchTable" :params="searchForm" :api="zjControl.rdqueryPage">

            <zj-table-column title="序号" type="seq"/>
            <zj-table-column field="fromEntName" title="供应商名称" />
            <zj-table-column field="buyerEntName" title="核心企业名称" />
            <zj-table-column field="isHtEnterprise" title="是否一级供应商" />
            <zj-table-column title="融资申请流水号">
              <template v-slot="{ row }">
                <!-- <zj-button type="text" @click="goChild('queryAccountBillDetail', row)">{{ row.serialNo }}</zj-button> -->
                <zj-button type="text" @click="goDetail(row)">{{ row.serialNo }}</zj-button>
              </template>
            </zj-table-column>
            <zj-table-column field="tranferAmt" title="转让凭证金额" :formatter="money" />
            <zj-table-column field="discountRate" title="融资比例" :formatter="rate" />
            <zj-table-column field="tranAmt" title="融资本金" :formatter="money" />
            <zj-table-column field="estimateTimeStart" title="起息日" :formatter="date" />
            <zj-table-column field="estimateTimeEnd" title="融资到期日" :formatter="date" />
            <zj-table-column field="estimateDays" title="预计计息天数" />
            <zj-table-column field="interestRate" title="融资利率/月" :formatter="rate" />
            <zj-table-column field="interestAmt" title="预计利息" :formatter="money" />
            <zj-table-column field="actualExpireDate" title="实际到期日" :formatter="date" />
            <zj-table-column field="estimateDays" title="实际计息天数" />
            <zj-table-column field="interestAmt" title="实际利息" :formatter="money" />
            <zj-table-column field="inputNumber" title="实际尾款金额" :formatter="money" />
            <zj-table-column field="returnDate" title="年化本金" :formatter="money" />
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
        rdexport: this.$api.factoringLedger.rdexport,//导出
        rdDetailrzxq: this.$api.factoringLedger.rdDetailrzxq,//融资申请详情
        rdDetailpzxx: this.$api.factoringLedger.rdDetailpzxx,//凭证信息详情
        rdgetDirectory: this.$api.factoringLedger.rdgetDirectory,//字典
        rdqueryPage: this.$api.factoringLedger.rdqueryPage,//查询列表
      },
      searchForm: {
        serialNo: '',
        fromEntName: '',
        buyerEntName: '',
        estimateTimeStartStart: '',
        estimateTimeStartEnd: '',
        expireDateStart: '',
        expireDateEnd: '',
        tranAmtStart: '',
        tranAmtEnd: '',
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
      dictionary: {},
    };
  },
  methods: {

    getDictionary() {
      this.zjControl.rdgetDirectory().then(res => {
        this.dictionary = Object.assign({}, res.data)
      })
    },
    toExport() {
      this.zjControl.rdexport()
    },
    goDetail(row){
      row.parent='rdFactoringLedger'
      this.goChild('rdFactoringLedgerDetail', row)
    },
  },
  created() {
    this.getApi()
    this.getDictionary()
  }
};
</script>
