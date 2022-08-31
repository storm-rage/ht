<template>
  <zj-content-container>
    <zj-list-layout>
      <template slot="searchForm">
        <el-form ref="searchForm" :model="searchForm">
          <el-form-item label="企业名称：" class="col-center">
            <el-input v-model="searchForm.nameLike" @keyup.enter.native="enterSearch" />
          </el-form-item>
          <el-form-item label="企业编码：">
            <el-input v-model="searchForm.code" @keyup.enter.native="enterSearch" />
          </el-form-item>
          <el-form-item label="创建日期：" class="col-right">
            <zj-date-range-picker :startDate.sync="searchForm.applyDateStart" :endDate.sync="searchForm.applyDateEnd" />
          </el-form-item>
          <el-form-item label="平台客户类型：">
            <el-select v-model="searchForm.entType" :popper-append-to-body="false">
              <el-option v-for="(item, index) in dictionary.entTypeList" :key="index" :value="item.code" :label="item.desc"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </template>
      <template slot="btnGroups">
        <zj-content>
          <zj-button type="primary" icon="el-icon-circle-plus-outline" @click="goChild('entManageAdd')" :api="zjBtn.addEnterprise">新增</zj-button>
          <zj-button type="primary" icon="el-icon-download" @click="exportList" :api="zjBtn.exportEnterpriseList">导出数据</zj-button>
        </zj-content>
      </template>
      <zj-table ref="searchTable" :params="searchForm" :api="zjControl.tableApi">
        <zj-table-column title="企业编码">
          <template v-slot="{ row }">
            <span class="table-elbill-code" @click="goChild('entDetail', row)">{{ row.code }}</span>
          </template>
        </zj-table-column>
        <zj-table-column field="customCode" title="客户业务系统编码" />
        <zj-table-column field="name" title="企业名称" />
        <zj-table-column field="entType" title="平台客户类型" :formatter="(obj) => typeMap(dictionary.entTypeList, obj.cellValue)" />
        <zj-table-column field="isHtEnterprise" title="是否海天集团" :formatter="(obj) => typeMap(dictionary.isHtEnterpriseList, obj.cellValue)" />
        <zj-table-column field="applyDate" title="创建日期" :formatter="date" />
        <zj-table-column field="state" title="企业状态" :formatter="
            (obj) => typeMap(dictionary.enterpriseStateList, obj.cellValue)
          " />
        <zj-table-column title="操作" fixed="right">
          <template v-slot="{ row }">
            <zj-button type="text" @click="goChild('entManageEdit', row)" :api="zjBtn.updateEnterprise" v-if="row.isHtEnterprise==='1'">维护</zj-button>
            <span v-else>—</span>
          </template>
        </zj-table-column>
      </zj-table>
    </zj-list-layout>
  </zj-content-container>
</template>

<script>
export default {
  name: "EnterPrises",
  data() {
    return {
      zjControl: {
        tableApi: this.$api.entInfoManage.queryEnterprise,
        queryEntDictionary: this.$api.entInfoManage.queryEntDictionary,
        exportEnterpriseList: this.$api.entInfoManage.exportEnterpriseList,
        updateEnterprise: this.$api.entInfoManage.updateEnterprise,
        addEnterprise: this.$api.entInfoManage.addEnterprise,
      },
      dictionary: {},
      searchListFlag: false,
      searchForm: {},
    };
  },
  created() {
    this.getApi();
    this.queryEntDictionary();
  },
  methods: {
    // 获取字典
    queryEntDictionary() {
      this.zjControl.queryEntDictionary().then((res) => {
        this.dictionary = res.data;
      });
    },
    // 导出列表
    exportList() {
      this.zjControl.exportEnterpriseList(this.searchForm);
    },
  },
};
</script>

<style lang="less" scoped>
.EnterPrises {
  width: calc(100% - 20px);
}
</style>
