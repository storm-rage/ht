<template>
  <div class="register">
    <RegisterHeader/>
    <div class="register-inline">
      <!--  被驳回下次注册时    -->
     <register-progress-bar :active="2" :error="true" v-if="entInfoObj.state === '6'" :error-info="entInfoObj.notes"/>
      <register-progress-bar :active="1" v-else/>
    </div>
    <div class="register-inline">
      <el-form ref="form" :model="form" :rules="rules" class="register-form" label-width="250px">
        <div class="register-title">基本信息</div>
        <el-form-item label="企业名称：" required>
          <span>{{ form.name }}</span>
        </el-form-item>
        <!-- 营业 -->
        <el-form-item label="营业执照影印件：" prop="qyyzFileId" class="required">
          <el-popover
            placement="right"
            trigger="hover">
            <div>
              <img :src="viewUrl.qyyzFile.url" width="200" height="200">
            </div>
            <el-button slot="reference" type="text" @click="downs({fileName:form.qyyzAttachName,fileId:form.qyyzFileId})">{{ form.qyyzAttachName }}</el-button>
            <!--            <zj-button type="text" @click="downloadFile(form.qyfrzjFileId,form.qyfrzjAttachName)">{{ form.qyfrzjAttachName }}</zj-button>-->
          </el-popover>
          <!--          <zj-button type="text" @click="downloadFile(form.qyyzFileId,form.qyyzAttachName)">{{ form.qyyzAttachName }}</zj-button>-->
          <zj-upload :httpRequest="upload" :data="{ busType: 'qyyz' }" style="display: inline-block">
            <zj-button size="mini" class="uploadBtn" :class="qyyzFileIdFlag ? 'bt-red' : ''">
              {{ this.form.qyyzAttachName ? '重新上传' : '上传' }}
            </zj-button>
          </zj-upload>
          <el-popover placement="right" trigger="click" ref="popover1">
            <div>
              <!--              <div style="width:50px;height: 50px;position: absolute;right: 10px;top: 10px;cursor: pointer" @click="hidePopper('popover1')"/>-->
              <img src="@assets/img/register/sample-business-license.png">
            </div>
            <zj-button
              slot="reference"
              type="text" status="primary" class="explainBtn"
              @mouseenter.native="showPopper('popover1')"
              @mouseleave.native="hidePopper('popover1')"
            >
              上传营业执照影印件要求说明
            </zj-button>
          </el-popover>
        </el-form-item>
        <el-form-item label="统一社会信用代码：" prop="bizLicence" class="required">
          <el-input v-model="form.bizLicence" maxLength="25" placeholder="请输入统一社会信用代码" :disabled="!qyyzBoo"/>
        </el-form-item>
        <el-form-item label="营业执照注册地址：" prop="address" class="required">
          <el-input v-model="form.address" :disabled="!qyyzBoo" :maxLength="400"/>
        </el-form-item>
        <el-form-item label="成立日期：" prop="registerStartDate" class="required"> <!-- :clearable="false" -->
          <zj-date-picker :date.sync="form.registerStartDate" :lessNow="true" :disabled="!qyyzBoo" :format="'yyyy年MM月dd日'"/>
        </el-form-item>
        <el-form-item label="企业工商有效期：" prop="registerEndDate" class="required">
<!--          <zj-date-picker :date.sync="form.registerEndDate" :lessNow="true"/>-->
          <el-input v-model="form.registerEndDate" :disabled="!qyyzBoo"/>
        </el-form-item>
        <el-form-item label="注册资本：" prop="registerCapital" class="required">
          <el-input v-model="form.registerCapital" :disabled="!qyyzBoo"/>
        </el-form-item>
        <el-form-item label="法定代表人姓名：" prop="legalPersonName" class="required">
          <el-input v-model="form.legalPersonName" maxLength="50" placeholder="请输入法定代表人姓名" :disabled="!qyyzBoo"/>
        </el-form-item>
        <!-- 法定 -->
        <el-form-item label="法定代表人：" prop="qyfrzjFileId" class="required">
          <el-popover
            placement="right"
            trigger="hover">
            <div>
              <img :src="viewUrl.qyfrzjFile.url" width="200" height="200">
            </div>
            <el-button slot="reference" type="text" @click="downs({fileName:form.qyfrzjAttachName,fileId:form.qyfrzjFileId})">{{ form.qyfrzjAttachName }}</el-button>
            <!--            <zj-button type="text" @click="downloadFile(form.qyfrzjFileId,form.qyfrzjAttachName)">{{ form.qyfrzjAttachName }}</zj-button>-->
          </el-popover>
          <zj-upload :httpRequest="upload" :data="{ busType: 'qyfrzj' }" class="zj-inline">
            <zj-button size="mini" class="uploadBtn" :class="qyfrzjFileIdFlag ? 'bt-red' : ''">
              {{ this.form.qyfrzjAttachName ? '重新上传' : '上传' }}
            </zj-button>
          </zj-upload>
          <el-popover placement="right" trigger="click" ref="popover2">
            <div>
              <img src="@assets/img/register/sample-id-card.png">
            </div>
            <zj-button
              slot="reference"
              type="text" status="primary" class="explainBtn"
              @mouseenter.native="showPopper('popover2')"
              @mouseleave.native="hidePopper('popover2')"
            >
              上传法定代表人身份证要求说明
            </zj-button>
          </el-popover>
        </el-form-item>
        <el-form-item label="证件：" class="zj-h-28" required>
          <el-form-item prop="legalCertType" class="zj-inline">
            <el-select v-model="form.legalCertType" placeholder="请选择证件类型" class="register102-legalCertType"
                       @change="legalCertTypeChange"
                       :popper-append-to-body="false"
                       :disabled="!qyfrBoo"
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
          <el-form-item prop="legalCertNo" class="zj-inline zj-m-l-30">
            <el-input v-model="form.legalCertNo" placeholder="请输入证件号码" maxLength="50" :disabled="!qyfrBoo"/>
          </el-form-item>
        </el-form-item>
        <el-form-item label="证件有效期：" class="zj-h-28" required>
            <el-form-item prop="legalCertRegDate" class="zj-inline"> <!-- :clearable="false" -->
              <zj-date-picker placeholder="请选择证件有效期起始日"  :date.sync="form.legalCertRegDate" :pickerOptions="{ disabledDate:legalCertRegDateDisabledDate }" :disabled="!qyfrBoo"></zj-date-picker>
            </el-form-item>
            <div class="zj-inline zj-center zj-w-30">至</div>
            <el-form-item prop="legalCertExpireDate" class="zj-inline"> <!-- :clearable="false" -->
              <zj-date-picker placeholder="请选择证件有效期截止日"  :date.sync="form.legalCertExpireDate" :pickerOptions="{ disabledDate: legalCertExpireDateDisabledDate }" :disabled="!qyfrBoo"></zj-date-picker>
            </el-form-item>
        </el-form-item>
        <!-- 企业 -->
        <el-form-item label="企业规模：" prop="scale" class="no-required">
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
        <el-form-item label="企业经营类型：" prop="custType" class="no-required">
          <el-select placeholder="请选择经营类型" v-model="form.custType"
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
        <!-- 开票 -->
        <div class="register-title">开票信息</div>
        <el-form-item label="纳税人识别号：" prop="invoiceTaxpayerId" class="required">
          <el-input v-model="form.invoiceTaxpayerId" maxLength="20" placeholder="请输入纳税人识别号"/>
        </el-form-item>
        <el-form-item label="地址：" prop="invoiceAddress" class="required">
          <el-input v-model="form.invoiceAddress" placeholder="请输入地址"/>
        </el-form-item>
        <el-form-item label="电话：" prop="invoicePhone" class="required">
          <el-input v-model="form.invoicePhone" placeholder="请输入电话"/>
        </el-form-item>
        <el-form-item label="开户行：" prop="invoiceBankInfo" class="required">
          <el-input v-model="form.invoiceBankInfo" placeholder="请输入开户行" maxlength="200"/>
        </el-form-item>
        <el-form-item label="银行账号：" prop="invoiceBankAccno" class="required">
          <el-input v-model="form.invoiceBankAccno" placeholder="请输入银行账号"/>
        </el-form-item>
        <el-form-item label="电子邮箱：" prop="invoiceEmail" class="required">
          <el-input v-model="form.invoiceEmail" placeholder="请输入电子邮箱"/>
        </el-form-item>
        <!-- 贸易 -->
        <div class="register-title">贸易信息</div>
        <el-form-item prop="entType" class="required">
          <span slot="label">
            <span class="red"> 请选择 </span>：
          </span>
          <el-radio-group v-model="form.entType">
            <el-radio v-for="(item,index) in entTypeList" :key="index" :label="item.code">{{item.desc}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label=" " prop="myBuyers" class="myBuyers">
          <span class="el-form-item__label zj-p-r-0">我的买方企业：</span>
          <el-input v-model="form.myBuyers" placeholder="可录入多个，使用“ , ”分隔" /> <!-- @blur="myBuyersBlur" -->
          <label class="msgText" v-if="myBuyersMessage">{{myBuyersMessage}}</label>
        </el-form-item>

        <!-- 提示 -->
        <el-form-item v-if="formWarning">
          <p class="formTips">
            <i class="el-icon-error iconError fs-14"></i>
            <span class="tipsWarning fs-14">{{nextError}}</span>
          </p>
        </el-form-item>

        <el-form-item label=" " >
          <zj-button status="primary" @click="next">下一步</zj-button>
        </el-form-item>
<!--        <el-form-item class="next-button-row" style="margin-left: 70px">-->
<!--          <zj-button status="primary" @click="next">下一步</zj-button>-->
<!--        </el-form-item>-->
      </el-form>
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

  // validatePhone,//电话
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

      entTypeList:[
        {code:'B',desc:'我是核心企业'},{code:'S',desc:'我是供应商'}
      ],
      myBuyersMessage:'',

      form: {
        name: '企业名称',
        // ----  营业  -------
        qyyzAttachId:'',//营业执照附件主键id（新增时为空）
        qyyzFileId:'',
        qyyzAttachName:'',//营业执照影印件名称
        qyyzFileSize:'',//营业执照文件大小
        qyyzFileType:'',//营业执照文件类型
        qyyzFileUrl:'',//营业执照文件路径
        bizLicence:'',//统一社会信用代码
        address:'',//营业执照注册地址
        registerStartDate:'',//成立日期
        registerEndDate:'',//企业工商有效期
        registerCapital:'',//注册资本
        companyType:'',

        //---- 法人 -------
        legalPersonName:'',//法定代表人姓名
        qyfrzjFileId:'',
        qyfrzjAttachId:'',//法定代表人证件附件主键id(新增时为空)
        qyfrzjAttachName:'',//法定代表人证件名称
        qyfrzjFileSize:'',//法定代表人证件文件大小
        qyfrzjFileType:'', //法定代表人证件文件类型
        qyfrzjFileUrl:'',//法定代表人证件文件路径
        legalCertType:'',//法定代表人证件类型
        legalCertNo:'',//法定代表人证件号码
        legalCertRegDate:'',//法人证件有效期起始日
        legalCertExpireDate:'',//法人证件有效期截止日
        // ---- 企业 -----
        scale:'',//企业规模
        custType:'',//企业类型
        //---- 开票信息 -----
        invoiceTaxpayerId:'',//纳税人识别号
        invoiceAddress:'',//地址
        invoicePhone:'',//电话
        invoiceBankInfo:'',//开户行
        invoiceBankAccno:'',//银行账号
        invoiceEmail:'',//电子邮箱
        //---- 贸易信息 -----
        entType:'',
        myBuyers:'',
        registerWebsite:window.location.host
      },
      rules: {
        qyyzFileId: [
          { required: false, message: '请上传营业执照影印件', trigger: ['blur'] }
        ],
        bizLicence: [
          { required: false,  message:  '请输入统一社会信用代码', trigger: ['blur'] },
          { validator:validateBusinessNo,trigger: ['blur'] }
        ],
        address: [
          { required: false, message: '请输入营业执照注册地址', trigger: ['blur'] },
          { max:400, message: '营业执照注册地址不可超过400字符', trigger: ['blur'] }
        ],
        registerStartDate: [
          { required: false, message: '请选择成立日期', trigger: ['blur'] }
        ],
        registerEndDate: [
          { required: false, message: '请填写企业工商有效期', trigger: ['blur'] }
        ],
        registerCapital: [
          { required: false, message: '请填写注册资本', trigger: ['blur'] }
        ],
        //-----------------  法人
        qyfrzjFileId: [
          { required: false, message: '请上传法定代表人身份证', trigger: ['blur'] }
        ],
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
          { required: false, message: '请选择证件有效期起始日', trigger: ['blur'] }
        ],
        legalCertExpireDate: [
          { required: false, message: '请选择证件有效期截止日', trigger: ['blur'] }
        ],
        //-----------------  企业
        scale: [
          { required: false, message: '请选择企业规模', trigger: 'blur' }
        ],
        custType: [
          { required: false, message: '请选择经营类型', trigger: ['blur'] }
        ],
        //-----------------  开票
        invoiceTaxpayerId: [
          { required: false, message: '请输入纳税人识别号', trigger: ['blur'] },
          { validator:validateInvoiceTaxpayerId,trigger: ['blur']}
        ],
        invoiceAddress: [
          { required: false, message: '请输入开票地址', trigger: ['blur'] },
          { max:400, message: '开票地址不可超过400字符', trigger: ['blur'] }
        ],
        invoicePhone: [
          { required: false, message: '请输入电话', trigger: ['blur'] },
          { max:20, message: '固定电话或手机号码不可超过20位', trigger: ['blur'] },
          { validator:validateFixedPhone,trigger: ['blur']}
        ],
        invoiceBankInfo: [
          { required: false, message: '请输入开户行', trigger: ['blur'] },
          { max:200, message: '开户行不可超过200字符', trigger: ['blur'] },
        ],
        invoiceBankAccno: [
          { required: false, message: '请输入银行账号', trigger: ['blur'] },
          { max:50,validator:validateBankAcct,trigger: ['blur']}
        ],
        invoiceEmail: [
          { required: false, message: '请输入电子邮箱', trigger: ['blur'] },
          { validator:validateEmail,trigger: ['blur']}
        ],
        //-----------------  贸易信息
        entType:[
          { required: false, message: '请选择企业类型', trigger: ['blur'] }
        ],
        myBuyers:[
          { required: false, message: '请输入买方企业', trigger: ['blur'] }
        ]
      },
      formWarning:false, //是否展示错误语句
      viewUrl:{
        qyyzFile:{url:''},
        qyfrzjFile:{url:''}
      },
      //下一步提示信息
      qyyzFileIdFlag:false,//影印
      qyfrzjFileIdFlag:false,//法定
      nextError:'信息存在未填写部分，请填写完整后再提交！',

      //未上传禁用
      qyyzBoo:false,
      qyfrBoo:false
    }
  },
  methods: {
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
    //上传按钮
    upload ({ file, data }) {
      let formData = new FormData()
      formData.append('file',file)
      this.zjControl.uploadAttach(formData).then(res => {

        let uploadData = JSON.parse(JSON.stringify(res.data))

        data.busType === 'qyyz' ? this.qyyzBoo = true : this.qyfrBoo = true

        //进行ocr请求
        let ocrParams = {
          fileName:uploadData.fileName,
          fileId:uploadData.fileId
        }

        this.form[data.busType+'AttachName'] = uploadData.fileName
        this.form[data.busType+'FileId'] = uploadData.fileId
        this.form[data.busType+'FileSize'] = uploadData.fileSize
        this.form[data.busType+'FileType'] = uploadData.fileType
        let viewParams = {
          fileUrl:this.form[data.busType+'FileId'],
          fileId: this.form[data.busType+'FileId'],
          fileName: this.form[data.busType+'AttachName']
        }
        this.getViewUrl(viewParams,data.busType + 'File')
        this.$refs.form.validateField(data.busType+'FileId')
        this[data.busType+'FileIdFlag'] = false
        this.formWarning = false

        if (data.busType === 'qyyz'){ //营业执照
          this.zjControl.sendOcrBusiness(ocrParams).then(ocrRes => {
            if(!ocrRes.data){return}
            let qyyzOCRlist = ['bizLicence','address','registerStartDate','registerEndDate','registerCapital','legalPersonName','companyType']
            qyyzOCRlist.map(item => {
              this.form[item] = ocrRes.data[item]
            })
          })

        }else if (data.busType === 'qyfrzj'){ //法定代表人
          this.zjControl.sendOcrCert(ocrParams).then(ocrRes => {
            if(!ocrRes.data){return}
            let {certType,certNo,certStartDate,certEndDate} = ocrRes.data
            // this.form.legalPersonName = userName
            this.form.legalCertType = certType
            this.form.legalCertNo = certNo
            this.form.legalCertRegDate = certStartDate
            this.form.legalCertExpireDate = certEndDate
          })

        }
      })
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
    //下一步按钮
    next () {
      //----------------------非空校验-------------------------
      let rulesArr = []
      let whiteList = ['scale','custType','myBuyers']
      let form = 'form'
      let rules = 'rules'
      for(let key in this[rules]){
        if(!whiteList.some(item => item === key)){
          rulesArr.push(key)
        }
      }
      let mesKey = true
      for(let i=0; i<rulesArr.length; i++){
        if(!mesKey){ break }
        if(!this[form][rulesArr[i]]){
          if(rulesArr[i] === 'qyyzFileId'){
            this.qyyzFileIdFlag = true
            this.qyfrzjFileIdFlag = false
            this.nextError = '营业执照影印件未上传，请上传完成后再提交'
            this.$Message.error(this[rules][rulesArr[i]][0].message)
          }else if(rulesArr[i] === 'qyfrzjFileId'){
            this.qyyzFileIdFlag = false
            this.qyfrzjFileIdFlag = true
            this.nextError = '法定代表人身份证未上传，请上传完成后再提交'
            this.$Message.error(this[rules][rulesArr[i]][0].message)
          }else {
            this.qyyzFileIdFlag = false
            this.qyfrzjFileIdFlag = false
            this.nextError = '信息存在未填写部分，请填写完整后再提交！'
            this.$Message.error(this[rules][rulesArr[i]][0].message)
          }
          mesKey = false
        }
      }
      this.formWarning = !mesKey
      if(!mesKey){ return }
      //------------------------------------------------------
      this.$refs.form.validate(boo=>{
        if (!boo){
          // return this.$message.error('信息存在未填写部分，请填写完整后再提交！')
          // this.formWarning = true
          return
        }else{
          this.$messageBox({
            type:'confirm',
            title:`温馨提示`,
            content:`确认资料填写无误？`,
            showCancelButton:true,
            messageResolve:()=>{
              this.zjControl.saveEntInfo(this.form).then(() => {
                this.$Message.success('提交企业资料成功！')


                let params = Object.assign({},this.entInfoObj)
                params.form = this.form
                this.$emit('update:entInfoObj',params)

                this.$emit('update:step','103')
                // let locObj = JSON.parse(localStorage.getItem('entInfoObj'))
                // locObj.form = this.form
                // localStorage.setItem('entInfoObj',JSON.stringify(locObj))
              })
            }
          })
        }
      })
    }
  },
  created(){
    this.form.name = this.entInfoObj.entName
    this.getEntInfo() //获取企业信息
  }
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
  background-color: #F9F9F9;
  z-index: -9999;
  overflow-y: auto;
}
.register-inline {
  position: relative;
  z-index: -9998;
  background-color: #FFFFFF;
  width: 800px;
  margin: 20px auto;
  box-shadow: 0 1px 5px 0 rgba(133,133,133,0.50);
  padding: 20px 0 20px 0;
}
.register-form {
  width: 800px;
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
</style>
