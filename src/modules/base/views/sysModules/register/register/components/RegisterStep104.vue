<template>
  <div class="register">
    <RegisterHeader/>
    <div class="register-inline">
      <register-progress-bar :active="1"></register-progress-bar>
      <!--   操作用户     -->
      <zj-top-header title="操作用户" direction="left"/>
      <div class="border-underline"></div>
      <el-row class="operator-table">
        <zj-table ref="operatorTable" class="zj-search-table" :dataList="registerUserList" :pager="false" v-if="operatorTable"
        >
          <zj-table-column field="roleId" title="操作员类型" :formatter="(obj)=>typeMap(dictionary.roleIdList, obj.cellValue)"/>
          <zj-table-column field="userName" title="姓名"/>
          <zj-table-column field="certType" title="证件类型" :formatter="(obj)=>typeMap(dictionary.userCertTypeList, obj.cellValue)"/>
          <zj-table-column field="certNo" title="证件号码"/>
          <zj-table-column title="证件有效期">
            <template v-slot="{row}">
              {{date(row.certStartDate)}}{{ row.certStartDate&&row.certEndDate?'~':'' }}
              {{date(row.certEndDate)}}
            </template>
          </zj-table-column>
          <zj-table-column field="mobileNo" title="手机号码"/>
          <zj-table-column field="email" title="邮箱"/>
          <zj-table-column field="bankAcctNo" title="银行卡号"/>
          <zj-table-column field="htSysCode" title="海天业务系统账号" v-if="form.isHtEnterprise == '1'"/>
          <zj-table-column field="idCheckState" title="是否完成身份核验" v-if="form.isHtEnterprise == '1'" />
          <zj-table-column  title="操作" fixed="right">
            <template v-slot="{row}">
              <zj-button type="text" @click="maintainOperator(row)">维护</zj-button>
            </template>
          </zj-table-column>
        </zj-table>
      </el-row>
      <!-- 上传影像资料 -->
      <zj-top-header title="上传影像资料" direction="left"/>
      <div class="border-underline"></div>
      <el-row>
        <el-row class="agreement">点此下载
          <zj-button type="text" @click="downloadTemplate('WTSQS')">《授权确认书模板》</zj-button>、
          <zj-button type="text" @click="downloadTemplate('GRXXSQS')">《风险信息接收人-个人信息授权书模板》</zj-button>
        </el-row>
        <zj-table ref="attaTable" class="zj-search-table" :dataList="registerAttachList" :pager="false"
                  keep-source
        >
          <zj-table-column type="seq" title="序号" width="60"/>
          <zj-table-column title="附件类型">
            <template v-slot="{row}">
              <span style="color: red">{{ row.fileType? '*' : '' }}</span>
              {{ row.fileType ? typeMap(dictionary.attachTypeList,row.fileType)||row.fileType : '' }}
            </template>
          </zj-table-column>
          <zj-table-column field="needSeal" title="是否需要加盖企业公章" v-if="form.isHtEnterprise == '1'"/>
          <zj-table-column field="fileName" title="附件名称"/>
          <zj-table-column title="操作" fixed="right" width="120">
            <template v-slot="{row}">
              <zj-upload class="zj-inline" :httpRequest="handleFileUpload" :data="{ row }">
                <zj-button slot="trigger" type="text">上传</zj-button>
              </zj-upload>
              <zj-button type="text" @click="handleFileDownload(row)" v-if="form.isHtEnterprise == '1'">下载</zj-button>
            </template>
          </zj-table-column>
        </zj-table>
        <div class="explain-text">
          <div>注：</div>
          <ol class="explain-content">
            <li class="explain-item">除“风险接收人员个人信息授权模版”外，其余上传的影像件请加盖公司公章。</li>
            <li class="explain-item">支持上传的文档格式：PDF。</li>
            <li class="explain-item">若上传身份证，请将身份证正、反面完整放在同一页上。请确保身份证在有效期内。</li>
            <li class="explain-item">若上传营业执照，请确保营业执照为最新版本。</li>
          </ol>
        </div>
      </el-row>
      <el-row class="addressee">
        <el-row>请将以上已盖章影像资料对应的纸质版邮递至以下地址：</el-row>
        <el-form :model="addressForm" ref="addressForm" label-width="160px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="收件人：">{{entInfoObj.form.platFastMailUserName}}</el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="收件人电话：">{{entInfoObj.form.platFastMailTel}}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="收件地址：">{{entInfoObj.form.platFastMailAddress}}</el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-row>

      <!-- 开票信息 -->
      <zj-top-header title="开票信息" direction="left"/>
      <div class="border-underline"></div>
      <el-row>
        <el-form :model="form" ref="form" :rules="InvoiceRules" label-width="160px" class="invoiceForm">
          <el-form-item label="纳税人识别号：" prop="invoiceTaxpayerId">
            <el-input type="text" placeholder="请输入内容" v-model="form.invoiceTaxpayerId" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="地址：" prop="invoiceAddress">
            <el-input type="text" placeholder="请输入内容" v-model="form.invoiceAddress" maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="电话：" prop="invoicePhone">
            <el-input type="text" placeholder="请输入内容" v-model="form.invoicePhone" maxlength="11"></el-input>
          </el-form-item>
          <el-form-item label="开户行：" prop="invoiceBankInfo">
            <el-input type="text" placeholder="请输入内容" v-model="form.invoiceBankInfo"></el-input>
          </el-form-item>
          <el-form-item label="银行账号：" prop="invoiceBankAccno">
            <el-input type="text" placeholder="请输入内容" v-model="form.invoiceBankAccno"></el-input>
          </el-form-item>
          <el-form-item label="接收发票电子邮箱：" prop="invoiceEmail">
            <el-input type="text" placeholder="请输入内容" v-model="form.invoiceEmail"></el-input>
          </el-form-item>
        </el-form>
      </el-row>
      <!-- 贸易信息 -->
      <el-row v-if="form.isHtEnterprise == '0'">
        <zj-top-header title="贸易信息" direction="left"/>
        <div class="border-underline"></div>
        <el-form :model="tradeInfoForm" :rules="tradeInfoRules" label-width="160px" class="invoiceForm">
          <el-form-item label="请选择：" prop="supplier">
            <el-radio v-model="tradeInfoForm.supplier" label="1">我是供应商</el-radio>
          </el-form-item>
          <el-form-item label="我的买方企业：" prop="myBuyers">
            <el-input type="text" placeholder="支持录入多个，请用'，'分隔开" v-model="tradeInfoForm.myBuyers"></el-input>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row class="btn-row">
        <zj-button status="primary" @click="pre">上一步</zj-button>
        <zj-button status="primary" @click="save('SAVE')">保存</zj-button>
        <zj-button type="primary" @click="registerSuccess">完成注册</zj-button>
      </el-row>
    </div>
    <RegisterFooter/>
    <!-- 维护经办员/复核员/风险信息接收人 信息维护弹窗 -->
    <el-dialog :visible.sync="maintainInfo" :close-on-click-modal="false" left
               width="800px" :title="`维护${dialogTitle}`" custom-class="mbi-editDialog" top="6vh"
    >
      <el-form ref="formModel" class="mbi-form" :model="formModel" :rules="formRules" :class="editFlag ? '' :'nmb0'" label-width="180px">
        <el-form-item label="姓名：" prop="userName" >
          <el-input v-model="formModel.userName"></el-input>
        </el-form-item>
        <el-form-item label="证件类型：" prop="certType" class="entType">
          <el-select v-model="formModel.certType" placeholder="请选择"
                     :popper-append-to-body="false" :disabled="true"
          >
            <el-option
              v-for="item in dictionary.userCertTypeList"
              :key="item.code"
              :value="item.code"
              :label="item.desc">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号码：" prop="certNo" >
          <el-input v-model="formModel.certNo"/>
        </el-form-item>
        <el-form-item label="证件有效期：" class="card-validity required" >
          <el-form-item prop="certStartDate" class="zj-inline">
            <zj-date-picker placeholder="年/月/日" :date.sync="formModel.certStartDate" :lessNow="true" ></zj-date-picker>
          </el-form-item>
          <div class="zj-inline zj-center zj-w-20">至</div>
          <el-form-item prop="certEndDate" class="zj-inline">
            <zj-date-picker placeholder="年/月/日" :date.sync="formModel.certEndDate" :pickerOptions="{ disabledDate: certEndDateDisabledDate }" :disabled="formModel.term" ></zj-date-picker>
          </el-form-item>
          <el-row>
            <el-checkbox v-model="formModel.term" @change="isChecked">长期有效</el-checkbox>
          </el-row>
        </el-form-item>
        <el-form-item label="手机号码：" prop="mobileNo" >
          <el-input v-model="formModel.mobileNo"/>
        </el-form-item>
        <el-form-item label="邮箱：" prop="email" >
          <el-input v-model="formModel.email"/>
        </el-form-item>
        <el-form-item label="银行卡号：" prop="bankAcctNo" >
          <el-input v-model="formModel.bankAcctNo"/>
        </el-form-item>
        <!--     一级供应商独有     -->
        <el-form-item label="海天业务系统账号：" prop="htBusinessId" v-if="form.isHtEnterprise == '1'">
          <el-input v-model="formModel.htSysCode"/>
          <span style="color: #7f7f7f;margin-left: 10px">注：该账号用于绑定平台和海天业务系统。</span>
        </el-form-item>
      </el-form>
      <el-row slot="footer" class="dialog-footer">
        <vxe-button status="primary" @click="saveOperator">确认</vxe-button>
        <vxe-button class="back" @click="cancel">取消</vxe-button>
      </el-row>
    </el-dialog>
    <!-- 注册成功弹窗 -->
    <el-dialog
      title="温馨提示"
      :visible.sync="dialogVisible"
      width="400px" center
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div>
        <p>提交成功！请您将上传影像件对应的的纸质版文件邮寄至平台方对应地址，谢谢！</p>
      </div>
      <div slot="footer" class="dialog-footer">
        <zj-button status="primary" @click="onConfirm">
          确认
        </zj-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import RegisterProgressBar from './RegisterProgressBar.vue'
import RegisterHeader from "./RegisterHeader.vue";
import RegisterFooter from "./RegisterFooter.vue";
import {validateBankAcct, validateFixedPhone, validatePhone} from "@utils/rules";
export default {
  name: 'RegisterStep104',
  components: {
    RegisterProgressBar,RegisterHeader,RegisterFooter
  },
  props: {
    step: String,
    zjControl:Object,
    entInfoObj:Object,
    dictionary:Object

  },
  data() {
    return {
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
        invoiceAddress: '',//开票信息
        invoiceBankAccno: '',//开票信息
        invoiceBankInfo: '',//开票信息
        invoiceEmail: '',//开票信息
        invoicePhone: '',//开票信息
        invoiceTaxpayerId: this.entInfoObj.form.bizLicence,//开票信息
        isHtEnterprise: '',
        legalCertExpireDate: '',
        legalCertTerm: false,
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
        term: false,
        registerOperateFlag: '',
        registerPhone: '',
        registerStartDate: '',
        registerWebsite: '',
        scale: '',
        smallPaymentCertAmt: '',
      },
      //影像资料
      registerAttachList:[],
      //贸易信息
      tradeInfoForm: {
        supplier:'1',
        myBuyers:'',
      },
      //贸易信息规则
      tradeInfoRules: {
        supplier: [
          {required: true, message: '请选择我是供应商', trigger: 'blur'},
        ],
        myBuyers: [
          {required: false, message: '请录入我的买方企业', trigger: 'blur'},
        ],
      },
      addressForm: {
      },
      //维护经办员/复核员/风险信息接收人 信息维护
      formModel: {
        userName: '',//姓名
        userId: '',//
        id: '',//
        certType: '01',//证件类型
        certNo: '',//证件号码
        certStartDate:'',//证件号码起始日
        certEndDate:'',//证件号码截止日
        term: false,//长期有效
        mobileNo: '',//手机号码
        email: '',//邮箱
        bankAcctNo: '',//银行卡号
        htSysCode: '',//海天业务系统账号
        idCheckState: '',//是否完成身份核验
      },
      //开票信息-规则
      InvoiceRules:{
        invoiceTaxpayerId: [
          {required: true, message: '请输入纳税人识别号', trigger: 'blur'},
        ],
        invoiceAddress: [
          {required: true, message: '请输入开票地址', trigger: 'blur'},
        ],
        invoicePhone: [
          {required: true, message: '请输入开票的电话号码', trigger: 'blur'},
          {validator: validateFixedPhone, trigger: 'blur'},
        ],
        invoiceBankInfo: [
          {required: true, message: '请输入开户行', trigger: 'blur'},
        ],
        invoiceBankAccno: [
          {required: true, message: '请输入银行账号', trigger: 'blur', max:50,},
          {validator: validateBankAcct, trigger: 'blur'},
        ],
        invoiceEmail: [
          {required: true, message: '请输入邮箱号码', trigger: 'blur'},
          {validator:(rule, value, callback) => {
              let emailReg = /^[0-9A-Za-z_-]+[@][0-9A-Za-z]+([.][0-9A-Za-z]+){1,2}$/
              if (!value && rule.required) {
                callback(new Error('请输入接收发票电子邮箱'))
              } else if (value && !emailReg.test(value)) {
                callback(new Error('接收发票电子邮箱格式不正确'))
              } else {
                callback()
              }
            }, trigger: 'blur'},
        ],
      },
      //维护经办员/复核员/风险信息接收人 信息维护-规则
      formRules: {
        userName: [
          {required: true, message: '请输入姓名', trigger: 'blur'},
        ],
        certType: [
          {required: true, message: '请选择证件类型', trigger: 'blur'},
        ],
        certNo: [
          {required: true, message: '请输入证件号码', trigger: 'blur'},
          {validator:(rule, value, callback)=>{
              let idReg = /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
              if(rule.required && !value){
                callback(new Error('请输入法人证件号码'))
              }else if(value && this.form && this.form.legalCertType === '01' && !idReg.test(value)){
                callback(new Error('证件号码格式不正确'))
              }else{
                callback()
              }
            },
            trigger: 'blur'},
        ],
        certStartDate: [
          { required: true, message: '请选择证件有效期起始日', trigger: ['blur'] }
        ],
        certEndDate: [
          { message: '请选择证件有效期截止日', trigger: ['blur'] },
          { validator:(rule, value, callback) => {
              let reqHandle = this.formModel.term ? false : true
              if (!value && reqHandle) {
                callback(new Error('请选择证件有效期截止日'))
              } else {
                callback()
              }
            }, trigger: 'blur'},
        ],
        mobileNo: [
          {required: true, message: '请输入手机号码', trigger: 'blur'},
          {validator: validatePhone, trigger: 'blur'},
        ],
        email: [
          {required: false, message: '请输入邮箱号码', trigger: 'blur'},
          {validator:(rule, value, callback) => {
              let emailReg = /^[0-9A-Za-z_-]+[@][0-9A-Za-z]+([.][0-9A-Za-z]+){1,2}$/
              if (!value && rule.required) {
                callback(new Error('请输入邮箱'))
              } else if (value && !emailReg.test(value)) {
                callback(new Error('邮箱格式不正确'))
              } else {
                callback()
              }
            }, trigger: 'blur'},
        ],
        bankAcctNo: [
          {required: false, message: '请输入银行卡号', trigger: 'blur', max:50,},
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
      },
      dialogVisible: false,//注册成功弹窗
      editFlag: false,
      maintainInfo: false,//维护操纵员弹窗
      dialogTitle: '',//维护操纵员弹窗标题
      operatorTable:true,
      registerUserList: [
        {
          roleId: '2', userId: '', userName: '', certType: '01', certNo: '', certStartDate: '', certEndDate: '', mobileNo: '', email: '', bankAcctNo: '', htSysCode:'', idCheckState:''
        },
        {
          roleId: '3', userId: '', userName: '', certType: '01', certNo: '', certStartDate: '', certEndDate: '', mobileNo: '', email: '', bankAcctNo: '', htSysCode:'', idCheckState:''
        },
        {
          roleId: '4', userId: '', userName: '', certType: '01', certNo: '', certStartDate: '', certEndDate: '', mobileNo: '', email: '', bankAcctNo: '', htSysCode:'', idCheckState:''
        },
      ],
    }
  },
  methods: {
    pre(){
      this.$emit('update:step','103')
    },
    registerSuccess() {
      console.log(this.registerUserList)
      //校验操作用户数据是否完整
      if(!this.entInfoObj.form.registerUserList) {
        for(let i of this.registerUserList){
          if(!i.userId) {
            this.$message.error(`请补全操作用户的信息！`)
            return
          }
        }
      }else{
        for(let i of this.entInfoObj.form.registerUserList){
          if(!i.userId) {
            this.$message.error(`请补全操作用户的信息！`)
            return
          }
        }
      }
      //校验影像资料是否完整
      if(!this.entInfoObj.form.registerAttachList){
        for(let i of this.registerAttachList){
          if(i.fileName ===  null || '') {
            this.$message.error(`请补全影像资料信息！`)
            return
          }
        }
      }else {
        for(let i of this.entInfoObj.form.registerAttachList){
          if(i.fileName ===  null || '') {
            this.$message.error(`请补全影像资料信息！`)
            return
          }
        }
      }
      console.log('影像资料success~~~')
      //校验发票信息
      this.$refs.form.validate(boo=>{
        if (!boo){
          return
        }else{
          //校验贸易信息
          if(this.entInfoObj.form.isHtEnterprise === '0' && this.tradeInfoForm.supplier !== '1'){
            this.$message.error(`请勾选"我是供应商"！`)
            return
          }
          this.entInfoObj.form.invoiceAddress = this.form.invoiceAddress
          this.entInfoObj.form.invoiceBankAccno = this.form.invoiceBankAccno
          this.entInfoObj.form.invoiceBankInfo = this.form.invoiceBankInfo
          this.entInfoObj.form.invoiceEmail = this.form.invoiceEmail
          this.entInfoObj.form.invoicePhone = this.form.invoicePhone
          this.entInfoObj.form.invoiceTaxpayerId = this.form.invoiceTaxpayerId
          this.entInfoObj.form.myBuyers = this.tradeInfoForm.myBuyers
          let params = {
            ...this.entInfoObj.form,
            id: this.entInfoObj.form.id,
            name: this.entInfoObj.form.name,
            registerOperateFlag: 'NEXT',
          }
          this.zjControl.completeRegister(params).then(res => {
            this.dialogVisible = true
            let params = Object.assign({},this.entInfoObj)
            params.form.registerUserList = this.registerUserList//操作用户
            params.form.registerAttachList = this.registerAttachList//影像资料
            params.form.tradeInfoForm = this.tradeInfoForm//贸易信息
            this.$emit('update:entInfoObj',params)
          })
        }
      })
    },
    onConfirm() {
      this.$router.push({ path: '/login' })
    },
    maintainOperator(row) {
      //回显表格数据
      this.formModel.roleId = row.roleId
      this.formModel.userId = row.userId ? row.userId:''
      this.formModel.userName = row.userName
      this.formModel.certNo = row.certNo
      this.formModel.certType = row.certType
      this.formModel.certStartDate = row.certStartDate
      this.formModel.certEndDate = row.certEndDate
      this.formModel.term = row.term
      this.formModel.mobileNo = row.mobileNo
      this.formModel.email = row.email
      this.formModel.bankAcctNo = row.bankAcctNo
      if(this.form.isHtEnterprise == '1') {
        this.formModel.htSysCode = row.htSysCode
        this.formModel.idCheckState = row.idCheckState
      }
      this.dialogTitle = this.typeMap(this.dictionary.roleIdList,row.roleId)
      this.maintainInfo = true
      console.log(this.formModel)
    },
    isChecked() {
      if(this.formModel.term === true) {
        this.formModel.certEndDate = ''
      }
    },
    //维护维护经办员/复核员/风险信息接收人 数据
    saveOperator() {
      //----------------------校验-------------------------
      this.$refs.formModel.validate(boo=>{
        if(!boo){return}
        this.$messageBox({
          type:'confirm',
          title:`温馨提示`,
          content:`系统将自动进行操作人员身份核验，请确认是否继续？`,
          showCancelButton:true,
          messageResolve:()=>{
            this.formModel.userOperateFlag = 'SURE'
            this.formModel.id = this.entInfoObj.form.id
            this.formModel.userId = this.formModel.userId ? this.formModel.userId : ''
            this.formModel.isHtEnterprise  = this.entInfoObj.form.isHtEnterprise
            this.formModel.certStartDate = this.formModel.certStartDate.replace(/-/g,'')
            this.formModel.certEndDate = this.formModel.term ? '' : this.formModel.certEndDate.replace(/-/g,'')
            this.zjControl.saveRegisterEntUser(this.formModel).then( res => {
              //更新列表数据
              this.operatorTable = false
              for(let i of this.registerUserList) {
                if(res.data.roleId === i.roleId) {
                  this.registerUserList[this.registerUserList.indexOf(i)] = res.data
                }
              }
              this.$nextTick(()=>{
                this.operatorTable = true
              })
              let params = Object.assign({},this.entInfoObj)
              params.form.registerUserList = this.registerUserList
              this.$emit('update:entInfoObj',params)
              let activeRoleId = this.typeMap(this.dictionary.roleIdList,res.data.roleId)
              this.$message.success(`维护${activeRoleId}成功！`)
              this.maintainInfo = false
            })
          }
        })
      })
    },
    save(flag){
      this.entInfoObj.form.registerOperateFlag = flag//操作标记
      this.entInfoObj.form.invoiceAddress = this.form.invoiceAddress
      this.entInfoObj.form.invoiceBankAccno = this.form.invoiceBankAccno
      this.entInfoObj.form.invoiceBankInfo = this.form.invoiceBankInfo
      this.entInfoObj.form.invoiceEmail = this.form.invoiceEmail
      this.entInfoObj.form.invoicePhone = this.form.invoicePhone
      this.entInfoObj.form.invoiceTaxpayerId = this.form.invoiceTaxpayerId
      this.entInfoObj.form.myBuyers = this.tradeInfoForm.myBuyers
      this.zjControl.completeRegister(this.entInfoObj.form).then(res => {
        this.$message.success('提交企业资料成功！')
        let params = Object.assign({},this.entInfoObj)
        params.form.registerUserList = this.registerUserList//操作用户
        params.form.registerAttachList = this.registerAttachList//影像资料
        params.form.tradeInfoForm = this.tradeInfoForm//贸易信息
        this.$emit('update:entInfoObj',params)
      })
    },
    cancel() {
      this.formModel.userOperateFlag = 'CANCEL'
      this.formModel.id = this.entInfoObj.form.id
      this.formModel.userId = this.formModel.userId ? this.formModel.userId : ''
      this.formModel.isHtEnterprise  = this.entInfoObj.form.isHtEnterprise
      this.formModel.certStartDate = this.formModel.certStartDate?this.formModel.certStartDate.replace(/-/g,''):''
      this.formModel.certEndDate = this.formModel.certEndDate?this.formModel.certEndDate.replace(/-/g,''):''
      this.zjControl.saveRegisterEntUser(this.formModel).then( res => {
        //更新列表数据
        this.operatorTable = false
        for(let i of this.registerUserList) {
          if(res.data.roleId === i.roleId) {
            this.registerUserList[this.registerUserList.indexOf(i)] = res.data
          }
        }
        this.$nextTick(()=>{
          this.operatorTable = true
        })
        let params = Object.assign({},this.entInfoObj)
        params.form.registerUserList = this.registerUserList
        this.$emit('update:entInfoObj',params)
        this.maintainInfo = false
      })
    },
    certStartDateDisabledDate (date) {
      if (this.formModel.certEndDate) {
        return date.getTime() > this.$moment(this.formModel.certEndDate)
      }
    },
    certEndDateDisabledDate (date) {
      if (this.formModel.certStartDate) {
        return date.getTime() < this.$moment(this.formModel.certStartDate)
      } else {
        return date.getTime()
      }
    },
    //上传影像资料附件
    handleFileUpload({file,data}){
      let formData = new FormData()
      formData.append('file',file)
      this.zjControl.uploadAttach(formData).then(res => {
        data.row.fileId = res.data.fileId
        data.row.fileName = res.data.fileName
        let params = Object.assign({},this.entInfoObj)
        params.form.registerAttachList = this.registerAttachList
        this.$emit('update:entInfoObj',params)
        this.$message.success('附件上传成功!')
        console.log(this.registerAttachList)
        console.log(data.row)
        console.log(this.entInfoObj)
      })
    },
    //下载影像资料附件
    handleFileDownload(row){
      let params = {
        fileId:row.fileId,
        fileName:row.fileName
      }
      this.zjControl.downloadFile(params)
    },
    //下载授权书模板
    downloadTemplate(type){
      //下载前需要校验操作用户信息是否完整
      if(!this.entInfoObj.form.registerUserList) {
        for(let i of this.registerUserList){
          if(!i.userId) {
            this.$message.error(`请补全操作用户的信息！`)
            return
          }
        }
      }else{
        for(let i of this.entInfoObj.form.registerUserList){
          if(!i.userId) {
            this.$message.error(`请补全操作用户的信息！`)
            return
          }
        }
      }
      let params = {
        id: this.entInfoObj.form.id,
        templateType: type,
        registerUserList: this.entInfoObj.form.registerUserList
      }
      this.zjControl.downloadTemplate(params)
    },
    //回显开票信息
    setInvoiceInfo(){
      if(this.entInfoObj.form.invoiceAddress){
        this.form.invoiceAddress = this.entInfoObj.form.invoiceAddress
      }
      if(this.entInfoObj.form.invoiceBankAccno){
        this.form.invoiceBankAccno = this.entInfoObj.form.invoiceBankAccno
      }
      if(this.entInfoObj.form.invoiceBankInfo){
        this.form.invoiceBankInfo = this.entInfoObj.form.invoiceBankInfo
      }
      if(this.entInfoObj.form.invoiceEmail){
        this.form.invoiceEmail = this.entInfoObj.form.invoiceEmail
      }
      if(this.entInfoObj.form.invoicePhone){
        this.form.invoicePhone = this.entInfoObj.form.invoicePhone
      }
      //回显操作用户信息
      if(this.entInfoObj.form.registerUserList) {
        this.registerUserList = this.entInfoObj.form.registerUserList
      }
      //回显影像资料信息
      if(this.entInfoObj.form.registerAttachList) {
        this.registerAttachList = this.entInfoObj.form.registerAttachList
      }
      //回显贸易信息
      if(this.entInfoObj.form.tradeInfoForm) {
        this.tradeInfoForm = this.entInfoObj.form.tradeInfoForm
      }
    },
    //获取用户信息
    getUserInfo() {
      this.zjControl.getUserInfo({
        id: this.entInfoObj.form.id,
        name: this.entInfoObj.form.name,
      }).then(res=>{
        this.registerUserList = res.data.registerUserList
        this.registerAttachList = res.data.registerAttachList
        this.setInvoiceInfo()

      })
    }
  },
  created() {
    console.log(this.entInfoObj)
    this.form.isHtEnterprise = this.entInfoObj.form.isHtEnterprise
    this.form.legalCertType = this.entInfoObj.form.legalCertType
    this.getUserInfo()

  },
}
</script>

<style lang="less" scoped>
.register {
  //position: relative;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  /*background-color: #EEEEEE;*/
  background-color: #F9F9F9;
  z-index: -9999;
  overflow-y: auto;
  min-height: 790px;
  min-width: 805px;
}
.sw_footer{
  //position: absolute;
  //bottom: 0;
}
.register-inline {
  position: relative;
  z-index: 1;
  width: 1000px;
  min-height: 523px;
  margin: 10px auto;
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
.register-msg {
  background: #F4F9FF;
  border: 1px solid #E0E0E0;
  border-radius: 5px;
  margin: 20px 50px;
  padding: 10px 20px;
}
.register-point {
  display: inline-block;
  color: rgb(84, 148, 242);
  vertical-align: top;
  margin-top: 4px;
  margin-right: 5px;
  transform: scale(0.5);
}
.operator-table {
  margin-bottom: 20px;
}
.explain-text {
  display: flex;
  padding: 20px 0;
  background-color: rgba(2, 167, 240, 0);
  .explain-item {
    color: #555;
    font-size: 14px;
    margin-left: 20px;
  }
}
.addressee {
  form {
    margin-top: 20px;
  }
}
.invoiceForm {
  width: 80%;
  margin: 0 auto;
  /deep/.el-input__inner {
    width: 300px;
  }
}
.agreement {
  /deep/.el-button + .el-button {
    margin: 0;
  }
  /deep/.zj-buttons.zj-buttons-text span {
    margin: 0!important;
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
.card-validity {
  /deep/.el-date-editor.el-input {
    width: 120px;
  }
  /deep/.zj-date-picker .el-input__inner {
    min-width: auto;
    padding: 0 30px 0 15px !important;
  }
}

</style>
