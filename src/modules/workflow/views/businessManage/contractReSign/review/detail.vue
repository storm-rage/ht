<template>
  <zj-content-container>
    <zj-top-header title="续签合同申请复核"></zj-top-header>
    <!--  业务申请信息  -->
    <biz-apply-info :biz-info="applyModel"></biz-apply-info>
    <!--  具体业务信息  -->
    <contract-re-sign-review-audit :biz-id="row.bizId"></contract-re-sign-review-audit>
    <!--  操作记录  -->
    <operate-log :log-list="operateLogList"></operate-log>
    <zj-content-footer>
      <zj-button @click="goParent">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>
<script>
import BizApplyInfo from '../../../components/bizApplyInfo';
import OperateLog from '../../../components/operateLog';
import contractReSignReviewAudit from '@modules/ebill/views/productManage/businessManage/workflow/contractReSign/review/audit.vue';
import workflowMixin from '@modules/workflow/views/businessManage/mixins/workflowMixin';
/**
 * 续签合同申请复核详情页面
 */
export default {
  mixins: [workflowMixin],
  components: {
    BizApplyInfo,
    OperateLog,
    contractReSignReviewAudit
  },
  data () {
    return {
    }
  },
  created() {
    // this.getApi();
    this.getRow();
  }
};
</script>
