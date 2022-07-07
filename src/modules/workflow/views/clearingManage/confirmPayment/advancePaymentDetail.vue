<template>
  <zj-content-container>
    <zj-content-tip class="zj-m-b-30" style="display: block;width: 100%" text="请确认已收到供应商还款金额。保理公司审核通过后，系统将自动设置该笔融资全部还清。"></zj-content-tip>
    <zj-top-header title="确认提前还款详情"></zj-top-header>
    <!--  业务申请信息  -->
    <biz-apply-info></biz-apply-info>
    <!--  具体业务信息  -->
    <payment-detail></payment-detail>
    <!--  操作记录  -->
    <operate-log></operate-log>
    <zj-content-footer>
      <zj-button  @click="back">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>

<script>
/**
 * 提前还款流水详情页面
 */
import BizApplyInfo from '../../components/bizApplyInfo';
import OperateLog from '../../components/operateLog';
import PaymentDetail from '@modules/ebill/views/clearingManage/confirmPaymentManage/workflow/advancePaymentDetail.vue';
export default {
  name: 'AdvancePaymentDetail',
  components: {
    BizApplyInfo,
    OperateLog,
    PaymentDetail
  },
  data () {
    return {};
  },
  methods: {
    back () {
      return {}
    }
  }
}
</script>
