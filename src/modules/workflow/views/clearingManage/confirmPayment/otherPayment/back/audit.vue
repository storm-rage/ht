<template>
  <zj-content-container>
    <zj-top-header title="非凭证确认收款驳回审核"></zj-top-header>
    <!--  业务申请信息  -->
    <biz-apply-info :biz-info="detailInfo"></biz-apply-info>
    <!--  具体业务信息  -->
    <other-confirm-payment-back-audit ref="bizInfo" :biz-detail-info="detailInfo" :dictionary="dictionary"></other-confirm-payment-back-audit>
    <!--  操作记录  -->
    <operate-log :log-list="detailInfo.operateLogList"></operate-log>
    <!--  审批意见  -->
    <audit-remark ref="auditRemark"></audit-remark>
    <zj-content-footer>
      <zj-button type="primary" :disabled="rejectLoading" :loading="passLoading" :api="zjBtn.noBillReceiptReview" @click="toPass">审核通过</zj-button>
      <zj-button type="primary" :disabled="rejectLoading" :loading="passLoading" :api="zjBtn.noBillReceiptReview" @click="toReject">拒绝</zj-button>
      <zj-button  @click="goParent">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>

<script>
/**
 * 非凭证确认还款复核驳回处理页面
 *
 */
import BizApplyInfo from '../../../../components/bizApplyInfo';
import OperateLog from '../../../../components/operateLog';
import AuditRemark from '../../../../components/auditRemark';
import OtherConfirmPaymentBackAudit from '@modules/ebill/views/clearingManage/confirmPaymentManage/workflow/otherConfirmPaymentBackAudit.vue';
import {OperResult} from "@modules/constant";
export default {
  name: 'OtherPaymentBackAudit',
  components: {
    BizApplyInfo,
    OperateLog,
    AuditRemark,
    OtherConfirmPaymentBackAudit
  },
  data () {
    return {
      zjControl: {
        getDirectory: this.$api.confirmPaymentManage.getDirectory,
        noBillReceiptPending: this.$api.confirmPaymentManageWorkflow.noBillReceiptPending,
        getNoBillReceiptPendingDetail: this.$api.confirmPaymentManageWorkflow.getNoBillReceiptPendingDetail,
      },
      // 字典
      dictionary: {},
      rejectLoading: false,
      passLoading: false,
      detailInfo: {
        operateLogList: [],
        bankCapitalFlow: {}
      }
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
      this.zjControl.getNoBillReceiptPendingDetail({id: this.row.bizId}).then(res => {
        this.detailInfo = res.data;
      });
    },
    toPass() {
      this.$refs.auditRemark.getForm().clearValidate();
      this.$refs.bizInfo.getForm().validate((valid) => {
        if (valid) {
          this.$confirm('是否确认审核通过？','温馨提示',{
            type: 'warning',
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(() => {
            const {notes} = this.$refs.auditRemark.getData()
            const bizData = this.$refs.bizInfo.getData()
            this.passLoading = true;
            this.zjControl.noBillReceiptPending({
              id: this.row.bizId,
              notes,
              operResult: OperResult.PASS,
              attachModelList: bizData.fileData.list,
              busDesc: bizData.fileData.busDesc,
              confirmRepaymentTotalAmt:bizData.form.confirmRepaymentTotalAmt
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
        }
      })

    },
    toReject() {
      this.$refs.auditRemark.getForm().validate((valid) => {
        if (valid) {
          const {notes} = this.$refs.auditRemark.getData()
          this.rejectLoading = true;
          this.zjControl.noBillReceiptPending({
            id: this.row.bizId,
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
