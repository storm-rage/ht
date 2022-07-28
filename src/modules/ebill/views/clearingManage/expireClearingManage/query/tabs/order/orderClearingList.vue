<template>
  <div ref="clearingListRef">
    <zj-list-layout>
      <template slot="leftBtns">
        <vxe-button class="export" icon="el-icon-download" @click="toExport">导出</vxe-button>
      </template>
      <template slot="searchForm">
        <el-form ref="searchForm" :model="searchForm">
          <el-form-item label="供应商名称：">
            <el-input v-model="searchForm.holderName" @keyup.enter.native="enterSearch"/>
          </el-form-item>
          <el-form-item label="核心企业名称：">
            <el-input v-model="searchForm.payEntCode" @keyup.enter.native="enterSearch"/>
          </el-form-item>
          <el-form-item label="收款金额：">
            <zj-amount-range :startAmt.sync="searchForm.confirmRepaymentAmtBegin" :endAmt.sync="searchForm.confirmRepaymentAmtEnd"></zj-amount-range>
          </el-form-item>
          <el-form-item label="收款日期：" class="col-right">
            <zj-date-range-picker
              :startDate.sync="searchForm.confirmRepaymentDateBegin"
              :endDate.sync="searchForm.confirmRepaymentDateEnd"
            />
          </el-form-item>
          <el-form-item label="收款单号：">
            <el-input v-model="searchForm.repaymentOrderNo" @keyup.enter.native="enterSearch"/>
          </el-form-item>
        </el-form>
      </template>
      <!--    table-->
      <zj-table ref="searchTable"
                :params="searchForm"
                :api="zjControl.tableApi"
                @checkbox-change="tableCheckChange"
                @checkbox-all="tableCheckChange">
        <zj-table-column type="checkbox" width="40px" fixed="left"></zj-table-column>
        <zj-table-column field="payEntCode" title="核心企业代码"></zj-table-column>
        <zj-table-column field="payEntName" title="核心企业名称" />
        <zj-table-column field="holderCode" title="供应商编码"/>
        <zj-table-column field="holderName" title="供应商名称"></zj-table-column>
        <zj-table-column field="capitalSerialno" title="资金流水号"/>
        <zj-table-column field="repaymentOrderNo" title="收款单号"/>
        <zj-table-column field="confirmRepaymentDate" title="确认收款日期" :formatter="date"/>
        <zj-table-column field="confirmRepaymentAmt" title="确认收款金额" :formatter="money"/>
        <zj-table-column field="actualPaymentAmt" title="实际付款金额" :formatter="money"/>
        <zj-table-column field="bankAccname" title="收款账户户名"/>
        <zj-table-column field="bankAccno" title="收款账号"/>
        <zj-table-column field="bankName" title="收款账户开户行"/>
        <zj-table-column field="bankNo" title="银行联行号"/>
        <zj-table-column title="操作" fixed="right">
          <template v-slot="{row}">
            <zj-button type="text" @click="singleClearingApply(row)" :api="zjBtn.getEnterprise">清算申请</zj-button>
          </template>
        </zj-table-column>
        <div slot="pager-left" style="position: absolute;left: 10px;top: 0">
          <span>实际付款金额汇总：</span>{{money('100000000')}}
        </div>
      </zj-table>
    </zj-list-layout>
    <zj-content-footer v-if="showBottomBtn"  style="position: fixed" :style="{'left': bottomBtnLeft+'px'}">
      <zj-button type="primary" @click="batchClearingApply" :api="zjBtn.passBillSignBatch">清算申请</zj-button>
    </zj-content-footer>
  </div>
</template>

<script>
import footerBtnMixin from '../mixins/footerBtnMixin';
export default {
  mixins: [footerBtnMixin],
  data () {
    return {
      showBottomBtn: false,
      zjControl: {},
      searchForm: {}
    }
  },
  methods: {
    tableCheckChange ({records}) {
      this.showBottomBtn = records.length > 0;
    },
    toViewDetail (row) {
    },
    /**
     * 批量清算申请
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
      this.$router.push({name: 'orderClearingApply'})
    },
    /**
     * 单笔清算申请
     * @param row
     */
    singleClearingApply (row) {
      this.$router.push({name: 'orderClearingApply'})
    },
    toExport () {}
  }
}
</script>
