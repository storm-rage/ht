<template>
  <zj-content-container>
    <!--  阶段性协议管理  -->
    <zj-content-block>
      <el-tabs v-model="tabs" class="zj-tabs-card zj-p-l-16 zj-p-r-16">
        <el-tab-pane label="阶段性协议维护" name="multistageAgreementMaintain" >
          <multistage-agreement-maintain :zjControl="zjControl" :dictionary="dictionary" @update="handleContractInfo" :mBtn="zjBtn" ref="mulAgreeMaintain"/>
        </el-tab-pane>
        <el-tab-pane label="我的阶段性协议" name="myMultistageAgreement" >
          <my-multistage-agreement :zjControl="zjControl" :dictionary="dictionary" :mBtn="zjBtn"/>
        </el-tab-pane>
      </el-tabs>
    </zj-content-block>
    <zj-content-footer>
      <zj-button type="primary" @click="submit" v-if="tabs === 'multistageAgreementMaintain'" :api="zjBtn.submitPhasedAgree">提交</zj-button>
      <zj-button status="back" @click="back">返回</zj-button>
    </zj-content-footer>

  </zj-content-container>
</template>
<script>
import multistageAgreementMaintain from "./components/multistageAgreementMaintain";
import myMultistageAgreement from "./components/myMultistageAgreement";
import agreementManage from "../../../api/agreementManageApi";
import baseCommon from "../../../../base/api/baseCommonApi";
export default {
  name: "agreementManage",
  components: {
    multistageAgreementMaintain,
    myMultistageAgreement,
  },
  data() {
    return {
      tabs:'multistageAgreementMaintain',
      contractInfo: {},
      zjControl: {
        //企业端
        getPhasedAgreeDirectory:this.$api.agreementManage.getPhasedAgreeDirectory,//企业端-阶段性协议管理-数据字典
        delContract:this.$api.agreementManage.delContract,//企业端-阶段性协议维护-合同删除
        getMyTradeRelationList:this.$api.agreementManage.getMyTradeRelationList,//企业端-我的阶段性协议-贸易关系列表查询
        getMyTradeRelationRecord:this.$api.agreementManage.getMyTradeRelationRecord,//企业端-我的阶段性协议-贸易关系-维护记录列表查询
        getTradeRelationList:this.$api.agreementManage.getTradeRelationList,//企业端-阶段性协议维护-贸易关系列表查询
        getTradeRelationRecordDetail:this.$api.agreementManage.getTradeRelationRecordDetail,//企业端-我的阶段性协议-贸易关系-维护记录-详情
        queryMyPhasedAgreePage:this.$api.agreementManage.queryMyPhasedAgreePage,//企业端-我的阶段性协议-阶段性协议信息列表查询
        queryPhasedAgreePage:this.$api.agreementManage.queryPhasedAgreePage,//企业端-阶段性协议维护-阶段性协议列表查询
        submitPhasedAgree:this.$api.agreementManage.submitPhasedAgree,//企业端-阶段性协议维护-阶段性协议提交
        uploadFile:this.$api.baseCommon.uploadFile,//文件上传
        downloadFile:this.$api.baseCommon.downloadFile,//文件下载
      },
      dictionary:{},
    };
  },
  methods: {
    submit() {
      console.log(JSON.stringify(this.contractInfo))
      let params = {
        busTradeId : this.contractInfo.busTradeId,
        buyerId : this.contractInfo.buyerId,
        buyerName : this.contractInfo.buyerName,
        contractInfoList : this.contractInfo.contractInfoList,
        recordId : this.contractInfo.recordId || '',
        tradeId : this.contractInfo.tradeId,
      }
      this.zjControl.submitPhasedAgree(params).then(res => {
        this.$message.success('提交成功！')
        let rowParams = {
          busTradeId : this.contractInfo.busTradeId,
          coreCompanyName : this.contractInfo.buyerName,
          tradeId : this.contractInfo.tradeId,
          buyerId : this.contractInfo.buyerId,
          buyerName : this.contractInfo.buyerName,
        }
        this.$refs.mulAgreeMaintain.handleRadioChange({row: {...rowParams}})
      })
    },
    handleContractInfo(val) {
      this.contractInfo = {...val}
    },
    back() {},
  },
  created() {
    this.getApi()
  }
};
</script>
<style lang="less" >
.explain-text {
  display: flex;
  padding-bottom: 20px;
  background-color: rgba(2, 167, 240, 0);
  .explain-item {
    color: #555;
    font-size: 14px;
    margin-left: 20px;
  }
}
</style>
