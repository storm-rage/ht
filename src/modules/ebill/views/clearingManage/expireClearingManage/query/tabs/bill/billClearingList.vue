<template>
  <div ref="clearingListRef">
    <zj-list-layout>
      <template slot="leftBtns">
        <vxe-button
          class="export"
          icon="el-icon-download"
          @click="toExport"
          v-if="zjBtn.exportAccountBill"
          >导出</vxe-button
        >
      </template>
      <template slot="searchForm">
        <el-form ref="searchForm" :model="searchForm">
          <el-form-item label="当前持有人：">
            <el-input
              v-model.trim="searchForm.holderNameLike"
              @keyup.enter.native="enterSearch"
            />
          </el-form-item>
          <el-form-item label="签发人：">
            <el-input
              v-model.trim="searchForm.payEntNameLike"
              @keyup.enter.native="enterSearch"
            />
          </el-form-item>
          <el-form-item label="原始凭证编号：">
            <el-input
              v-model.trim="searchForm.rootCode"
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
              v-model.trim="searchForm.repaymentOrderNo"
              @keyup.enter.native="enterSearch"
            />
          </el-form-item>
          <el-form-item label="凭证编号：">
            <el-input
              v-model.trim="searchForm.ebillCode"
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
        @before-load="handleBeforeLoad"
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
              :api="zjBtn.submitClearApply"
              >清算申请</zj-button
            >
          </template>
        </zj-table-column>
        <div slot="pager-left" style="position: absolute; left: 10px; top: 0">
          <span>实际付款金额汇总：</span>{{ money(totalPayAmt) }}
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
        :api="zjBtn.submitClearApply"
        >清算申请</zj-button
      >
    </zj-content-footer>
  </div>
</template>

<script>
import footerBtnMixin from "../mixins/footerBtnMixin";
import BigNumber from 'bignumber.js';
export default {
  mixins: [footerBtnMixin],
  data() {
    return {
      showBottomBtn: false,
      zjControl: {
        queryBillClearPage: this.$api.expireClearingManage.queryBillClearPage,
        exportAccountBill: this.$api.expireClearingManage.exportAccountBill,
        submitClearApply: this.$api.expireClearingManage.submitClearApply
      },
      searchForm: {
        clearType: "00",
        actualExpireDateBegin: '',
        actualExpireDateEnd: '',
        holderNameLike: '',
        payEntNameLike: '',
        rootCode: '',
        repaymentOrderNo: '',
        ebillCode: ''
      },
      dictionary: {},
      // 实际付款金额汇总
      totalPayAmt: 0
    };
  },
  created() {
    this.getApi();
    // this.getDirectory();
  },
  methods: {
    // 获取字典
    getDirectory() {
      this.zjControl.getDictionary().then((res) => {
        this.dictionary = res.data;
      });
    },
    /**
     * 列表数据加载前回调
     * @param rows
     */
    handleBeforeLoad({rows}) {
      if (rows && rows.length) {
        this.totalPayAmt = rows.reduce((total, currentRow) => {
          return new BigNumber(total).plus(currentRow.payAmt).toFixed(2);
        }, 0);
      }
    },
    tableCheckChange({ records }) {
      this.showBottomBtn = records.length > 0;
    },
    /**
     * todo:跳转凭证详情
     * @param row
     */
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
      const clearId = records.map((item) => {
        return item.id;
      })
      if (records.length > 1) {
        const firstRecord = records[0];
        const valid1 = records.filter((item) => {
          return item.actualExpireDate===firstRecord.actualExpireDate;
        });
        const valid2 = records.filter((item) => {
          return item.payEntName===firstRecord.payEntName&&item.holderName===firstRecord.holderName;
        });
        if (valid1.length !== records.length) {
          this.$confirm('凭证实际到期日不一致，是否确认提交？','提示',{
            type: 'warning',
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(() => {
            this.goChild('billClearingApply',{clearId, clearType: this.searchForm.clearType})
          })
        }else if (valid2.length !== records.length) {
          this.$messageBox({
            type: 'warning',
            content: '所选的签发人+当前持有人必须一致',
            title: '提示',
            showConfirmButton: true,
            center: true
          })
          return;
        }else {
          this.goChild('billClearingApply',{clearId, clearType: this.searchForm.clearType})
        }
      }else {
        this.goChild('billClearingApply',{clearId, clearType: this.searchForm.clearType})
      }
    },
    /**
     * 单笔清算申请
     * @param row
     */
    singleClearingApply(row) {
      this.goChild('billClearingApply',{clearId: [row.id], clearType: this.searchForm.clearType})
    },
    toExport() {
      this.zjControl.exportAccountBill(this.searchForm);
    },
  },
};
</script>
