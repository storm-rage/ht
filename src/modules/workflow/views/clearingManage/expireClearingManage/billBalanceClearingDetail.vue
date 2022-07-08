<template>
  <zj-content-container>
    <zj-top-header title="凭证尾款清算交易详情"></zj-top-header>
    <!--  业务申请信息  -->
    <biz-apply-info></biz-apply-info>
    <!--  具体业务信息  -->
    <bill-balance-clearing-info></bill-balance-clearing-info>
    <!--  操作记录  -->
    <operate-log></operate-log>
    <zj-content-footer>
      <zj-button  @click="back">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>

<script>
/**
 * 凭证尾款清算交易详情页面
 */
import BizApplyInfo from '../../components/bizApplyInfo';
import OperateLog from '../../components/operateLog';
import billBalanceClearingInfo from '@modules/ebill/views/clearingManage/expireClearingManage/workflow/billBalanceClearingInfo.vue';
export default {
  components: {
    BizApplyInfo,
    OperateLog,
    billBalanceClearingInfo
  },
  data () {
    return {};
  },
  methods: {
    back () {}
  }
}
</script>
