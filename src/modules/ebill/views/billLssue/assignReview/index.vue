<template>
  <zj-content-container>
    <zj-list-layout>
      <template slot="searchForm">
        <el-form ref="searchForm" :model="searchForm">
          <el-form-item label="转让申请日期：" class="col-right">
            <zj-date-range-picker :startDate.sync="searchForm.applyDateStart" :endDate.sync="searchForm.applyDateEnd" />
          </el-form-item>
          <el-form-item label="申请流水号：">
            <el-input v-model="searchForm.serialNo" @keyup.enter.native="enterSearch" />
          </el-form-item>
        </el-form>
      </template>

      <zj-table ref="searchTable" :params="searchForm" :api="zjControl.tableApi">
        <zj-table-column field="serialNo" title="申请流水号">
          <template v-slot="{row}">
            <zj-button type="text" @click="goChild('transferTransactionSearchDetail', row)">{{row.serialNo}}</zj-button>
          </template>
        </zj-table-column>
        <zj-table-column field="tranNumber" title="转让凭证总数" />
        <zj-table-column field="tranAmt" title="转让总金额" :formatter="money" />
        <zj-table-column field="applyDate" title="转让申请时间" :formatter="date" />
        <zj-table-column title="操作" fixed="right">
          <template v-slot="{ row }">
            <zj-button type="text" @click="goChild('assignReview',row)" :api="zjBtn.getEnterprise">复核</zj-button>
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
      zjControl: this.$api.billAssignReview,
      searchForm: {},
    };
  },
  methods: {

  },
};
</script>

<style>
</style>