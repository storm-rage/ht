<template>
  <zj-content-container>
    <zj-list-layout>
      <template slot="searchForm">
        <el-form ref="searchForm" :model="searchForm">
          <el-form-item label="凭证持有人：">
            <el-input v-model="searchForm.receiptEntNameLike" />
          </el-form-item>
          <el-form-item label="申请日期：" class="col-right">
            <zj-date-range-picker
              :startDate.sync="searchForm.createDatetimeStart"
              :endDate.sync="searchForm.createDatetimeEnd"
            />
          </el-form-item>
          <el-form-item label="凭证编号：" class="col-center">
            <el-input
              v-model="searchForm.ebillCode"
              @keyup.enter.native="enterSearch"
            />
          </el-form-item>
        </el-form>
      </template>
      <zj-table
        ref="searchTable"
        :params="searchForm"
        :api="zjControl.tableApi"
      >
        <zj-table-column field="ebillCode" title="凭证编号" />
        <zj-table-column field="payEntName" title="凭证签发人" />
        <zj-table-column field="receiptEntName" title="凭证持有人" />
        <zj-table-column field="ebillAmt" title="凭证金额" :formatter="money" />
        <zj-table-column
          field="openDate"
          title="凭证签发日期"
          :formatter="date"
        />
        <zj-table-column
          field="expireDate"
          title="凭证到期日"
          :formatter="date"
        />
        <zj-table-column field="payableNotes" title="开立凭证说明" />
        <zj-table-column field="acctBillCode" title="对账单编号" />
        <zj-table-column
          field="createDatetime"
          title="申请时间"
          :formatter="date"
        />
        <zj-table-column field="rejectNotes" title="作废原因" />
        <zj-table-column title="操作" fixed="right">
          <template>
            <zj-button
              type="text"
              @click="goChild('', row)"
              :api="zjBtn.getEnterprise"
              >复核</zj-button
            >
          </template>
        </zj-table-column>
      </zj-table>
    </zj-list-layout>
  </zj-content-container>
</template>
<script>
export default {
  data() {
    return {
      zjControl: this.$api.billRejectAudit,
      searchForm: {},
    };
  },
  created() {
    this.getApi();
  },
  methods: {
  },
};
</script>
