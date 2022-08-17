<template>
  <zj-content-container>
    <zj-top-header title="国内商业保理合同确认"></zj-top-header>
    <!--  业务申请信息  -->
    <biz-apply-info :biz-info="tranInfo"></biz-apply-info>
    <!--  具体业务信息  -->
    <contract-audit :contract-info="bizInfo"
                    :serial-no="row.serialNo"></contract-audit>
    <!--  审批意见  -->
    <audit-remark ref="auditRemark"></audit-remark>
    <zj-content-footer>
      <zj-button  :disabled="rejectLoading"
                  :loading="passLoading"
                  :api="zjBtn.confirmEbContract"
                  type="primary"
                  @click="toPass">确认</zj-button>
      <zj-button :disabled="passLoading"
                 :loading="rejectLoading"
                 type="primary"
                 @click="toReject">拒绝</zj-button>
      <zj-button  @click="goParent">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>
<script>
import BizApplyInfo from '../../../components/bizApplyInfo';
import AuditRemark from '../../../components/auditRemark';
import ContractAudit from '@modules/ebill/views/productManage/factoringContract/workflow/factoringContractAudit.vue';
import {OperResult} from "@modules/constant";
export default {
  components: {
    BizApplyInfo,
    AuditRemark,
    ContractAudit
  },
  data () {
    return {
      zjControl: {
        getEbContractFlowDetail: this.$api.factoringContractWorkflow.getEbContractFlowDetail,
        confirmEbContract: this.$api.factoringContractWorkflow.confirmEbContract,
      },
      // 交易信息(工作流业务申请信息)
      tranInfo:{},
      // 业务信息
      bizInfo:{},
      // 确认和拒绝用到
      rejectLoading: false,
      // 确认和拒绝用到
      passLoading: false,
    };
  },
  created() {
    this.getApi();
    this.getRow();
    this.getDetail();
  },
  methods: {
    getDetail() {
      this.zjControl.getEbContractFlowDetail({
        serialNo: this.row.serialNo
      }).then(res => {
        this.tranInfo = res.data.basicInfo;
        this.bizInfo = res.data.contractInfo;
      })
    },
    // 通过
    toPass() {
      this.$refs.auditRemark.getForm().clearValidate();
      this.$confirm('确认提交后，平台将自动为供应商生成待签署的国内保理合同，是否确认？','温馨提示',{
        type: 'warning',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        const {notes} = this.$refs.auditRemark.getData()
        this.passLoading = true;
        this.zjControl.confirmEbContract({
          operateFlag: OperResult.PASS,
          opinion: notes,
          serialNo: this.row.serialNo
        }).then(res => {
          this.passLoading = false;
          //成功，关闭
          if (res.success) {
            this.$message.success(res.msg);
            this.goParent();
          }
        }).catch(() => {
          this.passLoading = false;
        });
      })
    },
    // 拒绝
    toReject() {
      this.$refs.auditRemark.getForm().validate((valid) => {
        if (valid) {
          this.$confirm('拒绝后，待确认的国内保理合同失效，需重新维护业务参数后，生成新的合同。是否拒绝？','温馨提示',{
            type: 'warning',
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(() => {
            const {notes} = this.$refs.auditRemark.getData();
            this.rejectLoading = true;
            this.zjControl.confirmEbContract({
              operResult: OperResult.REJECT,
              auditOpinion: notes,
              serialNo: this.row.serialNo
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
          });
        }
      });
    }
  }
}
</script>
