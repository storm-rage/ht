<template>
  <zj-content-container>
    <zj-top-header title="供应商业务申请交易详情"></zj-top-header>
    <!--  业务申请信息  -->
    <biz-apply-info></biz-apply-info>
    <!--  具体业务信息  -->
    <business-first-audit-detail biz-id="1" :detail-api="zjControl.getFirstAuditDetail"></business-first-audit-detail>
    <!--  操作记录  -->
    <operate-log></operate-log>
    <zj-content-footer>
      <zj-button @click="goParent">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>
<script>
import BizApplyInfo from '../../../components/bizApplyInfo';
import OperateLog from '../../../components/operateLog';
import BusinessFirstAuditDetail from '@modules/ebill/views/productManage/businessManage/workflow/businessDetail.vue';
/**
 * 初审详情
 */
export default {
  components: {
    BizApplyInfo,
    OperateLog,
    BusinessFirstAuditDetail
  },
  data () {
    return {
      zjControl: {
        getFirstAuditDetail: this.$api.businessManageWorkflow.getFirstAuditDetail
      },
    }
  },
  created() {
    this.getApi();
    this.getRow();
  }
};
</script>
