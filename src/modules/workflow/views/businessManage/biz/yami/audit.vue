<template>
  <zj-content-container>
    <zj-top-header title="供应商业务申请审核"></zj-top-header>
    <div ref="imageWrapper">
      <!--  业务信息  -->
      <business-review-detail :biz-id="row.businessKey"></business-review-detail>
    </div>
    <zj-ht-approval></zj-ht-approval>
  </zj-content-container>
</template>
<script>
/**
 * 亚米流程引擎页面
 */
export default {
  components: {},

  created() {
    this.getRow();
  }
};
</script>
