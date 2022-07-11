<template>
  <zj-content-container>
    <zj-list-layout>
      <template slot="searchForm">
        <el-form ref="searchForm" class="search-form">
          <el-form-item label="用户姓名：" class="col-center">
            <el-input
              v-model="searchForm.userNameLike"
              @keyup.enter.native="enterSearch"
            />
          </el-form-item>
          <el-form-item label="新增日期：" class="col-right">
            <zj-date-range-picker
              @startChange="$refs.quickQuery.queryIndex = 0"
              @endChange="$refs.quickQuery.queryIndex = 0"
              :startDate.sync="searchForm.createDateStart"
              :endDate.sync="searchForm.createDateEnd"
            />
          </el-form-item>
          <el-form-item label="用户状态：">
            <el-select v-model="applicationStatus">
              <el-option value="1" />
              <el-option value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="企业名称：">
            <el-input
              v-model="searchForm.entNameLike"
              @keyup.enter.native="enterSearch"
            />
          </el-form-item>
        </el-form>
      </template>
      <template slot="btnGroups">
        <zj-button
          class="append"
          icon="el-icon-circle-plus-outline"
          @click="addUser"
          >新增</zj-button
        >
      </template>
      <zj-table
        ref="searchTable"
        :params="searchForm"
        :api="zjControl.uTableApi"
      >
        <zj-table-column field="loginName" title="用户编码" />
        <zj-table-column field="userName" title="用户姓名" />
        <zj-table-column field="mobileNo" title="手机号码" />
        <zj-table-column field="createDate" title="创建日期" />
        <zj-table-column field="createDate" title="已关联企业" />
        <zj-table-column field="createDate" title="企业名称" />
        <zj-table-column title="操作" fixed="right">
          <template v-slot="{ row }">
            <zj-button
              type="text"
              @click="&quot;&quot;;"
              :api="uBtn.uGetUserInformationDetail"
              >维护</zj-button
            >
          </template>
        </zj-table-column>
      </zj-table>
    </zj-list-layout>
  </zj-content-container>
</template>

<script>
export default {
  name: "userInfo",
  components: {},
  data() {
    return {
      zjControl: {},
      applicationStatus: "",
      searchForm: {
        entNameLike: "", //企业名称
        loginNameLike: "", //用户名
        createDateStart: "", //新增日期开始
        createDateEnd: "", //新增日期结束
        mobileNo: "", //手机号码
        userNameLike: "", //姓名
        certNo: "", //证件号码
      },
    };
  },
  methods: {
    //查询之前
    beforeSearch() {
      this.$refs.quickQuery.editDate();
    },
    //重置之前
    beforeResetSearch() {
      this.$refs.quickQuery.editDate();
    },
    //新增用户
    addUser() {
      this.$refs.addEditUser.open(true); //显示
    },
    //新增完成
    addSuccess(boo) {
      boo ? this.resetSearch() : this.search();
    },
  },
};
</script>

<style scoped>
</style>
