<template>
  <div id="loginAgreementSign">
     <!--  头部  -->
    <LoginHeader ref="header" class="customer-login-header"/>
    <!-- 主体部分   -->
    <content-body :user-infos="userInfos"></content-body>
    <!--  底部  -->
    <LoginFooter ref="footer" class="customer-login-footer"/>
  </div>
</template>
<script>
import LoginHeader from '../components/LoginHeader'
import LoginFooter from '../components/LoginFooter'
import ContentBody from './contentBody';
export default {
  components: {
    LoginHeader,
    LoginFooter,
    ContentBody
  },
  data() {
    return {
      // 切换企业之类传递参数
      userInfos: {},
    }
  },
  mounted() {
    this.getRow()
    this.userInfos = Object.assign({},this.row)
  },
  beforeRouteLeave(to,from,next){
    if(to.name !== 'signAgreement'){
      this.removeRow();
    }
    next()
  }
};
</script>
<style lang="less">
#loginAgreementSign{
  width: 100%;
  height: 100%;
  background-color: white;
  min-width: 900px;
  min-height: 720px;
  z-index: 9;
  //头部
  .customer-login-header{
    position: relative;
    top: 0;
  }
  //底部
  .customer-login-footer{
    position: relative;
    bottom: 0;
  }
}
</style>
