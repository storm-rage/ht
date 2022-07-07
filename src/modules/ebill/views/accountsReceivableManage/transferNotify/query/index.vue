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
        <el-form-item label="签署回执日期：">
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
        :dataList="list"
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
        <zj-table-column field="field5" title="签署回执日期" :formatter="date" />
        <zj-table-column field="field6" title="保理合同编号" />
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
      list: [
        {
          field1: '34534534543545',
          field2: '法师法师打发',
          field3: '天太热特然退热贴',
          field4: '2022-09-09',
          field5: '2022-09-09',
          field6: '757567567567567'
        }
      ]
    };
  },
  created() {
    // this.getApi();
  },
  methods: {
    toDetail(row) {
      this.$router.push({name: 'transferNotifyDetail'})
    },
  },
};
</script>
