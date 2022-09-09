<template>
  <zj-content-block>
      <!--贸易背景-->
      <zj-content-block>
        <zj-header title="凭证信息"/>
        <zj-content>
        <zj-table ref="searchTable" class="zj-search-table" :dataList="dataForm.billInfo" :pager="false"
        >
          <zj-table-column field="ebillCode" title="凭证编号" />
          <zj-table-column field="writerName" title="凭证签发人" />
          <zj-table-column field="holderName" title="原始持有人" />
          <zj-table-column field="holderDate" title="签发日期" :formatter="date"/>
          <zj-table-column field="ebillAmt" title="凭证金额" :formatter="money"/>
          <zj-table-column field="availableAmt" title="剩余可用金额" :formatter="money"/>
          <zj-table-column field="expireDate" title="到期日期" :formatter="date"/>
          <zj-table-column field="state" title="凭证状态" :formatter="obj=>typeMap(dictionary.state,obj.cellValue)"/>
        </zj-table>
        </zj-content>
      </zj-content-block>
      <zj-content-block>
        <zj-header :title="`对账单信息-${dataForm.billInfo?dataForm.billInfo[0].ebillCode:''}`"/>
        <zj-content>
        <zj-table ref="searchTable" :dataList="dataForm.accountBillInner" :pager="false"
        >
          <zj-table-column field="acctBillCode" title="对账单编号"/>
          <zj-table-column field="companyName" title="买方名称"/>
          <zj-table-column field="supplierCode" title="供应商编码"/>
          <zj-table-column field="supplierName" title="供应商名称"/>
          <zj-table-column field="isApplyVoucher" title="是否申请开立债权凭证" :formatter="date"/>
          <zj-table-column field="checkBillDate" title="对账日期" :formatter="date"/>
          <zj-table-column field="inputDate" title="入库日期/放行日期" :formatter="date"/>
          <zj-table-column field="estimatedPaymentDate" title="预计付款日期" :formatter="date"/>
          <zj-table-column field="checkBillAmt" title="对账单金额" :formatter="money"/>
          <zj-table-column field="billSource" title="对账单来源" />
        </zj-table>
        </zj-content>
      </zj-content-block>
      <zj-content-block>
        <zj-header :title="`对账单明细-${dataForm.accountBillInner?dataForm.accountBillInner[0].acctBillCode:''}`"/>
        <zj-content>
        <zj-table ref="searchTable" :dataList="dataForm.accountBillDetailInner">
          <zj-table-column field="poNo" title="po单号"/>
          <zj-table-column field="dnNo" title="dn单号"/>
          <zj-table-column field="matterCode" title="物料编码"/>
          <zj-table-column field="matterName" title="物料名称"/>
          <zj-table-column field="unit" title="单位"/>
          <zj-table-column field="inputDate" title="入库日期" :formatter="date"/>
          <zj-table-column field="storeHouse" title="仓库"/>
          <zj-table-column field="inputNumber" title="入库数量"/>
          <zj-table-column field="returnDate" title="退货数量"/>
          <zj-table-column field="level" title="等级"/>
          <zj-table-column field="orderPrice" title="订单单价" :formatter="money"/>
          <zj-table-column field="convertPrice" title="折价" :formatter="money"/>
          <zj-table-column field="settleAccountPrice" title="结算单价" :formatter="money"/>
          <zj-table-column field="taxRate" title="税率%" :formatter="rate"/>
          <zj-table-column field="netAmount" title="净额" :formatter="money"/>
          <zj-table-column field="taxAmount" title="税额" :formatter="money"/>
          <zj-table-column field="totalAmount" title="总计金额" :formatter="money"/>
        </zj-table>
        </zj-content>
      </zj-content-block>
      <zj-content-block>
        <zj-header :title="`贸易背景资料-${dataForm.accountBillInner?dataForm.accountBillInner[0].acctBillCode:''}`"/>
        <zj-content>
        <el-tabs v-model="tabs" class="zj-tabs-card">
          <el-tab-pane label="贸易合同信息" name="tradeContract" >
            <trade-contract :zjControl="zjControl" :form="dataForm.contractList"/>
          </el-tab-pane>
          <el-tab-pane label="发票信息" name="invoice" >
            <invoice :invoiceList="dataForm.invoices"/>
          </el-tab-pane>
          <el-tab-pane label="其他附件" name="attaList" >
            <attaList :attaList="dataForm.otherAttachs"/>
          </el-tab-pane>
        </el-tabs>
        </zj-content>
      </zj-content-block>
  </zj-content-block>
</template>

<script>
import tradeContract from '../../../queryStatistics/financingTransactionQuery/tradeBackgroundInfo/tradeContract'
import invoice from '../../../queryStatistics/financingTransactionQuery/tradeBackgroundInfo/invoice'
import attaList from '../../../queryStatistics/financingTransactionQuery/tradeBackgroundInfo/attaList'
export default {
  name: 'billDetail',
  props: {
    dataForm: Object,
    zjControl: Object,
    dictionary: Object,
  },
  components: {
    tradeContract,
    invoice,
    attaList,
  },
  data() {
    return {
      tabs: 'tradeContract',
    };
  },
  methods: {

  },
  created() {
  },

};
</script>

<style scoped lang="less">
.detail-table {
  border-collapse: collapse;
  text-align: center;
  th,td {
    border: 1px solid #DCDFE6;
    padding: 10px;
  }
}
</style>
