<template>
  <zj-content-container>
    <zj-top-header title="供应商业务维护审核"></zj-top-header>
    <div ref="imageWrapper">
      <!--  业务信息  -->
      <trade-change-review-audit :is-edit="false" :biz-id="bizId"></trade-change-review-audit>
    </div>
    <zj-ht-approval v-if="processInstanceId" :processInstanceId="processInstanceId" :snapshotConfigs="[{type: 'ref',value: 'imageWrapper'}]"></zj-ht-approval>
  </zj-content-container>
</template>
<script>
/**
 * 亚米流程引擎页面
 */
import TradeChangeReviewAudit from '@modules/ebill/views/productManage/businessManage/workflow/tradeChange/review/audit.vue';
import YamiWorkflowMixin from '../../mixins/yamiWorkflowMixin';
export default {
  mixins: [YamiWorkflowMixin],
  components: {
    TradeChangeReviewAudit
  },
  data() {
    return {
      bizId: '',
      bizType: ''
    }
  },
  created() {
    this.bizId = this.$route.query.bizId;
    this.bizType = this.$route.query.bizType;
    this.getProcessInstance();
  }
};
</script>
