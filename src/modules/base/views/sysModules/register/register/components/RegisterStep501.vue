<template>
  <div class="register">
    <RegisterHeader/>
    <div class="register-inline">
<!--      <div class="register-tip">-->
<!--        <div class="register-tip-icon"></div>-->
<!--        <span class="zj-m-l-5">提示：如果您已经申请注册，可录入企业名称和注册使用的手机号查看注册进度以及下载资料。</span>-->
<!--      </div>-->
      <register-progress-bar :active="5"></register-progress-bar>
      <div class="register-msg">
        <div class="fa fa-circle register-point success-point"></div>
        <div class="zj-inline">
          您已注册成功，密码已短信发送至您的注册手机号，请在登录页面使用用户名和密码进行登录。
        </div>
      </div>
      <div class="zj-center">
        <zj-button @click="zjControl.toLogin">返回登录</zj-button>
      </div>
    </div>
    <RegisterFooter/>
  </div>
</template>

<script>
import RegisterProgressBar from './RegisterProgressBar.vue';
import RegisterHeader from "./RegisterHeader.vue";
import RegisterFooter from "./RegisterFooter.vue";
export default {
  name: 'RegisterStep501',
  components: {
    RegisterProgressBar,RegisterHeader,RegisterFooter
  },
  props: {
    step: String,
    zjControl:Object
  },
}
</script>

<style lang="less" scoped>
.register {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  /*background-color: #EEEEEE;*/
  background-color: #F9F9F9;
  z-index: -9999;
  overflow-y: auto;
}
.sw_footer{
  position: absolute;
  bottom: 0;
}
.register-inline {
  position: relative;
  z-index: -9998;
  width: 800px;
  min-height: 523px;
  margin: 10px auto;
  background: #FFFFFF;
  box-shadow: 0 1px 5px 0 rgba(133,133,133,0.50);
  padding: 20px 0 20px 0;
}
.register-tip {
  background: #E2F1FF;
  border: 1px solid #5494F2;
  width: 553px;
  margin: 0 auto;
  font-size: 12px;
  color: #666666;
  line-height: 16px;
  padding: 3px 10px;
}
.register-tip-icon {
  display: inline-block;
  vertical-align: middle;
  width: 14px;
  height: 14px;
  background: url(~@assets/img/register/icon-tip.png) no-repeat center;
}
.register-msg {
  background: #F4F9FF;
  border: 1px solid #E0E0E0;
  border-radius: 5px;
  margin: 20px 50px;
  padding: 10px 20px;
}
.register-point {
  display: inline-block;
  color: rgb(84, 148, 242);
  vertical-align: top;
  margin-top: 4px;
  margin-right: 5px;
  transform: scale(0.5);
}
.success-point{
    color: rgb(145,212,92);
}
</style>
