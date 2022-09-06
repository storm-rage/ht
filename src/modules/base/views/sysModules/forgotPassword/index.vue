<template>
<div id="forgotPassword">
  <RegisterHeader :close="false" :register="false"/>
  <div class="forgotMain">
    <div class="body">
      <el-card>
        <el-row class="body-card-header">忘记密码</el-row>
        <el-form ref="form" :model="form" class="form" :rules="rules" label-width="100px">
          <el-form-item prop="phone" label="手机号">
            <el-input v-model="form.phone" placeholder="请输入手机号" maxLength="11" @input="changePhoneFlag">
              <vxe-button slot="append" :disabled="form.phoneFlag"
                         :status="form.phoneFlag ? 'info' : 'primary'"
                         @click="sendPhoneCode"
              >
                {{form.phoneText}}
              </vxe-button>
            </el-input>
          </el-form-item>
          <el-form-item prop="msgCode" label="验证码">
            <el-input v-model="form.msgCode" placeholder="请输入6位数验证码" maxLength="6" @blur="validateCode"/>
          </el-form-item>
          <el-form-item prop="newPassword" label="设置新密码" class="pass">
            <el-input v-model="form.newPassword" placeholder="请设置新密码"
                      :disabled="form.passFlag" :title="form.passFlag ? '请输入登录名进行检测' : ''"
                      :show-password="true" clearable
            /><i class="el-icon-success some-pwd" v-show="form.newPassword && form.againNewPassword && form.newPassword == form.againNewPassword"></i>
            <p class="pmes no-cur">
            <span>
              8-20位英文字母加数字，可含有标点符号，注意区分大小写。不能与初始密码相同
            </span>
            </p>
          </el-form-item>
          <el-form-item prop="againNewPassword" label="确认新密码" class="pass">
            <el-input v-model="form.againNewPassword" placeholder="请再次输入新密码"
                      :disabled="form.passFlag" :title="form.passFlag ? '请输入登录名进行检测' : ''"
                      :show-password="true" clearable
            /><i class="el-icon-success some-pwd" v-show="form.newPassword && form.againNewPassword && form.newPassword == form.againNewPassword""></i>
          </el-form-item>
          <el-row class="zj-center">
            <zj-button style="width: 100px" :type="form.saveFlag ? 'info' : 'primary'" @click="saveNewPassword"
                       :disabled="form.saveFlag" :title="form.saveFlag ? '请确认您的新密码' : ''"
                       :show-password="true"
            >
              提交
            </zj-button>
          </el-row>
        </el-form>
      </el-card>
    </div>
  </div>

  <RegisterFooter/>
</div>
</template>

<script>
    import RegisterHeader from "../register/register/components/RegisterHeader.vue";
    import RegisterFooter from "../register/register/components/RegisterFooter.vue";
    const phoneReg = /^((\(\d{3}\))|(\d{3}\u002d))?(1[3456789]\d{9})$/i;
    export default {
        name: "index",
        components:{
          RegisterHeader,
          RegisterFooter
        },
        data(){
          return {
            zjControl:{
              sendPhoneCode:this.$api.forgotPassword.sendPhoneCode,//1发送手机验证码
              validateCode:this.$api.forgotPassword.validateCode,//2校验手机验证码
              validateUser:this.$api.forgotPassword.validateUser,//3校验手机号和登录账号是否匹配
              saveNewPassword:this.$api.forgotPassword.saveNewPassword//4保存新密码
            },
            form:{
              phone:'',//手机号码
              oldPhone:'',//当发送一次手机验证码后进行校验
              phoneFlag:true, //是否禁用发送验证码
              phoneText:'发送验证码',//按钮显示文字
              sendFlag:false,//是否正在进行倒计时

              msgCode:'',//验证码
              msgFlag:true,//是否禁止输入登录名

              userId:'',//用户id
              passFlag:true,//是否禁止输入密码

              newPassword:'',//新密码
              againNewPassword:'',//再次输入新密码
              saveFlag:true, //是否禁止提交
            },
            rules:{
              phone:[{ required: true,validator:(rule, value, callback) => {
                    if (!value && rule.required) {
                      this.form.phoneFlag = true //禁用
                      callback(new Error('请输入手机号码'))
                    } else if (value && !phoneReg.test(value)) {
                      this.form.phoneFlag = true //禁用
                      callback(new Error('手机号码格式不正确'))
                    } else {
                      if(phoneReg.test(value) && !this.form.sendFlag){
                        this.form.phoneFlag = false //启用
                      }
                      callback()
                    }
                },trigger: 'blur'}],
              msgCode:[
                { required: true,validator:(rule, value, callback) => {
                    if (!value && rule.required) {
                      callback(new Error('请输入验证码'))
                    }else if(value && value.length !== 6){
                      callback(new Error('请输入6位验证码'))
                    }else{
                      callback()
                    }
                  },trigger: 'blur'
                }
              ],
              newPassword:[
                {required: true,validator:(rule,value,callback) => {
                    let num = new RegExp(/[\d]+/)
                    let eng = new RegExp(/[a-zA-Z]+/)
                    let cnReg = new RegExp(/[\u4E00-\u9fA5]+/g)
                    if (!value && rule.required) {
                      this.form.saveFlag = true //不可提交
                      callback(new Error('请输入新密码'))
                    }
                    else if(value && (value.length < 8 || value.length > 20)){
                      this.form.saveFlag = true //不可提交
                      callback(new Error('新密码为8-20位英文加数字，可含有标点符号'))
                    }
                    else if(value && cnReg.test(value)){
                      this.form.saveFlag = true //不可提交
                      callback(new Error('新密码格式不正确'))
                    }
                    else if (value && (!num.test(value) || !eng.test(value)) ) {
                      callback(new Error('新密码必须包含数字、英文'));
                    } else{
                      this.form.saveFlag = false //可提交
                      callback()
                    }
                },trigger: 'change'}
              ],
              againNewPassword:[
                {required: true,validator:(rule,value,callback) => {
                  if(!value && !rule.required){
                    this.form.saveFlag = true //不可提交
                    callback(new Error('请再次输入新密码'))
                  }else if(value !== this.form.newPassword){
                    this.form.saveFlag = true //不可提交
                    callback(new Error('两次输入的密码不一致'))
                  }else{
                    this.form.saveFlag = false //可提交
                    callback()
                  }
                },trigger: 'change'}
              ]
            },

            //是否可以获取邮箱
            isEmail:false
          }
        },
        methods:{
          //验证码-失败清空
          msgCodeErrorClear(){
            this.form.newPassword = ''
            this.form.againNewPassword = ''
            this.form.msgFlag = true //禁止输入登录名
            this.form.passFlag = true
            this.form.saveFlag = true
            this.isEmail = false
            this.$refs.form.clearValidate('newPassword')
            this.$refs.form.clearValidate('againNewPassword')
          },
          //登录账号-失败清空
          loginNameErrorClear(){
            this.form.newPassword = ''
            this.form.againNewPassword = ''
            this.form.passFlag = true
            this.form.saveFlag = true
            this.$refs.form.clearValidate('newPassword')
            this.$refs.form.clearValidate('againNewPassword')
          },
          changePhoneFlag () {
            if (this.form.phone && phoneReg.test(this.form.phone) && !this.form.sendFlag) {
              this.form.phoneFlag = false //启用
            } else {
              this.form.phoneFlag = true //启用
            }
          },
          //1.发送手机验证码
          sendPhoneCode(){
            let {phone} = this.form
            let params = {
              phone
            }
            this.zjControl.sendPhoneCode(params).then(res=>{
              this.$message.success('验证码已成功发送，请注意查收')
              this.form.phoneFlag = true //禁用
              this.form.sendFlag = true //启用倒计时标识
              this.form.userId = res.data.userId
              //启用倒计时
              let sum = 30
              let codeTime = setInterval(() => {
                if(sum <= 0){
                  this.form.phoneText = '发送验证码'
                  this.form.phoneFlag = false //启用
                  this.form.sendFlag = false //关闭倒计时标识
                  clearInterval(codeTime)
                }else{
                  this.form.phoneText ='重新获取验证码(' + sum + ')'
                  sum --
                }
              },1000)
            })
            this.zjControl.validateUser(params).then(res=> {
              this.form.userId = res.data.userId
            })
          },
          //2.校验手机验证码
          validateCode(){
            if(!this.form.msgCode){
              /*this.$messageBox({
                type:'info',
                content:'请输入验证码'
              })*/
              this.msgCodeErrorClear()
              return
            }
            if(!/^((\(\d{3}\))|(\d{3}\u002d))?(1[3456789]\d{9})$/i.test(this.form.phone)){return}
            let {msgCode} = this.form
            let params = {
              msgCode
            }
            this.zjControl.validateCode(params).then(res => {
                this.form.passFlag = false //允许输入新密码
                this.form.userId = res.data.userId

                this.isEmail = true
            }).catch(() => {
              this.msgCodeErrorClear()
            })
          },
          //4.保存新密码
          saveNewPassword(){
            if(!this.notEmptyCheck('form','rules')){return}
            let {msgCode,newPassword,userId} = this.form
            let params = {
              msgCode,newPassword,userId
            }
            this.$refs.form.validate(boo => {
              if(!boo){return}
              this.zjControl.saveNewPassword(params).then(() => {
                this.$messageBox({
                  type: 'success',
                  content: '密码修改成功！',
                  title: '提示',
                  showConfirmButton: true,
                  center: true
                })
                //重置
                for(let key in this.form){
                  if(typeof(this.form[key]) === 'boolean'){
                    if(key === 'sendFlag'){
                      this.form[key] = false
                    }else{
                      this.form[key] = true
                    }
                  }else{
                    if(key === 'phoneText'){
                      this.form[key] = '发送验证码'
                    }else{
                      this.form[key] = ''
                    }
                  }
                }
                this.$refs.form.clearValidate()
                this.$nextTick(() => {
                  this.$refs.form.clearValidate()
                })
              })
            })
          },
        }
    }
</script>

<style lang="less">
#forgotPassword{
  position: relative;
  .LoginHeader{
    position: relative;
    top: 0;
  }
  .forgotMain{
    background: #F9F9F9;
    height: calc(100% - 68px - 149px);
    display: flex;
    justify-content: center;
    align-items: center;
    .body{
      position: relative;
      width: 700px;
      .body-card-header{
        border-bottom: 1px solid silver;
        padding: 10px 0;
        margin-bottom: 15px;
        font-size: 16px;
        color: silver;
      }
      .form{
        width: 432px;
        margin: auto;
        .el-form-item{
          &.pass{
            &.is-error{
              margin-bottom: 28px;
            }
            .some-pwd {
              color: #67c23a;
              font-size: 16px;
              vertical-align: middle;
              position: absolute;
              left: calc(100% + 3px);
              top: 7px;
            }
          }
          .el-input{
            width: 100%!important;
          }
        }
        .el-form-item__label{
          color: silver;
        }
        .pmes{
          /*margin-left: 92px;*/
          color: silver;
          font-size: 12px;
          line-height: 1.3;
          padding-top: 3px;
          &.no-cur{
            span{
              cursor: default!important;
            }
          }
          span{
            cursor: pointer;
          }
          i{
            color: #409eff;
          }
        }
        .el-input{
          /*width: 100%;*/
          .el-input-group__append{
            padding: 0;
            border: none;
            .vxe-button{
              border-radius: 0;
            }
          }
        }
      }
    }
  }

  .sw_footer{
    position: relative;
    bottom: 0;
  }
}
</style>
