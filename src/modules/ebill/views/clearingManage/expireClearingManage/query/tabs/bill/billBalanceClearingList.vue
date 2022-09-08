<template>
  <div ref="clearingListRef">
    <zj-list-layout>
      <template slot="leftBtns">
        <vxe-button class="export" v-if="zjBtn.exportBalanceAccountBill" icon="el-icon-download" @click="toExport">导出</vxe-button>
      </template>
      <template slot="searchForm">
        <el-form ref="searchForm" :model="searchForm">
          <el-form-item :label="`原始${productName}编号：`">
            <el-input v-model.trim="searchForm.rootCode" @keyup.enter.native="enterSearch"/>
          </el-form-item>
          <el-form-item label="签发人：">
            <el-input v-model.trim="searchForm.payEntNameLike" @keyup.enter.native="enterSearch"/>
          </el-form-item>
          <el-form-item label="收款人：">
            <el-input v-model.trim="searchForm.repaymentEntNameLike" @keyup.enter.native="enterSearch"/>
          </el-form-item>
          <el-form-item :label="`${productName}编号：`">
            <el-input v-model.trim="searchForm.ebillCode" @keyup.enter.native="enterSearch"/>
          </el-form-item>
          <el-form-item label="凭证实际到期日：" class="col-right">
            <zj-date-range-picker
              :startDate.sync="searchForm.actualExpireDateBegin"
              :endDate.sync="searchForm.actualExpireDateEnd"
            />
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
        <zj-table-column :title="`原始${productName}编号`">
          <template v-slot="{ row }">
            <el-link @click="toViewDetail(row)" type="primary" :underline="false">{{row.rootCode}}</el-link>
          </template>
        </zj-table-column>
        <zj-table-column field="repaymentOrderNo" title="收款单号" />
        <zj-table-column field="capitalSerialno" title="资金流水号"/>
        <zj-table-column field="ebillCode" :title="`${productName}编号`">
          <template v-slot="{row}">
            <el-link @click="toViewDetail(row)" type="primary" :underline="false">{{row.ebillCode}}</el-link>
          </template>
        </zj-table-column>
        <zj-table-column field="payEntName" title="签发人"/>
        <zj-table-column field="openDate" title="签发日期" :formatter="date"/>
        <zj-table-column field="ebillAmt" :title="`${productName}金额`" :formatter="money"/>
        <zj-table-column field="paymentOrderNo" title="放款单号"/>
        <zj-table-column field="loanAmt" title="放款金额" :formatter="money"/>
        <zj-table-column field="oddAmt" title="尾款金额" :formatter="money"/>
        <zj-table-column field="expireDate" :title="`${productName}到期日期`" :formatter="date"/>
        <zj-table-column field="actualExpireDate" title="凭证实际到期" :formatter="date"/>
        <zj-table-column field="repaymentEntName" title="收款人"/>
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
  computed: {
    productName () {
      return this.$store.getters['user/productName']
    }
  },
  data () {
    return {
      showBottomBtn: false,
      zjControl: {
        tableApi: this.$api.expireClearingManage.queryBalanceBillClearPage,
        exportBalanceAccountBill: this.$api.expireClearingManage.exportBalanceAccountBill,
        submitClearApply: this.$api.expireClearingManage.submitClearApply,
      },
      searchForm: {
        clearType: '01',
        actualExpireDateBegin: '',
        actualExpireDateEnd: '',
        rootCode: '',
        ebillCode: '',
        payEntNameLike: '',
        repaymentEntNameLike: ''
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
     *
     * @param row
     */
    toViewDetail(row) {
      this.goChild('billLssueMyBillDetail',{
        ebillCode: row.ebillCode,
        parentRouteName: 'expireClear'
      })
    },
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
        const valid1 = records.filter((item) => {
          return item.actualExpireDate===firstRecord.actualExpireDate;
        });
        const valid2 = records.filter((item) => {
          return item.payEntName===firstRecord.payEntName&&item.repaymentEntName===firstRecord.repaymentEntName;
        });
        if (valid1.length !== records.length) {
          this.$confirm('凭证实际到期日不一致，是否确认提交？','提示',{
            type: 'warning',
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(() => {
            this.goChild('billBalanceClearingApply',{clearId, clearType: this.searchForm.clearType})
          })
        }else if (valid2.length !== records.length) {
          this.$messageBox({
            type: 'warning',
            content: '所选的签发人+收款人必须一致',
            title: '提示',
            showConfirmButton: true,
            center: true
          })
          return;
        }else {
          this.goChild('billBalanceClearingApply',{clearId, clearType: this.searchForm.clearType})
        }
      }else {
        this.goChild('billBalanceClearingApply',{clearId, clearType: this.searchForm.clearType})
      }
    },
    /**
     * 单笔尾款清算申请
     * @param row
     */
    singleClearingApply (row) {
      this.goChild('billBalanceClearingApply',{clearId: [row.id], clearType: this.searchForm.clearType})
    },
    /**
     * 导出
     */
    toExport () {
      this.zjControl.exportBalanceAccountBill(this.searchForm);
    }
  }
}
</script>
