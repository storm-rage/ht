<template>
<!-- 我的开票信息 -->
<div id="myBillingInformation">
  <div class="mbi-center-box">
    <h1 class="order-title zj-m-b-10">我的开票信息</h1>
    <table class="order-table" cellspacing="0">
      <tr>
        <th>企业名称</th><td>{{formModel.entName}}</td>
      </tr>
      <tr>
        <th>纳税人识别号</th><td>{{formModel.invoiceTaxpayerId}}</td>
      </tr>
      <tr>
        <th>地址</th><td>{{formModel.invoiceAddress}}</td>
      </tr>
      <tr>
        <th>电话</th><td>{{formModel.invoicePhone}}</td>
      </tr>
      <tr>
        <th>开户行</th><td>{{formModel.invoiceBankInfo}}</td>
      </tr>
      <tr>
        <th>银行账号</th><td>{{formModel.invoiceBankAccno}}</td>
      </tr>
      <tr>
        <th>电子邮箱</th><td>{{formModel.invoiceEmail}}</td>
      </tr>
    </table>

    <el-row class="bottom-row-edit"  v-if="zjBtn.updateInfo">
      <zj-button status="primary"  @click="edit">修改</zj-button>
    </el-row>
  </div>

  <el-dialog :visible.sync="editFlag" :close-on-click-modal="false" center
             width="50%" title="修改开票信息" custom-class="mbi-editDialog" @close="cancel" top="6vh"
  >

    <el-form ref="form" class="mbi-form" :model="formModel" :rules="formRules" :class="editFlag ? '' :'nmb0'" label-width="110px">
      <el-form-item label="企业名称：" prop="entName" :class="{'zj-m-b-5': !editFlag}">
        <span class="static-text">{{formModel.entName}}</span>
      </el-form-item>
      <el-form-item label="纳税人识别号：" :class="{'zj-m-b-5': !editFlag}" prop="invoiceTaxpayerId">
        <el-input v-model="formModel.invoiceTaxpayerId"/>
      </el-form-item>
      <el-form-item label="地址：" prop="invoiceAddress" :class="{'zj-m-b-5': !editFlag}">
        <el-input v-model="formModel.invoiceAddress"/>
      </el-form-item>
      <el-form-item label="电话：" prop="invoicePhone" :class="{'zj-m-b-5': !editFlag}">
        <el-input v-model="formModel.invoicePhone"/>
      </el-form-item>
      <el-form-item label="开户行：" prop="invoiceBankInfo" :class="{'zj-m-b-5': !editFlag}">
        <el-input v-model="formModel.invoiceBankInfo"/>
      </el-form-item>
      <el-form-item label="银行账号：" prop="invoiceBankAccno" :class="{'zj-m-b-5': !editFlag}">
        <el-input v-model="formModel.invoiceBankAccno"/>
      </el-form-item>
      <el-form-item label="电子邮箱：" prop="invoiceEmail" :class="{'zj-m-b-5': !editFlag}">
<!--        <span class="static-text" v-show="!editFlag">{{formModel.invoiceEmail}}</span>-->
        <el-input v-model="formModel.invoiceEmail"/>
      </el-form-item>

    </el-form>

    <el-row slot="footer" class="dialog-footer">
      <zj-button status="primary" @click="save">保存</zj-button>
      <zj-button class="back" @click="cancel">取消</zj-button>
    </el-row>
  </el-dialog>


</div>
</template>

<script>
    import {
      validateInvoiceTaxpayerId,
      validatePhone,
      validateFixedPhone,
      validateBankName,
      validateBankAcct,
      validateEmail
    } from '@utils/rules'
    export default {
        name: "myBillingInformation",
        data(){
          return {
            zjControl:{
              getDetail:this.$api.myBillingInformation.getDetail, //获取开票信息
              updateInfo:this.$api.myBillingInformation.updateInfo, //修改开票信息
            },
            formModel:{
              entName:'',
              invoiceTaxpayerId: '',
              invoiceAddress:'',
              invoicePhone:'',
              invoiceBankInfo:'',
              invoiceBankAccno:'',
              invoiceEmail:''
            },
            formRules:{
              entName:[
                {required:false,message:'请输入企业名称',trigger: 'blur'},
              ],
              invoiceTaxpayerId:[
                {required:false,message:'请输入纳税人识别号',trigger: 'blur'},
                {max:20,message:'纳税人识别号不可超过20字符',trigger: 'blur'},
                {validator:(rule, value, callback) => {
                    // 纳税人识别号 （允许1-30位，允许字母数字）
                    let invoiceTaxpayerIdReg = /^[a-zA-Z0-9]{1,20}$/i
                    if (value && !invoiceTaxpayerIdReg.test(value)) {
                      callback(new Error('纳税人识别号不合法（1-20位，允许字母数字）'))
                    } else {
                      callback()
                    }
                },trigger: 'blur'},

              ],
              invoiceAddress:[
                {required:false,message:'请输入地址',trigger: 'blur'},
                {max:200,message:'地址至多可输入200字符',trigger: 'blur'},
              ],
              invoicePhone:[
                {required:false,message:'请输入电话',trigger: 'blur'},
                {max:20,validator:validateFixedPhone,trigger: 'blur'}
              ],
              invoiceBankInfo:[
                {required:false,message:'请输入开户行',trigger: 'blur'},
                {max:50,validator:validateBankName,trigger: 'blur'}
              ],
              invoiceBankAccno:[
                {required:false,message:'请输入银行账号',trigger: 'blur'},
                {max:20,validator:validateBankAcct,trigger: 'blur'}
              ],
              invoiceEmail:[
                {required:false,message:'请输入电子邮箱',trigger: 'blur'},
                {validator:validateEmail,trigger: 'blur'},
              ],
            },
            dictionary:[
              {code:'entName',desc:'企业名称'},{code:'invoiceTaxpayerId',desc:'纳税人识别号'},{code:'invoiceAddress',desc:'地址'},
              {code:'invoicePhone',desc:'电话'},{code:'invoiceBankInfo',desc:'开户行'},{code:'invoiceBankAccno',desc:'银行账号'},
              {code:'invoiceEmail',desc:'电子邮箱'},
            ],
            editFlag:false,
            oldFormModel:{},
          }
        },
        methods:{
          getDetail(){
            this.zjControl.getDetail().then(res => {
              this.formModel = Object.assign(this.formModel,res.data)
            })
          },
          //修改
          edit(){
            this.oldFormModel = Object.assign({},this.formModel)
            this.editFlag = true
          },
          //取消
          cancel(){
            this.$refs.form.clearValidate()
            this.formModel = Object.assign({},this.oldFormModel)
            this.editFlag = false
          },
          //保存
          save(){
            if(!this.notEmptyCheck('formModel','formRules')){return}
            this.$refs.form.validate(boo => {
              if(!boo){return}
              //发送修改请求
              let params = Object.assign({},this.formModel)
              this.zjControl.updateInfo(params).then(() => {
                this.editFlag = false
                this.$Message.success('修改开票信息成功！')
              })
            })

          }
        },
        created() {
          this.getDetail()
          this.getApi()
        }
    }
</script>

<style lang="less">
#myBillingInformation{
  width: 100%;
  height: 100%;
  min-height: 400px;
  background: url("~@assets/img/accountCenter/myBillingInformation.png") no-repeat;
  background-size: 100% 250px;
  position: relative;
  .mbi-center-box{
    position: absolute;
    left: 5%;
    top: 10%;
    right: 5%;
    bottom: 10%;
    padding-top: 20px;
    min-height: 400px;
    /*height: 100%;*/
    background: white;
    .order-title{
      display: block;
      padding:1px 0 1px 5px;
      border-left: 7px solid #4A90E1;
    }
    .order-table{
      border:1px solid #EDEDED;
      width: 94%;
      margin: 0 3%;
      th{
        background: #EFF6FF;
        width: 20%;
        text-align: right;
        padding-right: 2%;
      }
      td{
        width: 80%;
        padding-left: 2%;
      }
    }
    .bottom-row-edit{
      position: absolute;
      width: 100%;
      bottom:20px;
      text-align: center;
    }
  }

  .mbi-form{
    background-color: #fff;
    /*padding: 50px 0 50px 100px;*/
    width: 330px;
    margin: auto;
    //未修改状态
    &.nmb0{
      .el-form-item{
        margin-bottom: 0px;
      }
    }
    //修改
    &.pb18{
      .el-form-item{
        margin-bottom: 0px;
        padding-bottom: 18px;
        .prompt{
          position: absolute;
          left: 2px;
          top:36px;
          line-height: 1px;
        }
      }
    }
    .el-form-item__error{
      width:200%!important;
    }
  }
  .static-text{
    margin-bottom: 20px;
  }
}
</style>
