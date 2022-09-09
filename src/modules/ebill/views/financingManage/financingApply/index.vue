<template>
  <zj-content-container>
    <!--  融资申请  -->
    <el-tabs v-model="tabs" class="zj-tabs-card zj-p-l-16 zj-p-r-16" @tab-click="tabHandle">
      <el-tab-pane label="订单融资" name="orderTab" v-if="tabInfo.orderTab">
        <orderFinancing :zjControl="zjControl" :dictionary="dictionary" :uBtn="zjBtn" @nextStepParams="handelNextStepParams"/>
      </el-tab-pane>
      <el-tab-pane label="入库融资/凭证融资" name="billTab" v-if="tabInfo.billTab || tabInfo.warehouseTab">
        <keep-alive>
          <voucherFinancing :zjControl="zjControl" :dictionary="dictionary" :mBtn="zjBtn" @nextStepParams="handelNextStepParams"/>
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
    <zj-content-footer>
      <zj-button type="primary" @click="toNext" v-if="tabInfo.orderTab !== '' || tabInfo.billTab !== '' || tabInfo.warehouseTab !== ''">下一步</zj-button>
    </zj-content-footer>

  </zj-content-container>
</template>
<script>
import orderFinancing from "./orderFinancing/orderFinancing";
import voucherFinancing from "./voucherFinancing/voucherFinancing";
import financingApply from "../../../api/financingApplyApi";
import {windowSSStorage} from "@utils/storageUtils";
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
      tabs:'orderTab',
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
        // for(let key in res.data) {
        //   if(res.data[key] === '1') {
        //     this.tabs = key
        //     break
        //   }
        // }
        console.log(this.tabs)
      })
    },
    getApiAfter(){
      this.zjBtn.userInfo ? this.tabAtive = 'orderFinancing' : this.tabAtive = 'voucherFinancing'
    },
    toNext() {
      console.log(JSON.stringify(this.nextStepParams))
      if(this.tabs === 'orderTab') {
        this.goChild('orderFinancingDetail', {buyerId: this.nextStepParams.buyerId})
      }
      if(this.tabs === 'billTab') {
        if(this.nextStepParams.nextStepFlag) {
          this.$message.error('请选择到期日为同一天的凭证！')
          return
        }
        if(this.nextStepParams.entId && this.nextStepParams.idList && this.nextStepParams.idList.length) {
          this.goChild('voucherFinancingDetail', {...this.nextStepParams})
        } else if(this.nextStepParams.entId && !this.nextStepParams.idList) {
          this.$message.error('请选择凭证信息!')
        } else if(!this.nextStepParams.entId) {
          this.$message.error(`请选择${this.$store.getters['user/productName']}开单人/转让企业，并选择凭证信息!`)
        }
      }
    },
    handelNextStepParams(val) {
      this.nextStepParams = {...val}
    },
    tableLocal() {
      if(windowSSStorage.getItem('task') !== null) {
        this.tabs = windowSSStorage.getItem('task')
      }
    },
    tabHandle(tab) {
      windowSSStorage.setItem('task',tab.name)
    },
  },
  created() {
    this.getApi()
    this.getDic()
    this.getTabInfo()
  },
  mounted() {
    this.tableLocal()
  }
};
</script>
<!-- 公共样式 -->
<style lang="less">


</style>
