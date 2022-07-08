<template>
  <div>
    <zj-list-layout>
      <template slot="searchForm">
        <!-- <div class="zj-search-condition">
          <el-row class="button-row">
            <zj-button class="reset" icon="el-icon-refresh" @click="resetSearch"
              >重置</zj-button
            >
            <zj-button class="search" icon="el-icon-search" @click="search"
              >查询</zj-button
            >
          </el-row>
        </div> -->
        <el-form ref="searchForm" :model="searchForm">
          <el-form-item label="买方企业名称：" class="col-right">
            <el-input
              v-model="searchForm.ebillCode"
              @keyup.enter.native="enterSearch"
            />
          </el-form-item>
          <el-form-item label="卖方企业名称：" class="col-right">
            <el-input
              v-model="searchForm.ebillCode"
              @keyup.enter.native="enterSearch"
            />
          </el-form-item>

          <el-form-item label="申请日期：" class="col-right">
            <zj-date-range-picker
              :startDate.sync="searchForm.expireDateStart"
              :endDate.sync="searchForm.expireDateEnd"
            />
          </el-form-item>

          <el-form-item label="申请流水号：" class="col-right">
            <el-input
              v-model="searchForm.ebillCode"
              @keyup.enter.native="enterSearch"
            />
          </el-form-item>
        </el-form>
      </template>
      <!-- <div class="zj-search-response"> -->
      <zj-table
        ref="searchTable"
        :params="searchForm"
        :api="zjControl.tableApi"
      >
        <zj-table-column field="issueEntName" title="申请流水号" />
        <zj-table-column field="issueEntName" title="买方企业名称" />
        <zj-table-column field="issueEntName" title="买方是否为海天集团" />
        <zj-table-column field="issueEntName" title="卖方企业名称" />
        <zj-table-column field="ebillAmt" title="申请时间" :formatter="date" />
        <zj-table-column title="操作" fixed="right">
          <template v-slot="{ row }">
            <zj-button type="text" @click="toInfo(row)">处理</zj-button>
          </template>
        </zj-table-column>
      </zj-table>
      <!-- </div> -->
    </zj-list-layout>
  </div>
</template>
<script>
export default {
  data() {
    return {
      zjControl: {},
      searchForm: {},
    };
  },
  created() {
    this.getApi();
  },
  methods: {
    toBillDetails(row) {
      console.log(row);
    },
    toInfo(row) {
      this.$router.push("/busiessTradeRelationsDealInfo");
    },
  },
};
</script>
