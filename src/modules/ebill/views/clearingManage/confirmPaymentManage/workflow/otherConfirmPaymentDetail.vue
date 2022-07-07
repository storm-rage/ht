<template>
  <div>
    <!-- 非凭证确认收款信息   -->
    <other-confirm-payment-info></other-confirm-payment-info>
    <!-- 附件信息   -->
    <payment-file :is-edit="false"></payment-file>
  </div>
</template>

<script>
import OtherConfirmPaymentInfo from '../components/otherConfirmPaymentInfo';
import PaymentFile from '../components/paymentFile';
export default {
  name: 'OtherConfirmPaymentDetail',
  components: {
    OtherConfirmPaymentInfo,
    PaymentFile
  },
}
</script>
