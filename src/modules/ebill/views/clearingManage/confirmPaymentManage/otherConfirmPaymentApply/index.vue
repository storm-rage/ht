<template>
  <zj-content-container>
    <zj-top-header title="非凭证确认收款申请"></zj-top-header>
    <!-- 非凭证确认收款信息   -->
    <other-confirm-payment-info ref="paymentInfo" is-edit :dictionary="dictionary" :detailInfo="detailInfo"></other-confirm-payment-info>
    <!-- 附件信息   -->
    <payment-file ref="paymentFile" is-edit></payment-file>
    <zj-content-footer>
      <zj-button type="primary" :disabled="loading" :loading="loading" @click="toApply">提交申请</zj-button>
      <zj-button @click="goParent">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>
<script>
import OtherConfirmPaymentInfo from '../components/otherConfirmPaymentInfo';
import PaymentFile from '../../components/clearingFileInfo';
import BigNumber from "bignumber.js";
export default {
  components: {
    OtherConfirmPaymentInfo,
    PaymentFile
  },
  data () {
    return {
      zjControl: {
        getNoBillReceiptApplyDetail: this.$api.confirmPaymentManage.getNoBillReceiptApplyDetail,
        getDirectory: this.$api.confirmPaymentManage.getDirectory,
        noBillConfirmReceiptApply: this.$api.confirmPaymentManage.noBillConfirmReceiptApply,
      },
      // 字典
      dictionary: {},
      // 详情
      detailInfo: {
        bankCapitalFlow: {}
      },
      loading: false
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
      this.zjControl.getNoBillReceiptApplyDetail({busTradeId: this.row.busTradeId, id: this.row.bizId}).then(res => {
        this.detailInfo = res.data;
        // 默认收款日期=勾选资金流水的收款日期
        if (!this.detailInfo.confirmRepaymentDate) {
          this.detailInfo.confirmRepaymentDate = this.detailInfo.bankCapitalFlow.repayDate
        }
        // 收款金额默认=勾选资金流水的剩余可用收款金额（收款金额-已关联金额）
        if(!this.detailInfo.confirmRepaymentTotalAmt) {
          this.detailInfo.confirmRepaymentTotalAmt = new BigNumber(this.detailInfo.bankCapitalFlow.repayAmt).minus(this.detailInfo.bankCapitalFlow.relationAmt||0).toFixed(2)
        }
      });
    },
    toApply () {
      this.$refs.paymentInfo.getForm().validate((valid) => {
        if (valid) {
          this.$confirm('是否确认提交申请？','温馨提示',{
            type: 'warning',
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(() => {
            const fileData = this.$refs.paymentFile.getData()
            const paymentInfo = this.$refs.paymentInfo.getData()
            this.loading = true;
            this.zjControl.noBillConfirmReceiptApply({
              attachModelList: fileData.list,
              busDesc: fileData.busDesc,
              busTradeId: this.row.busTradeId,
              id: this.row.bizId,
              confirmRepaymentDate: paymentInfo.confirmRepaymentDate,
              confirmRepaymentTotalAmt: paymentInfo.confirmRepaymentTotalAmt
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
        }
      });

    }
  }
};
</script>
