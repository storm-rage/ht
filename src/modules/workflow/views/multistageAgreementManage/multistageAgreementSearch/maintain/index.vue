<template>
  <zj-content-container>
    <zj-top-header title="阶段性协议维护"></zj-top-header>
    <!--  业务申请信息  -->
    <biz-apply-info></biz-apply-info>
    <!--  具体业务信息  -->
    <business-audit></business-audit>
    <!--  阶段性协议信息  -->
    <multistage-agreement></multistage-agreement>
     <!--  审批意见  -->
    <audit-remark></audit-remark>
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

export default {
  components: {
    BizApplyInfo,
    multistageAgreement,
    AuditRemark,
    BusinessAudit
  },
  data () {
    return {}
  },
  methods: {
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
  }
};
</script>
