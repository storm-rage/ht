<template>
  <div>
    <!-- 凭证确认收款信息   -->
    <bill-confirm-payment-info></bill-confirm-payment-info>
    <!-- 附件信息   -->
    <payment-file :is-edit="false"></payment-file>
  </div>
</template>

<script>
import BillConfirmPaymentInfo from '../components/billConfirmPaymentInfo';
import PaymentFile from '../../components/clearingFileInfo';
export default {
  name: 'BillConfirmPaymentDetail',
  components: {
    BillConfirmPaymentInfo,
    PaymentFile
  }
}
</script>
