<template>
  <zj-content-container>
    <zj-top-header title="供应商业务申请驳回维护"></zj-top-header>
    <!--  业务申请信息  -->
    <biz-apply-info :biz-info="applyModel"></biz-apply-info>
    <!--  具体业务信息  -->
    <trade-change-back-audit
      ref="tradeInfo"
      :is-edit="true"
      :biz-id="row.bizId"></trade-change-back-audit>
    <!--  操作记录  -->
    <operate-log :log-list="operateLogList"></operate-log>
    <!--  审批意见  -->
    <audit-remark ref="auditRemark"></audit-remark>
    <zj-content-footer>
      <zj-button type="primary" :disabled="rejectLoading" :loading="passLoading" :api="zjBtn.submitTradeRecheck" @click="toPass">审核通过</zj-button>
      <zj-button type="primary" :disabled="passLoading" :loading="rejectLoading" :api="zjBtn.submitTradeRecheck" @click="toReject">拒绝</zj-button>
      <zj-button @click="goParent">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>
<script>
import {OperResult} from "@modules/constant";
import BizApplyInfo from '../../../components/bizApplyInfo';
import OperateLog from '../../../components/operateLog';
import AuditRemark from '../../../components/auditRemark';
import TradeChangeBackAudit from '@modules/ebill/views/productManage/businessManage/workflow/tradeChange/back/audit.vue';
import workflowMixin from '@modules/workflow/views/businessManage/mixins/workflowMixin';
/**
 * 单个维护贸易背景复核驳回再处理
 */
export default {
  mixins: [workflowMixin],
  components: {
    BizApplyInfo,
    OperateLog,
    AuditRemark,
    TradeChangeBackAudit
  },
  data () {
    return {
      zjControl: {
        submitTradeRebut: this.$api.businessManageWorkflow.submitTradeRebut
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
      // 校验
      this.$refs.tradeInfo.validData().then(valid => {
        if (valid) {
          const tradeRelationParamModel = this.$refs.tradeInfo.getData();
          this.passLoading = true;
          this.zjControl.submitTradeRebut({
            id: this.row.bizId,
            notes,
            operResult: OperResult.PASS,
            tradeRelationParamModel
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
        }
      })
    },
    toReject() {
      this.$refs.auditRemark.getForm().validate((valid) => {
        if (valid) {
          const {notes} = this.$refs.auditRemark.getData()
          this.rejectLoading = true;
          this.zjControl.submitTradeRebut({
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
};
</script>
