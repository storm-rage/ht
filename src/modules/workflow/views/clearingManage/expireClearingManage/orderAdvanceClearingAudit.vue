<template>
  <zj-content-container>
    <zj-top-header title="提前还款清算复核"></zj-top-header>
    <!--  业务申请信息  -->
    <biz-apply-info></biz-apply-info>
    <!--  具体业务信息  -->
    <order-advance-clearing-info></order-advance-clearing-info>
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
 * 提前还款清算复核页面
 */
import BizApplyInfo from '../../components/bizApplyInfo';
import OperateLog from '../../components/operateLog';
import AuditRemark from '../../components/auditRemark';
import orderAdvanceClearingInfo from '@modules/ebill/views/clearingManage/expireClearingManage/workflow/orderAdvanceClearingInfo.vue';
export default {
  components: {
    BizApplyInfo,
    OperateLog,
    AuditRemark,
    orderAdvanceClearingInfo
  },
  data () {
    return {}
  },
  methods: {
    back () {}
  }
}
</script>
