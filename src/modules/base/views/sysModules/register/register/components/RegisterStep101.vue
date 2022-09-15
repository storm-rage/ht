<template>
  <div class="register">
    <RegisterHeader/>
    <div class="registerContent">
      <div class="register-card">
        <div class="register-inline">
          <div class="register-tip" v-if="false">
            <div class="register-tip-icon"></div>
            <span class="zj-m-l-5">提示：如果您已经申请注册，可录入企业名称和注册使用的手机号查看注册进度以及下载资料。</span>
          </div>
          <register-progress-bar :active="1"></register-progress-bar>
        </div>
        <div class="register-white">
          <div class="register-body">
            <zj-top-header title="注冊"/>
            <el-form ref="form" :model="form" :rules="rules" class="register-form" label-width="160px">
              <el-row style="display: flex;margin-bottom: 18px;">
                <el-form-item label="企业名称：" prop="name" style="margin-bottom: 0;">
                  <el-input class="zj-pw-100" v-model="form.name" placeholder="请输入企业名称" @change="nameChange"/>
                </el-form-item>
                <zj-button type="primary" class="zj-f-r zj-m-l-10" @click="checkIsHtEnterprise">确定</zj-button>
              </el-row>
              <el-row v-if="form.name && form.isHtEnterprise !== ''">
                <el-form-item label="统一社会信用代码：" prop="bizLicence" :class="form.isHtEnterprise === '1'?'':'required'">
                  <el-input v-model="form.bizLicence" maxLength="25" placeholder="请输入统一社会信用代码" :disabled="form.isHtEnterprise === '1'"/>
                </el-form-item>
                <el-form-item label="企业法人姓名：" prop="legalPersonName" :class="form.isHtEnterprise === '1'?'':'required'">
                  <el-input v-model="form.legalPersonName" maxLength="50" placeholder="请输入企业法人姓名" :disabled="form.isHtEnterprise === '1'"/>
                </el-form-item>
                <el-form-item label="法人证件类型：" prop="legalCertType" class="zj-inline required">
                  <el-select v-model="form.legalCertType" placeholder="请选择法人证件类型" class="register102-legalCertType"
                             :popper-append-to-body="false"
                  >
                    <el-option
                      v-for="(item, index) in dictionary.userCertTypeList"
                      :key="index"
                      :value="item.code"
                      :label="item.desc"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="法人证件号码：" prop="legalCertNo" class="zj-inline required">
                  <el-input v-model="form.legalCertNo" placeholder="请输入证件号码" maxLength="50" />
                </el-form-item>
                <el-form-item label="银行卡号：" prop="legalBankAccno" :class="form.legalCertType !== '01'?'required':''" v-if="form.legalCertType !== '01'">
                  <el-input v-model="form.legalBankAccno" placeholder="请输入银行卡号" maxLength="50" />
                </el-form-item>
              </el-row>
              <el-row v-if="form.name && form.isHtEnterprise !== ''">
                <el-form-item label="法人手机号码：" prop="registerPhone">
                  <el-input class="zj-inline iphoneCode" v-model="form.registerPhone" placeholder="请填写手机号码" maxLength="11"
                            @input="btnValidateS">
                  </el-input>
                </el-form-item>
                <el-form-item label="验证码：" prop="smsCode">
                  <el-input class="zj-pw-100 smsCode" v-model="form.smsCode" :maxLength="6" placeholder="请输入验证码">
                    <vxe-button
                      slot="append"
                      class="zj-inline sendBtn w100px zj-f-s-10"
                      :status="sendDisabled ? 'info' : 'primary'"
                      :disabled="sendDisabled"
                      @click="send"
                    >
                      <span style="font-weight:unset">{{ sendText }}</span>
                    </vxe-button>
                  </el-input>
                  <p v-if="smsCodeSuccess" class="formTips">
                    <i class="el-icon-success iconSuccess zj-f-s-14"></i>
                    <span class="tipsInfo fs-14">验证码发送成功，请注意查收</span>
                  </p>
                </el-form-item>
              </el-row>
            </el-form>
            <el-row v-if="form.name && form.isHtEnterprise !== ''">
              <el-form label-width="160px">
                <el-form-item>
                  <el-radio-group v-model="isAgreed" @change="checkIsAgreed">
                    <el-radio label="1">我已阅读并同意</el-radio>
                  </el-radio-group>
                  <zj-button type="text" @click="getLicensorAgreement">《注册须知》</zj-button>
                </el-form-item>

              </el-form>
              <el-row class="btn-row">
                <vxe-button :status="nextFlag ? 'primary' : 'info'" :disabled="!nextFlag" @click="next">下一步</vxe-button>
              </el-row>
            </el-row>
          </div>
        </div>
      </div>
    </div>
    <RegisterFooter/>
    <!-- 查看器 -->
    <zj-preview :visible.sync="viewShow" :fileUrl="viewUrl" :showFooter="false" :fileType="viewType" @close="viewShow=false"/>
  </div>

</template>

<script>
import RegisterHeader from "./RegisterHeader.vue";
import RegisterFooter from "./RegisterFooter.vue";
import RegisterProgressBar from './RegisterProgressBar.vue'
import ZjButton from "@pubComponent/button/ZjButton";
import {validateBusinessNo} from "@utils/rules";
import {mapState} from "vuex";
import view from "@pubComponent/preview/view";

export default {
  name: 'RegisterStep101',
  mixins:[view],
  components: {
    ZjButton,
    RegisterProgressBar,RegisterHeader,RegisterFooter
  },
  props: {
    step: String,
    entInfoObj:Object,
    zjControl: Object,
    dictionary: Object,
  },
  data () {
    return {
      //提交的表单
      form:{
        address: '',
        bizLicence: '',
        city: '',
        cityZh: '',
        companyType: '',
        custType: '',
        detailAddress: '',
        entBankInfo: {},
        entBankInfoList: [],
        entContactAddressCity: '',
        entType: '',
        fastMailAddress: '',
        fastMailName: '',
        fastMailPhone: '',
        id: '',
        invoiceAddress: '',
        invoiceBankAccno: '',
        invoiceBankInfo: '',
        invoiceEmail: '',
        invoicePhone: '',
        invoiceTaxpayerId: '',
        isHtEnterprise: '',//是否海天集团/(是否海天一级供应商)：0-否 1-是
        legalCertExpireDate: '',
        legalCertNo: '',
        legalBankAccno: '',//银行卡号，证件类型为非身份证时必填
        legalCertRegDate: '',
        legalCertType: '01',//默认居民身份证
        legalPersonName: '',
        myBuyers: '',
        name: '',
        province: '',
        provinceZh: '',
        registerCapital: '',
        registerEndDate: '',
        registerOperateFlag: '',
        registerPhone: '',
        registerStartDate: '',
        registerWebsite: '',
        scale: '',
        smallPaymentCertAmt: '',
        smsCode:'',
        shortName:'',//企业简称
      },
      //表单校验规则
      rules: {
        name: [
          {required: false, message: '请输入企业名称', trigger: 'change'},
          {validator:this.nameVali, trigger: 'change'}
        ],
        registerPhone: [
          { required: true, message: '请输入法人手机号码'},
          {validator:this.validatePhone, trigger: 'change'}
        ],
        smsCode: [
          { required: true, message: '请输入验证码', trigger: 'change' },
          { validator:this.smsCodeValidate, trigger: 'change'}
        ],
        bizLicence: [
          { message: '请输入统一社会信用代码', trigger: ['blur'] },
          { validator:(rule, value, callback)=>{
              // 营业执照号码或统一社会信用代码格式
              let businessNoReg = /^([0-9a-zA-Z]{15}([0-9a-zA-Z]{3})?)$/
              rule.required = this.form.isHtEnterprise == '0'? true:false
              if (!value && rule.required) {
                callback(new Error('请输入统一社会信用代码'))
              } else if (value && !businessNoReg.test(value)) {
                callback(new Error('统一社会信用代码格式不正确'))
              } else {
                callback()
              }
            },
            trigger: ['blur']
          }
        ],
        legalPersonName: [
          { message: '请输入企业法人姓名', trigger: ['blur'] },
          { validator:(rule, value, callback)=>{
              rule.required = this.form.isHtEnterprise == '0'? true:false
              if (!value && rule.required) {
                callback(new Error('请输入企业法人姓名'))
              } else {
                callback()
              }
            },
            trigger: ['blur']
          },
        ],
        legalCertType: [
          { required: false , message: '请选择法人证件类型', trigger: ['blur'] }
        ],
        legalCertNo: [
          { message: '请输入法人证件号码', trigger: ['blur'] },
          { validator:(rule, value, callback)=>{
              let idReg = /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
              rule.required = this.form.isHtEnterprise == '0'? true:false
              if(rule.required && !value){
                callback(new Error('请输入法人证件号码'))
              }else if(value && this.form && this.form.legalCertType === '01' && !idReg.test(value)){
                callback(new Error('证件号码格式不正确'))
              }else{
                callback()
              }
            },
            trigger: ['blur']
          },
        ],
        legalBankAccno: [
          { message: '请输入银行卡号', trigger: 'blur' },
          { validator:(rule, value, callback)=>{
              let bankAcctReg = /^(\d{8,})$/
              rule.required = this.form.legalCertType !== '01' ? true : false
              if (!value && rule.required) {
                callback(new Error(`请输入${rule.name || '银行账号'}`))
              }else if (value && rule.max && value.length > rule.max) {
                callback(new Error(`${rule.name || '银行账号'}不可超过${rule.max}字符`))
              }
              else if (value && !bankAcctReg.test(value)) {
                callback(new Error(`${rule.name || '银行账号'}格式不正确`))
              } else {
                callback()
              }
            },
            trigger: ['blur']
          },
        ],
      },
      emptyObj: {},//暂存供应商信息
      isAgreed: '',
      //按钮置灰
      nameFlag:false,//企业名
      phoneFlag:false,//手机号码
      //手机验证码限制规则
      sendDisabled: true, //按钮是否可点击
      sendText: '发送验证码', //验证码按钮显示文本
      sendInterval: null, //倒计时定时器
      sendTime: 60, //定时器时间限制
      smsCodeSuccess:false,//是否显示验证码发送成功
      //是否可以点击下一步
      nextFlag:false
    }
  },
  created() {
    console.log(this.entInfoObj)
  },
  methods: {
    nameChange(){
      for(const key in this.form){
        if(key !== 'name'){
          this.form[key] = ''
        }
      }
    },
    checkIsHtEnterprise() {
      let params = {
        name : this.form.name
      }
      //接口请求判断供应商等级
      this.zjControl.getEntInfo(params).then(res => {
        this.form = {...res.data}
        this.emptyObj = res.data
        this.form.registerPhone ? this.sendDisabled = false : this.sendDisabled = true
        this.form.legalCertType = '01'
      })
    },
    //获取授权协议
    getLicensorAgreement(){
      // this.previewFile()
      this.zjControl.getLicensorAgreement()
    },
    //阅读并同意
    checkIsAgreed(){
      console.log(this.isAgreed)
      this.btnValidate()
    },
    //企业名称校验
    nameVali(rule, value, callback){
      if(rule.required && !value){
        this.nameFlag = false
        callback(new Error('请输入企业名称'))
      }else if(value && value.length > 200){
        this.nameFlag = false
        callback(new Error('企业名称长度不可超过200字符'))
      }else{
        this.nameFlag = true
        callback()
      }
      this.btnValidate()
    },
    //手机号码校验
    validatePhone (rule, value, callback) {
      // 电话
      let phoneReg = /^((\(\d{3}\))|(\d{3}\u002d))?(1[3456789]\d{9})$/i
      if (!value && rule.required) {
        this.smsCodeSuccess = false
        this.phoneFlag = false
        callback(new Error('请输入手机号码'))
      } else if (value && !phoneReg.test(value)) {
        this.smsCodeSuccess = false
        this.phoneFlag = false
        callback(new Error('手机格式不正确'))
      } else {
        if(phoneReg.test(value)){
          this.sendDisabled = false
          this.phoneFlag = true
        }
        callback()
      }
      this.btnValidate()
    },
    //验证码校验
    smsCodeValidate(rule, value, callback){
        if(rule.required && !value){
          callback(new Error('请输入验证码'))
        }else if(value && value.trim().length !== 6){
          this.btnValidate()
          callback(new Error('请输入6位手机验证码'))
        }else{
          this.btnValidate()
          callback()
        }
      },
    //按钮校验
    btnValidate(){
      //发送验证码
      // this.nameFlag && this.phoneFlag ? this.sendDisabled = false : this.sendDisabled = true
      this.phoneFlag ? this.sendDisabled = false : this.sendDisabled = true
      //下一步按钮
      this.sendDisabled === false && this.form.smsCode.length === 6 && this.isAgreed == '1'? this.nextFlag = true : this.nextFlag = false
    },
    //手机号码长度
    btnValidateS(val){
      let phoneReg = /[^\d]/g
      this.form.registerPhone = this.form.registerPhone.replace(/[^\d]/g, '')
      if(phoneReg.test(val) || val.length !== 11){
        this.sendDisabled = true
      }else{
        this.sendDisabled = false
      }
    },
    //发送手机验证码
    send () {
      if(!this.form.name){return this.$message.error('请输入企业名称')}
      this.$refs.form.validateField('name',err => {
        if(err){return}
        this.$refs.form.validateField('registerPhone',error => {
          if(error){return}
          this.zjControl.sendMobileCaptcha(this.form).then(()=>{
            this.smsCodeSuccess = true
            this.codeTime()
          })
        })
      })
    },
    // 发送手机验证码后的定时器
    codeTime(){
      this.sendDisabled = true
      this.sendText = '重新获取(' + this.sendTime + 's)'
      this.sendInterval = setInterval(() => {
        this.sendTime--
        if (this.sendTime <= 0) {
          clearInterval(this.sendInterval)
          this.sendDisabled = false
          this.sendText = '重新获取'
          this.sendInterval = null
          this.sendTime = 60
          this.smsCodeSuccess = false
        } else {
          this.sendText = '重新获取(' + this.sendTime + 's)'
        }
      }, 1000)
    },
    //下一步
    next () {
      //----------------------非空校验-------------------------
      let valiArr = []
      let key = true
      for(let nm in this.rules){
        valiArr.push(nm)
      }
      for(let i=0; i<valiArr.length; i++){
        if(!key){break}
        //非空且规则为必填
        if(!this.form[valiArr[i]] && this.rules[valiArr[i]].required == true){
          key = false
          this.$message.error(this.rules[valiArr[i]][0])
        }
      }
      if(!key){return}
      if(this.isAgreed !== '1'){
        this.$message.error('请勾选我已阅读并同意')
        return
      }
      //------------------------------------------------------

      this.$refs.form.validate(boo=>{
        if(!boo){return}
        this.emptyObj = {
          ...this.form
        }
        this.zjControl.registerApply(this.emptyObj).then(res => {
          res.data.entName = this.form.name
          res.data.form = this.form

          // localStorage.setItem('entInfoObj',JSON.stringify(res.data)) //保存返回来的信息
          //企业注册状态：0-待填写资料 1-注册成功 2-待平台初审 3-待平台复审 4-待发证 5-注册拒绝 6-平台拒绝
          let stepArr = [
            //注册成功
            {step:'501',state:'1'},
            //待填写资料
            {step:'102',state:'0'},
            //企业
            {step:'102',state:null},
            //提交成功
            {step:'104'},
            //审批中
            {step:'201',state:'3'},
            //待资料确认
            {step:'301',state:'4'},
            //待发证
            {step:'401',state:'5'},
            // 注册(审核)驳回
            {step:'reject',state:'6'},
            //注册(审核)拒绝
            {step:'refuse',state:'7'},
            // //已注销(????????????)
            // {step:'',state:'8'},
          ]
          let stepItem = stepArr.find(item => item.state === res.data.registerState)

          this.$emit('update:entInfoObj',res.data)
          this.$emit('update:step',stepItem.step)
        })
      })
    }
  },
}
</script>

<style lang="less" scoped>

  .register {
    width: 100%;
    height: 100%;
    position: relative;
    /*background-color: #EEEEEE;*/
    background-color: #F9F9F9;
    z-index: -9999;
    /*overflow-y: scroll;*/
  }
  .registerContent{
    position: relative;
    height:calc(100% - 68px - 149px) !important;
    min-height: 780px;
    background-color: #fff;
  }
  .sw_footer{
    position: relative;
    left: 0;
    bottom: 0;
    z-index:9999;
    .bottom{
      position: relative!important;
    }
  }
  .LoginHeader{
    position: relative;
    top:0;
    width: 100%;
    z-index:9999;
  }

.register-card{
  /*background-color: white;*/
  /*z-index: -9999;*/
  //transform: translateY(-15px);
  //width: 800px;
  //margin:0 auto;
}
.register-white{
  background: white;
  margin-top: 15px;
  padding: 0 0 15px 0;
  //box-shadow: 0 4px 5px 0 rgba(133, 133, 133, 0.5);
}
.register-inline {
  position: relative;
  //z-index: -9998;
  //width: 800px;
  margin: auto 0;
  transform: translateY(10px);
  background: #FFFFFF;
  //box-shadow: 0 1px 5px 0 rgba(133,133,133,0.50);
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
.register-body {
  width: 700px;
  /*padding-top: 20px;*/
  margin:  auto;
  background-color: #FFFFFF;
  //box-shadow: 0 2px 12px 0 rgba(0,0,0,.2);
  border-radius: 8px;
  overflow: auto;
  /deep/ .el-form-item__label {
    padding: 0 5px 0 0;
    font-size: 14px;
  }
}
.register-form {
  padding: 20px 20px 0 20px;
  /deep/.el-input {
    width: 400px;
  }
}
.btn-row{
  /*text-align: center;*/
  margin-top: -5px;
  padding: 5px 0 10px 90px;
  label {
    margin-right: 0;
  }
  .el-row {
    margin-bottom: 10px;
  }
}
/deep/ .smsCode{

  border-radius: 4px 0 0 4px;
  .el-input__inner{
    width: 120px;
    display: inline-block;
    border-radius: 4px 0 0 4px;
  }
  .el-input-group__append{
    background-color: rgba(0,0,0,0);
    border: none;
    padding: 0;
    display: inline-block;
  }
}
/deep/ .sendBtn{
  padding: 0 7px;
  width: 100px!important;
  border-radius: 0 4px 4px 0;
  /*transform: translateY(-1px);*/
}
  .register102-legalCertType {
    /deep/.el-input {
      width: 400px;
    }
  }

  /*@media screen and (max-height: 670px){*/
  /*  .registerContent{*/
  /*    height:calc(100% - 50px - 125px) !important;*/
  /*    min-height: 490px;*/
  /*    !*margin-bottom: px;*!*/
  /*  }*/
  /*  .LoginHeader{*/
  /*    padding: 0;*/
  /*    height: 50px;*/
  /*    .el-row{*/
  /*      transform: translateY(-4px);*/
  /*    }*/
  /*  }*/
  /*  .register-card{*/
  /*    transform: translateY(-18px);*/
  /*    .register-inline{*/
  /*      padding-top: 8px;*/
  /*    }*/
  /*    .register-progress{*/
  /*      transform: translateY(-1vh);*/
  /*    }*/
  /*    .register-white{*/
  /*      margin-top: 10px;*/
  /*      padding:0 0 8px*/
  /*    }*/
  /*  }*/
  /*}*/
</style>
