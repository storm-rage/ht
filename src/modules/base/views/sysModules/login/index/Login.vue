<template>
    <div class="login">
        <!--    头部组件    -->
        <LoginHeader :routerList="headerList" @resetState="resetState"/>
        <div class="loginBody">
            <!--      左侧内容      -->
            <!--<div class="content">
                <p class="title">供应链金融服务平台</p>
                <p class="theme">融 单</p>
                <p class="attached">金融普惠，与您共享</p>
            </div>-->

            <el-card style="margin: 32px 13.4% 0 0;">
                <!--       标题         -->
                <div ref="loginForm"></div>
                <el-row class="title">登录</el-row>
                <!--     登录表单       -->
                <el-form status-icon ref="userForm" class="demo-ruleForm" :statusIcon="false" :model="userData" :rules="userRules" >
                    <el-form-item prop="loginName">
                        <el-input type="text" v-model="userData.loginName" name="loginName"
                                  placeholder="请输入账户名" size="medium" @focus="inputFocus($event)"
                                  @blur="inputBlur($event)">
                          <div slot="prefix">
                            <img  src="@assets/img/login/account.png">
                          </div>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password" class="zj-m-b-5 password-block">
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
<!--                          <div slot="suffix" @click="changePwdType" style="line-height: 35px">
                            <i class="el-icon-view" v-if="passwordType =='password'"></i>
                            <img  src="@assets/img/login/password-hide.png" style="vertical-align: middle" v-if="passwordType =='text'">
                          </div>-->
                        </el-input>
<!--                      <router-link to="/forgotPassword" class="fr right-text">忘记密码?</router-link>-->
                      <a @click="$router.push('/forgotPassword')"  class="zj-f-r right-text pointer">忘记密码?</a>
                    </el-form-item>
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
                    <el-form-item prop="smsCode" v-if="isOneLogin === '0'" class="login-one">
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
                        <zj-button status="primary" class="loginBtn" @click="submitForm">登录</zj-button>
                    </el-form-item>
                </el-form>
                <!--     注册 与 忘记      -->
                <el-row class="login_pass">
                    <el-checkbox v-model="remember" class="check-text">记住账户名</el-checkbox>
<!--                    <router-link to="/forgotPassword" style="float: right">忘记密码</router-link>-->
<!--                    <router-link to="/register" class="fr right-text">立即注册</router-link>-->
                  <a @click="$router.push('/register')"  class="zj-f-r right-text pointer">立即注册</a>
                </el-row>
                <!--     建议       -->
<!--                <el-row class="advice">
                    安全建议：为了确保您的账户安全，任何情况下请勿将您的登录密码、UKEY交给他人保管或使用，请勿在非信任设备上进行登录。
                </el-row>-->
            </el-card>
        </div>
        <!--    底部组件    -->
        <LoginFooter></LoginFooter>
        <!--    强制修改密码    -->
        <LoginEditPassword ref="editPassword"  :userInfoS="userData" :userSinfo="loginSuccess" @editSuccess="editSuccess"></LoginEditPassword>
        <!--    人脸识别    -->
<!--        <FaceRecognition ref="FaceRecognition" :userInfo="loginSuccess" @resetState="resetState"></FaceRecognition>-->
        <!-- 冻结 -->
       <frozenDialog ref="frozenDialog"></frozenDialog>
    </div>
</template>

<script>
    import login from "./js/login"
    export default login;
</script>
<style lang="less" src="./css/login.less"></style>
<style lang="less" scoped src="./css/login_scoped.less"></style>
