<template>
  <div>
    <zj-list-layout>
      <template slot="searchForm">
        <el-form ref="searchForm" :model="searchForm">
          <el-form-item label="合同编号：">
            <el-input
              v-model.trim="searchForm.contractNo"
              @keyup.enter.native="enterSearch"
            />
          </el-form-item>

          <el-form-item label="合同签署类型：">
            <el-select v-model="searchForm.applyType">
              <el-option value="" label="全部"></el-option>
              <el-option
                v-for="item in dictionary.applyType"
                :key="`${item.code}applyType`"
                :label="item.desc"
                :value="item.code"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="申请日期：" class="col-right">
            <zj-date-range-picker
              :startDate.sync="searchForm.applyStartDate"
              :endDate.sync="searchForm.applyEndDate"
            />
          </el-form-item>

          <el-form-item label="申请流水号：">
            <el-input
              v-model.trim="searchForm.serialNo"
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
        <zj-table-column type="seq" width="60" title="序号" />
        <zj-table-column field="serialNo" title="申请流水号"/>
        <zj-table-column field="applyTypeDesc" title="合同签署类型" />
        <zj-table-column field="contractNo" title="合同编号" />
        <zj-table-column
          field="contractName"
          title="合同名称"/>
        <zj-table-column field="applyStatusDesc" title="申请状态"/>
        <zj-table-column field="applyDate" title="申请时间"/>
        <zj-table-column title="操作" fixed="right">
          <template v-slot="{ row }">
            <zj-button
              type="text"
              @click="toReview(row)"
              :api="zjBtn.submitEbContractApplyReview"
            >复核</zj-button
            >
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
        tableApi: this.$api.factoringContract.queryEbContractReviewSignPage,
        getDirectory: this.$api.factoringContract.getEbContractReviewDirectory,
        submitEbContractApplyReview: this.$api.factoringContract.submitEbContractApplyReview
      },
      searchForm: {
        contractNo: "",
        applyType: "",
        applyStartDate: "",
        applyEndDate: "",
        serialNo: ""
      },
      // 字典
      dictionary: {}
    };
  },
  created() {
    this.getApi();
    this.getDic();
  },
  methods: {
    getDic() {
      this.zjControl.getDirectory().then((res) => {
        this.dictionary = res.data
      });
    },
    toReview(row) {
      this.goChild('contractSignReview',{contractId: row.contractId,contractNo: row.contractNo})
    },
  },
};
</script>

<style scoped>
</style>
