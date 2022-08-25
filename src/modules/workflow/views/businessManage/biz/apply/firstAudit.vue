<template>
  <zj-content-container>
    <zj-top-header title="供应商业务申请审核"></zj-top-header>
    <!--  业务申请信息  -->
    <biz-apply-info :biz-info="applyModel"></biz-apply-info>
    <!--  具体业务信息  -->
    <business-first-audit :biz-id="row.bizId" ref="bizInfoRef"></business-first-audit>
    <!--  操作记录  -->
    <operate-log :log-list="operateLogList"></operate-log>
    <!--  审批意见  -->
    <audit-remark ref="auditRemark"></audit-remark>
    <zj-content-footer>
      <zj-button type="primary"
                 :disabled="rejectLoading"
                 :loading="passLoading"
                 :api="zjBtn.submitFirstAudit"
                 @click="toPass">审核通过</zj-button>
      <zj-button type="primary"
                 :disabled="passLoading"
                 :loading="rejectLoading"
                 :api="zjBtn.submitFirstAudit"
                 @click="toReject">拒绝</zj-button>
      <zj-button @click="goParent">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>
<script>
import {OperResult} from "@modules/constant";
import BizApplyInfo from '../../../components/bizApplyInfo';
import OperateLog from '../../../components/operateLog';
import AuditRemark from '../../../components/auditRemark';
import BusinessFirstAudit from '@modules/ebill/views/productManage/businessManage/workflow/biz/apply/audit.vue';
import workflowMixin from '@modules/workflow/views/businessManage/mixins/workflowMixin';
/**
 * 初审和业务维护驳回操作
 */
export default {
  mixins: [workflowMixin],
  components: {
    BizApplyInfo,
    OperateLog,
    AuditRemark,
    BusinessFirstAudit
  },
  data () {
    return {
      zjControl: {
        submitFirstAudit: this.$api.businessManageWorkflow.submitFirstAudit
      },
      passLoading: false,
      rejectLoading: false
    }
  },
  created() {
    this.getApi();
    this.getRow();
  },
  methods: {
    toPass () {
      this.$refs.auditRemark.getForm().clearValidate()
      const {notes} = this.$refs.auditRemark.getData()
      const tradeRelationParamModelList = this.$refs.bizInfoRef.getList();
      if (tradeRelationParamModelList.length) {
        this.passLoading = true;
        this.zjControl.submitFirstAudit({
          id: this.row.bizId,
          notes,
          tradeRelationParamModelList,
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
      }else {
        this.$messageBox({
          type:'warning',
          content:'请至少维护一条贸易关系的业务设置！'
        })
      }

    },
    toReject () {
      this.$refs.auditRemark.getForm().validate((valid) => {
        if (valid) {
          const tradeRelationParamModelList = this.$refs.bizInfoRef.getList();
          const {notes} = this.$refs.auditRemark.getData()
          this.rejectLoading = true;
          this.zjControl.submitFirstAudit({
            id: this.row.bizId,
            notes,
            tradeRelationParamModelList,
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
    },
  }
};
</script>
