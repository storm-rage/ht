<template>
  <zj-content-container>
    <!--  融资复核管理  -->
    <el-tabs v-model="tabs" class="zj-tabs-card zj-p-l-16 zj-p-r-16">
      <el-tab-pane label="待办" name="toDo" >
        <to-do :zjControl="zjControl" :mDictionary="mDictionary" :mBtn="zjBtn"/>
      </el-tab-pane>
      <el-tab-pane label="已办" name="done" >
        <done :zjControl="zjControl" :mDictionary="mDictionary" :mBtn="zjBtn"/>
      </el-tab-pane>
      <el-tab-pane label="已办结" name="settle" >
        <settle :zjControl="zjControl" :mDictionary="mDictionary" :mBtn="zjBtn"/>
      </el-tab-pane>
    </el-tabs>

  </zj-content-container>
</template>
<script>
import toDo from "./toDo";
import done from "./done";
import settle from "./settle";
import financingAuditManageWorkflow from "../../api/financingAuditManageWorkflowApi";
export default {
  name: "financingAuditManage",
  components: {
    toDo,done,settle
  },
  data() {
    return {
      zjControl: {
        getAuditDirectory:this.$api.financingAuditManageWorkflow.getAuditDirectory,//数据字典
        getWaitAccountBillDetail:this.$api.financingAuditManageWorkflow.getWaitAccountBillDetail,//待办详情-根据凭证信息获取对账单信息
        getWaitFinancingDetail:this.$api.financingAuditManageWorkflow.getWaitFinancingDetail,//待办详情-申请信息
        getWaitVoucherDetail:this.$api.financingAuditManageWorkflow.getWaitVoucherDetail,//待办详情-融资凭证信息
        submitFirstAudit:this.$api.financingAuditManageWorkflow.submitFirstAudit,//待办详情-保理公司初审提交
        submitReviewAudit:this.$api.financingAuditManageWorkflow.submitReviewAudit,//待办详情-保理公司复审提交
      },
      tradeList: [],
      tabs:'toDo',
      tabAtive:'',
      uDictionary:{},
      mDictionary:{}

    };
  },
  methods: {
    /**
     *
     * @param row
     */
    toContractDetail(row) {
      console.error(row);
      this.$router.push({name: 'businessDetail'});
    },
    /**
     *
     * @param row
     */
    toContractSign(row) {
      console.log(row);
    },
    handleRadioChange({row}) {
      this.tradeList.push({
        field1: '佛山市a有限公司',
        field2: '是',
        field3: '756756756767',
        field4: '非保理',
        field5: '12',
        field6: '1000',
        field7: '2000',
        field8: '正常'
      })
    },
    getApiAfter(){
      this.zjBtn.userInfo ? this.tabAtive = 'orderFinancing' : this.tabAtive = 'voucherFinancing'
    },
    toDetail (row) {
      this.goChild('productInfoManageDetail', row)
    },
    toEdit (row) {
      this.goChild('productInfoManageEdit', row)
    },
    toEditQuota (row) {},
  },
  created() {
    this.getApi()
  }
};
</script>
