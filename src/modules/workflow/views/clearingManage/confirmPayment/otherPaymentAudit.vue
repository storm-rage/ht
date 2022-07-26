<template>
  <zj-content-container>
    <zj-top-header title="非凭证确认收款审核"></zj-top-header>
    <!--  业务申请信息  -->
    <biz-apply-info :biz-info="detailInfo"></biz-apply-info>
    <!--  具体业务信息  -->
    <other-confirm-payment-audit :biz-detail-info="detailInfo" :dictionary="dictionary"></other-confirm-payment-audit>
    <!--  操作记录  -->
    <operate-log :log-list="detailInfo.operateLogList"></operate-log>
    <!--  审批意见  -->
    <audit-remark ref="auditRemark"></audit-remark>
    <zj-content-footer>
      <zj-button type="primary" :disabled="rejectLoading" :loading="passLoading" :api="zjBtn.noBillReceiptReview" @click="toPass">审核通过</zj-button>
      <zj-button type="primary" :disabled="rejectLoading" :loading="passLoading" :api="zjBtn.noBillReceiptReview" @click="toReject">驳回</zj-button>
      <zj-button  @click="goParent">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>

<script>
/**
 * 非凭证确认还款复核页面
 */
import BizApplyInfo from '../../components/bizApplyInfo';
import OperateLog from '../../components/operateLog';
import AuditRemark from '../../components/auditRemark';
import OtherConfirmPaymentAudit from '@modules/ebill/views/clearingManage/confirmPaymentManage/workflow/otherConfirmPaymentAudit.vue';
import {OperResult} from "@modules/constant";
export default {
  name: 'OtherPaymentAudit',
  components: {
    BizApplyInfo,
    OperateLog,
    AuditRemark,
    OtherConfirmPaymentAudit
  },
  data () {
    return {
      zjControl: {
        getDirectory: this.$api.confirmPaymentManage.getDirectory,
        noBillReceiptReview: this.$api.confirmPaymentManageWorkflow.noBillReceiptReview,
        getNoBillReceiptReviewDetail: this.$api.confirmPaymentManageWorkflow.getNoBillReceiptReviewDetail,
      },
      // 字典
      dictionary: {},
      rejectLoading: false,
      passLoading: false,
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
      this.zjControl.getBillReceiptReviewDetail({id: this.row.id}).then(res => {
        this.detailInfo = res.data;
      });
    },
    toPass() {
      this.$refs.auditRemark.getForm().clearValidate();
      this.$confirm('是否确认审核通过？','温馨提示',{
        type: 'warning',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        const {notes} = this.$refs.auditRemark.getData()
        this.passLoading = true;
        this.zjControl.recheckContractRenewal({
          id: this.row.id,
          notes,
          operResult: OperResult.PASS
        }).then(res => {
          this.passLoading = false;
          //成功，关闭
          if (res.success) {
            this.$message.success(res.msg);
            this.goParent();
          }
        }).catch(() => {
          this.passLoading = false;
        })
      })
    },
    toReject() {
      this.$refs.auditRemark.getForm().validate((valid) => {
        if (valid) {
          const {notes} = this.$refs.auditRemark.getData()
          this.rejectLoading = true;
          this.zjControl.recheckContractRenewal({
            id: this.row.id,
            notes,
            operResult: OperResult.REJECT
          }).then(res => {
            this.rejectLoading = false;
            //成功，关闭
            if (res.success) {
              this.$message.success(res.msg);
              this.goParent();
            }
          }).catch(() => {
            this.rejectLoading = false;
          })
        }
      })
    }
  }
}
</script>
