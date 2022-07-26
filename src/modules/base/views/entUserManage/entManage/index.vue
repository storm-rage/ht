<template>
  <zj-content-container>
    <zj-list-layout>
      <template slot="searchForm">
        <el-form ref="searchForm" :model="searchForm">
          <el-form-item label="企业名称：" class="col-center">
            <el-input
              v-model="searchForm.nameLike"
              @keyup.enter.native="enterSearch"
            />
          </el-form-item>
          <el-form-item label="企业编码：">
            <el-input
              v-model="searchForm.code"
              @keyup.enter.native="enterSearch"
            />
          </el-form-item>
          <el-form-item label="创建日期：" class="col-right">
            <zj-date-range-picker
              @startChange="$refs.quickQuery.queryIndex = 0"
              @endChange="$refs.quickQuery.queryIndex = 0"
              :startDate.sync="searchForm.applyDateStart"
              :endDate.sync="searchForm.applyDateEnd"
            />
          </el-form-item>
          <el-form-item label="平台客户类型：">
            <el-select
              v-model="searchForm.projectId"
              :popper-append-to-body="false"
            >
              <el-option
                v-for="(item, index) in dictionary.projectInfoList"
                :key="index"
                :value="item.code"
                :label="item.desc"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </template>
      <template slot="btnGroups">
        <zj-button
          class="append"
          icon="el-icon-circle-plus-outline"
          @click="goChild('entManageAdd')"
          :api="zjBtn.addEnterprise"
          >新增</zj-button
        >
        <zj-button
          class="export"
          icon="iconfont icon-daochu"
          @click="exportList"
          :api="zjBtn.exportEnterpriseList"
          >导出数据</zj-button
        >
      </template>
      <zj-table
        ref="searchTable"
        :params="searchForm"
        :api="zjControl.tableApi"
      >
        <zj-table-column field="customCode" title="企业编码" />
        <zj-table-column field="code" title="客户业务系统编码" />
        <zj-table-column field="name" title="企业名称" />
        <zj-table-column
          field="entType"
          title="平台客户类型"
          :formatter="(obj) => typeMap(dictionary.entTypeList, obj.cellValue)"
        />
        <zj-table-column field="applyDate" title="创建日期" :formatter="date" />
        <zj-table-column
          field="state"
          title="企业状态"
          :formatter="
            (obj) => typeMap(dictionary.enterpriseStateList, obj.cellValue)
          "
        />
        <zj-table-column title="操作" fixed="right">
          <template v-slot="{ row }">
            <zj-button
              type="text"
              @click="goChild('entManageDetail', row)"
              :api="zjBtn.getEnterprise"
              >详情</zj-button
            >
            <zj-button
              type="text"
              @click="goChild('entManageEdit', row)"
              :api="zjBtn.updateEnterprise"
              >修改</zj-button
            >
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
       
      },
      dictionary: {},
      searchListFlag: false,
      searchForm: {},
    };
  },
  methods: {
    // 获取字典
    queryDictionary() {
      this.zjControl.dictionary().then((res) => {
        this.dictionary = Object.assign(tableDic, res.data);
      });
    },
    // 导出列表
    exportList() {
      this.zjControl.exportEnterpriseList(this.searchForm);
    },
  },
  created() {
    this.queryDictionary();
    this.getApi();
  },
};
</script>

<style lang="less" scoped>
.EnterPrises {
  width: calc(100% - 20px);
}
</style>
