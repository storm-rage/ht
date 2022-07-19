<template>
    <div class="login">
        <!--    头部组件    -->
        <!-- <LoginHeader :routerList="headerList" @resetState="resetState"/> -->
        <div class="loginBody">
            <!--      左侧内容      -->
            <!--<div class="content">
                <p class="title">供应链金融服务平台</p>
                <p class="theme">融 单</p>
                <p class="attached">金融普惠，与您共享</p>
            </div>-->

            <el-card style="margin:0;">
              <login-type v-model="userData.pwdVerifyMode" @change="handleChangeLoginType"></login-type>
                <!--     登录表单       -->
                <el-form status-icon ref="userForm" class="demo-ruleForm" :statusIcon="false" :model="userData" :rules="userRules" >
                  <div style="font-size:16px;" v-if="userData.pwdVerifyMode==='1'">账户</div>
                  <div style="font-size:16px;" v-else>手机号</div>
                    <el-form-item prop="loginName">
                        <el-input type="text" v-model="userData.loginName" name="loginName"
                                  :placeholder="userData.pwdVerifyMode==='1'?'请输入账户名':'请输入手机号'"
                                  :maxlength="userData.pwdVerifyMode==='1'?150:11"
                                  size="medium"
                                  @focus="inputFocus($event)"
                                  @blur="inputBlur($event)">
                          <div slot="prefix">
                            <img  src="@assets/img/login/account.png">
                          </div>
                        </el-input>
                    </el-form-item>
                  <div style="font-size:16px;" v-if="userData.pwdVerifyMode==='1'">密码</div> 
                    <el-form-item prop="password" class="zj-m-b-18 password-block" v-if="userData.pwdVerifyMode==='1'">
                        <el-input v-model="userData.password" placeholder="请输入密码"
                                  size="medium"
                                  @focus="inputFocus($event)"
                                  @blur="inputBlur($event)"
                                  name="password"
                                  :type="passw"
                                  ref="password"
                        >
                          <div slot="prefix">
                            <img  src="@assets/img/login/password.png">
                          </div>
                          <i slot="suffix" :class="icon" :title="passw === 'password' ? '显示密码' : '隐藏密码'" @click="showPass" style="cursor: pointer"/>
                        </el-input>
<!--                      <router-link to="/forgotPassword" class="fr right-text">忘记密码?</router-link>-->
                    </el-form-item>
                    <div style="font-size:16px;">图形验证码</div>
                    <el-form-item prop="captcha">
                        <el-input type="text" v-model="userData.captcha" placeholder="请输入验证码"
                                  :maxlength=4
                                  class="verification" size="medium" @focus="inputFocus($event)"
                                  @blur="inputBlur($event)" name="captcha">
                          <div slot="prefix">
                            <img  src="@assets/img/login/valid-code.png">
                          </div>
                        </el-input>
                        <div class="code" >
                            <img :src="imgCodeString" class="code-img"/>
<!--                            <i class="el-icon-refresh refreshIcon" @click="getCaptcha"></i>-->
                            <label @click="getCaptcha" style="cursor: pointer" class="right-text">
                              看不清楚？换张图片
                              <img src="@assets/img/login/refresh-code.png" class="refreshIcon" style="vertical-align: middle;" >
                            </label>
                        </div>
                    </el-form-item>
                    <!--     当为首次登录时      -->
                    <div style="font-size:16px;" v-if="isOneLogin||userData.pwdVerifyMode==='2'">手机验证码</div>
                    <el-form-item prop="smsCode" v-if="isOneLogin||userData.pwdVerifyMode==='2'" class="login-one">
                        <el-input placeholder="请输入手机验证码" v-model="userData.smsCode" size="medium">
                            <template slot="append">
                                <zj-button
                                        class="smsCode"
                                        :class="[isSmsCode ? '' :'jinyong']"
                                        @click="isSmsCode?getSmsCode():''">{{smsText}}
                                </zj-button>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item class="zj-m-t-5" >
                        <vxe-button status="primary" class="loginBtn" @click="submitForm">登录</vxe-button>
                    </el-form-item>
                </el-form>
                <!--     注册 与 忘记      -->
                <el-row class="login_pass">
<!--                    <el-checkbox v-model="remember" class="check-text">记住账户名</el-checkbox>-->
<!--                    <router-link to="/forgotPassword" class="zj-f-r right-text">忘记密码？</router-link>-->
                  <a @click="$router.push('/register')"  class="zj-f-l right-text pointer">立即注册</a>
                  <a @click="$router.push('/forgotPassword')"  class="zj-f-r right-text pointer">忘记密码</a>
                </el-row>
            </el-card>
            <div class="fooTer">
                <div class="logTop">
                  <span>关于</span>
                  <div>|</div>
                  <span>帮助中心</span>
                  <div>|</div>
                  <span>公司主页</span>
                  <div>|</div>
                  <span>联系我们</span>
                </div>
                <div class="logBottom">@2021 海天</div>
            </div>
        </div>
        
        <!--    底部组件    -->
        <!-- <LoginFooter></LoginFooter> -->
        <!--    强制修改密码    -->
        <LoginEditPassword ref="editPassword"  :userInfoS="userData" :userSinfo="loginSuccess" @editSuccess="editSuccess"></LoginEditPassword>
        <!-- 冻结 -->
       <frozenDialog ref="frozenDialog"></frozenDialog>
    </div>
</template>

<script>
    import login from "./js/login"
    export default login;
</script>
<style lang="less" scoped>
/*覆写样式*/
.loginBody /deep/ .el-link.el-link--primary {
    padding: 0!important;
    border-bottom: 3px solid #165DFF;
    color: #165DFF; }
.fooTer{
  position: absolute;
  bottom: 0px;
  right: 0;
  width: 35%;
  height: 15%;
  background: #EDF4FB;
  min-width: 370px;
  .logTop{
    width: 100%;
    height: 80%;
    padding: 20px 60px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    span{
      font-size: 16px;
      color:#303133;
    }
    div{
      color: #DCDFE6;
    }
  }
  .logBottom{
    width: 100%;
    font-size: 14px;
    color: #909399;
    text-align: center;
    position: absolute;
    bottom: 10px;
  }
}
</style>
<style lang="less" src="./css/login.less"></style>
<style lang="less" scoped src="./css/login_scoped.less"></style>
