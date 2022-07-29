<template>
  <zj-content-container>
    <zj-top-header title="供应商业务申请交易详情"></zj-top-header>
    <!--  业务申请信息  -->
    <biz-apply-info></biz-apply-info>
    <!--  具体业务信息  -->
    <business-review-detail biz-id="1"></business-review-detail>
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
import businessReviewDetail from '@modules/ebill/views/productManage/businessManage/workflow/biz/review/detail.vue';

/**
 * 业务申请复核详情页面
 */
export default {
  components: {
    BizApplyInfo,
    OperateLog,
    businessReviewDetail
  },
  data () {
    return {
    }
  },
  created() {
    this.getRow();
  }
};
</script>
