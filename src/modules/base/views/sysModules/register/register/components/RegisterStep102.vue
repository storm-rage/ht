<template>
  <div class="register">
    <RegisterHeader/>
    <div class="register-inline">
      <!--  被驳回下次注册时    -->
     <register-progress-bar :active="2" :error="true" v-if="entInfoObj.state === '6'" :error-info="entInfoObj.notes"/>
      <register-progress-bar :active="1" v-else/>
    </div>
    <div class="register-inline">
      <el-form ref="form" :model="form" :rules="rules" class="register-form" label-width="240px">
        <zj-top-header title="企业基本信息" direction="left"/>
        <div class="border-underline"></div>
        <el-form-item label="企业名称：" prop="name">
          <el-input v-model="form.name" maxLength="25" placeholder="请输入企业名称" :disabled="true"/>
        </el-form-item>
        <!-- 营业 -->
        <el-form-item label="统一社会信用代码：" prop="bizLicence">
          <el-input v-model="form.bizLicence" maxLength="25" placeholder="请输入统一社会信用代码" :disabled="true"/>
        </el-form-item>
        <el-form-item label="营业执照注册地址：" prop="address">
          <el-input v-model="form.address" :maxLength="400"/>
        </el-form-item>
        <el-form-item label="成立日期：" prop="registerStartDate"> <!-- :clearable="false" -->
          <zj-date-picker :date.sync="form.registerStartDate" :lessNow="true" :disabled="form.isHtEnterprise == '1'" :format="'yyyy年MM月dd日'"/>
        </el-form-item>
        <el-form-item label="注册资本：" prop="registerCapital">
          <el-input v-model="form.registerCapital" :disabled="form.isHtEnterprise == '1'"/>
        </el-form-item>
        <el-form-item label="企业工商有效期：" prop="registerEndDate">
          <zj-date-picker :date.sync="form.registerEndDate" :overNow="true" :format="'yyyy年MM月dd日'"/>
        </el-form-item>
        <!-- 企业 -->
        <el-form-item label="企业规模：" prop="scale" class="no-required entType">
          <el-select placeholder="请选择企业规模" v-model="form.scale"
                     @change="() => { $refs.form.validateField('scale') }"
                     :popper-append-to-body="false"
          >
            <template v-if="dictionary && dictionary.scaleList">
              <el-option
                v-for="item in dictionary.scaleList"
                :key="item.code"
                :value="item.code"
                :label="item.desc">
              </el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="企业经营类型：" prop="custType" class="no-required entType">
          <el-select placeholder="请选择企业经营类型" v-model="form.custType"
                     @change="() => { $refs.form.validateField('custType') }"
                     :popper-append-to-body="false"
          >
            <template v-if="dictionary && dictionary.custTypeList">
              <el-option
                v-for="item in dictionary.custTypeList"
                :key="item.code"
                :value="item.code"
                :label="item.desc">
              </el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="企业联系人姓名：" prop="fastMailName">
          <el-input v-model="form.fastMailName" maxLength="50" placeholder="请输入企业联系人姓名" :disabled="form.isHtEnterprise == '1'"/>
          <span style="color: #7f7f7f;margin-left: 10px">注：后续平台相关纸质资料将使用该联系人传递。</span>
        </el-form-item>
        <el-form-item label="企业联系人手机号：" prop="fastMailPhone">
          <el-input v-model="form.fastMailPhone" maxLength="50" placeholder="请输入企业联系人手机号" :disabled="form.isHtEnterprise == '1'"/>
        </el-form-item>
        <el-form-item label="企业联系地址：" class="zj-inline contact-address required">
          <el-form-item prop="provinceZh">
            <el-select v-model="form.provinceZh" placeholder="请选择" class="register102-legalCertType"
                       :popper-append-to-body="false"
            >
                <el-option
                  @change="provinceZhChange"
                  v-for="item in provinceList"
                  :key="item.districtName"
                  :value="item.treeCode"
                  :label="item.treeCode">
                </el-option>
            </el-select>
          </el-form-item>
          <span class="zj-inline zj-center zj-w-20">省</span>
          <el-form-item prop="cityZh">
            <el-input v-model="form.cityZh" maxLength="50" placeholder="请输入城市名称"/>
          </el-form-item>
          <span class="zj-inline zj-center zj-w-20">市</span>
        </el-form-item>
        <el-form-item label="详细地址：" prop="fastMailAddress">
          <el-input v-model="form.fastMailAddress" type="textarea" :rows="2" placeholder="请输入详情地址"></el-input>
        </el-form-item>

        <!--   法定代表人信息     -->
        <zj-top-header title="法定代表人信息" direction="left"/>
        <div class="border-underline"></div>
        <!-- 共公部分 -->
        <el-form-item label="企业法人姓名：" prop="legalPersonName" class="required">
          <el-input v-model="form.legalPersonName" maxLength="50" placeholder="请输入法定代表人姓名" :disabled="true"/>
        </el-form-item>
        <!-- 一级供应商独有 -->
        <div v-if="form.isHtEnterprise == '1'">
          <el-form-item label="法人证件类型：" prop="legalCertType" class="zj-inline required">
            <el-select v-model="form.legalCertType" placeholder="请选择证件类型" class="register102-legalCertType"
                       @change="legalCertTypeChange"
                       :popper-append-to-body="false"
                       :disabled="true"
            >
              <template v-if="dictionary && dictionary.legalCertTypeList">
                <el-option
                  @change="certChange('legalCertNo')"
                  v-for="item in dictionary.legalCertTypeList"
                  :key="item.code"
                  :value="item.code"
                  :label="item.desc">
                </el-option>
              </template>
            </el-select>
          </el-form-item>
          <el-row>
            <el-form-item label="法人证件号码：" prop="legalCertNo" class="zj-inline required">
              <el-input v-model="form.legalCertNo" placeholder="请输入证件号码" maxLength="50" :disabled="true"/>
            </el-form-item>
          </el-row>
        </div>
        <!-- 二级供应商独有 -->
        <el-form-item label="法人身份证号码：" prop="legalCertNo" class="zj-inline required" v-if="form.isHtEnterprise == '0'">
          <el-input v-model="form.legalCertNo" placeholder="请输入证件号码" maxLength="50" :disabled="true"/>
        </el-form-item>
        <!-- 共公部分 -->
        <el-form-item label="法人手机号码：" prop="registerPhone" class="required">
          <el-input v-model="form.registerPhone" maxLength="50" placeholder="请输入法人手机号码" :disabled="true"/>
        </el-form-item>
        <el-form-item label="证件有效期：" class="zj-h-28 card-validity required">
            <el-form-item prop="legalCertRegDate" class="zj-inline">
              <zj-date-picker placeholder="年/月/日"  :date.sync="form.legalCertRegDate" :pickerOptions="{ disabledDate:legalCertRegDateDisabledDate }" ></zj-date-picker>
            </el-form-item>
            <div class="zj-inline zj-center zj-w-20">至</div>
            <el-form-item prop="legalCertExpireDate" class="zj-inline">
              <zj-date-picker placeholder="年/月/日"  :date.sync="form.legalCertExpireDate" :pickerOptions="{ disabledDate: legalCertExpireDateDisabledDate }" ></zj-date-picker>
            </el-form-item>
        </el-form-item>

        <!--   银行账户信息     -->
        <zj-top-header title="银行账户信息" direction="left"/>
        <div class="border-underline"></div>
        <el-row v-if="form.isHtEnterprise == '1'">
          <!-- 一级供应商 -->
          <el-row style="font-size: 16px;font-weight: bold">请选择贵司的主结算银行账号：</el-row>
          <zj-table ref="entBankInfoTable" class="zj-search-table" :pager="false"
                    :dataList="form.entBankInfoList"
                    @radio-change="handleRadioChange"
                    :radio-config="{ highlight: true }"
          >
            <zj-table-column fixed="left" type="radio" width="60"/>
            <zj-table-column field="bankAccname" title="银行账户名称" />
            <zj-table-column field="bankAccno" title="银行账号" />
            <zj-table-column field="bankName" title="开户行" />
            <zj-table-column field="bankNo" title="银行联行号" />
          </zj-table>
        </el-row>
        <el-row v-if="form.isHtEnterprise == '0'">
          <!-- 二级供应商 -->
          <el-row style="margin: 20px auto">
            <zj-button class="append" icon="el-icon-circle-plus-outline" @click="contAdd">请录入银行账户</zj-button>
          </el-row>
          <zj-table ref="bankAccnameTable" class="zj-search-table" :dataList="form.entBankInfoList" v-if="entBankInfo"
                    keep-source :pager="false"
                    :edit-config="{trigger: 'manual', mode: 'row', icon:'-', autoClear: false,showStatus: true}"
          >
            <zj-table-column field="bankAccname" title="银行账户名称" :edit-render="{name: '$input'}"/>
            <zj-table-column field="bankAccno" title="银行账号" :edit-render="{name: '$input'}"/>
            <zj-table-column field="bankName" title="开户行"
                             :edit-render="{name: '$select', options: bankInfoList ,optionProps: {value:'status', label:'label', key: 'status' }}"
            >
            </zj-table-column>
            <zj-table-column field="bankNo" title="銀行联行号" :edit-render="{name: '$input'}"/>
            <zj-table-column title="操作" fixed="right">
              <template v-slot="{row}">
                <template v-if="$refs.bankAccnameTable.isActiveByRow(row)">
                  <zj-button type="text" @click="saveRow(row)">保存</zj-button>
                  <zj-button type="text" @click="cancel(row)">取消</zj-button>
                </template>
                <template v-if="!$refs.bankAccnameTable.isActiveByRow(row)">
                  <zj-button type="text" @click="edit(row)">维护</zj-button>
                </template>
              </template>
            </zj-table-column>
          </zj-table>
        </el-row>
        <el-row class="zj-m-t-20">
          <el-form-item label="请确认开户行" prop="confirmBankId">
            <el-select v-model="form.confirmBankId"
                       filterable
                       placeholder="请选择" class="sw-year-select register102-legalCertType"
                       :popper-append-to-body="false"
                       @change="bankChange"
            >
              <el-option
                v-for="item in bankInfoList"
                :label="item.label"
                :value="item.status"
                :key="item.status"
              />
            </el-select>
          </el-form-item>
        </el-row>
        <el-row style="color: #7f7f7f">注：主结算银行账号将用于小额打款认证和后续在平台开展的业务。</el-row>

      </el-form>
      <el-row class="btn-row">
        <zj-button status="primary" @click="save('SAVE')">保存</zj-button>
        <zj-button status="primary" @click="next('NEXT')">下一步</zj-button>
      </el-row>
    </div>
    <RegisterFooter/>
  </div>
</template>

<script>
import RegisterProgressBar from './RegisterProgressBar'
import RegisterHeader from "./RegisterHeader.vue";
import RegisterFooter from "./RegisterFooter.vue";
//校验规则
import {
  validateBusinessNo, //统一社会信用代码
  validateIdCard,//身份证
  validateInvoiceTaxpayerId,//纳税人识别号

  validatePhone,//电话
  validateFixedPhone,

  validateBankAcct,//银行账号
  validateEmail //电子邮箱
} from '@utils/rules'
import view from "@pubComponent/preview/view.js";
export default {
  name: 'RegisterStep102',
  mixins:[view],
  components: {
    RegisterProgressBar,RegisterHeader,RegisterFooter
    // SwCascaderCity
  },
  props: {
    zjControl:Object,//api
    dictionary:Object,//字典
    step:String,
    entInfoObj:Object,
  },
  data () {
    return {
      sysControl:{
        getProvince:this.$api.baseCommon.getProvince,
        getCity:this.$api.baseCommon.getCity
      },
      provinceList:[],//省下拉
      cityList:[],

      myBuyersMessage:'',
      oldRowInfo: {},
      entBankInfo: true,
      bankInfoList: [],

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
        isSelectEntBankInfo: false,//
        defaultSelectRowId: '',
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
      rules: {
        entName: [
          { required: true, message: '请输入企业名称', trigger: ['blur'] }
        ],
        bizLicence: [
          { required: true,  message:  '请输入统一社会信用代码', trigger: ['blur'] },
          { validator:validateBusinessNo,trigger: ['blur'] }
        ],
        address: [
          { required: true, message: '请输入营业执照注册地址', trigger: ['blur'] },
          { max:400, message: '营业执照注册地址不可超过400字符', trigger: ['blur'] }
        ],
        registerStartDate: [
          { required: true, message: '请选择成立日期', trigger: ['blur'] }
        ],
        registerEndDate: [
          { required: true, message: '请填写企业工商有效期', trigger: ['blur'] }
        ],
        registerCapital: [
          { required: true, message: '请填写注册资本', trigger: ['blur'] }
        ],
        fastMailName: [
          { required: true, message: '请填写企业联系人姓名', trigger: ['blur'] }
        ],
        fastMailPhone: [
          { required: true, message: '请填写企业联系人手机号', trigger: ['blur'] },
          { validator: validatePhone, trigger: ['blur'] }
        ],
        provinceZh: [
          { required: true, message: '请选择企业联系省份', trigger: ['change'] }
        ],
        cityZh: [
          { required: true, message: '请选择企业联系城市', trigger: ['blur'] }
        ],
        fastMailAddress: [
          { required: true, message: '请填写企业联系详细地址', trigger: ['blur'] }
        ],
        //-----------------  法人
        legalPersonName: [
          { required: false, message: '请输入法定代表人姓名', trigger: ['blur'] }
        ],
        legalCertType: [
          { required: false, message: '请选择证件类型', trigger: ['blur'] }
        ],
        legalCertNo: [
          { required: false, message: '请输入证件号码', trigger: ['blur'] },
          { validator:this.leaglCerNoVali,trigger: ['blur']},
        ],
        legalCertRegDate: [
          { required: true, message: '请选择证件有效期起始日', trigger: ['blur'] }
        ],
        legalCertExpireDate: [
          { required: true, message: '请选择证件有效期截止日', trigger: ['blur'] }
        ],
        confirmBankId: [
          { required: true, message: '请确认开户行', trigger: ['blur'] }
        ],
        //-----------------  企业
        scale: [
          { required: false, message: '请选择企业规模', trigger: 'blur' }
        ],
        custType: [
          { required: false, message: '请选择经营类型', trigger: ['blur'] }
        ],
      },
      viewUrl:{
        qyyzFile:{url:''},
        qyfrzjFile:{url:''}
      },

    }
  },
  created(){
    console.log(this.entInfoObj)
    this.form.name = this.entInfoObj.entName
    //获取省list
    this.zjControl.querySysDistrictDictList().then(res=>{
      this.provinceList = res.data.sysDistrictDictList
    })
    this.setFormValue()
    this.getOpenBankInfo()
  },
  mounted(){
    this.handleDataChange()
  },
  methods: {
    //回显form
    setFormValue(){
      this.form = {
        ...this.entInfoObj.form
      }
    },
    //企业注册-获取开户行信息
    getOpenBankInfo() {
      this.zjControl.getOpenBankInfo().then(res=>{
        let bankInfoObj = {
          bankInfo: JSON.parse(
            JSON.stringify(res.data.bankInfoList)
              .replace(/confirmBankId/g,'status')
              .replace(/confirmBankName/g,'label')
          )
        }
        this.bankInfoList = bankInfoObj.bankInfo
      })
    },
    //获取企业的注册信息
    getEntInfo(){
      if(!this.entInfoObj.id){return}
      this.zjControl.getEntInfo().then(res => {
        this.form = res.data
        this.form.registerWebsite = window.location.host
        this.booChange('qyyz')
        this.booChange('qyfr')
        this.form.name = this.entInfoObj.entName
        //获取图片URL
        //法定代表人
        if(res.data.qyfrzjFileId){
          let params = {
            fileUrl:this.form.qyfrzjFileId,
            fileId: this.form.qyfrzjFileId,
            fileName: this.form.qyfrzjAttachName
          }
          this.getViewUrl(params,'qyfrzjFile')
        }
        //营业执照
        if(res.data.qyyzFileId){
          let params ={
            fileUrl:this.form.qyyzFileId,
            fileId: this.form.qyyzFileId,
            fileName: this.form.qyyzAttachName
          }
          this.getViewUrl(params,'qyyzFile')
        }
        //调用清除校验
        this.$nextTick(()=>{
          this.$refs.form.clearValidate()
        })
      })
    },
    //判断是否解开禁用
    booChange(type){
      if(type === 'qyyz'){
        let qyyzList = ['bizLicence','address','registerStartDate','registerEndDate','registerCapital','legalPersonName']
        qyyzList.map(item => {
          if(this.form[item]){
            this.qyyzBoo = true
          }
        })

      }else if(type === 'qyfr'){
        let qyfrList = ['legalCertType','legalCertNo','legalCertRegDate','legalCertExpireDate']
        qyfrList.map(item => {
          if(this.form[item]){
            this.qyfrBoo = true
          }
        })
      }
    },
    //省改变事件
    provinceZhChange(){
      this.form.cityZh = ''
      this.form.fastMailAddress = ''
    },
    //法定代表人类型发生改变
    legalCertTypeChange(){
      this.$refs.form.validateField('legalCertType')
      this.form.legalCertNo ? this.$refs.form.validateField('legalCertNo')
                            : this.$refs.form.clearValidate('legalCertNo')
    },
    certChange(type){
      if(!this.form.legalCertNo){return}
      this.$refs.form.validateField('legalCertNo')
    },
    //法人证件校验
    leaglCerNoVali(rule, value, callback) {
      // let idReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
      let idReg = /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
      if(rule.required && !value){
        callback(new Error('请输入证件号码'))
      }else if(value && this.form && this.form.legalCertType === '01' && !idReg.test(value)){
        callback(new Error('证件号码格式不正确'))
      }else{
        callback()
      }
    },
    legalCertRegDateDisabledDate (date) {
      if (this.form.legalCertExpireDate) {
        return date.getTime() > this.$moment(this.form.legalCertExpireDate)
      }
    },
    legalCertExpireDateDisabledDate (date) {
      if (this.form.legalCertRegDate) {
        return date.getTime() < this.$moment(this.form.legalCertRegDate)
      }
    },
    //附件下载
    downloadFile(fileId,fileName){
      this.zjControl.downloadFile({fileId,fileName})
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
    //上传文字说明显示与隐藏
    showPopper(Ref){
      this.$refs[Ref].showPopper = true
    },
    hidePopper(Ref){
      this.$refs[Ref].showPopper = false
    },
    //我的买方企业
    myBuyersBlur(){
      if(this.form.myBuyers){
        let params = {
          myBuyers:this.form.myBuyers
        }
        this.zjControl.judgeBuyers(params).then(res => {
          this.myBuyersMessage = res.data.msg
        })
      }else{
        this.myBuyersMessage = ''
      }
    },
    handleDataChange() {
      //回显 勾选之前选中的银行账户
      let rows = this.form.entBankInfoList
      console.log(this.entInfoObj.form.entBankInfo)
      let rowIndex = ''
      for(let i of rows) {
        if(this.entInfoObj.form.entBankInfo.bankAccId === i.bankAccId) {
          rowIndex = rows.indexOf(i)
          break
        }
      }
      console.log('银行账户index=='+rowIndex)
      if (rows && rows.length) {
        setTimeout(()=>{
          this.$refs.entBankInfoTable.setRadioRow(rows[rowIndex])
        },0)
        this.handleRadioChange({row: rows[rowIndex]})
      }
    },
    handleRadioChange({ row }) {
      this.form.entBankInfo = row
      this.form.isSelectEntBankInfo = true
    },
    bankChange(val) {

    },
    //添加银行账户
    contAdd() {
      if(!this.tableEditReport(["bankAccnameTable"])){return}
      console.log('add...')
      if(this.form.entBankInfoList == null){
        this.form.entBankInfoList = []
      }
      if(this.form.entBankInfoList.length == 0){
        let item = {bankAccname:'', bankAccno:'', bankName:'', bankNo:'',}
        this.form.entBankInfo = { ...item }
        this.form.entBankInfoList.push(item)
        this.$refs.bankAccnameTable.setActiveRow(item)
      }else{
        this.$message.error('已经存在一个银行账户了！')
      }
    },
    //保存row
    saveRow(row) {
      if(!row.bankAccname){ return this.$messageBox({type:'info',content:'请输入户名'}) }
      //银行账号
      if(!row.bankAccno){ return this.$messageBox({type:'info',content:'请输入银行账号'}) }
      let bankAcctReg = /^(\d{8,})$/
      if(row.bankAccno && !bankAcctReg.test(row.bankAccno)){ return this.$messageBox({type:'info',content:'银行账号格式不正确'}) }
      //开
      if(!row.bankName){ return this.$messageBox({type:'info',content:'请输入开户行'}) }
      //联
      if(!row.bankNo){ return this.$messageBox({type:'info',content:'请输入联行号'}) }
      let bankNoReg = /^(\d{1,12})$/
      if(row.bankNo && !bankNoReg.test(row.bankNo)){ return this.$messageBox({type:'info',content:'联行号格式不正确'}) }
      //
      let params = Object.assign({},row)
      params.bankAccId = row.bankAccId ? row.bankAccId : ''
      this.zjControl.saveEntBankInfo(params).then(res => {
        this.entBankInfo = false
        if(res.data.bankAccId){
          this.form.entBankInfoList[0] = res.data
        }
        this.$nextTick(()=>{
          this.entBankInfo = true
        })

        this.form.entBankInfo = { ...this.form.entBankInfoList[0] }
        console.log(this.form.entBankInfoList)
        this.$message.success('保存成功！')
        let params = Object.assign({},this.entInfoObj)
        params.form = this.form
        this.$emit('update:entInfoObj',params)
        this.$refs.bankAccnameTable.clearActived()
      })
    },
    //取消
    cancel(row){
      if(row.bankAccId){
        this.form.entBankInfoList.splice(0,1,this.oldRowInfo)
      } else{
        this.form.entBankInfoList.splice(0,1)
      }
      this.$refs.bankAccnameTable.clearActived()
    },
    //维护
    edit(row){
      if(!this.tableEditReport(['bankAccnameTable'])){return}
      this.oldRowInfo = Object.assign({},row)
      this.$refs.bankAccnameTable.setActiveRow(row)
    },
    //检测是否正在编辑     tableRefList需要检测的table数组
    tableEditReport(tableRefList){
      let key = true
      tableRefList.forEach(item => {
        if(this.$refs[item] && this.$refs[item].getActiveRecord()){
          key = false
        }
      })
      if(!key){
        this.$log.alert('请保存当前正在编辑的数据')
        return false
      }else{
        return true
      }
    },
    //暂存form信息
    save(flag) {

      //不校验保存注册信息
      if(this.form.isHtEnterprise === '0') {
        this.form.entBankInfo = this.form.entBankInfoList[0]
      }
      this.form.registerOperateFlag = flag
      this.form.legalCertType = this.entInfoObj.form.legalCertType
      this.zjControl.saveEntInfo(this.form).then(res => {
        this.$message.success('提交企业资料成功！')
        this.entInfoObj.form.id = res.data.id
        let params = Object.assign({},this.entInfoObj)
        params.form = params.form ? params.form : this.form
        this.$emit('update:entInfoObj',params)
      })
    },
    //下一步按钮
    next(flag) {
      let valiArr = []
      let key = true
      for(let nm in this.rules){
        valiArr.push(nm)
      }
      for(let i=0; i<valiArr.length; i++){
        if(!key){break}
        //非空且规则为必填
        if(!this.form[valiArr[i]] && this.rules[valiArr[i]].required === true){
          key = false
          this.$message.error(this.rules[valiArr[i]][0])
        }
      }
      if(!key){return}
      //------------------------------------------------------
      this.$refs.form.validate(boo=>{
        if (!boo){
          return
        }else{
          //银行账户校验
          if(this.form.entBankInfoList == null || []  && this.form.entBankInfoList.length === 0){
            this.$message.error('银行账户不能为空！')
            return
          }
          if(this.form.isHtEnterprise === '1' && !this.form.isSelectEntBankInfo) {
            this.$message.error('请选择主结算银行账户！')
            return
          }
          let proFormat = ''
          for(const item of this.provinceList){
            if(item.treeCode == this.form.provinceZh){
              proFormat = item.districtName
              break
            }
          }
          this.form.province = proFormat
          if(this.entInfoObj.form.isHtEnterprise === '0') {
            this.form.entBankInfo = this.form.entBankInfoList[0]
          }
          console.log(this.form.entBankInfo)
          if(this.form.confirmBankId !== this.form.entBankInfo.bankName) {
            return this.$message.error('请确认开户行一致！')
          }
          this.form.confirmBankName = this.form.confirmBankId
          this.form.registerOperateFlag = flag
          this.form.legalCertType = this.entInfoObj.form.legalCertType
          this.zjControl.saveEntInfo(this.form).then(res => {
            this.$message.success('提交企业资料成功！')
            this.entInfoObj.form.id = res.data.id
            this.entInfoObj.form.entBankInfo = this.form.entBankInfo
            this.entInfoObj.form.isSelectEntBankInfo = this.form.isSelectEntBankInfo
            this.entInfoObj.form.defaultSelectRowId = this.form.defaultSelectRowId
            this.entInfoObj.form.confirmBankId = this.form.confirmBankId
            this.entInfoObj.form.confirmBankName = this.form.confirmBankName
            this.entInfoObj.form.token = res.data.token
            let params = Object.assign({},this.entInfoObj)
            params.form = params.form ? params.form : this.form
            this.$emit('update:entInfoObj',params)
            this.$emit('update:step','103')
          })
        }
      })
    },
  },
}
</script>

<style lang="less">
  .inline{
    .el-select,.el-input{
      width: 100%!important;
    }
    .el-select{
      .el-input__inner{
        padding-left: 3px;
        text-align: center;
      }
    }

  }
  .register102-province{
    .el-select-dropdown.el-popper{
      width: 160px!important;
    }
  }
  .register102-city{
    .el-select-dropdown.el-popper{
      width: 180px!important;
    }
  }
  .register102-legalCertType{
    .el-select-dropdown.el-popper{
      width: 250px!important;
    }
  }
</style>
<style lang="less" scoped>
.register {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  z-index: -9999;
  overflow-y: auto;
}
.register-inline {
  position: relative;
  z-index: -9998;
  background-color: #FFFFFF;
  width: 1000px;
  margin: 20px auto;
  //box-shadow: 0 1px 5px 0 rgba(133,133,133,0.50);
  padding: 20px 0 20px 0;
}
.register-form {
  //width: 800px;
}
.register-title {
  border-left: 7px solid #5494F2;
  padding-left: 10px ;
  margin-top: 20px;
  font-weight: bold;
}
//上传按钮
.uploadBtn{
  margin: 0 10px;
}
//上传说明文字
.explainBtn{
  font-size: 12px;
  z-index: 999;
  color:#999999 !important
}
  .explainBtn:hover{
    text-decoration: underline;
  }
//下一步按钮栏
.next-button-row{
  .el-form-item__content{
    margin: 0!important;
    width: 100%;
  }
}
//要求说明
  .yqsm{
    display:inline-block;
    width:auto;
    position: relative;
    .yqsm-body{
      width:400px;
      height:300px;
      position: absolute;
      left: 110%;
      top:-135px;
      background-color: white;
      z-index: 1000;
      border-radius: 12px;
      box-shadow: 0 0 2px grey;
      display: none;
      .yqsm-body-left{
        border: 1px solid grey;
        width: 20px;
        height: 20px;
        background-color: white;
        border-top-color: white;
        border-right-color: white;
        border-radius: 1px;
        position: absolute;
        left: -10px;
        top: 50%;
        transform: translateY(-50%) rotate(45deg);
        z-index: 0;
      }
      .yqsm-body-close{
        width:25px;
        height: 25px;
        position: absolute;
        right: 2px;
        top: 2px;
        cursor: pointer
      }
      img{
        width: 100%;
        height: 100%;
      }
    }
  }

//我的买方企业
  .myBuyers{
    position: relative;
    .msgText{
      color: red;
      font-size: 12px;
      display: block;
      margin:0 10px 0 90px;
      word-break:break-all;
      line-height: 1.2;
    }
  }
  .el-input {
    width: 260px;
  }
  .entType {
    /deep/.el-select{
      width: 260px;
      .el-input {
        width: 260px;
      }
    }
  }
  .contact-address {
    /deep/.el-select {
      .el-input {
        width: 120px;
      }
    }
    /deep/.el-form-item__content {
      display: flex;
      .el-input {
        width: 120px;
      }
    }
  }
  .card-validity {
    /deep/.el-date-editor.el-input {
      width: 120px;
    }
    /deep/.zj-date-picker .el-input__inner {
      min-width: auto;
      padding: 0 30px 0 15px !important;
    }
  }
.register102-legalCertType{
  .el-select-dropdown.el-popper{
    width: 250px!important;
  }
  /deep/.el-input {
    width: 260px;
  }
}

</style>
