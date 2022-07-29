<template>
  <zj-content-container>
    <zj-content-tip class="zj-m-b-30" style="display: block;width: 100%" text="请确认已收到供应商还款金额。保理公司审核通过后，系统将自动设置该笔融资全部还清。"></zj-content-tip>
    <zj-top-header title="确认提前还款审核"></zj-top-header>
    <!--  业务申请信息  -->
    <biz-apply-info></biz-apply-info>
    <!--  具体业务信息  -->
    <bill-advance-payment-audit></bill-advance-payment-audit>
    <!--  操作记录  -->
    <operate-log></operate-log>
    <!--  审批意见  -->
    <audit-remark></audit-remark>
    <zj-content-footer>
      <span style="display: inline-block;margin-right: 10px">
        <el-checkbox v-model="agreeCheck">我已阅读并同意</el-checkbox>&nbsp;
        <el-link :underline="false" type="primary">《回购协议》</el-link>
      </span>
      <zj-button type="primary" @click="back">审核通过</zj-button>
      <zj-button @click="back">审核拒绝</zj-button>
      <zj-button @click="back">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>

<script>
/**
 * 提前还款审核页面
 */
import BizApplyInfo from '../../../../components/bizApplyInfo';
import OperateLog from '../../../../components/operateLog';
import AuditRemark from '../../../../components/auditRemark';
import BillAdvancePaymentAudit from '@modules/ebill/views/clearingManage/confirmPaymentManage/workflow/advancePaymentAudit';
export default {
  name: 'AdvancePaymentAudit',
  components: {
    BizApplyInfo,
    OperateLog,
    AuditRemark,
    BillAdvancePaymentAudit
  },
  data () {
    return {
      agreeCheck: false
    };
  },
  methods: {
    back () {}
  }
}
</script>
