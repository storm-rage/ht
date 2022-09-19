<template>
  <zj-content-container>
    <zj-top-header title="阶段性协议维护交易详情"></zj-top-header>
    <!--  业务申请信息  -->
    <biz-apply-info :formData="detailData.businessApplyInfo" :dictionary="dictionary"/>
    <business-detail :formData="detailData" :zjControl="zjControl" :rowData="row" />
    <!--  贸易合同附件  -->
    <trade-contract-atta :tableData="detailData.contractInfoList" :dictionary="dictionary"/>
    <!-- <operator-log :tableData="[]" :dictionary="dictionary"/> -->

    <zj-content-footer>
      <zj-button @click="goParent">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>
<script>
import BizApplyInfo from './components/bizApplyInfo';
import tradeContractAtta from './components/tradeContractAtta';
// import operatorLog from './components/operatorLog';
import businessDetail from './workflow/businessDetail';

export default {
  components: {
    BizApplyInfo,
    tradeContractAtta,
    businessDetail,
    // operatorLog,
  },
  data () {
    return {
      zjControl: {
        getBackPhasedAgreeInfo:this.$api.multistageAgreementManageWorkflow.getBackPhasedAgreeInfo,//运营端-阶段性协议维护-详情

        getPhasedAgreeDirectory:this.$api.agreementManage.getPhasedAgreeDirectory,//阶段性协议管理-数据字典
        queryBasePhasedAgreePage:this.$api.multistageAgreementManageWorkflow.queryBasePhasedAgreePage,// 运营端-阶段性协议信息列表查询
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
      window.console.log('row', this.row);
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
          if(flag == 'agree'){
            //this.$router.push({name:'',params:{}})
            console.log('agree')
          }else{
            console.log('refuse')
          }
        }
      })
    },
  },
  created() {
    this.getApi()
    this.getRow()
    this.getDic()
    this.getDetail()
  }
};
</script>
