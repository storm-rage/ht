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
        <el-form-item label="合同编号：">
          <el-input
            v-model="searchForm.issueEntName"
            @keyup.enter.native="enterSearch"
          />
        </el-form-item>
        <el-form-item label="合同签署类型：">
          <el-select v-model="searchForm.issueEntName">
            <el-option value="全部" />
          </el-select>
        </el-form-item>
        <el-form-item label="合同/协议文本生成日期：" class="col-right">
          <zj-date-range-picker
            :startDate.sync="searchForm.expireDateStart"
            :endDate.sync="searchForm.expireDateEnd"
          />
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
        <zj-table-column type="seq" title="序号" width="60"/>
        <zj-table-column
          field="field1"
          title="合同签署类型"/>
        <zj-table-column
          field="field2"
          title="合同编号"/>
        <zj-table-column
          field="field3"
          title="合同名称"/>
        <zj-table-column
          field="field4"
          title="合同/协议文本生成时间"/>
        <zj-table-column title="操作" fixed="right">
          <template v-slot="{ row }">
            <zj-button type="text" @click="toSign(row)">去签约</zj-button>
          </template>
        </zj-table-column>
      </zj-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      zjControl: {
        getEnterprise: () => {
          return "dfsdffd";
        },
      },
      searchForm: {
        issueEntName: "",
        expireDateStart: "",
        expireDateEnd: "",
        ebillAmtStart: "",
        ebillAmtEnd: "",
        ebillCode: "",
        issueDateStart: "",
        issueDateEnd: "",
      },
      list: [
        {
          field1: '首次签约合同',
          field2: '7676756765',
          field3: '测试合同1',
          field4: '2021.01.01 11:11:22',
        }
      ]
    };
  },
  created() {
    // this.getApi();
  },
  methods: {
    toSign(row) {
      this.$router.push({name: 'contractSignApply'})
    }
  }
};
</script>

<style scoped>
</style>
