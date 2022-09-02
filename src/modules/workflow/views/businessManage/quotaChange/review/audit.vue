<template>
  <zj-content-container>
    <zj-top-header title="供应商额度申请复核"></zj-top-header>
    <!--  业务申请信息  -->
    <biz-apply-info :biz-info="applyModel"></biz-apply-info>
    <!--  具体业务信息  -->
    <quota-change-audit
      ref="quotaChangeAudit"
      :is-edit="false"
      :biz-id="row.bizId"></quota-change-audit>
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
import QuotaChangeAudit from '@modules/ebill/views/productManage/businessManage/workflow/quotaChange/review/audit.vue';
import workflowMixin from '@modules/workflow/views/businessManage/mixins/workflowMixin';
/**
 * 额度管理复核
 */
export default {
  mixins: [workflowMixin],
  components: {
    BizApplyInfo,
    OperateLog,
    AuditRemark,
    QuotaChangeAudit
  },
  data () {
    return {
      zjControl: {
        recheckLimit: this.$api.businessManageWorkflow.recheckLimit, // 额度续签复核
        recheckLimitChange: this.$api.businessManageWorkflow.recheckLimitChange, // 额度变更复核
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
      let request = this.row.applyType == 'EDXQ' ?
                          this.zjControl.recheckLimit : 
                          this.zjControl.recheckLimitChange 
      request({
        id: this.row.bizId,
        notes,
        busTradeId: this.$refs.quotaChangeAudit?.tradeRelationModel?.busTradeId,
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
          let request = this.row.applyType == 'EDXQ' ?
                          this.zjControl.recheckLimit : 
                          this.zjControl.recheckLimitChange 
          request({
            id: this.row.bizId,
            notes,
            busTradeId: this.$refs.quotaChangeAudit?.tradeRelationModel?.busTradeId,
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
