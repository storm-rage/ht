<template>
  <zj-content-container>
    <zj-top-header title="融资风控审核"></zj-top-header>
    <div ref="imageWrapper">
      <!--  业务信息  -->
      <finance-risk-audit :is-edit="false" :biz-id="bizId" :titleHandle="titleHandle"/>

    </div>
    <zj-ht-approval v-if="processInstanceId" :processInstanceId="processInstanceId" :snapshotConfigs="[{type: 'ref',value: 'imageWrapper'}]"/>
  </zj-content-container>
</template>
<script>
/**
 * 亚米流程引擎页面
 */
import FinanceRiskAudit from '@modules/workflow/views/financingReviewManage/toDo/toDoReview.vue';
import YamiWorkflowMixin from '@modules/workflow/views/businessManage/mixins/yamiWorkflowMixin.js';
export default {
  mixins: [YamiWorkflowMixin],
  components: {
    FinanceRiskAudit,
  },
  data() {
    return {
      bizId: '',
      bizType: '',
      titleHandle: false,
    }
  },
  created() {
    this.bizId = this.$route.query.bizId;
    this.bizType = this.$route.query.bizType;
    this.getProcessInstance();
  }
};
</script>
