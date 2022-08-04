<template>
  <zj-content-container>
    <zj-top-header title="阶段性协议维护"></zj-top-header>
    <!--  业务申请信息  -->
    <biz-apply-info :formData="detailData.businessApplyInfo" :dictionary="dictionary"/>
    <!--  具体业务信息  -->
    <business-audit :formData="detailData"/>
    <!--  阶段性协议信息  -->
    <multistage-agreement :tableData="detailData.phasedAgreementList" :dictionary="dictionary" :zjControl="zjControl"/>
     <!--  审批意见  -->
    <audit-remark/>
    <zj-content-footer>
      <zj-button type="primary" @click="submit('提交')">确认提交</zj-button>
      <zj-button type="primary" @click="submit('拒绝')">拒绝</zj-button>
      <zj-button @click="goParent">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>
<script>
import BizApplyInfo from './components/bizApplyInfo';
import multistageAgreement from './components/multistageAgreement';
import AuditRemark from './components/auditRemark';
import BusinessAudit from './workflow/businessAudit.vue';
import multistageAgreementWorkflow from "../../../../api/multistageAgreementManageWorkflowApi";

export default {
  components: {
    BizApplyInfo,
    multistageAgreement,
    AuditRemark,
    BusinessAudit
  },
  data () {
    return {
      zjControl: {
        deletePhasedAgree:this.$api.multistageAgreementManageWorkflow.deletePhasedAgree,//运营端-阶段性协议维护-阶段性协议-删除
        getAddDetail:this.$api.multistageAgreementManageWorkflow.getAddDetail,//运营端-阶段性协议维护-阶段性协议新增
        getBackPhasedAgreeInfo:this.$api.multistageAgreementManageWorkflow.getBackPhasedAgreeInfo,//运营端-阶段性协议维护-详情
        queryBackPhasedAgreePage:this.$api.multistageAgreementManageWorkflow.queryBackPhasedAgreePage,//运营端-阶段性协议-列表查询
        savePhasedAgree:this.$api.multistageAgreementManageWorkflow.savePhasedAgree,//运营端-阶段性协议维护-阶段性协议-保存
        submitBackPhasedAgree:this.$api.multistageAgreementManageWorkflow.submitBackPhasedAgree,//运营端-阶段性协议维护-阶段性协议-确认提交

        getPhasedAgreeDirectory:this.$api.multistageAgreementManageWorkflow.getPhasedAgreeDirectory,//阶段性协议管理-数据字典
        uploadFile:this.$api.baseCommon.uploadFile,
      },
      detailData: {},
      dictionary: {},
    }
  },
  methods: {
    getDic() {
      this.zjControl.getPhasedAgreeDirectory().then(res=>{
        this.dictionary = res.data
      })
    },
    getDetail() {
      let params = {
        busTradeId: this.row.busTradeId,
        buyerId: this.row.buyerId,
        buyerName: this.row.buyerName,
        maintainType: '0',//0-待办维护 1-保理公司直接维护
        sellerId: this.row.sellerId,
        sellerName: this.row.sellerName,
        serialNo: this.row.serialNo,
      }
      this.zjControl.getBackPhasedAgreeInfo(params).then(res=>{
        this.detailData = res.data
      })
    },
    submit(flag) {
      // let target = flag == 'agree' ? '提交' : '拒绝'
      this.$messageBox({
        type:'info',
        title:'温馨提示',
        content:`是否确认${flag}？`,
        showCancelButton: true,
        messageResole:()=>{
          let params = {
            applyId: '',
            operateFlag: '',
            phasedIdList: [],
            rejectReason: '',
            serialNo: '',
          }
          this.zjControl.submitBackPhasedAgree(params).then(res=>{
            this.$message.success(res.msg)
          })
        }
      })
    },
    back() {},
  },
  created() {
    this.getApi()
    this.getRow()
    this.getDic()
    this.getDetail()
  },
};
</script>
