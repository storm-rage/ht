<template>
  <div>
    <zj-list-layout>
      <template slot="searchForm">
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
          <el-form-item label="申请状态：" class="col-center">
            <el-select
              v-model="searchForm.isGenerateVoucher"
              placeholder="请选择"
              clearable
              :popper-append-to-body="false"
            >
              <el-option value="" label="全部"></el-option>
              <el-option value="1" label="我的买方企业"></el-option>
              <el-option value="2" label="我的卖方企业"></el-option>
              <!-- <el-option
              v-for="item in dictionary.isGenerateVouchers"
              :key="item.code"
              :label="item.desc"
              :value="item.code"
            >
            </el-option> -->
            </el-select>
          </el-form-item>

          <el-form-item label="申请流水号：" class="col-right">
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
        <zj-table-column field="issueEntName" title="申请流水号" />
        <zj-table-column field="issueEntName" title="买方企业名称" />
        <zj-table-column field="issueEntName" title="卖方企业名称" />
        <zj-table-column field="issueEntName" title="卖方银行账号" />
        <zj-table-column field="issueEntName" title="卖方企业银行账户户名" />
        <zj-table-column field="issueEntName" title="卖方企业开户行" />
        <zj-table-column field="issueEntName" title="银行联行号" />
        <zj-table-column field="issueEntName" title="银行类型" />
        <zj-table-column field="issueEntName" title="申请状态" />
        <zj-table-column field="ebillAmt" title="申请时间" :formatter="date" />
      </zj-table>
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
  },
};
</script>
