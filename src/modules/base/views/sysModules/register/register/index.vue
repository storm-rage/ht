<template>
  <div>
    <register-step101 v-if="step === '101'" :step.sync="step" :entInfoObj.sync="entInfoObj" :zjControl="zjControl" :dictionary="dictionary"/>
    <register-step102 v-else-if="step === '102'" :step.sync="step" :entInfoObj.sync="entInfoObj"  :zjControl="zjControl" :dictionary="dictionary"/>
    <register-step103 v-else-if="step === '103'" :step.sync="step" :entInfoObj.sync="entInfoObj" :zjControl="zjControl" :dictionary="dictionary"/>
    <register-step104 v-else-if="step === '104'" :step.sync="step" :entInfoObj.sync="entInfoObj" :zjControl="zjControl" :dictionary="dictionary"/>
    <register-step201 v-else-if="step === '201'" :step.sync="step" :entInfoObj.sync="entInfoObj" :zjControl="zjControl" :dictionary="dictionary"/>
    <register-step301 v-else-if="step === '301'" :step.sync="step" :entInfoObj.sync="entInfoObj" :zjControl="zjControl" :dictionary="dictionary"/>
    <register-step401 v-else-if="step === '401'" :step.sync="step" :entInfoObj.sync="entInfoObj" :zjControl="zjControl" :dictionary="dictionary"/>
    <register-step501 v-else-if="step === '501'" :step.sync="step" :entInfoObj.sync="entInfoObj" :zjControl="zjControl" :dictionary="dictionary"/>
    <register-step-refuse v-else-if="step === 'refuse'" :step.sync="step" :entInfoObj.sync="entInfoObj" :zjControl="zjControl"/>
    <register-step-reject v-else-if="step === 'reject'" :step.sync="step" :entInfoObj.sync="entInfoObj" :zjControl="zjControl"/>
  </div>
</template>

<script>
import {
  RegisterStep101,
  RegisterStep102,
  RegisterStep103,
  RegisterStep104,
  RegisterStep201,
  RegisterStep301,
  RegisterStep401,
  RegisterStep501,
  RegisterStepRefuse,
  RegisterStepReject
} from "./components/Register.js"
import router from "@/router";
import {windowSSStorage} from '@utils/storageUtils';
export default {
  components: {
    // 线上注册申请 注册首页
    RegisterStep101,
    // 线上注册申请 基本信息
    RegisterStep102,
    // 线上注册申请 用户信息
    RegisterStep103,
    // 线上注册申请 提交成功
    RegisterStep104,
    // 平台审核
    RegisterStep201,
    // 盖章并邮寄资料
    RegisterStep301,
    // 资料核对发证书
    RegisterStep401,
    // 注册成功
    RegisterStep501,
    // 审核拒绝
    RegisterStepRefuse,
    // 审核驳回
    RegisterStepReject
  },
  data () {
    return {
      step: '101', //决定显示那一页面
      //返回来的数据
      entInfoObj:{
        entName:'', //企业名称
        notes:'',//驳回原因
        fastMailName:'',//平台收件人
        serviceTel:'',//客服
        fastMailTel:'',//平台联系电话
        fastMailAddress:'',//平台收件地址
      },
      //api
      zjControl:{
        sendOcrBusiness:this.$api.register.sendOcrBusiness, //营业执照ocr
        sendOcrCert:this.$api.register.sendOcrCert, //身份证ocr
        judgeBuyers:this.$api.register.judgeBuyers, //我的买方企业

        queryDirectory:this.$api.register.queryDirectory, //获取企业字典
        sendMobileCaptcha:this.$api.register.sendMobileCaptcha, //手机验证码
        registerApply:this.$api.register.registerApply, //注册申请
        getEntInfo:this.$api.register.getEntInfo,//根据企业名称获取企业信息
        getLicensorAgreement:this.$api.register.getLicensorAgreement,//获取授权协议
        saveEntInfo:this.$api.register.saveEntInfo,//保存企业信息
        saveEntBankInfo:this.$api.register.saveEntBankInfo,//保存企业信息
        querySysDistrictDictList:this.$api.register.querySysDistrictDictList,//保存企业信息
        saveSmallPaymentCertAmt:this.$api.register.saveSmallPaymentCertAmt,//小额打款验证
        saveRegisterEntUser:this.$api.register.saveRegisterEntUser,//单个维护注册企业的用户信息
        downloadTemplate:this.$api.register.downloadTemplate,//下载委托授权书模板/个人信息授权书模板
        completeRegister:this.$api.register.completeRegister,//保存/完成注册
        getOpenBankInfo:this.$api.register.getOpenBankInfo,//企业注册-获取开户行信息
        getUserInfo:this.$api.register.getUserInfo,//获取用户信息
        saveUserInfo:this.$api.register.saveUserInfo,//保存企业用户信息
        uploadAttach:this.$api.register.uploadAttach, //上传
        downloadFile:this.$api.register.downloadFile, //下载附件
        dowmFlowFile:this.$api.register.dowmFlowFile, //下载流
        downloadRegisterZip:this.$api.register.downloadRegisterZip,
        //清除缓存
        toLogin:(boo = true) => {
          let ssionArr = ['registerStep','registerEntInfoObj']
          ssionArr.forEach(item=> windowSSStorage.removeItem(item))
          if(boo){
            router.replace({
              path: '/login'
            })
          }
        }
      },
      dictionary:{}, //字典
    }
  },
  methods: {
    //获取字典
    getDictionary(){
      this.zjControl.queryDirectory().then(res => {
        this.dictionary = res.data
      })
    },
    //获取授权协议
    getLicensorAgreement(){
      this.zjControl.getLicensorAgreement().then(res => {
      })
    },
  },
  created(){
    //reject
    this.step = windowSSStorage.getItem('registerStep') || '101'
    let oldEntInfo = Object.assign({},this.entInfoObj)
    this.entInfoObj = JSON.parse(windowSSStorage.getItem('registerEntInfoObj')) || oldEntInfo
    this.getDictionary()
  },
  watch:{
    step(newStep){
      windowSSStorage.setItem('registerStep',newStep)
    },
    entInfoObj(newEntInfoObj){
      windowSSStorage.setItem('registerEntInfoObj',JSON.stringify(newEntInfoObj))
    }
  }
}
</script>

<style lang="less">
  .register{
    background-color: #fff !important;
    min-width: 850px!important;
    z-index: 1!important;
  }
</style>

<style lang="less" >
/*  公共样式  */

.border-underline {
  width: 100%;
  border-bottom: 1px dashed #bfbfbf;
  margin-bottom: 20px;
}
.btn-row {
  display: flex;
  justify-content: center;
  margin: 20px auto;
}
form {
  /deep/.el-input__inner {
    width: 300px;
  }
}

</style>
