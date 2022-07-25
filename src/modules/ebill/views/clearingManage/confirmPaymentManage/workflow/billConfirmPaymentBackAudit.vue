<template>
<div>
  <!-- 凭证确认收款信息   -->
  <bill-confirm-payment-info :detail-info="bizDetailInfo"></bill-confirm-payment-info>
  <!-- 附件信息   -->
  <payment-file ref="paymentFile" :is-edit="true" :attach-list="bizDetailInfo.attachModelList"></payment-file>
</div>
</template>

<script>
import BillConfirmPaymentInfo from '../components/billConfirmPaymentInfo';
import PaymentFile from '../../components/clearingFileInfo';
export default {
  name: 'BillConfirmPaymentBackAudit',
  props: {
    bizDetailInfo: {
      type: Object,
      required: true
    }
  },
  components: {
    BillConfirmPaymentInfo,
    PaymentFile
  },
  methods: {
    getData() {
      return this.$refs.paymentFile.getData();
    },
  }
}
</script>
