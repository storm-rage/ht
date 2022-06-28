<template>
  <div>
    <div class="zj-search-condition">
      <el-row class="button-row">
        <zj-button class="reset" icon="el-icon-refresh" @click="resetSearch"
          >重置</zj-button
        >
        <zj-button class="search" icon="el-icon-search" @click="search"
          >查询</zj-button
        >
      </el-row>
      <el-form ref="searchForm" :model="searchForm">
        <el-form-item label="转出方：">
          <el-input v-model="searchForm.issueEntName" />
        </el-form-item>
        <el-form-item label="签收方/资金方：">
          <el-input v-model="searchForm.issueEntName" />
        </el-form-item>
        <el-form-item label="转让日期：" class="col-right">
          <zj-date-range-picker
            :startDate.sync="searchForm.expireDateStart"
            :endDate.sync="searchForm.expireDateEnd"
          />
        </el-form-item>
        <el-form-item label="融资金额：" class="col-center">
          <zj-amount-range
            :startAmt.sync="searchForm.ebillAmtStart"
            :endAmt.sync="searchForm.ebillAmtEnd"
            @keyupEnterNative="enterSearch"
          />
        </el-form-item>
        <el-form-item label="申请流水号：">
          <el-input v-model="searchForm.issueEntName" />
        </el-form-item>
      </el-form>
    </div>
    <div class="zj-search-response">
      <zj-table
        ref="searchTable"
        :params="searchForm"
        :api="zjControl.tableApi"
      >
        <zj-table-column field="ebillCode" title="申请流水号">
          <template v-slot="{ row }">
            <span class="table-elbill-code" @click="toBillDetails(row)">{{
              row.ebillCode
            }}</span>
          </template>
        </zj-table-column>
        <zj-table-column field="issueEntName" title="转出方" />
        <zj-table-column field="issueEntName" title="签收方/资金方" />
        <zj-table-column field="issueDate" title="转让日期" :formatter="date" />
        <zj-table-column field="ebillAmt" title="保理合同编号" />
      </zj-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      zjControl: {},
      searchForm: {},
      XYchecked: false,
    };
  },
  created() {
    this.getApi();
  },
  methods: {
    toBillDetails(row) {
      console.log(row);
    },
  },
};
</script>
