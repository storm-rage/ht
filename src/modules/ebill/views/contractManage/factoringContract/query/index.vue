<template>
  <div>
    <zj-list-layout>
      <template slot="searchForm">
        <el-form ref="searchForm" :model="searchForm">
          <el-form-item label="合同编号：">
            <el-input v-model.trim="searchForm.contractNo" @keyup.enter.native="enterSearch"/>
          </el-form-item>

          <el-form-item label="合同签署类型：">
            <el-select v-model="searchForm.applyType">
              <el-option value="1"/>
              <el-option value="2"/>
              <el-option value="3"/>
            </el-select>
          </el-form-item>

          <el-form-item label="申请日期：" class="col-right">
            <zj-date-range-picker
              :startDate.sync="searchForm.applyStartDate"
              :endDate.sync="searchForm.applyEndDate"
            />
          </el-form-item>

          <el-form-item label="申请状态：">
            <el-select v-model="searchForm.applyStatus">
              <el-option value="全部"/>
              <el-option value="待复核"/>
            </el-select>
          </el-form-item>

          <el-form-item label="申请流水号：">
            <el-input v-model.trim="searchForm.serialNo" @keyup.enter.native="enterSearch"/>
          </el-form-item>

          <el-form-item label="签约结果：">
            <el-select v-model="searchForm.contractSignStatus">
              <el-option value="全部"/>
              <el-option value="待复核"/>
              <el-option value="3"/>
            </el-select>
          </el-form-item>
        </el-form>
      </template>
      <zj-table ref="searchTable" :params="searchForm" :api="zjControl.tableApi">
        <zj-table-column type="seq" title="序号" width="60"/>
        <zj-table-column field="serialNo" title="申请流水号" />
        <zj-table-column field="applyType" title="合同签署类型" />
        <zj-table-column field="contractNo" title="合同编号" />
        <zj-table-column field="contractName" title="合同名称"/>
        <zj-table-column field="applyStatusDesc" title="申请状态"/>
        <zj-table-column field="applyTypeDesc" title="签约结果"/>
        <zj-table-column field="applyDate" title="申请时间"/>
        <zj-table-column title="操作" fixed="right">
          <template v-slot="{row}">
            <zj-button type="text" @click="toViewDetail(row)" :api="zjBtn.queryMyEbContractDetail">详情</zj-button>
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
        tableApi: this.$api.factoringContract.queryMyEbContractPage,
        queryMyEbContractDetail: this.$api.factoringContract.queryMyEbContractDetail
      },
      searchForm:{
        contractNo: '',
        applyType: '',
        applyStartDate: '',
        applyEndDate: '',
        applyStatus: '',
        serialNo:'',
        contractSignStatus: ''
      }
    }
  },
  created() {
    this.getApi()
  },
  methods: {
    toViewDetail(row) {
      this.goChild('mySignContractDetail',{contractId: row.contractId})
    }
  }
}
</script>
