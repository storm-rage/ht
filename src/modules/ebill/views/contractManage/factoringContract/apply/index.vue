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
          <el-form-item label="合同/协议文本生成日期：" class="col-right">
            <zj-date-range-picker
              :startDate.sync="searchForm.applyStartDate"
              :endDate.sync="searchForm.applyEndDate"
            />
          </el-form-item>
        </el-form>
      </template>
      <zj-table
        ref="searchTable"
        :params="searchForm"
        :api="zjControl.tableApi"
      >
        <zj-table-column type="seq" title="序号" width="60"/>
        <zj-table-column
          field="applyTypeDesc"
          title="合同签署类型"/>
        <zj-table-column
          field="contractNo"
          title="合同编号"/>
        <zj-table-column
          field="contractName"
          title="合同名称"/>
        <zj-table-column
          field="contractGenerateDate"
          title="合同/协议文本生成时间"/>
        <zj-table-column title="操作" fixed="right">
          <template v-slot="{ row }">
            <zj-button type="text"
                       @click="toSign(row)"
                       :api="zjBtn.submitEbContractApply">去签约</zj-button>
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
        tableApi: this.$api.factoringContract.queryEbContractEnterSignPage,
        getDirectory: this.$api.factoringContract.getEbContractApplyDirectory,
        submitEbContractApply: this.$api.factoringContract.submitEbContractApply
      },
      searchForm: {
        contractNo: "",
        applyType: "",
        applyStartDate: "",
        applyEndDate: ""
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
    toSign(row) {
      this.goChild('contractSignApply',{contractId: row.contractId,contractNo: row.contractNo})
    }
  }
};
</script>

<style scoped>
</style>
