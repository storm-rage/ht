<template>
  <zj-content-container>
    <zj-top-header title="供应商业务申请维护复核"></zj-top-header>
    <!--  业务申请信息  -->
    <biz-apply-info :biz-info="applyModel"></biz-apply-info>
    <!--  具体业务信息  -->
    <trade-change-review-audit
      :is-edit="false"
      :biz-id="row.bizId"></trade-change-review-audit>
    <!--  操作记录  -->
    <operate-log :log-list="operateLogList"></operate-log>
    <!--  审批意见  -->
    <audit-remark ref="auditRemark"></audit-remark>
    <zj-content-footer>
      <zj-button type="primary" :disabled="rejectLoading" :loading="passLoading" :api="zjBtn.submitTradeRecheck" @click="toPass">审核通过</zj-button>
      <zj-button type="primary" :disabled="passLoading" :loading="rejectLoading" :api="zjBtn.submitTradeRecheck" @click="toReject">驳回</zj-button>
      <zj-button @click="goParent">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>
<script>
import {OperResult} from "@modules/constant";
import BizApplyInfo from '../../../components/bizApplyInfo';
import OperateLog from '../../../components/operateLog';
import AuditRemark from '../../../components/auditRemark';
import TradeChangeReviewAudit from '@modules/ebill/views/productManage/businessManage/workflow/tradeChange/review/audit.vue';
import workflowMixin from '@modules/workflow/views/businessManage/mixins/workflowMixin';
/**
 * 单个维护贸易背景复核
 */
export default {
  mixins: [workflowMixin],
  components: {
    BizApplyInfo,
    OperateLog,
    AuditRemark,
    TradeChangeReviewAudit
  },
  data () {
    return {
      zjControl: {
        submitTradeRecheck: this.$api.businessManageWorkflow.submitTradeRecheck
      },
      rejectLoading: false,
      passLoading: false
    }
  },
  methods: {
    toPass() {
      this.$refs.auditRemark.getForm().clearValidate();
      const {notes} = this.$refs.auditRemark.getData()
      this.passLoading = true;
      this.zjControl.submitTradeRecheck({
        id: this.row.bizId,
        notes,
        controlFlag: '1',// 风控标识
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
          this.zjControl.submitTradeRecheck({
            id: this.row.bizId,
            notes,
            controlFlag: '1',//风控标识
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
