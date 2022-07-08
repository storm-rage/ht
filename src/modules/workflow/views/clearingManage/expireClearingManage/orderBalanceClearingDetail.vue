<template>
  <zj-content-container>
    <zj-top-header title="订单尾款清算交易详情"></zj-top-header>
    <!--  业务申请信息  -->
    <biz-apply-info></biz-apply-info>
    <!--  具体业务信息  -->
    <order-balance-clearing-info></order-balance-clearing-info>
    <!--  操作记录  -->
    <operate-log></operate-log>
    <zj-content-footer>
      <zj-button  @click="back">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>

<script>
/**
 * 订单尾款清算交易详情页面
 */
import BizApplyInfo from '../../components/bizApplyInfo';
import OperateLog from '../../components/operateLog';
import orderBalanceClearingInfo from '@modules/ebill/views/clearingManage/expireClearingManage/workflow/orderBalanceClearingInfo.vue';
export default {
  components: {
    BizApplyInfo,
    OperateLog,
    orderBalanceClearingInfo
  },
  data () {
    return {};
  },
  methods: {
    back () {}
  }
}
</script>
