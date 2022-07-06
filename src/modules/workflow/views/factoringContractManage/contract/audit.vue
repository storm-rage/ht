<template>
  <zj-content-container>
    <zj-top-header title="国内商业保理合同确认"></zj-top-header>
    <!--  业务申请信息  -->
    <biz-apply-info></biz-apply-info>
    <!--  具体业务信息  -->
    <contract-audit></contract-audit>
    <!--  审批意见  -->
    <audit-remark></audit-remark>
    <zj-content-footer>
      <zj-button type="primary" @click="back">确认</zj-button>
      <zj-button type="primary" @click="back">拒绝</zj-button>
      <zj-button  @click="back">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>
<script>
import BizApplyInfo from '../../components/bizApplyInfo';
import AuditRemark from '../../components/auditRemark';
import ContractAudit from '@modules/ebill/views/productManage/factoringContract/workflow/factoringContractAudit.vue';
export default {
  components: {
    BizApplyInfo,
    AuditRemark,
    ContractAudit
  },
  data () {
    return {};
  },
  methods: {
    back () {}
  }
}
</script>
