<template>
  <zj-content-container>
    <zj-top-header title="供应商业务申请复核"></zj-top-header>
    <div ref="imageWrapper">
      <!--  业务申请信息  -->
      <biz-apply-info :biz-info="applyModel"></biz-apply-info>
      <!--  具体业务信息  -->
      <business-review-detail :biz-id="row.bizId"></business-review-detail>
      <!--  操作记录  -->
      <operate-log :log-list="operateLogList"></operate-log>
      <!--  审批意见  -->
      <audit-remark ref="auditRemark"></audit-remark>
    </div>
<!--    <zj-ht-approval processInstanceId="aef4c2ce-191f-11ed-a9f6-0242ac110016" :snapshotConfigs="[{type: 'ref',value: 'imageWrapper'}]"></zj-ht-approval>-->
    <zj-content-footer>
      <zj-button type="primary" :disabled="rejectLoading" :loading="passLoading" :api="zjBtn.submitRecheck" @click="toPass">审核通过</zj-button>
      <zj-button type="primary" :disabled="passLoading" :loading="rejectLoading" :api="zjBtn.submitRecheck" @click="toReject">驳回</zj-button>
      <zj-button @click="goParent">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>
<script>
import {OperResult} from "@modules/constant";
import BizApplyInfo from '../../../components/bizApplyInfo';
import OperateLog from '../../../components/operateLog';
import AuditRemark from '../../../components/auditRemark';
import businessReviewDetail from '@modules/ebill/views/productManage/businessManage/workflow/biz/review/detail.vue';
import workflowMixin from '@modules/workflow/views/businessManage/mixins/workflowMixin';

/**
 * 业务申请复核操作
 */
export default {
  mixins: [workflowMixin],
  components: {
    BizApplyInfo,
    OperateLog,
    AuditRemark,
    businessReviewDetail
  },
  data () {
    return {
      zjControl: {
        submitRecheck: this.$api.businessManageWorkflow.submitRecheck
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
      this.zjControl.submitRecheck({
        id: this.row.bizId,
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
          this.zjControl.submitRecheck({
            id: this.row.bizId,
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
