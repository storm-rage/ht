<template>
  <zj-content-container>
    <zj-top-header title="订单清算复核"></zj-top-header>
    <!--  业务申请信息  -->
    <biz-apply-info></biz-apply-info>
    <!--  具体业务信息  -->
    <order-clearing-info></order-clearing-info>
    <!--  操作记录  -->
    <operate-log></operate-log>
    <!--  审批意见  -->
    <audit-remark></audit-remark>
    <zj-content-footer>
      <zj-button type="primary" @click="back">复核通过</zj-button>
      <zj-button  @click="back">驳回上一级</zj-button>
      <zj-button  @click="back">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>

<script>
/**
 * 订单清算复核页面
 */
import BizApplyInfo from '../../components/bizApplyInfo';
import OperateLog from '../../components/operateLog';
import AuditRemark from '../../components/auditRemark';
import orderClearingInfo from '@modules/ebill/views/clearingManage/expireClearingManage/workflow/orderClearingInfo.vue';
export default {
  components: {
    BizApplyInfo,
    OperateLog,
    AuditRemark,
    orderClearingInfo
  },
  data () {
    return {}
  },
  methods: {
    back () {}
  }
}
</script>
