<template>
  <zj-content-container>
    <zj-top-header title="凭证确认收款申请"></zj-top-header>
    <!-- 凭证确认收款信息   -->
    <bill-confirm-payment-info :detailInfo="detailInfo"></bill-confirm-payment-info>
    <!-- 附件信息   -->
    <payment-file ref="paymentFile" is-edit></payment-file>
    <zj-content-footer>
      <zj-button type="primary" :disabled="loading" @click="toApply">提交申请</zj-button>
      <zj-button @click="goParent">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>
<script>
import BillConfirmPaymentInfo from '../components/billConfirmPaymentInfo';
import PaymentFile from '../../components/clearingFileInfo';
export default {
  components: {
    BillConfirmPaymentInfo,
    PaymentFile
  },
  data () {
    return {
      zjControl: {
        getBillReceiptApplyDetail: this.$api.confirmPaymentManage.getBillReceiptApplyDetail,
        billConfirmReceiptApply: this.$api.confirmPaymentManage.billConfirmReceiptApply
      },
      detailInfo: {},
      loading: false
    };
  },
  created() {
    this.getApi();
    this.getRow();
    this.getDetail();
  },
  methods: {
    getDetail() {
      this.zjControl.getBillReceiptApplyDetail({id: this.row.bizId, accountIdList: this.row.ids}).then(res => {
        this.detailInfo = res.data;
      });
    },
    toApply() {
      this.$confirm('是否确认提交申请？','温馨提示',{
        type: 'warning',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        const fileData = this.$refs.paymentFile.getData()
        this.loading = true;
        this.zjControl.billConfirmReceiptApply({
          id: this.row.bizId,
          accountIdList: this.row.ids,
          busDesc: fileData.busDesc,
          attachModelList: fileData.list
        }).then((res) => {
          this.loading = false;
          //成功，关闭
          if (res.success) {
            this.$message.success(res.msg);
            this.goParent();
          }
        }).catch(() => {
          this.loading = false;
        })
      })

    },
  }
};
</script>
