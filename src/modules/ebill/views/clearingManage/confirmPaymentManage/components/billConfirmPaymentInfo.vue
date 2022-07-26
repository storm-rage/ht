<template>
  <div>
   <!-- 基础信息   -->
    <base-payment-info is-bill
                       :bill-info="detailInfo"
                       :bank-capital-flow="detailInfo.bankCapitalFlow"></base-payment-info>
    <zj-content-block>
      <zj-header title="待确认收款凭证"></zj-header>
      <zj-content>
        <zj-table ref="billTable"
                  :pager="false"
                  :dataList="detailInfo.accountPayableList" >
          <zj-table-column field="ebillCode" title="凭证编号"/>
          <zj-table-column field="payEntName" title="签发人"/>
          <zj-table-column
            field="receiptEntName"
            title="原始持有人"
          />
          <zj-table-column
            field="payableIssuanceDate"
            title="签发日期"
            :formatter="date"
          />
          <zj-table-column field="payableAmt" title="凭证金额" :formatter="money"/>
          <zj-table-column field="payableExpireDate" title="凭证到期日" :formatter="date"/>
          <zj-table-column field="remark" title="备注"/>
          <zj-table-column field="capitalSerialno" title="业务系统单号"/>
          <zj-table-column field="billConfirmAmt" title="确认凭证金额" :formatter="money"/>
          <zj-table-column field="actualExpireDate" title="凭证实际到期日"/>
        </zj-table>
      </zj-content>
    </zj-content-block>
  </div>
</template>
<script>
/**
 * 凭证收款信息
 */
import BasePaymentInfo from './basePaymentInfo';
export default {
  props: {
    detailInfo: {
      type: Object,
      required: true
    }
  },
  components: {
    BasePaymentInfo
  },
  data () {
    return {
      billList: []
    }
  }
};
</script>
