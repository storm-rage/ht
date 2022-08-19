<template>
  <zj-content-container>
    <zj-top-header title="阶段性协议维护"></zj-top-header>
    <!--  业务申请信息  -->
    <biz-apply-info :formData="detailData.businessApplyInfo" :dictionary="dictionary"/>
    <!--  具体业务信息  -->
    <business-audit :formData="detailData"/>
    <!--  阶段性协议信息  -->
    <multistage-agreement :tableData="detailData" :dictionary="dictionary" :zjControl="zjControl" @handleAgreementList="agreementChange"/>
     <!--  审批意见  -->
    <audit-remark @reject="reject"/>
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
        getAddDetail:this.$api.multistageAgreementManageWorkflow.getAddDetail,//运营端-阶段性协议维护-阶段性协议维护详情
        getBackPhasedAgreeInfo:this.$api.multistageAgreementManageWorkflow.getBackPhasedAgreeInfo,//运营端-阶段性协议维护-详情
        queryBackPhasedAgreePage:this.$api.multistageAgreementManageWorkflow.queryBackPhasedAgreePage,//运营端-阶段性协议-列表查询
        savePhasedAgree:this.$api.multistageAgreementManageWorkflow.savePhasedAgree,//运营端-阶段性协议维护-阶段性协议-保存
        submitBackPhasedAgree:this.$api.multistageAgreementManageWorkflow.submitBackPhasedAgree,//运营端-阶段性协议维护-阶段性协议-确认提交

        getBackPhasedAgreeDirectory:this.$api.multistageAgreementManageWorkflow.getBackPhasedAgreeDirectory,//阶段性协议管理-数据字典
        uploadFile:this.$api.baseCommon.uploadFile,
      },
      detailData: {},
      dictionary: {},
      phasedIdList: [],//阶段性协议列表id合集
      rejectReason: '',//拒绝原因
    }
  },
  methods: {
    getDic() {
      this.zjControl.getBackPhasedAgreeDirectory().then(res=>{
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
    agreementChange() {
      this.getDetail()
    },
    reject(val) {
      this.rejectReason = val
    },
    submit(flag) {
      let idList = []
      if(this.detailData.phasedAgreementList) {
        for(let i of this.detailData.phasedAgreementList) {
          idList.push(i.phasedId)
        }
      }
      //判断是否有一条协议状态为可融资
      let isHaveFinancingAgreement = this.detailData.phasedAgreementList?this.detailData.phasedAgreementList.some(i=>{return i.agreementStatus === '1'}):false
      if(isHaveFinancingAgreement) {
        let params = {
          applyId: this.detailData.businessApplyInfo.applyId,//申请记录id：保理公司直接维护时不需要传
          operateFlag: flag==='提交'?'0':'1',//0-确认提交 1-拒绝
          phasedIdList: [...idList],
          rejectReason: this.rejectReason,
          serialNo: this.detailData.businessApplyInfo.serialNo,//申请流水号：保理公司直接维护时不需要传
        }
        this.$messageBox({
          type:'info',
          title:'温馨提示',
          content:`是否确认${flag}？`,
          showCancelButton: true,
          messageResolve:()=>{
            this.zjControl.submitBackPhasedAgree(params).then(res=>{
              this.getDetail()
              this.$message.success(res.msg)
            })
          }
        })
      }else {
        return this.$message.error('至少维护一条阶段性协议为可融资！')
      }
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
