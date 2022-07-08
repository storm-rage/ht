<template>
  <zj-content-container>
    <zj-top-header title="非凭证确认收款审核"></zj-top-header>
    <!--  业务申请信息  -->
    <biz-apply-info></biz-apply-info>
    <!--  具体业务信息  -->
    <other-confirm-payment-audit></other-confirm-payment-audit>
    <!--  操作记录  -->
    <operate-log></operate-log>
    <!--  审批意见  -->
    <audit-remark></audit-remark>
    <zj-content-footer>
      <zj-button type="primary" @click="back">审核通过</zj-button>
      <zj-button  @click="back">驳回</zj-button>
      <zj-button  @click="back">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>

<script>
/**
 * 非凭证确认还款审核页面
 */
import BizApplyInfo from '../../components/bizApplyInfo';
import OperateLog from '../../components/operateLog';
import AuditRemark from '../../components/auditRemark';
import OtherConfirmPaymentAudit from '@modules/ebill/views/clearingManage/confirmPaymentManage/workflow/otherConfirmPaymentAudit.vue';
export default {
  name: 'OtherPaymentAudit',
  components: {
    BizApplyInfo,
    OperateLog,
    AuditRemark,
    OtherConfirmPaymentAudit
  },
  data () {
    return {};
  },
  methods: {
    back () {}
  }
}
</script>
