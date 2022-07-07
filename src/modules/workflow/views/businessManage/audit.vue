<template>
  <zj-content-container>
    <zj-top-header title="供应商业务申请审核"></zj-top-header>
    <!--  业务申请信息  -->
    <biz-apply-info></biz-apply-info>
    <!--  具体业务信息  -->
    <business-audit></business-audit>
    <!--  操作记录  -->
    <operate-log></operate-log>
     <!--  审批意见  -->
    <audit-remark></audit-remark>
    <zj-content-footer>
      <zj-button type="primary" @click="back">审核通过</zj-button>
      <zj-button type="primary" @click="back">拒绝</zj-button>
      <zj-button @click="back">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>
<script>
import BizApplyInfo from '../components/bizApplyInfo';
import OperateLog from '../components/operateLog';
import AuditRemark from '../components/auditRemark';
import BusinessAudit from '@modules/ebill/views/productManage/businessManage/workflow/businessAudit.vue';

export default {
  components: {
    BizApplyInfo,
    OperateLog,
    AuditRemark,
    BusinessAudit
  },
  data () {
    return {}
  },
  methods: {
    back () {}
  }
};
</script>
