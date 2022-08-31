<template>
  <zj-content-container>
    <!--  产品详情  -->
    <zj-content-block>
      <zj-content>
        <zj-top-header :title="row.id?'修改产品信息':'新增产品'" direction="center"/>
        <el-form :model="infoForm" ref="infoForm" :rules="rules" label-width="220px">
            <el-row>
              <zj-header title="产品基础信息"></zj-header>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="产品名称：" prop="productName">
                    <el-input v-model="infoForm.productName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="业务类型：" prop="busType">
                    <el-select v-model="infoForm.busType"  :disabled="row.id ? true : false">
                      <el-option
                        v-for="item in dictionary.busType"
                        :label="item.desc"
                        :value="item.code"
                        :key="item.code"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="产品类型：" prop="productType">
                    <el-select v-model="infoForm.productType" :disabled="row.id ? true : false">
                      <el-option
                        v-for="item in dictionary.productType"
                        :label="item.desc"
                        :value="item.code"
                        :key="item.code"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="产品简介：" prop="productAbstract">
                    <el-input v-model="infoForm.productAbstract"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="16">
                  <el-form-item label="产品详细介绍：" prop="productDetail">
                    <el-input type="textarea" v-model="infoForm.productDetail"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-form-item label="产品是否失效：" prop="status">
                  <el-select v-model="infoForm.status">
                    <el-option
                      v-for="item in dictionary.status"
                      :label="item.desc"
                      :value="item.code"
                      :key="item.code"
                    />
                  </el-select>
                </el-form-item>
              </el-row>
            </el-row>
          <zj-content-block>
            <zj-header :title="`产品设置-${typeMap(dictionary.productType,infoForm.productType)}`" v-if="!row.id && this.infoForm.productType"></zj-header>
            <zj-header :title="`产品设置-${typeMap(dictionary.productType,infoForm.productType)}`" v-if="row.id"></zj-header>
            <el-row v-if="this.row.productType === 'DDBL' || this.infoForm.productType === 'DDBL'">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="保理追索方式：" prop="factoringRecourse">
                    <el-select v-model="infoForm.factoringRecourse" disabled>
                      <el-option
                        v-for="item in dictionary.factoringRecourse"
                        :label="item.desc"
                        :value="item.code"
                        :key="item.code"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="保理融资形式：" prop="factoringFinancingForm">
                    <el-select v-model="infoForm.factoringFinancingForm" disabled>
                      <el-option
                        v-for="item in dictionary.factoringFinancingForm"
                        :label="item.desc"
                        :value="item.code"
                        :key="item.code"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="最低订单融资月利率：" prop="lowFinancingMonthRate">
                    <zj-number-input v-model="infoForm.lowFinancingMonthRate" :precision="2">
                      <template slot="append">%</template>
                    </zj-number-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="额度到期前X天通知保理公司：" prop="creditEndDateDays">
                    <zj-number-input v-model.trim="infoForm.creditEndDateDays" :precision="0">
                      <template slot="append">天</template>
                    </zj-number-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <zj-collapse title="保理公司业务联系人" class="zj-m-t-10">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="联系人：" prop="blContactName">
                      <el-input v-model="infoForm.blContactName"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="联系号码：" prop="blContactMobile">
                      <el-input v-model="infoForm.blContactMobile"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="联系邮箱：" prop="blContactEmail">
                      <el-input v-model="infoForm.blContactEmail"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="联系地址：" prop="blContactAddress">
                      <el-input v-model="infoForm.blContactAddress"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </zj-collapse>
              <zj-collapse title="保理专户" class="zj-m-t-10">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="银行账户名称：" prop="blBankAcctName">
                      <el-input v-model="infoForm.blBankAcctName"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="开户银行：" prop="blBankName">
                      <el-input v-model="infoForm.blBankName"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="银行账号：" prop="blBankAcctNo">
                      <el-input v-model="infoForm.blBankAcctNo"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </zj-collapse>
              <el-row>
                <el-col :span="8">注：业务联系人和保理专户用于后续签署保理合同。</el-col>
              </el-row>
            </el-row>
            <el-row v-if="this.row.productType === 'RD' || this.infoForm.productType === 'RD'">
              <el-row class="el-claims-voucher">
                <el-form-item label="对账单付款日前N天通知核心企业："  prop="rdEndNoticeCompanyDays" label-width="300px">
                  <zj-number-input :precision="0" v-model="infoForm.rdEndNoticeCompanyDays" >
                    <template slot="append">天</template>
                  </zj-number-input>
                </el-form-item>
              </el-row>
              <el-row class="el-claims-voucher">
                <el-form-item label="对账单付款日前X天停止业务："  prop="rdBeforeStopDays"  label-width="300px">
                  <zj-number-input :precision="0" v-model="infoForm.rdBeforeStopDays" >
                    <template slot="append">天</template>
                  </zj-number-input>
                  <span class="zj-m-l-10">注：对账单付款日前X天至凭证到期日，凭证即不能融资，也不能转让。</span>
                </el-form-item>
              </el-row>
              <el-row class="el-claims-voucher">
                <el-form-item label="对账单付款日前Z天未结算通知保理公司："  prop="rdEndNoticeBlDays" label-width="300px">
                  <zj-number-input :precision="0" v-model="infoForm.rdEndNoticeBlDays" >
                    <template slot="append">天</template>
                  </zj-number-input>
                  <span class="zj-m-l-10">注：对账单付款日前Z天，若对账单未发起结算，则通知保理公司。</span>
                </el-form-item>
              </el-row>
              <el-row class="el-claims-voucher">
                <el-form-item label="对账单付款日后Y天未付款通知保理公司："  prop="rdAfterNopayNoticeDays" label-width="300px">
                  <zj-number-input :precision="0" v-model="infoForm.rdAfterNopayNoticeDays" >
                    <template slot="append">天</template>
                  </zj-number-input>
                </el-form-item>
              </el-row>
              <el-row class="el-claims-voucher">
                <el-form-item label="最低凭证融资月利率："  prop="lowRdFinancingMonthRate"  label-width="300px">
                  <zj-number-input :precision="2" v-model="infoForm.lowRdFinancingMonthRate" >
                    <template slot="append">%</template>
                  </zj-number-input>
                </el-form-item>
              </el-row>
            </el-row>
            <el-row v-if="this.row.productType === 'JXD' || this.infoForm.productType === 'JXD'">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="资金方名称："  prop="fundingName" >
                    <el-select v-model="infoForm.fundingName" >
                      <el-option
                        v-for="item in dictionary.fundingName"
                        :label="item.desc"
                        :value="item.code"
                        :key="item.code"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="风险模型："  prop="riskModel" >
                    <el-select v-model="infoForm.riskModel" >
                      <el-option
                        v-for="item in dictionary.riskModel"
                        :label="item.desc"
                        :value="item.code"
                        :key="item.code"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-row>
          </zj-content-block>
          </el-form>
      </zj-content>
    </zj-content-block>
    <zj-content-footer>
      <zj-button type="primary" @click="submit">提交</zj-button>
      <zj-button class="back" @click="goParent">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>
<script>
import {validatePhone} from "@utils/rules";
export default {
  components: {},
  data() {
    return {
      zjControl: {
        queryProductDetail: this.$api.productInfoManage.queryProductDetail,//查看产品详情
        queryProductDirectory: this.$api.productInfoManage.queryProductDirectory,//数据字典
        updateProductSetting: this.$api.productInfoManage.updateProductSetting,//修改产品配置
        addProductSetting: this.$api.productInfoManage.addProductSetting,//修改产品配置
      },
      infoForm: {},
      rules: {
        productName: [
          {required: true, message: '请填写产品名称', trigger: 'blur'},
        ],
        busType: [
          {required: true, message: '请选择业务类型', trigger: 'blur'},
        ],
        productType: [
          {required: true, message: '请填写产品类型', trigger: 'blur'},
        ],
        productAbstract: [
          {required: true, message: '请填写产品简介', trigger: 'blur'},
        ],
        productDetail: [
          {required: true, message: '请填写产品详细介绍', trigger: 'blur'},
        ],
        status: [
          {required: true, message: '请选择产品状态', trigger: 'blur'},
        ],
        factoringRecourse: [
          {required: true, message: '请选择保理索取方式', trigger: 'blur'},
        ],
        factoringFinancingForm: [
          {required: true, message: '请选择保理融资形式', trigger: 'blur'},
        ],
        lowFinancingMonthRate: [
          {required: true, message: '请填写最低订单融资月利率', trigger: 'blur'},
        ],
        creditEndDateDays: [
          {required: true, message: '请填写额度到期前X天通知保理公司', trigger: 'blur'},
        ],
        blContactName: [
          {required: true, message: '请填写联系人', trigger: 'blur'},
        ],
        blContactMobile: [
          {required: true, message: '请填写联系号码', trigger: 'blur'},
          { validator:(rule, value, callback) => {
              let phoneReg = /^((\(\d{3}\))|(\d{3}\u002d))?(1[3456789]\d{9})$/i
              if (!value && rule.required) {
                callback(new Error('请输入手机号码'))
              } else if (value && !phoneReg.test(value)) {
                callback(new Error('手机号码格式不正确'))
              } else {
                callback()
              }
            }, trigger: 'blur' },
        ],
        blContactEmail: [
          {required: true, message: '请填写联系邮箱', trigger: 'blur'},
          {validator:(rule, value, callback) => {
              let emailReg = /^[0-9A-Za-z_-]+[@][0-9A-Za-z]+([.][0-9A-Za-z]+){1,2}$/
              if (!value && rule.required) {
                callback(new Error('请填写联系邮箱'))
              } else if (value && !emailReg.test(value)) {
                callback(new Error('邮箱格式不正确'))
              } else {
                callback()
              }
            }, trigger: 'blur'},
        ],
        blContactAddress: [
          {required: true, message: '请填写联系地址', trigger: 'blur'},
        ],
        blBankAcctName: [
          {required: false, message: '请填写银行账户名称', trigger: 'blur'},
        ],
        blBankName: [
          {required: false, message: '请填写开户银行', trigger: 'blur'},
        ],
        blBankAcctNo: [
          {required: false, message: '请填写银行账号', trigger: 'blur', max:50,},
          {validator:(rule, value, callback) => {
              let bankAcctReg = /^(\d{8,})$/
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
            }, trigger: 'blur'},
        ],
        rdEndNoticeCompanyDays: [
          {required: true, message: '请填写对账单付款日前N天通知核心企业', trigger: 'blur'},
        ],
        rdBeforeStopDays: [
          {required: true, message: '请填写对账单付款日前X天停止业务', trigger: 'blur'},
        ],
        rdEndNoticeBlDays: [
          {required: true, message: '请填写对账单付款日前Z天未结算通知保理公司', trigger: 'blur'},
        ],
        rdAfterNopayNoticeDays: [
          {required: true, message: '请填写对账单付款日后Y天未付款通知保理公司', trigger: 'blur'},
        ],
        lowRdFinancingMonthRate: [
          {required: true, message: '请填写最低凭证融资月利率', trigger: 'blur'},
        ],
        fundingName: [
          {required: true, message: '请填写资金方名称', trigger: 'blur'},
        ],
        riskModel: [
          {required: true, message: '请填写风险模型', trigger: 'blur'},
        ],
      },
      dictionary: {},
    };
  },
  methods: {
    getDetail () {
      if(this.row.id){
        let params = {
          id: this.row.id,
        }
        this.zjControl.queryProductDetail(params).then(res => {
          this.infoForm = Object.assign({},res.data)
          this.infoForm.status = this.row.status
        })
      }else{
        this.infoForm.factoringRecourse = '1'
        this.infoForm.factoringFinancingForm = '1'
      }
    },
    submit() {
      this.$refs.infoForm.validate(boo=> {
        if (!boo) {
          return
        } else {
          let params = {
            ...this.infoForm,
            lowRdFinancingMonthRate: Number(this.infoForm.lowRdFinancingMonthRate).toFixed(2)
          }
          if(this.row.id) {
              params.id = this.row.id
              this.zjControl.updateProductSetting(params).then(res=>{
              this.$message.success(res.msg)
              this.goParent()
            })
          }else {
            this.zjControl.addProductSetting(params).then(res=>{
              this.$message.success(res.msg)
              this.goParent()
            })
          }
        }
      })
    },
    queryProductDirectory() {
      this.zjControl.queryProductDirectory().then(res => {
        this.dictionary = Object.assign({}, res.data)
      })
    },
  },
  created() {
    this.getApi()
    this.getRow()
    this.queryProductDirectory()
    this.getDetail()

  }
};
</script>
