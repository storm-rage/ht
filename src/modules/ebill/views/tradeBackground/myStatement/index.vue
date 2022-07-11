<template>
  <zj-content-container>
    <zj-list-layout>
      <template slot="searchForm">
        <el-form ref="searchForm" :model="searchForm">
          <el-form-item label="对账单编号：">
            <el-input
              v-model="searchForm.issueEntName"
              @keyup.enter.native="enterSearch"
            />
          </el-form-item>
          <el-form-item label="买方名称：" class="col-right">
            <zj-date-range-picker
              :startDate.sync="searchForm.expireDateStart"
              :endDate.sync="searchForm.expireDateEnd"
            />
          </el-form-item>

          <el-form-item label="对账单状态：" class="col-center">
             <el-select v-model="searchForm.a">
              <el-option value="全部" />
            </el-select>
          </el-form-item>

          <el-form-item label="对账单日期：">
            <zj-date-range-picker
              :startDate.sync="searchForm.expireDateStart"
              :endDate.sync="searchForm.expireDateEnd"
            />
          </el-form-item>

          <el-form-item label="是否申请开立债权凭证：">
           <el-select v-model="searchForm.a">
              <el-option value="是" />
              <el-option value="否" />
            </el-select>
          </el-form-item>
        </el-form>
      </template>
      <zj-table
        ref="searchTable"
        :params="searchForm"
        :api="zjControl.tableApi"
      >
        <zj-table-column type="checkbox" width="40px" fixed="left"></zj-table-column>
        <zj-table-column field="ebillCode" title="对账单编号">
          <template v-slot="{ row }">
            <span class="table-elbill-code" @click="toDetails(row)">{{
              row.ebillCode
            }}</span>
          </template>
        </zj-table-column>
        <zj-table-column field="issueEntName" title="买方名称" />
        <zj-table-column field="issueEntName" title="供应商名称" />
        <zj-table-column field="ebillAmt" title="对账日期" :formatter="date" />
        <zj-table-column
          field="transferAmt"
          title="入库日期/放行日期"
          :formatter="date"
        />
        <zj-table-column
          field="issueDate"
          title="对账单金额"
          :formatter="money"
        />
        <zj-table-column
          field="issueDate"
          title="是否申请开立债权凭证"
        />
        <zj-table-column
          field="state"
          title="对账单状态"
          :formatter="
            (obj) => typeMap(dictionary.enterpriseStateList, obj.cellValue)
          "
        />
        <zj-table-column title="操作" fixed="right">
          <template>
            <zj-button
              type="text"
              @click="openAlert"
              :api="zjBtn.getEnterprise"
              >申请开立凭证</zj-button
            >
          </template>
        </zj-table-column>
      </zj-table>

      <!-- 工作流 -->
      <zj-workflow v-model="workflow">
        <el-row slot="right">
          <zj-button @click="openAlert" :api="zjBtn.passBillSignBatch"
            >申请开立凭证</zj-button
          >
        </el-row>
      </zj-workflow>
    </zj-list-layout>
  </zj-content-container>
</template>
<script>
export default {
  data() {
    return {
      zjControl: {},
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
      contractType: "", // 合同签署类型
      applicationStatus: "", // 申请状态
      signingResults: "", // 签约结果
      workflow: "",
    };
  },
  created() {
    this.getApi();
  },
  methods: {
    toDetails(row) {
      console.log(row);
    },
    openAlert() {
      this.$confirm( '选择对账单是否申请开立债权凭证？','温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=> {
        
      })
    }
  },
};
</script>

<style lang="less" scoped>
/deep/#ZjWorkflow {
  .workflow-top {
    .el-row {
      padding: 5px 0 0;
      text-align: center;
    }
  }
  .workflow-bottom {
    .right {
      width: 100%;
      text-align: center;
    }
  }
}
</style>
