<template>
  <div>
    <div class="zj-search-condition">
      <el-row class="button-row">
        <vxe-button class="reset" icon="el-icon-refresh" @click="resetSearch"
        >重置</vxe-button
        >
        <vxe-button class="search" icon="el-icon-search" @click="search"
        >查询</vxe-button
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
        <zj-table-column field="field1" title="申请流水号">
          <template v-slot="{ row }">
            <el-link type="primary" :underline="false" @click="toDetail(row)">{{row.field1}}</el-link>
          </template>
        </zj-table-column>
        <zj-table-column field="field2" title="转出方" />
        <zj-table-column field="field3" title="签收方/资金方" />
        <zj-table-column field="field4" title="转让日期" :formatter="date" />
        <zj-table-column field="field5" title="保理合同编号" />
        <zj-table-column title="操作" fixed="right">
          <template v-slot="{row}">
            <zj-button type="text" @click="toReceipt(row)" :api="zjBtn.getEnterprise">确认回执</zj-button >
          </template>
        </zj-table-column>
      </zj-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      zjControl: {},
      searchForm: {}
    };
  },
  created() {
    // this.getApi();
  },
  methods: {
    toDetail(row) {
      this.$router.push({name: 'transferNotifyDetail'})
    },
    toReceipt (row) {
      this.$router.push({name: 'transferNotifyReceipt'})
    }
  },
};
</script>
