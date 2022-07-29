<template>
  <zj-content-container>
    <zj-top-header title="提前还款清算交易详情"></zj-top-header>
    <!--  业务申请信息  -->
    <biz-apply-info :biz-info="tranInfo"></biz-apply-info>
    <!--  具体业务信息  -->
    <order-advance-clearing-info :biz-info="bizInfo"></order-advance-clearing-info>
    <!--  操作记录  -->
    <operate-log :log-list="operateRecordList"></operate-log>
    <zj-content-footer>
      <zj-button  @click="goParent">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>

<script>
/**
 * 凭证清算交易详情页面
 */
import BizApplyInfo from '../../../../components/bizApplyInfo';
import OperateLog from '../../../../components/operateLog';
import orderAdvanceClearingInfo from '@modules/ebill/views/clearingManage/expireClearingManage/workflow/orderAdvanceClearingInfo.vue';
import auditDetailMixin from "../../mixins/auditDetailMixin";
export default {
  mixins: [auditDetailMixin],
  components: {
    BizApplyInfo,
    OperateLog,
    orderAdvanceClearingInfo
  }
}
</script>
