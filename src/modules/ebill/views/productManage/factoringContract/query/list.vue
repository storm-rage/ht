<template>
  <div>
    <zj-list-layout>
      <template slot="searchForm">
        <el-form ref="searchForm" :model="searchForm">
          <el-form-item label="供应商名称：">
            <el-input v-model.trim="searchForm.supplierName" @keyup.enter.native="enterSearch"/>
          </el-form-item>

          <el-form-item label="合同状态：">
            <el-select v-model="searchForm.contractStatus">
              <el-option value="1"/>
              <el-option value="2"/>
              <el-option value="3"/>
            </el-select>
          </el-form-item>

          <el-form-item label="是否海天一级供应商：">
            <el-select v-model="searchForm.isHtEnterprise">
              <el-option value="全部"/>
              <el-option value="待复核"/>
            </el-select>
          </el-form-item>

          <el-form-item label="合同生效日：" class="col-right">
            <zj-date-range-picker
              :startDate.sync="searchForm.contractStartDate"
              :endDate.sync="searchForm.contractEndDate"
            />
          </el-form-item>

          <el-form-item label="合同编号：">
            <el-input v-model.trim="searchForm.contractNo" @keyup.enter.native="enterSearch"/>
          </el-form-item>
        </el-form>
      </template>
      <zj-table ref="searchTable" :params="searchForm" :api="zjControl.tableApi">
        <zj-table-column field="supplierName" title="供应商名称" />
        <zj-table-column field="supplierTypeDesc" title="是否海天一级供应商" />
        <zj-table-column field="bizLicence" title="供应商统一社会信用代码" />
        <zj-table-column field="contractNo" title="合同编号"/>
        <zj-table-column field="contractName" title="合同名称"/>
        <zj-table-column field="contractStartDate" title="合同生效日期"/>
        <zj-table-column field="contractEndDate" title="合同失效日期"/>
        <zj-table-column field="contractStatusDesc" title="合同状态"/>
        <zj-table-column title="操作" fixed="right">
          <template v-slot="{row}">
            <zj-button type="text" @click="toViewDetail(row)" :api="zjBtn.getEbContractCreditDetail">详情</zj-button>
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
        tableApi: this.$api.factoringContract.queryEbContractPage,
        getEbContractCreditDetail: this.$api.factoringContract.getEbContractCreditDetail
      },
      searchForm:{
        supplierName: '',
        contractStatus: '',
        isHtEnterprise: '',
        contractStartDate: '',
        contractEndDate: '',
        contractNo:''
      }
    }
  },
  created() {
    this.getApi()
  },
  methods: {
    toViewDetail(row) {
      this.goChild('factoringContractDetail', {id: row.id});
    }
  }
}
</script>
