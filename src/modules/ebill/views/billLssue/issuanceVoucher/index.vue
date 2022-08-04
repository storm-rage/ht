<template>
  <zj-content-container>
    <zj-money-block
      img-name="hold-img"
      text="已开出电子债权凭证金额"
      tipsText="统计的是所有已开出未作废的电子债权凭证金额合计"
    />
    <zj-list-layout>
      <template slot="searchForm">
        <el-form ref="searchForm" :model="searchForm">
          <el-form-item label="凭证编号：">
            <el-input v-model="searchForm.ebillCode" />
          </el-form-item>
          <el-form-item label="原始持有人：">
            <el-input v-model="searchForm.receiptEntNameLike" />
          </el-form-item>
          <el-form-item label="凭证状态：" class="col-center">
            <el-select
              v-model="searchForm.state"
              placeholder="请选择"
              clearable
              :popper-append-to-body="false"
            >
              <el-option value="" label="全部"></el-option>
              <el-option
                v-for="item in dictionary.stateList"
                :key="item.code"
                :label="item.desc"
                :value="item.code"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="签发日期：" class="col-right">
            <zj-date-range-picker
              :startDate.sync="searchForm.payableIssuanceDateStart"
              :endDate.sync="searchForm.payableIssuanceDateEnd"
            />
          </el-form-item>
          <el-form-item label="签收日期：" class="col-right">
            <zj-date-range-picker
              :startDate.sync="searchForm.payableIssuanceDateStart"
              :endDate.sync="searchForm.payableReceiptDateEnd"
            />
          </el-form-item>
          <el-form-item label="凭证到期日：" class="col-right">
            <zj-date-range-picker
              :startDate.sync="searchForm.payableExpireDateStart"
              :endDate.sync="searchForm.payableExpireDateEnd"
            />
          </el-form-item>
          <el-form-item label="凭证金额：" class="col-center">
            <zj-amount-range
              :startAmt.sync="searchForm.payableAmtStart"
              :endAmt.sync="searchForm.payableAmtEnd"
              @keyupEnterNative="enterSearch"
            />
          </el-form-item>
        </el-form>
      </template>
      <template slot="btnGroups">
        <vxe-button
          type="primary"
          icon="iconfont icon-daochu"
          class="zj-m-t-10"
          @click="exportData"
          :api="zjBtn.exportBill"
          >导出数据</vxe-button
        >
      </template>
      <zj-table
        ref="searchTable"
        :params="searchForm"
        :api="zjControl.tableApi"
      >
        <zj-table-column field="ebillCode" title="凭证编号">
          <template v-slot="{ row }">
            <span class="table-elbill-code" @click="goChild('billLssueMyBillDetail',row)">{{
              row.ebillCode
            }}</span>
          </template>
        </zj-table-column>
        <zj-table-column field="payEntName" title="签发人" />
        <zj-table-column field="receiptEntName" title="原始持有人" />
        <zj-table-column
          field="payableAmt"
          title="凭证金额"
          :formatter="money"
        />
        <zj-table-column
          field="payableIssuanceDate"
          title="签发日期"
          :formatter="date"
        />
        <zj-table-column
          field="payableReceiptDate"
          title="签收日期"
          :formatter="date"
        />
        <zj-table-column
          field="payableExpireDate"
          title="凭证到期日"
          :formatter="date"
        />
        <zj-table-column
          field="state"
          title="凭证状态"
          :formatter="
            (obj) => typeMap(dictionary.enterpriseStateList, obj.cellValue)
          "
        />
        <zj-table-column field="ebillAmt" title="对账单编号" />
        <zj-table-column title="操作" fixed="right">
          <template v-slot="{ row }">
            <zj-button
              type="text"
              @click="toCancellation(row.id)"
              :api="zjBtn.invalidApply"
              >作废申请</zj-button
            >
            <zj-button
              type="text"
              @click="toRevocation(row.id)"
              :api="zjBtn.cancelSubmit"
              >撤销</zj-button
            >
          </template>
        </zj-table-column>
      </zj-table>
    </zj-list-layout>
    <cancellation-dialog ref="cancellationDialog" />
    <revocation-dialog ref="revocationDialog" />
  </zj-content-container>
</template>
<script>
import cancellationDialog from "./dialog/cancellation";
import revocationDialog from "./dialog/revocation";
export default {
  components: {
    cancellationDialog,
    revocationDialog,
  },
  data() {
    return {
      zjControl: this.$api.myOpenBill,
      searchForm: {},
      dictionary: {},
      form: {},
    };
  },
  created() {
    this.getApi();
    this.getDirectory();
  },
  methods: {
    // 获取字典
    getDirectory() {
      this.zjControl.getDirectory().then((res) => {
        this.dictionary = res.data;
      });
    },
    exportData() {
      this.$api.exportBill(this.searchForm);
    },

    //作废弹框
    toCancellation(id) {
      this.$refs.cancellationDialog.open({ id }, true);
    },
    //撤销弹框
    toRevocation(id) {
      this.$refs.revocationDialog.open({ id }, true);
    }
  },
};
</script>
<style scoped>
.export {
  float: right;
}
</style>
