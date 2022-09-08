<template>
  <zj-content-container>
    <zj-money-block img-name="hold-img" :text="`可转让电子债券${productName}金额：`" :amount="transferAmount" :tipsText="`说明：1.可转让${productName}金额：当前状态为“正常持有”的，折扣范围内的可用金额。2.基于订单保理产品下签发的电子债权凭证，不支持转让！`" />
    <zj-list-layout>
      <template slot="searchForm">
        <el-form ref="searchForm" :model="searchForm">
          <el-form-item label="签发人：">
            <el-input v-model="searchForm.payEntName" @keyup.enter.native="enterSearch" />
          </el-form-item>

          <el-form-item :label="`${productName}到期日：`" class="col-right">
            <zj-date-range-picker :startDate.sync="searchForm.payableExpireDateStart" :endDate.sync="searchForm.payableExpireDateEnd" />
          </el-form-item>

          <el-form-item :label="`${productName}金额：`" class="col-center">
            <zj-amount-range :startAmt.sync="searchForm.ebillAmtStart" :endAmt.sync="searchForm.ebillAmtEnd" @keyupEnterNative="enterSearch" />
          </el-form-item>

          <el-form-item label="转让企业：">
            <el-input v-model="searchForm.transferName" @keyup.enter.native="enterSearch" />
          </el-form-item>

          <el-form-item :label="`${productName}编号：`">
            <el-input v-model="searchForm.ebillCode" @keyup.enter.native="enterSearch" />
          </el-form-item>

          <el-form-item label="凭证签收日：" class="col-right">
            <zj-date-range-picker :startDate.sync="searchForm.holderDateStart" :endDate.sync="searchForm.holderDateEnd" />
          </el-form-item>
        </el-form>
      </template>
      <zj-table ref="searchTable" :params="searchForm" :api="zjControl.tableApi" @checkbox-change="tableCheckChange" @checkbox-all="tableCheckChange">
        <zj-table-column type="checkbox" width="40px" fixed="left"></zj-table-column>
        <zj-table-column field="ebillCode" :title="`${productName}编号`">
          <template v-slot="{ row }">
            <span class="table-elbill-code" @click="goChild('ebBillApplyDetail', row)">{{
              row.ebillCode
            }}</span>
          </template>
        </zj-table-column>
        <zj-table-column field="rootCode" :title="`原始${productName}编号`" />
        <zj-table-column field="payEntName" title="签发人" />
        <zj-table-column field="receiptEntName" title="原始持有人" />
        <zj-table-column field="payableIssuanceDate" :title="`${productName}签发日`" :formatter="date" />
        <zj-table-column field="payableExpireDate" :title="`${productName}到期日`" :formatter="date" />
        <zj-table-column field="transferName" title="转让企业"  />
        <zj-table-column field="ebillAmt" :title="`${productName}金额`" :formatter="money" />
        <zj-table-column field="availableAmt" title="剩余可用金额" :formatter="money" />
        <zj-table-column field="holderDate" title="凭证签收日" :formatter="date" />
        <zj-table-column field="stateDesc" :title="`${productName}状态`" />
        <zj-table-column title="操作" fixed="right">
          <template v-slot="{ row }">
            <zj-button type="text" @click="goChild('billAssignApply', row)" :api="zjBtn.getEnterprise">转让申请</zj-button>
          </template>
        </zj-table-column>
      </zj-table>
    </zj-list-layout>
    <zj-content-footer>
      <zj-button type="primary" @click="goChild('billAssignApplyS', {paramsDataList:paramsDataList})" :api="zjBtn.passBillSignBatch" :disabled="!paramsDataList.length">
        发起转让申请
      </zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>
<script>
export default {
  data() {
    return {
      zjControl: this.$api.billAssignApply,
      searchForm: {},
      parem: [],
      dictionary: {},
      transferAmount: 0,
      paramsDataList: []
    };
  },
  computed: {
    productName() {
      return this.$store.getters['user/productName']
    },
  },
  created() {
    this.getApi();
    this.getTransferAmount();
  },
  methods: {
    // 获取可转让金额
    getTransferAmount() {
      this.zjControl.getEbBillPage().then((res) => {
        this.transferAmount = res.data;
      });
    },
    tableCheckChange({ records }) {
      console.log(records);
      this.paramsDataList = [];
      records.forEach((item) => {
        this.paramsDataList.push(item);
      });
    },
  },
};
</script>

<style lang="less" scoped>
</style>
