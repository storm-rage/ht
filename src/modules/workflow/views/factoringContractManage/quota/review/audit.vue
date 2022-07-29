<template>
  <zj-content-container>
    <zj-top-header title="额度变更审核"></zj-top-header>
    <!--  业务申请信息  -->
    <biz-apply-info></biz-apply-info>
    <!--  具体业务信息  -->
    <quota-audit></quota-audit>
    <!--  操作记录  -->
    <operate-log></operate-log>
    <!--  审批意见  -->
    <audit-remark></audit-remark>
    <zj-content-footer>
      <span style="display: inline-block;margin-right: 10px">
        <el-checkbox v-model="agreeCheck">我已阅读并同意</el-checkbox>&nbsp;
        <el-link :underline="false" type="primary">《额度调整申请书》</el-link>
      </span>
      <zj-button type="primary" @click="back">审核通过</zj-button>
      <zj-button type="primary" @click="back">拒绝/驳回</zj-button>
      <zj-button @click="back">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>
<script>
import BizApplyInfo from '../../../components/bizApplyInfo';
import OperateLog from '../../../components/operateLog';
import AuditRemark from '../../../components/auditRemark';
import QuotaAudit from '@modules/ebill/views/productManage/factoringContract/workflow/factoringQuotaChangeAudit.vue';
export default {
  components: {
    BizApplyInfo,
    AuditRemark,
    OperateLog,
    QuotaAudit
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
