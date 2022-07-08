<template>
  <div class="transferCheck">
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
        <el-form-item label="转让申请日期：" class="col-right">
          <zj-date-range-picker
            :startDate.sync="searchForm.expireDateStart"
            :endDate.sync="searchForm.expireDateEnd"
          />
        </el-form-item>
        <el-form-item label="申请流水号：">
          <el-input
            v-model="searchForm.issueEntName"
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
        <zj-table-column field="ebillCode" title="申请流水号" />
        <zj-table-column field="issueEntName" title="转让凭证总数" />
        <zj-table-column
          field="splusAmt"
          title="转让总金额"
          :formatter="money"
        />
        <zj-table-column
          field="issueDate"
          title="转让申请时间"
          :formatter="date"
        />
        <zj-table-column title="操作" fixed="right">
          <template v-slot="{ row }">
            <zj-button
              type="text"
              @click="toDetail(row)"
              :api="zjBtn.getEnterprise"
              >复核</zj-button
            >
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
  methods: {
    toBillDetails(row) {
      console.log(row);
    },
    toDetail() {
      this.$router.push("/transferCheckDetails");
    },
  },
};
</script>

<style>
</style>