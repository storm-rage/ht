<template>
    <div class="login">
        <div class="loginBody">
            <div class="right-content" :class="{'is-one-login': isOneLogin}">
              <div class="main-content">
                <!--    登录头部          -->
                <ht-login-header></ht-login-header>
                <!--      切换登录类型        -->
                <login-type v-model="userData.pwdVerifyMode" @change="handleChangeLoginType" :is-one-login="isOneLogin"></login-type>
                <!--     登录表单       -->
                <el-form status-icon ref="userForm" class="login-form" :statusIcon="false" :model="userData" :rules="userRules" >
                  <div class="form-item-title" v-if="userData.pwdVerifyMode==='1'">账户</div>
                  <div class="form-item-title" v-else>手机号</div>
                  <el-form-item prop="loginName">
                    <el-input type="text" v-model="userData.loginName" name="loginName"
                              :placeholder="userData.pwdVerifyMode==='1'?'请输入账户名':'请输入手机号'"
                              :maxlength="userData.pwdVerifyMode==='1'?150:11"
                              size="medium"
                              @focus="inputFocus($event)"
                              @blur="inputBlur($event)">
                    </el-input>
                  </el-form-item>
                  <div class="form-item-title" v-if="userData.pwdVerifyMode==='1'">密码</div>
                  <el-form-item prop="password" class="zj-m-b-18 password-block" v-if="userData.pwdVerifyMode==='1'">
                    <el-input v-model="userData.password" placeholder="请输入密码"
                              size="medium"
                              @focus="inputFocus($event)"
                              @blur="inputBlur($event)"
                              name="password"
                              :type="passw"
                              ref="password"
                    >
                      <i slot="suffix" :class="icon" :title="passw === 'password' ? '显示密码' : '隐藏密码'" @click="showPass" style="cursor: pointer"/>
                    </el-input>
                  </el-form-item>
                  <!--     当为首次登录时      -->
                  <div class="form-item-title" v-if="isOneLogin||userData.pwdVerifyMode==='2'">手机验证码</div>
                  <el-form-item prop="smsCode" v-if="isOneLogin||userData.pwdVerifyMode==='2'" class="login-code">
                    <el-input class="left-el-input" placeholder="请输入手机验证码" v-model="userData.smsCode" size="medium">
                    </el-input>
                    <div class="sms-code">
                      <zj-button
                        class="sms-code-btn"
                        size="medium"
                        style="width: 100%;font-size: 12px;"
                        :class="[isSmsCode ? '' :'sms-code-btn--disabled']"
                        @click="isSmsCode?getSmsCode():''">{{smsText}}
                      </zj-button>
                    </div>
                  </el-form-item>
                  <div class="form-item-title">图形验证码</div>
                  <el-form-item prop="captcha">
                    <el-input type="text" v-model="userData.captcha" placeholder="请输入验证码"
                              :maxlength=4
                              class="left-el-input" size="medium" @focus="inputFocus($event)"
                              @blur="inputBlur($event)" name="captcha">
                    </el-input>
                    <div class="code" >
                      <img :src="imgCodeString" @click="getCaptcha" class="code-img"/>
                    </div>
                  </el-form-item>
                  <el-form-item class="login-btn-form">
                    <el-button class="loginBtn" type="primary" @click="submitForm">登录</el-button>
                  </el-form-item>
                </el-form>
                <!--     注册 与 忘记      -->
                <el-row class="login_pass">
                  <a @click="$router.push('/register')"  class="zj-f-l right-text primary">立即注册</a>
                  <a @click="$router.push('/forgotPassword')"  class="zj-f-r right-text">忘记密码？</a>
                </el-row>
              </div>
              <!--      底部信息      -->
              <ht-login-footer></ht-login-footer>
            </div>
        </div>
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
<style lang="less" src="./css/login.less"></style>
<style lang="less" scoped src="./css/login_scoped.less"></style>
