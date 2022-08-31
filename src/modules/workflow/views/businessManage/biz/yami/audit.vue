<template>
  <zj-content-container>
    <zj-top-header title="供应商业务申请审核"></zj-top-header>
    <div ref="imageWrapper">
      <!--  业务信息  -->
      <business-review-detail :biz-id="bizId"></business-review-detail>
    </div>
    <zj-ht-approval v-if="processInstanceId" :processInstanceId="processInstanceId" :snapshotConfigs="[{type: 'ref',value: 'imageWrapper'}]"></zj-ht-approval>
  </zj-content-container>
</template>
<script>
/**
 * 亚米流程引擎页面
 */
import businessReviewDetail from '@modules/ebill/views/productManage/businessManage/workflow/biz/review/detail.vue';
import YamiWorkflowMixin from '../../mixins/yamiWorkflowMixin';
export default {
  mixins: [YamiWorkflowMixin],
  components: {
    businessReviewDetail
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
