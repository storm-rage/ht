<template>
  <div>
    <!-- 非凭证确认收款信息   -->
    <other-confirm-payment-info ref="paymentInfo"
                                :detail-info="bizDetailInfo"
                                :isEdit="true"
                                :dictionary="dictionary"></other-confirm-payment-info>
    <!-- 附件信息   -->
    <payment-file ref="paymentFile" :is-edit="true" :bus-desc="bizDetailInfo.busDesc" :attach-list="bizDetailInfo.attachModelList"></payment-file>
  </div>
</template>

<script>
import OtherConfirmPaymentInfo from '../components/otherConfirmPaymentInfo';
import PaymentFile from '../../components/clearingFileInfo';

export default {
  name: 'OtherConfirmPaymentBackAudit',
  props: {
    bizDetailInfo: {
      type: Object,
      required: true
    },
    dictionary: {
      type: Object,
      required: true
    }
  },
  components: {
    OtherConfirmPaymentInfo,
    PaymentFile
  },
  methods: {
    getForm() {
      return this.$refs.paymentInfo.getForm();
    },
    getData() {
      return {form: this.$refs.paymentInfo.getData(),fileData:this.$refs.paymentFile.getData()}
    },
  }
}
</script>
