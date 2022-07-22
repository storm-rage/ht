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
        <zj-table-column field="tranferDate" title="转让日期" :formatter="date" />
        <zj-table-column field="contractNo" title="保理合同编号" />
        <zj-table-column title="操作" fixed="right">
          <template v-slot="{row}">
            <zj-button type="text" @click="toReceipt(row)" :api="zjBtn.confirmAssignmentNoticeReceipt">确认回执</zj-button >
          </template>
        </zj-table-column>
      </zj-table>
    </zj-list-layout>
  </div>
</template>
<script>
export default {
  data() {
    return {
      zjControl: {
        tableApi: this.$api.transferNotifyManage.queryAssignmentNoticeReceiptPage,
        confirmAssignmentNoticeReceipt: this.$api.transferNotifyManage.confirmAssignmentNoticeReceipt,
      },
      searchForm: {
        fromEntName: '',
        toEntName: '',
        transferDateStart: '',
        transferDateEnd: '',
        serialNo: ''
      }
    };
  },
  created() {
    this.getApi();
  },
  methods: {
    toDetail(row) {
      this.goChild('transferNotifyReceiptDetail',{serialNo: row.serialNo})
    },
    toReceipt (row) {
      this.goChild('transferNotifyReceipt',{serialNo: row.serialNo})
    }
  },
};
</script>
