<template>
  <div class="modelAggreement">
    
    <zj-list-layout>
      <template slot="searchForm">
      <el-form ref="searchForm" :model="searchForm">
        <el-form-item label="协议文本编号：">
          <el-input
            v-model="searchForm.issueEntName"
            @keyup.enter.native="enterSearch"
          />
        </el-form-item>
        <el-form-item label="协议类型：" class="col-center">
          <el-select
            v-model="searchForm.isGenerateVoucher"
            placeholder="请选择"
            clearable
            :popper-append-to-body="false"
          >
            <el-option value="" label="全部"></el-option>
            <!-- <el-option
              v-for="item in dictionary.isGenerateVouchers"
              :key="item.code"
              :label="item.desc"
              :value="item.code"
            >
            </el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="最近维护日期：" class="col-right">
          <zj-date-range-picker
            :startDate.sync="searchForm.expireDateStart"
            :endDate.sync="searchForm.expireDateEnd"
          />
        </el-form-item>
        <el-form-item label="模板类型：" class="col-center">
          <el-select
            v-model="searchForm.isGenerateVoucher"
            placeholder="请选择"
            clearable
            :popper-append-to-body="false"
          >
            <el-option value="" label="全部"></el-option>
            <!-- <el-option
              v-for="item in dictionary.isGenerateVouchers"
              :key="item.code"
              :label="item.desc"
              :value="item.code"
            >
            </el-option> -->
          </el-select>
        </el-form-item>
      </el-form>
      </template>
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

    <!-- <div class="zj-search-response"> -->
      <zj-table
        ref="searchTable"
        :params="searchForm"
        :api="zjControl.tableApi"
      >
        <zj-table-column field="ebillCode" title="协议类型" />
        <zj-table-column field="issueEntName" title="协议文本编号" />
        <zj-table-column field="issueEntName" title="文件名称" />
        <zj-table-column field="issueEntName" title="附件" />
        <zj-table-column field="issueEntName" title="模板状态" />
        <zj-table-column field="issueEntName" title="版本号" />
        <zj-table-column
          field="issueEntName"
          title="最近维护日期"
          :formatter="date"
        />
        <zj-table-column title="操作" fixed="right">
          <template v-slot="{ row }">
            <zj-button
              type="text"
              @click="toDetail(row)"
              :api="zjBtn.getEnterprise"
              >下载</zj-button
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
      dialogVisible: false,
      type: "info",
      tableData: [{ id: 1 }],
      formModel: {},
    };
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.modelAggreement {
}
</style>