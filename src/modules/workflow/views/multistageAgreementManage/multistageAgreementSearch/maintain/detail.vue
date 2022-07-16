<template>
  <zj-content-container>
    <zj-top-header title="阶段性协议详情"></zj-top-header>
    <!--  业务申请信息  -->
<!--    <biz-apply-info/>-->
    <business-detail/>
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
