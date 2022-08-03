<template>
  <zj-content-container>
    <zj-top-header title="阶段性协议详情"></zj-top-header>
    <!--  业务申请信息  -->
<!--    <biz-apply-info/>-->
    <business-detail :formData="detailData" :zjControl="zjControl"/>
    <!--  阶段性协议信息  -->
<!--    <multistage-agreement/>-->

    <zj-content-footer>
      <zj-button @click="goParent">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>
<script>
import BizApplyInfo from './components/bizApplyInfo';
import multistageAgreement from './components/multistageAgreementDetail';
import AuditRemark from './components/auditRemark';
import businessDetail from './workflow/businessDetail';

export default {
  components: {
    businessDetail
  },
  data () {
    return {
      zjControl: {
        getBackPhasedAgreeInfo:this.$api.multistageAgreementManageWorkflow.getBackPhasedAgreeInfo,//运营端-阶段性协议维护-详情

      },
      detailData: {},
    }
  },
  methods: {
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
          if(flag == 'agree'){
            //this.$router.push({name:'',params:{}})
            console.log('agree')
          }else{
            console.log('refuse')
          }
        }
      })
    },
    back() {},
  },
  created() {
    this.getApi()
    this.getRow()
    this.getDetail()
  }
};
</script>
