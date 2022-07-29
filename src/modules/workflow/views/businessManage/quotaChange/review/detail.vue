<template>
  <zj-content-container>
    <zj-top-header title="供应商业务申请交易详情"></zj-top-header>
    <!--  业务申请信息  -->
    <biz-apply-info :biz-info="applyModel"></biz-apply-info>
    <!--  具体业务信息  -->
    <business-detail :biz-id="row.id" :detail-api="zjControl.getDetail"></business-detail>
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
import businessDetail from '@modules/ebill/views/productManage/businessManage/workflow/businessDetail.vue';
import workflowMixin from '@modules/workflow/views/businessManage/mixins/workflowMixin';
/**
 * 额度管理复核详情页面
 */
export default {
  mixins: [workflowMixin],
  components: {
    BizApplyInfo,
    OperateLog,
    businessDetail
  },
  data () {
    return {
      zjControl: {
        getDetail: this.$api.businessManageWorkflow.getLimitRecheckDetail
      },
    }
  },
  created() {
    this.getApi();
    this.getRow();
  }
};
</script>
