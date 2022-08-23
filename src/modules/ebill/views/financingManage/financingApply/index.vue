<template>
  <zj-content-container>
    <!--  融资申请  -->
    <el-tabs v-model="tabs" class="zj-tabs-card zj-p-l-16 zj-p-r-16">
      <el-tab-pane label="订单融资" name="orderFinancing" v-if="tabInfo.orderTab">
        <orderFinancing :zjControl="zjControl" :dictionary="dictionary" :uBtn="zjBtn" @nextStepParams="handelNextStepParams"/>
      </el-tab-pane>
      <el-tab-pane label="入库融资/凭证融资" name="voucherFinancing" v-if="tabInfo.billTab || tabInfo.warehouseTab">
        <voucherFinancing :zjControl="zjControl" :dictionary="dictionary" :mBtn="zjBtn" @nextStepParams="handelNextStepParams"/>
      </el-tab-pane>
    </el-tabs>
    <zj-content-footer>
      <zj-button type="primary" @click="toNext">下一步</zj-button>
    </zj-content-footer>

  </zj-content-container>
</template>
<script>
import orderFinancing from "./orderFinancing/orderFinancing";
import voucherFinancing from "./voucherFinancing/voucherFinancing";
import financingApply from "../../../api/financingApplyApi";
export default {
  name: "financingManage",
  components: {
    orderFinancing,voucherFinancing
  },
  data() {
    return {
      zjControl: {
        downloadFinancAgreeTemplate:this.$api.financingApply.downloadFinancAgreeTemplate,//下载融资协议
        getDirectory:this.$api.financingApply.getDirectory,//数据字典
        getFinancingApplyBillDetail:this.$api.financingApply.getFinancingApplyBillDetail,//入库/凭证融资详情
        getFinancingApplyOrderDetail:this.$api.financingApply.getFinancingApplyOrderDetail,//订单融资详情
        getFinancingApplyTab:this.$api.financingApply.getFinancingApplyTab,//获取tab
        getOrderFinancingCredit:this.$api.financingApply.getOrderFinancingCredit,//获取贸易关系列表
        getPhasedAgreement:this.$api.financingApply.getPhasedAgreement,//获取阶段性协议列表
        queryFinancingApplyBillPage:this.$api.financingApply.queryFinancingApplyBillPage,//获取入库融资/凭证融资列表
        submitFinancingBillApply:this.$api.financingApply.submitFinancingBillApply,//入库/凭证融资提交
        submitFinancingOrderApply:this.$api.financingApply.submitFinancingOrderApply,//订单融资提交
        downloadFile:this.$api.baseCommon.downloadFile,
      },
      tabs:'orderFinancing',
      dictionary:{},
      nextStepParams:{},
      tabInfo: {
        orderTab: '',//订单融资Tab:0-不展示 1-展示
        billTab: '',//凭证融资Tab:0-不展示 1-展示
        warehouseTab: '',//入库融资Tab:0-不展示 1-展示
      },

    };
  },
  methods: {
    getDic() {
      this.zjControl.getDirectory().then(res=>{
        this.dictionary = res.data
      })
    },
    getTabInfo() {
      this.zjControl.getFinancingApplyTab().then(res=>{
        this.tabInfo = res.data
      })
    },
    getApiAfter(){
      this.zjBtn.userInfo ? this.tabAtive = 'orderFinancing' : this.tabAtive = 'voucherFinancing'
    },
    toNext() {
      console.log(JSON.stringify(this.nextStepParams))
      if(this.tabs === 'orderFinancing') {

        this.goChild('orderFinancingDetail', {buyerId: this.nextStepParams.buyerId})
      }
      if(this.tabs === 'voucherFinancing') {
        this.goChild('voucherFinancingDetail', {...this.nextStepParams})
      }
    },
    handelNextStepParams(val) {
      this.nextStepParams = {...val}
    },
  },
  created() {
    this.getApi()
    this.getDic()
    this.getTabInfo()
  }
};
</script>
<!-- 公共样式 -->
<style lang="less">


</style>
