<template>
  <zj-content-container>
    <zj-top-header title="阶段性协议维护"></zj-top-header>
    <!--  具体业务信息  -->
    <business-audit :rowData="row" :formData="detailData"/>
    <!--  阶段性协议信息  -->
    <multistage-agreement :rowData="row" :tableData="detailData" :dictionary="dictionary" :zjControl="zjControl" @handleAgreementList="agreementChange"/>
    <zj-content-footer>
      <zj-button type="primary" @click="submit('提交')">确认提交</zj-button>
      <zj-button @click="goParent">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>
<script>
import multistageAgreement from '@modules/workflow/views/multistageAgreementManage/multistageAgreementSearch/maintain/components/multistageAgreement';
import BusinessAudit from '@modules/workflow/views/multistageAgreementManage/multistageAgreementSearch/maintain/workflow/businessAudit.vue';

export default {
  components: {
    multistageAgreement,
    BusinessAudit
  },
  data () {
    return {
      zjControl: {
        deletePhasedAgree:this.$api.multistageAgreementManageWorkflow.deletePhasedAgree,//运营端-阶段性协议维护-阶段性协议-删除
        deleteWaitPhasedAgree:this.$api.multistageAgreementManageWorkflow.deleteWaitPhasedAgree,//运营端-阶段性协议维护-阶段性协议-删除
        getAddDetail:this.$api.multistageAgreementManageWorkflow.getAddDetail,//运营端-阶段性协议维护-阶段性协议维护详情
        getBackPhasedAgreeInfo:this.$api.multistageAgreementManageWorkflow.getBackPhasedAgreeInfo,//运营端-阶段性协议维护-详情
        getWaitPhasedAgreeInfo:this.$api.multistageAgreementManageWorkflow.getWaitPhasedAgreeInfo,//运营端-阶段性协议维护-详情
        queryBackPhasedAgreePage:this.$api.multistageAgreementManageWorkflow.queryBackPhasedAgreePage,//运营端-阶段性协议-列表查询
        savePhasedAgree:this.$api.multistageAgreementManageWorkflow.savePhasedAgree,//运营端-阶段性协议维护-阶段性协议-保存
        saveWaitPhasedAgree:this.$api.multistageAgreementManageWorkflow.saveWaitPhasedAgree,//待办-阶段性协议维护-阶段性协议-保存
        submitBackPhasedAgree:this.$api.multistageAgreementManageWorkflow.submitBackPhasedAgree,//运营端-阶段性协议维护-阶段性协议-确认提交
        submitWaitBackPhasedAgree:this.$api.multistageAgreementManageWorkflow.submitWaitBackPhasedAgree,//待办-阶段性协议维护-阶段性协议-确认提交
        downLoadFile:this.$api.baseCommon.downloadFile,
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
        maintainType: '1',//0-待办维护 1-保理公司直接维护,现仅阶段性维护跳转给row加maintainType
        // maintainType: this.row.maintainType?this.row.maintainType:'0',//0-待办维护 1-保理公司直接维护,现仅阶段性维护跳转给row加maintainType
        sellerId: this.row.sellerId,
        sellerName: this.row.sellerName,
        serialNo: this.row.serialNo,
      }
      // let requestUrl = this.row.maintainType=='1'?this.zjControl.getBackPhasedAgreeInfo:this.zjControl.getWaitPhasedAgreeInfo
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
      if(flag=='1' && !this.rejectReason) {
        this.$message.error('请填写审核意见')
      }
      if(isHaveFinancingAgreement || flag==='拒绝') {
        let params = {
          busTradeId: this.row.busTradeId,
          applyId: this.detailData.businessApplyInfo?.applyId,//申请记录id：保理公司直接维护时不需要传
          operateFlag: flag==='提交'?'0':'1',//0-确认提交 1-拒绝
          phasedIdList: [...idList],
          rejectReason: this.rejectReason,
          serialNo: this.detailData.businessApplyInfo?.serialNo,//申请流水号：保理公司直接维护时不需要传
        }
        // let requestUrl = this.row.maintainType=='1'?this.zjControl.submitBackPhasedAgree:this.zjControl.submitWaitBackPhasedAgree
        this.$messageBox({
          type:'info',
          title:'温馨提示',
          content:`是否确认${flag}？`,
          showCancelButton: true,
          messageResolve:()=>{
            this.zjControl.submitBackPhasedAgree(params).then(res=>{
              this.getDetail()
              this.$message.success(res.msg)
              this.goParent()
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
