<template>
  <div>
    <zj-list-layout :beforeSearchFuc="beforeSearch">
      <template slot="searchForm">
        <el-form ref="searchForm" :model="searchForm">
          <el-form-item label="资金流水号：">
            <el-input v-model.trim="searchForm.capitalSerialno" @keyup.enter.native="enterSearch"/>
          </el-form-item>
          <el-form-item label="收款日期：" class="col-right">
            <zj-date-range-picker
              :startDate.sync="searchForm.repayDateStart"
              :endDate.sync="searchForm.repayDateEnd"
            />
          </el-form-item>
          <el-form-item label="收款金额：">
            <zj-amount-range :startAmt.sync="searchForm.repayAmtStart"
                             :endAmt.sync="searchForm.repayAmtEnd"></zj-amount-range>
          </el-form-item>
          <el-form-item label="付款方名称：">
            <el-input v-model.trim="searchForm.payerEntNameLike" @keyup.enter.native="enterSearch"/>
          </el-form-item>
          <el-form-item label="业务系统单号：">
            <el-input v-model.trim="searchForm.outOrederNo" @keyup.enter.native="enterSearch"/>
          </el-form-item>
          <el-form-item label="供应商简称：">
            <el-input v-model.trim="searchForm.entShortNameLike" @keyup.enter.native="enterSearch"/>
          </el-form-item>
        </el-form>
      </template>
      <zj-table ref="searchTable"
                :params="searchForm"
                :api="zjControl.tableApi"
                @after-load="handleDataChange"
                @radio-change="handleRadioChange"
                :radio-config="{highlight: true}">
        <zj-table-column type="radio" width="40px" fixed="left"></zj-table-column>
        <zj-table-column field="capitalSerialno" title="资金流水号" />
        <zj-table-column field="payerEntName" title="付款方名称" />
        <zj-table-column field="repayAmt" title="收款金额" :formatter="money"/>
        <zj-table-column field="repayDate" title="收款时间" :formatter="formateRepayDate"/>
        <zj-table-column field="repayEntName" title="收款方名称"/>
        <zj-table-column field="repayAcctNo" title="收款账号"/>
        <zj-table-column field="outOrederNo" title="业务系统单号"/>
        <zj-table-column field="relationAmt" title="已关联金额" :formatter="money"/>
        <zj-table-column field="entShortName" title="供应商简称"/>
      </zj-table>
    </zj-list-layout>
    <zj-content-block v-if="currentSelectRow.id">
      <zj-header title="确认收款"></zj-header>
      <zj-content-tip style="display: block;width: 100%;">
        <div class="zj-m-l-20">
          <p>凭证收款：确认核心企业对开了凭证的对账单的付款，支持修改凭证金额和凭证到期日。</p>
          <p>非凭证收款：订单保理供应商确认收款，收款资金用于归还供应商融资或代理清算给供应商。</p>
        </div>
      </zj-content-tip>
      <zj-content>
        <zj-tabs v-model="activeComp">
          <el-tab-pane :label="item.label"
                       v-for="(item,index) in tabsList"
                       :key="`${index}b`"
                       :name="item.name" >
            <component :is="activeComp"
                       v-if="item.name === activeComp"
                       :actualExpireDate="currentSelectRow.repayDate"
                       :bizId="currentSelectRow.id"></component>
          </el-tab-pane>
        </zj-tabs>
      </zj-content>
    </zj-content-block>
  </div>
</template>
<script>
import BillPaymentList from './tabs/billPaymentList';
import OtherPaymentList from './tabs/otherPaymentList';
export default {
  components: {
    billPayment: BillPaymentList,
    otherPayment: OtherPaymentList
  },

  data() {
    return {
      zjControl: {
        tableApi: this.$api.confirmPaymentManage.queryCapitalFlowPage,
        queryBillPage: this.$api.confirmPaymentManage.queryBillPage,
        queryNoBillPage: this.$api.confirmPaymentManage.queryNoBillPage
      },
      searchForm:{
        capitalSerialno: '',
        repayDateStart: '',
        repayDateEnd: '',
        repayAmtStart: '',
        repayAmtEnd: '',
        payerEntNameLike:'',
        outOrederNo: '',
        entShortNameLike: '',
      },
      tabsList: [
        {
          label: '凭证收款',
          name: 'billPayment'
        },
        {
          label: '非凭证收款',
          name: 'otherPayment'
        }
      ],
      activeComp: 'billPayment',
      // 当前选中的行
      currentSelectRow: {}
    }
  },
  created() {
    this.getApi()
  },
  methods: {
    beforeSearch() {
      this.currentSelectRow = {};
    },
    /**
     * 列表查询响应回调
     * @param rows
     */
    handleDataChange(rows) {
      //默认勾选第一个
      if (rows&& rows.length) {
        this.$refs.searchTable.setRadioRow(rows[0])
        this.handleRadioChange({row: rows[0]})
      }
    },
    /**
     * 单选处理
     * @param row
     */
    handleRadioChange({ row }) {
      this.currentSelectRow = row;
    },
    toViewDetail() {
      this.$router.push({name: 'factoringContractDetail'});
    },
    formateRepayDate({cellValue}) {
      if (cellValue) {
        return this.$moment(cellValue,'YYYYMMDD').format('YYYY-MM-DD')
      }
     return '';
    }
  }
}
</script>
