<template>
  <div>
    <zj-list-layout>
      <template slot="searchForm">
        <el-form ref="searchForm" :model="searchForm">
          <el-form-item label="转出方：">
            <el-input v-model.trim="searchForm.fromEntName" @keyup.enter.native="enterSearch"/>
          </el-form-item>
          <el-form-item label="签收方/资金方：">
            <el-input v-model.trim="searchForm.toEntName" @keyup.enter.native="enterSearch"/>
          </el-form-item>
          <el-form-item label="转让日期：" class="col-right">
            <zj-date-range-picker
              :startDate.sync="searchForm.transferDateStart"
              :endDate.sync="searchForm.transferDateEnd"
            />
          </el-form-item>
          <el-form-item label="签署回执日期：">
            <zj-date-range-picker
              :startDate.sync="searchForm.receiveDateStart"
              :endDate.sync="searchForm.receiveDateEnd"
            />
          </el-form-item>
          <el-form-item label="申请流水号：">
            <el-input v-model.trim="searchForm.serialNo" @keyup.enter.native="enterSearch"/>
          </el-form-item>
        </el-form>
      </template>
      <zj-table
        ref="searchTable"
        :params="searchForm"
        :api="zjControl.tableApi"
      >
        <zj-table-column field="serialNo" title="申请流水号">
          <template v-slot="{ row }">
            <el-link type="primary" :underline="false" @click="toDetail(row)">{{row.serialNo}}</el-link>
          </template>
        </zj-table-column>
        <zj-table-column field="fromEntName" title="转出方" />
        <zj-table-column field="toEntName" title="签收方/资金方" />
        <zj-table-column field="tranferDate" title="转让日期" formatter="formatDate" />
        <zj-table-column field="receiveDate" title="签署回执日期" formatter="formatDate" />
        <zj-table-column field="contractNo" title="保理合同编号" />
      </zj-table>
    </zj-list-layout>
  </div>
</template>
<script>
export default {
  data() {
    return {
      zjControl: {
        tableApi: this.$api.transferNotifyManage.queryAssignmentNoticeRecordPage
      },
      searchForm: {
        fromEntName: '',
        toEntName: '',
        transferDateStart: '',
        transferDateEnd: '',
        receiveDateStart: '',
        receiveDateEnd: '',
        serialNo:''
      }
    };
  },
  created() {
    this.getApi();
  },
  methods: {
    toDetail(row) {
      this.goChild('transferNotifyQueryDetail',{serialNo: row.serialNo})
    },
  },
};
</script>
