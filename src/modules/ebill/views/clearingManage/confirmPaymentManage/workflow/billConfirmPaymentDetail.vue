<template>
  <div>
    <!-- 凭证确认收款信息   -->
    <bill-confirm-payment-info :detail-info="bizDetailInfo"></bill-confirm-payment-info>
    <!-- 附件信息   -->
    <payment-file :is-edit="false" :attach-list="bizDetailInfo.attachModelList"></payment-file>
  </div>
</template>

<script>
import BillConfirmPaymentInfo from '../components/billConfirmPaymentInfo';
import PaymentFile from '../../components/clearingFileInfo';
export default {
  name: 'BillConfirmPaymentDetail',
  props: {
    bizDetailInfo: {
      type: Object,
      required: true
    }
  },
  components: {
    BillConfirmPaymentInfo,
    PaymentFile
  }
}
</script>
