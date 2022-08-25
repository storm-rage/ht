<template>
  <zj-content-container>
    <zj-top-header title="供应商业务申请审核"></zj-top-header>
    <div ref="imageWrapper">
      <!--  业务信息  -->
      <business-review-detail :biz-id="row.businessKey"></business-review-detail>
    </div>
    <zj-ht-approval v-if="false"></zj-ht-approval>
  </zj-content-container>
</template>
<script>
/**
 * 亚米流程引擎页面
 */
import businessReviewDetail from '@modules/ebill/views/productManage/businessManage/workflow/biz/review/detail.vue';
export default {
  components: {
    businessReviewDetail
  },

  created() {
    this.getRow();
  }
};
</script>
