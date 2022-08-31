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
              :startDate.sync="searchForm.createDateStart"
              :endDate.sync="searchForm.createDateEnd"
            />
          </el-form-item>
          <el-form-item label="用户状态：">
            <el-select v-model="searchForm.state">
              <el-option
                v-for="(item, index) in dictionary.userState"
                :key="index"
                :value="item.code"
                :label="item.desc"
              ></el-option>
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
          type="primary"
          icon="el-icon-circle-plus-outline"
          class="zj-m-t-10"
          @click="goChild('userAdd')"
          >新增</zj-button
        >
      </template>
      <zj-table
        ref="searchTable"
        :params="searchForm"
        :api="zjControl.queryUserPage"
      >
        <zj-table-column field="userCode" title="用户编码">
          <template v-slot="{ row }">
            <zj-button type="text" @click="goChild('userDetail', row)">{{
              row.userCode
            }}</zj-button>
          </template>
        </zj-table-column>
        <zj-table-column field="userName" title="用户姓名" />
        <zj-table-column field="mobileNo" title="手机号码" />
        <zj-table-column field="createDate" title="创建日期" />
        <zj-table-column field="entCount" title="已关联企业" />
        <zj-table-column field="entName" title="企业名称" />
        <zj-table-column title="操作" fixed="right">
          <template v-slot="{ row }">
            <zj-button
              type="text"
              @click="goChild('userVindicate', row)"
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
      zjControl:  this.$api.userInfoManage,
      searchForm: {},
      dictionary: {},
    };
  },
  created() {
    this.getApi();
    this.getDictionary()
  },
  methods: {
    //获取字典
    getDictionary() {
      this.zjControl.getUserDictionary().then((res) => {
        this.dictionary = res.data;
      });
    },
  },
};
</script>

<style scoped>
</style>
