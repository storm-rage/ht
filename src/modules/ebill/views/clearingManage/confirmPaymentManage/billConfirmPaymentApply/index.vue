<template>
  <zj-content-container>
    <zj-top-header title="凭证确认收款申请"></zj-top-header>
    <!-- 凭证确认收款信息   -->
    <bill-confirm-payment-info></bill-confirm-payment-info>
    <!-- 附件信息   -->
    <payment-file is-edit></payment-file>
    <zj-content-footer>
      <zj-button type="primary" @click="back">提交申请</zj-button>
      <zj-button  @click="back">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>
<script>
import BillConfirmPaymentInfo from '../components/billConfirmPaymentInfo';
import PaymentFile from '../../components/clearingFileInfo';
export default {
  components: {
    BillConfirmPaymentInfo,
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
