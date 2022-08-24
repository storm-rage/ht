<template>
  <zj-content-container>
    <zj-top-header title="订单保理收款交易详情"></zj-top-header>
    <!--  业务申请信息  -->
    <biz-apply-info :biz-info="detailInfo"></biz-apply-info>
    <!--  具体业务信息  -->
    <other-confirm-payment-detaill :biz-detail-info="detailInfo" :dictionary="dictionary"></other-confirm-payment-detaill>
    <!--  操作记录  -->
    <operate-log :log-list="detailInfo.operateLogList"></operate-log>
    <zj-content-footer>
      <zj-button  @click="goParent">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>

<script>
/**
 * 非凭证确认还款流水详情页面
 */
import BizApplyInfo from '../../../../components/bizApplyInfo';
import OperateLog from '../../../../components/operateLog';
import OtherConfirmPaymentDetail from '@modules/ebill/views/clearingManage/confirmPaymentManage/workflow/otherConfirmPaymentDetail.vue';
export default {
  name: 'OtherPaymentDetail',
  components: {
    BizApplyInfo,
    OperateLog,
    OtherConfirmPaymentDetail
  },
  data () {
    return {
      zjControl: {
        getDirectory: this.$api.confirmPaymentManage.getDirectory,
        getNoBillReceiptReviewDetail: this.$api.confirmPaymentManageWorkflow.getNoBillReceiptReviewDetail,
      },
      // 字典
      dictionary: {},
      detailInfo: {}
    };
  },
  created() {
    this.getApi();
    this.getDic();
    this.getRow();
    this.getDetail();
  },
  methods: {
    getDic() {
      this.zjControl.getDirectory().then((res) => {
        this.dictionary = res.data
      });
    },
    getDetail() {
      this.zjControl.getBillReceiptReviewDetail({id: this.row.bizId}).then(res => {
        this.detailInfo = res.data;
      });
    },
  }
}
</script>
