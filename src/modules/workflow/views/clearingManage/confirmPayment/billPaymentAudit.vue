<template>
  <zj-content-container>
    <zj-top-header title="凭证确认收款审核"></zj-top-header>
    <!--  业务申请信息  -->
    <biz-apply-info></biz-apply-info>
    <!--  具体业务信息  -->
    <bill-confirm-payment-audit></bill-confirm-payment-audit>
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
 * 凭证确认还款审核页面
 */
import BizApplyInfo from '../../components/bizApplyInfo';
import OperateLog from '../../components/operateLog';
import AuditRemark from '../../components/auditRemark';
import BillConfirmPaymentAudit from '@modules/ebill/views/clearingManage/confirmPaymentManage/workflow/billConfirmPaymentAudit.vue';
export default {
  name: 'BillPaymentAudit',
  components: {
    BizApplyInfo,
    OperateLog,
    AuditRemark,
    BillConfirmPaymentAudit
  },
  data () {
    return {}
  },
  methods: {
    back () {}
  }
}
</script>
