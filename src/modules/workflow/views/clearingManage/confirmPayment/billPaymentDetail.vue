<template>
  <zj-content-container>
    <zj-top-header title="凭证收款交易详情"></zj-top-header>
    <!--  业务申请信息  -->
    <biz-apply-info></biz-apply-info>
    <!--  具体业务信息  -->
    <bill-confirm-payment-detail></bill-confirm-payment-detail>
    <!--  操作记录  -->
    <operate-log></operate-log>
    <zj-content-footer>
      <zj-button  @click="back">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>

<script>
/**
 * 凭证确认还款流水详情页面
 */
import BizApplyInfo from '../../components/bizApplyInfo';
import OperateLog from '../../components/operateLog';
import BillConfirmPaymentDetail from '@modules/ebill/views/clearingManage/confirmPaymentManage/workflow/billConfirmPaymentDetail.vue';
export default {
  name: 'BillPaymentDetail',
  components: {
    BizApplyInfo,
    OperateLog,
    BillConfirmPaymentDetail
  },
  data () {
    return {};
  },
  methods: {
    back () {}
  }
}
</script>
