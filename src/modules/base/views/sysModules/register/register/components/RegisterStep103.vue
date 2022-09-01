<template>
  <div class="register haveUL swRegister">
    <RegisterHeader/>
    <div class="register-inline">
      <register-progress-bar :active="1"></register-progress-bar>
    </div>
    <zj-preview :visible.sync="viewShow" :fileUrl="viewUrl" :showFooter="false" :fileType="viewType" @close="viewShow=false"/>
    <div class="register-inline">
      <!--   小额打款认证     -->
      <zj-top-header title="小额打款认证" direction="left"/>
      <div class="border-underline"></div>
      <el-row class="tips">
        <p>已向主结算账户打款，请留意金额变化。</p>
        <p>有效时间：<span style="font-size: 16px;color: #7f4717">72小时</span></p>
      </el-row>
      <el-form ref="form" :model="form" :rules="accountRules" class="register-form" label-width="200px">
        <el-form-item label="收到金额（单位：分）：" prop="smallPaymentCertAmt">
          <zj-number-input :precision="0"
                           v-model="form.smallPaymentCertAmt"
                           placeholder="请输入收到的金额，示例：若收到0.11，请输入11"
                           :max="99"
                           :min="0"
          />
        </el-form-item>
      </el-form>
      <el-row class="btn-row">
        <el-row>
          <zj-button status="primary" @click="pre">上一步</zj-button>
          <zj-button status="primary" @click="save('SAVE')">保存</zj-button>
          <zj-button type="primary" @click="next('NEXT')">下一步</zj-button>
          <zj-button status="primary" @click="testAgain('AGAIN')">重新发起验证</zj-button>
        </el-row>
      </el-row>
    </div>
    <RegisterFooter/>
  </div>
</template>

<script>
import RegisterProgressBar from './RegisterProgressBar';
import RegisterHeader from "./RegisterHeader.vue";
import RegisterFooter from "./RegisterFooter.vue";
import view from "@pubComponent/preview/view.js";
import download from "@utils/download";
import {
  validateLoginNameSW,//登录用户名
  // validateIdCard, //证件号码
  validateEmail, //电子邮箱
  validatePhone,//电话
} from '@utils/rules'
import ZjInputNumber from "@pubComponent/input/ZjNumberInput";
export default {
  name: 'RegisterStep103',
  mixins:[view],
  components: {
    RegisterProgressBar,RegisterHeader,RegisterFooter
  },
  props: {
    zjControl:Object,//api
    entInfoObj:Object,
    dictionary:Object,//字典
    regFlag:Boolean,//是否是注册过的
  },
  data () {
    return {
      viewApi:this.zjControl.dowmFlowFile,//替换查看器Api
      //快捷选择
      fastList:[],
      //初始化旧表单
      oldForm:{},
      accountForm: {
        smallPaymentCertAmt:'',
      },
      accountRules: {
        smallPaymentCertAmt:[
          { required: true, message: '请输入打款金额', trigger: 'blur'},
        ],
      },
      //绑定表单
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
        confirmBankId:'',//获取银行信息
        confirmBankName:'',//获取银行信息
        isSelectEntBankInfo: null,//判断一级供应商是否选择银行账户
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
        isHtEnterprise: '',
        legalCertExpireDate: '',
        legalCertNo: '',
        legalCertRegDate: '',
        legalCertType: '',
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
      },
      //校验规则
      rules: {
          fastMailName: [
            { required: false,  message:  '请输入收件人姓名', trigger: 'blur' },
            { max:50, message: '收件人姓名不可超过50字符',trigger:'blur'}
          ],
          fastMailPhone: [
            { required: false,  message:  '请输入收件人联系电话', trigger: 'blur' },
            { max:20,validator:(rule, value, callback) => {
                let phoneReg = /^((\(\d{3}\))|(\d{3}\u002d))?(1[3456789]\d{9})$/i
                let fixedReg = /^(\d{3,4}-)?\d{7,8}$/i
                if (!value && rule.required) {
                  callback(new Error('请输入收件人联系电话'))
                }else if(value && rule.max && value.length > rule.max){
                  callback(new Error(`收件人联系电话不可超过${rule.max}字符`))
                }else if(value && (!phoneReg.test(value) && !fixedReg.test(value))){
                  callback(new Error('收件人联系电话格式不正确'))
                }else {
                  callback()
                }
              },trigger: 'blur' }
          ],
          fastMailAddress: [
            { required: false,  message:  '请输入收件人详细地址', trigger: 'blur' },
            { max: 400, message: '收件人详细地址不可超过400个字符', trigger: 'blur'}
          ],
      },

      //图片路径
      viewUrl:{
        applyUser:{url:''},
        reviewUser:{url:''},
        controlUser:{url:''}
      },

    }
  },
  methods: {
    //证件类型发生改变
    applyCerTypeChange(){
      this.$refs.applyUser.validateField('certType')
      this.form.applyUser.certNo ? this.$refs.applyUser.validateField('certNo')
                                  : this.$refs.applyUser.clearValidate('certNo')
    },
    reviewCerTypeChange(){
      this.$refs.reviewUser.validateField('certType')
      this.form.reviewUser.certNo ? this.$refs.reviewUser.validateField('certNo')
                                  : this.$refs.reviewUser.clearValidate('certNo')
    },
    controlCerTypeChange(){
      this.$refs.controlUser.validateField('certType')
      this.form.controlUser.certNo ? this.$refs.controlUser.validateField('certNo')
                                   : this.$refs.controlUser.clearValidate('certNo')
    },


    certStartDateDisabledDate (form, date) {
      if (form.certEndDate) {
        return date.getTime() > this.$moment(form.certEndDate)
      }
    },
    certEndDateDisabledDate (form, date) {
      if (form.certStartDate) {
        return date.getTime() < this.$moment(form.certStartDate)
      }
    },
    //获取url
    getViewUrl(row,type){
      let params = {
        fileUrl:row.fileId,
        fileId: row.fileId,
        fileName: row.fileName || row.attachName
      }
      this.$api.baseCommon.downloadPdf(params).then(res => {
        let that = this
        let dataInfo = res.data
        let reader = new window.FileReader()
        reader.readAsArrayBuffer(dataInfo)
        reader.onload = function (e) {
          let result = e.target.result
          let contentType = dataInfo.type
          let blob = new Blob([result], { type: contentType })
          let url = window.URL.createObjectURL(blob)
          that.viewUrl[type].url = url
        }
      })
    },
    save(flag){
      this.$refs.form.validate(boo=>{
        if (!boo){
          return
        }else{
          let params = {
            id: this.entInfoObj.form.id,
            registerOperateFlag: flag,
            smallPaymentCertAmt: this.form.smallPaymentCertAmt
          }
          this.zjControl.saveSmallPaymentCertAmt(params).then(res=>{
            let params = Object.assign({},this.entInfoObj)
            params.form.smallPaymentCertAmt = this.form.smallPaymentCertAmt
            this.$emit('update:entInfoObj',params)
            this.$message.success(res.msg)
          })
        }
      })
    },
    //下一步按钮
    next(flag) {
      this.$refs.form.validate(boo=>{
        if (!boo){
          return
        }else{
          let params = {
            id: this.entInfoObj.form.id,
            registerOperateFlag: flag,
            smallPaymentCertAmt: this.form.smallPaymentCertAmt,
            token: this.entInfoObj.form.token,
            entBankInfo: this.entInfoObj.form.entBankInfo,
            confirmBankId: this.entInfoObj.form.confirmBankId,
            confirmBankName: this.entInfoObj.form.confirmBankName,
          }
          this.zjControl.saveSmallPaymentCertAmt(params).then(res=>{
            let params = Object.assign({},this.entInfoObj)
            params.form.smallPaymentCertAmt = this.form.smallPaymentCertAmt
            this.$message.success(res.msg)
            this.$emit('update:entInfoObj',params)
            this.$emit('update:step','104')

          })
        }
      })
    },
    //重新验证
    testAgain(flag){
      this.$refs.form.validate(boo=>{
        if (!boo){
          return
        }else{
          let params = {
            id: this.entInfoObj.form.id,
            registerOperateFlag: flag,
            smallPaymentCertAmt: this.form.smallPaymentCertAmt,
            token: this.entInfoObj.form.token,
            entBankInfo: this.entInfoObj.form.entBankInfo,
            confirmBankId: this.entInfoObj.form.confirmBankId,
            confirmBankName: this.entInfoObj.form.confirmBankName,
          }
          this.zjControl.saveSmallPaymentCertAmt(params).then(res=>{
            let params = Object.assign({},this.entInfoObj)
            params.form.smallPaymentCertAmt = this.form.smallPaymentCertAmt
            this.$emit('update:entInfoObj',params)
            this.$message.success(res.msg)
          })
        }
      })
    },
    pre(){
      this.$emit('update:step','102')
    },
    //回显form
    setFormValue(){
      this.form.smallPaymentCertAmt = this.entInfoObj.form.smallPaymentCertAmt
    },
  },
  created(){
    this.setFormValue()
    this.form.isHtEnterprise = this.entInfoObj.form.isHtEnterprise
    this.form.legalCertType = this.entInfoObj.form.legalCertType
    console.log(this.entInfoObj)
  }
}
</script>


<style lang="less">
.swRegister {
    //每部分容器
    .register-inline {
      position: relative;
      z-index: 1;
      background-color: #FFFFFF;
      width: 1000px;
      margin: 20px auto;
      //box-shadow: 0 1px 5px 0 rgba(133,133,133,0.50);
      padding: 30px 0;
        //正标题
        .register-title{
          margin:0 0 20px ;
          border-left:5px solid #1482f0;
          padding-left: 10px;
          color: #434343;
          font-weight: bold;
        }
        //角色容器
        .register-user{
          width: 680px;
          margin: 0 auto 30px;
          //头部信息
          .register-user-title{
              color: #FFFBEB;
              font-size:16px;
              font-weight: bold;
              padding: 6px 20px;
              border-radius:13.33px 13.33px 0 0 ;
              //图标
              .register-user-icon{
                  display: inline-block;
                  vertical-align: top;
                  width: 15px;
                  height: 20px;
                  background: url("~@assets/img/register/icon-user.png") no-repeat center;
              }
              //文字
              .register-user-text{
                margin-left: 5px;
              }
              //经办员
              &.approvedBy{
                background-color: rgb(54,149,249);
              }
              //复核员
              &.checker{
                background-color: rgb(0,153,102);
              }
              //风险信息接收人
              &.receivedBy{
                background-color: rgb(50,101,157);
              }
          }
        }
    }
    //每个表单
    .el-form {
      padding: 15px 20px 5px;
      //border: 1px solid rgba(0, 0, 0, 0.2);
      //border-radius: 0 0 13.33px 13.33px;
      .el-form-item__label{
        /*display: block;*/
        //width: 100%!important;
        //text-align: left;
      }
      .el-input{
        width: 400px;
      }
      .el-input__inner{
        padding: 0 0 0 10px;
      }
      //上传文字的说明
      .ulText{
        font-size: 12px;
        padding: 0 30px 0 10px;
        position: relative;
        cursor: pointer!important;
        z-index: 9;
        color: #999999 !important;
      }
      .ulText:hover{
        text-decoration: underline;
      }
      //上传按钮
      .ulbtn{
        margin:0 10px;
      }
    }
    //资料接收地址
    .mailForm {
      padding: 20px 105px;
      border: none;
      .mainPhone{
        padding-left: 50px;
      }
    }
    //按钮栏
    .btn-row{
      text-align: center;
      .el-button,.zj-button,.vxe-button{
        min-width: 70px!important;
      }
    }
    //切割线
    .register-cuttingLine{
      height: 10px;
      width: 100%;
      background: #EEEEEE;
      border-left: 1px solid #EEEEEE;
      border-right: 1px solid #EEEEEE;
      border-top:1px solid rgba(133, 133, 133, 0.09);
      border-bottom:1px solid rgba(133, 133, 133, 0.09);
    }
}
.tips {
  width: 90%;
  margin: 0 auto;
  color: #7f7f7f;
  background-color: rgba(2, 167, 240, 0.16);
  padding: 10px 40px;
  border-radius: 5px;
}
</style>
<style lang="less">
  //证件有效期
  .certnoIndate{
      width: 100%;
      div{
        float: left;
      }
      .el-form-item{
        /*width: 45%;*/
        width: 140px!important;
        float: left;
        margin-bottom: 0!important;
        .el-form-item__content,.el-date-editor{
          width: 100% !important;
        }
        .el-form-item__label{
          display: block!important;

        }
        .el-form-item__error{
          width: 110%!important;
        }
        //input
        .el-input__inner{
          padding-left:5px;
          padding-right:15px;
        }
        // icon
        /*.el-input__prefix,.el-input__suffix{*/
        /*  width: 24px;*/
        /*  left: unset;*/
        /*  right: 3px;*/
        /*}*/
        /*.el-input__suffix{*/
        /*  right: 1px;*/
        /*}*/
      }
      /*span{*/
      /*  width: 10%;*/
      /*  float: left;*/
      /*}*/
  }
</style>
<style lang="less">
  .one-row-max{
    .el-form-item__content{
      width: 640px;
      .el-input{
        width: 100%;
      }
    }
  }
</style>
