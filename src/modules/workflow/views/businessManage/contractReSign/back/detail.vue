<template>
  <zj-content-container>
    <zj-top-header title="供应商业务申请交易详情"></zj-top-header>
    <!--  业务申请信息  -->
    <biz-apply-info></biz-apply-info>
    <!--  具体业务信息  -->
    <business-detail biz-id="1" :detail-api="zjControl.getDetail"></business-detail>
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
import businessDetail from '@modules/ebill/views/productManage/businessManage/workflow/businessDetail.vue';

/**
 * 续签合同申请驳回维护详情页面
 */
export default {
  components: {
    BizApplyInfo,
    OperateLog,
    businessDetail
  },
  data () {
    return {
      zjControl: {
        getDetail: this.$api.businessManageWorkflow.getContractRenewalRebutDetail
      },
    }
  },
  created() {
    this.getApi();
    this.getRow();
  }
};
</script>
