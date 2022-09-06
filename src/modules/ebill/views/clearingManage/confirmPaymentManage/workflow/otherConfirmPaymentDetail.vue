<template>
  <div>
    <!-- 非凭证确认收款信息   -->
    <other-confirm-payment-info :detail-info="bizDetailInfo"></other-confirm-payment-info>
    <!-- 附件信息   -->
    <payment-file :is-edit="false" :bus-desc="bizDetailInfo.busDesc" :attach-list="bizDetailInfo.attachModelList"></payment-file>
  </div>
</template>

<script>
import OtherConfirmPaymentInfo from '../components/otherConfirmPaymentInfo';
import PaymentFile from '../../components/clearingFileInfo';
export default {
  name: 'OtherConfirmPaymentDetail',
  props: {
    bizDetailInfo: {
      type: Object,
      required: true
    }
  },
  components: {
    OtherConfirmPaymentInfo,
    PaymentFile
  },
}
</script>
