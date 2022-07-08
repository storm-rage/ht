<template>
  <zj-content-container>
    <zj-top-header title="订单保理收款交易详情"></zj-top-header>
    <!--  业务申请信息  -->
    <biz-apply-info></biz-apply-info>
    <!--  具体业务信息  -->
    <other-confirm-payment-detaill></other-confirm-payment-detaill>
    <!--  操作记录  -->
    <operate-log></operate-log>
    <zj-content-footer>
      <zj-button  @click="back">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>

<script>
/**
 * 非凭证确认还款流水详情页面
 */
import BizApplyInfo from '../../components/bizApplyInfo';
import OperateLog from '../../components/operateLog';
import OtherConfirmPaymentDetail from '@modules/ebill/views/clearingManage/confirmPaymentManage/workflow/otherConfirmPaymentDetail.vue';
export default {
  name: 'OtherPaymentDetail',
  components: {
    BizApplyInfo,
    OperateLog,
    OtherConfirmPaymentDetail
  },
  data () {
    return {};
  },
  methods: {
    back () {}
  }
}
</script>
