<template>
  <zj-content-container>
    <zj-top-header title="凭证尾款清算复核"></zj-top-header>
    <!--  业务申请信息  -->
    <biz-apply-info :biz-info="tranInfo"></biz-apply-info>
    <!--  具体业务信息  -->
    <bill-balance-clearing-info :biz-info="bizInfo"></bill-balance-clearing-info>
    <!--  操作记录  -->
    <operate-log :log-list="operateRecordList"></operate-log>
    <!--  审批意见  -->
    <audit-remark ref="auditRemark"></audit-remark>
    <zj-content-footer>
      <zj-button type="primary"
                 :disabled="rejectLoading"
                 :loading="passLoading"
                 :api="zjBtn.clearReview" @click="toReviewPass">复核通过</zj-button>
      <zj-button type="primary"
                 :disabled="passLoading"
                 :loading="rejectLoading"
                 :api="zjBtn.clearReview"  @click="toReviewBack">驳回上一级</zj-button>
      <zj-button  @click="goParent">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>

<script>
/**
 * 凭证尾款清算复核页面
 */
import BizApplyInfo from '../../../../components/bizApplyInfo';
import OperateLog from '../../../../components/operateLog';
import AuditRemark from '../../../../components/auditRemark';
import billBalanceClearingInfo from '@modules/ebill/views/clearingManage/expireClearingManage/workflow/billBalanceClearingInfo.vue';
import auditDetailMixin from "../../mixins/auditDetailMixin";
export default {
  mixins: [auditDetailMixin],
  components: {
    BizApplyInfo,
    OperateLog,
    AuditRemark,
    billBalanceClearingInfo
  }
}
</script>
