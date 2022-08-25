<template>
  <div ref="clearingListRef">
    <zj-list-layout>
      <template slot="leftBtns">
        <vxe-button class="export" v-if="zjBtn.exportBalanceOrderBill" icon="el-icon-download" @click="toExport">导出</vxe-button>
      </template>
      <template slot="searchForm">
        <el-form ref="searchForm" :model="searchForm">
          <el-form-item label="供应商名称：">
            <el-input v-model.trim="searchForm.holderNameLike" @keyup.enter.native="enterSearch"/>
          </el-form-item>
          <el-form-item label="核心企业名称：">
            <el-input v-model.trim="searchForm.payEntNameLike" @keyup.enter.native="enterSearch"/>
          </el-form-item>
          <el-form-item label="尾款金额：">
            <zj-amount-range :startAmt.sync="searchForm.oddAmtBegin"
                             :endAmt.sync="searchForm.oddAmtEnd"></zj-amount-range>
          </el-form-item>
          <el-form-item label="还款日期：" class="col-right">
            <zj-date-range-picker
              :startDate.sync="searchForm.repayDateBegin"
              :endDate.sync="searchForm.repayDateEnd"
            />
          </el-form-item>
          <el-form-item label="收款单号：">
            <el-input v-model.trim="searchForm.repaymentOrderNo" @keyup.enter.native="enterSearch"/>
          </el-form-item>
        </el-form>
      </template>
      <!--    table-->
      <zj-table ref="searchTable"
                :params="searchForm"
                :api="zjControl.tableApi"
                @before-load="handleBeforeLoad"
                @checkbox-change="tableCheckChange"
                @checkbox-all="tableCheckChange">
        <zj-table-column type="checkbox" width="40px" fixed="left"></zj-table-column>
        <zj-table-column field="payEntCode" title="核心企业代码"></zj-table-column>
        <zj-table-column field="payEntName" title="核心企业名称" />
        <zj-table-column field="holderCode" title="供应商编码"/>
        <zj-table-column field="holderName" title="供应商名称"></zj-table-column>
        <zj-table-column field="repaymentOrderNo" title="收款单号"/>
        <zj-table-column field="ebillCode" title="凭证编号"/>
        <zj-table-column field="financingSerialno" title="融资流水号"/>
        <zj-table-column field="repayDate" title="还款日期" :formatter="date"/>
        <zj-table-column field="oddAmt" title="尾款金额" :formatter="money"/>
        <zj-table-column field="bankAccname" title="收款账户户名"/>
        <zj-table-column field="bankAccno" title="收款账号"/>
        <zj-table-column field="bankName" title="收款账户开户行"/>
        <zj-table-column field="bankNo" title="银行联行号"/>
        <zj-table-column title="操作" fixed="right">
          <template v-slot="{row}">
            <zj-button type="text" @click="singleClearingApply(row)" :api="zjBtn.submitClearApply">清算申请</zj-button>
          </template>
        </zj-table-column>
        <div slot="pager-left" style="position: absolute;left: 10px;top: 0">
          <span>尾款金额汇总：</span>{{money(totalOddAmt)}}
        </div>
      </zj-table>
    </zj-list-layout>
    <zj-content-footer  style="position: fixed" :style="{'left': bottomBtnLeft+'px'}">
      <zj-button type="primary" :disabled="!showBottomBtn" @click="batchClearingApply" :api="zjBtn.submitClearApply">清算申请</zj-button>
    </zj-content-footer>
  </div>
</template>

<script>
import footerBtnMixin from '../mixins/footerBtnMixin';
import BigNumber from "bignumber.js";
export default {
  mixins: [footerBtnMixin],
  data () {
    return {
      showBottomBtn: false,
      zjControl: {
        tableApi:this.$api.expireClearingManage.queryBalanceOrderClearPage,
        exportBalanceOrderBill:this.$api.expireClearingManage.exportBalanceOrderBill,
        submitClearApply: this.$api.expireClearingManage.submitClearApply,
      },
      searchForm: {
        clearType: '03',
        holderNameLike: '',
        payEntNameLike: '',
        oddAmtBegin: '',
        oddAmtEnd: '',
        repayDateBegin: '',
        repayDateEnd: '',
        repaymentOrderNo: ''
      },
      // 尾款金额汇总
      totalOddAmt: 0
    }
  },
  created() {
    this.getApi();
  },
  methods: {
    tableCheckChange ({records}) {
      this.showBottomBtn = records.length > 0;
    },
    /**
     * 列表数据加载前回调
     * @param rows
     */
    handleBeforeLoad({rows}) {
      if (rows && rows.length) {
        this.totalOddAmt = rows.reduce((total, currentRow) => {
          return new BigNumber(total).plus(currentRow.oddAmt||0).toFixed(2);
        }, 0);
      }
    },
    /**
     * todo:跳转凭证详情
     * @param row
     */
    toViewDetail(row) {},
    /**
     * 批量尾款清算申请
     */
    batchClearingApply () {
      const records = this.$refs.searchTable.getCheckboxRecords();
      if(!records.length){
        return this.$messageBox({
          type: 'warning',
          content: '请选择申请数据！',
          title: '提示',
          showConfirmButton: true,
          center: true
        });
      }
      const clearId = records.map((item) => {
        return item.id;
      })
      if (records.length > 1) {
        const firstRecord = records[0];
        const valid = records.filter((item) => {
          return item.holderName===firstRecord.holderName&&item.payEntName===firstRecord.payEntName;
        });
        if (valid.length !== records.length) {
          this.$messageBox({
            type: 'warning',
            content: '所选的供应商名称+核心企业名称必须一致',
            title: '提示',
            showConfirmButton: true,
            center: true
          })
          return;
        }
      }
      this.goChild('orderBalanceClearingApply',{clearId, clearType: this.searchForm.clearType})
    },
    /**
     * 单笔尾款清算申请
     * @param row
     */
    singleClearingApply (row) {
      this.goChild('orderBalanceClearingApply',{clearId: [row.id], clearType: this.searchForm.clearType})
    },
    /**
     * 导出
     */
    toExport () {
      this.zjControl.exportBalanceOrderBill(this.searchForm);
    }
  }
}
</script>
