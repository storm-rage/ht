<template>
  <zj-content-container>
    <el-tabs v-model="tabAtive" type="card" class="zj-tabs-card">
      <el-tab-pane label="代办" name="agenda"> </el-tab-pane>
      <el-tab-pane label="已办" name="pending"> </el-tab-pane>
      <el-tab-pane label="已办结" name="processed"> </el-tab-pane>
    </el-tabs>
    <zj-list-layout>
      <template slot="searchForm">
        <el-form ref="searchForm">
          <el-form-item label="申请流水号：">
            <el-input
              v-model="searchForm.entNameLike"
              @keyup.enter.native="enterSearch"
            />
          </el-form-item>
          <el-form-item label="业务类型：" class="col-center">
            <el-input
              v-model="searchForm.loginNameLike"
              @keyup.enter.native="enterSearch"
            />
          </el-form-item>
          <el-form-item label="接收日期：" class="col-right">
            <zj-date-range-picker
              :startDate.sync="searchForm.createDateStart"
              :endDate.sync="searchForm.createDateEnd"
            />
          </el-form-item>
          <el-form-item label="发起发：">
            <el-input
              v-model="searchForm.mobileNo"
              @keyup.enter.native="enterSearch"
            />
          </el-form-item>
          <el-form-item label="供应商名称：" v-if="tabAtive === 'agenda'">
            <el-input
              v-model="searchForm.mobileNo"
              @keyup.enter.native="enterSearch"
            />
          </el-form-item>
        </el-form>
      </template>
    </zj-list-layout>
    <zj-content>
      <zj-table
        ref="searchTable"
        :params="searchForm"
        :api="zjControl.mTableApi"
        :dataList="fileList"
      >
        <zj-table-column field="entName" title="申请流水号" />
        <zj-table-column field="operType" title="供应商名称" />
        <zj-table-column field="loginName" title="业务类型" />
        <zj-table-column field="loginName" title="申请类型" />
        <zj-table-column field="userName" title="发起方" />
        <zj-table-column field="mobileNo" title="接收时间" />
        <zj-table-column field="roleNames" title="申请状态" />
        <zj-table-column
          title="操作"
          fixed="right"
          v-if="tabAtive === 'agenda'"
        >
          <template>
            <zj-button
              type="text"
              @click="&quot;&quot;;"
              :api="zjBtn.getEnterprise"
              >处理</zj-button
            >
            <zj-button
              type="text"
              @click="&quot;&quot;;"
              :api="zjBtn.getEnterprise"
              >作废</zj-button
            >
          </template>
        </zj-table-column>
      </zj-table>
    </zj-content>
  </zj-content-container>
</template>

<script>
export default {
  name: "myItems",
  components: {},
  data() {
    return {
      tabAtive: "agenda",
      searchForm: {},
      zjControl: {},
      fileList: [{}],
    };
  },
  methods: {},
  created() {},
};
</script>

<style lang="less">
</style>
