<template>
  <div ref="clearingListRef">
    <zj-list-layout>
      <template slot="leftBtns">
        <vxe-button
          class="export"
          icon="el-icon-download"
          @click="toExport"
          :api="zjBtn.exportAccountBill"
          >导出</vxe-button
        >
      </template>
      <template slot="searchForm">
        <el-form ref="searchForm" :model="searchForm">
          <el-form-item label="当前持有人：">
            <el-input
              v-model="searchForm.holderNameLike"
              @keyup.enter.native="enterSearch"
            />
          </el-form-item>
          <el-form-item label="签发人：">
            <el-input
              v-model="searchForm.payEntName"
              @keyup.enter.native="enterSearch"
            />
          </el-form-item>
          <el-form-item label="原始凭证编号：">
            <el-input
              v-model="searchForm.rootCode"
              @keyup.enter.native="enterSearch"
            />
          </el-form-item>
          <el-form-item label="凭证实际到期日：" class="col-right">
            <zj-date-range-picker
              :startDate.sync="searchForm.actualExpireDateBegin"
              :endDate.sync="searchForm.actualExpireDateEnd"
            />
          </el-form-item>
          <el-form-item label="收款单号：">
            <el-input
              v-model="searchForm.repaymentOrderNo"
              @keyup.enter.native="enterSearch"
            />
          </el-form-item>
          <el-form-item label="凭证编号：">
            <el-input
              v-model="searchForm.ebillCode"
              @keyup.enter.native="enterSearch"
            />
          </el-form-item>
        </el-form>
      </template>
      <!--    table-->
      <zj-table
        ref="searchTable"
        :params="searchForm"
        :api="zjControl.queryBillClearPage"
        @checkbox-change="tableCheckChange"
        @checkbox-all="tableCheckChange"
      >
        <zj-table-column
          type="checkbox"
          width="40px"
          fixed="left"
        ></zj-table-column>
        <zj-table-column title="原始凭证编号">
          <template v-slot="{ row }">
            <el-link
              @click="toViewDetail(row)"
              type="primary"
              :underline="false"
              >{{ row.rootCode }}</el-link
            >
          </template>
        </zj-table-column>
        <zj-table-column field="repaymentOrderNo" title="收款单号" />
        <zj-table-column field="capitalSerialno" title="资金流水号" />
        <zj-table-column field="ebillCode" title="凭证编号">
          <template v-slot="{ row }">
            <el-link
              @click="toViewDetail(row)"
              type="primary"
              :underline="false"
              >{{ row.ebillCode }}</el-link
            >
          </template>
        </zj-table-column>
        <zj-table-column field="payEntName" title="签发人" />
        <zj-table-column field="openDate" title="签发日期" :formatter="date" />
        <zj-table-column field="ebillAmt" title="凭证金额" :formatter="money" />
        <zj-table-column
          field="expireDate"
          title="到期日期"
          :formatter="date"
        />
        <zj-table-column
          field="actualExpireDate"
          title="凭证实际到期日"
          :formatter="date"
        />
        <zj-table-column field="receiptEntName" title="原始持有人" />
        <zj-table-column field="holderName" title="当前持有人" />
        <zj-table-column
          field="payAmt"
          title="最终付款金额"
          :formatter="money"
        />
        <zj-table-column field="bankAccname" title="收款账户户名" />
        <zj-table-column field="bankAccno" title="收款账号" />
        <zj-table-column field="bankName" title="收款账户开户行" />
        <zj-table-column field="bankNo" title="银行联行号" />
        <zj-table-column title="操作" fixed="right">
          <template v-slot="{ row }">
            <zj-button
              type="text"
              @click="singleClearingApply(row)"
              :api="zjBtn.getEnterprise"
              >清算申请</zj-button
            >
          </template>
        </zj-table-column>
        <div slot="pager-left" style="position: absolute; left: 10px; top: 0">
          <span>实际付款金额汇总：</span>{{ money("100000000") }}
        </div>
      </zj-table>
    </zj-list-layout>
    <zj-content-footer
      v-if="showBottomBtn"
      style="position: fixed"
      :style="{ left: bottomBtnLeft + 'px' }"
    >
      <zj-button
        type="primary"
        @click="batchClearingApply"
        :api="zjBtn.passBillSignBatch"
        >清算申请</zj-button
      >
    </zj-content-footer>
  </div>
</template>

<script>
import footerBtnMixin from "../mixins/footerBtnMixin";
export default {
  mixins: [footerBtnMixin],
  data() {
    return {
      showBottomBtn: false,
      zjControl: {
        getBillClearDictionary:
          this.$api.expireClearingManage.getBillClearDictionary,
        queryBillClearPage: this.$api.expireClearingManage.queryBillClearPage,
        exportAccountBill: this.$api.expireClearingManage.exportAccountBill,
      },
      searchForm: {
        clearType: "00",
      },
      dictionary: {},
    };
  },
  created() {
    this.getApi();
    this.getDirectory();
  },
  methods: {
    // 获取字典
    getDirectory() {
      this.zjControl.getBillClearDictionary().then((res) => {
        this.dictionary = res.data;
      });
    },
    tableCheckChange({ records }) {
      this.showBottomBtn = records.length > 0;
    },
    toViewDetail(row) {},
    /**
     * 批量清算申请
     */
    batchClearingApply() {
      const records = this.$refs.searchTable.getCheckboxRecords();
      if (!records.length) {
        return this.$messageBox({
          type: "warning",
          content: "请选择申请数据！",
          title: "提示",
          showConfirmButton: true,
          center: true,
        });
      }
      this.$router.push({ name: "billClearingApply" });
    },
    /**
     * 单笔清算申请
     * @param row
     */
    singleClearingApply(row) {
      this.$router.push({ name: "billClearingApply" });
    },
    toExport() {
      this.zjControl.exportAccountBill(this.searchForm);
    },
  },
};
</script>
