<template>
  <zj-content-container>
    <zj-top-header title="续签合同申请复核"></zj-top-header>
    <!--  业务申请信息  -->
    <biz-apply-info></biz-apply-info>
    <!--  具体业务信息  -->
    <contract-re-sign-review-audit biz-id="1"></contract-re-sign-review-audit>
    <!--  操作记录  -->
    <operate-log></operate-log>
    <!--  审批意见  -->
    <audit-remark ref="auditRemark"></audit-remark>
    <zj-ht-approval></zj-ht-approval>
    <zj-content-footer>
      <zj-button type="primary" :disabled="rejectLoading" :loading="passLoading" :api="zjBtn.recheckContractRenewal" @click="toPass">审核通过</zj-button>
      <zj-button type="primary" :disabled="passLoading" :loading="rejectLoading" :api="zjBtn.recheckContractRenewal" @click="toReject">驳回</zj-button>
      <zj-button @click="goParent">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>
<script>
import {OperResult} from "@modules/constant";
import BizApplyInfo from '../../../components/bizApplyInfo';
import OperateLog from '../../../components/operateLog';
import AuditRemark from '../../../components/auditRemark';
import contractReSignReviewAudit from '@modules/ebill/views/productManage/businessManage/workflow/contractReSign/review/audit.vue';

/**
 * 续签合同申请复核操作
 */
export default {
  components: {
    BizApplyInfo,
    OperateLog,
    AuditRemark,
    contractReSignReviewAudit
  },
  data () {
    return {
      zjControl: {
        recheckContractRenewal: this.$api.businessManageWorkflow.recheckContractRenewal
      },
      rejectLoading: false,
      passLoading: false
    }
  },
  created() {
    this.getApi();
    this.getRow();
  },
  methods: {
    toPass() {
      this.$refs.auditRemark.getForm().clearValidate();
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
    },
    toReject() {
      this.$refs.auditRemark.getForm().validate((valid) => {
        if (valid) {
          const {notes} = this.$refs.auditRemark.getData()
          this.rejectLoading = true;
          this.zjControl.recheckContractRenewal({
            id: this.row.id,
            notes,
            operResult: OperResult.BACK
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
};
</script>
