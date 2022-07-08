<template>
  <zj-content-container>
    <zj-top-header title="非凭证确认收款申请"></zj-top-header>
    <!-- 非凭证确认收款信息   -->
    <other-confirm-payment-info is-edit></other-confirm-payment-info>
    <!-- 附件信息   -->
    <payment-file is-edit></payment-file>
    <zj-content-footer>
      <zj-button type="primary" @click="back">提交申请</zj-button>
      <zj-button  @click="back">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>
<script>
import OtherConfirmPaymentInfo from '../components/otherConfirmPaymentInfo';
import PaymentFile from '../components/paymentFile';
export default {
  components: {
    OtherConfirmPaymentInfo,
    PaymentFile
  },
  data () {
    return {};
  },
  methods: {
    back () {}
  }
};
</script>
