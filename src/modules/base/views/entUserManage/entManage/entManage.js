import project from "../../project";
import {
  validateEmail, newValidateFixedPhone, validateBankAcct
} from '@utils/rules'
import eyeDialog from "./eyeDialog";
import orderDialog from "./orderDialog";
import OperateLog from '@modules/workflow/views/components/operateLog';
import OtherFileSetting from '@modules/ebill/views/productManage/businessManage/components/otherFileSetting';

export default {
  name: "enterpriseManage",
  mixins: [project],
  components: { eyeDialog, orderDialog, OperateLog, OtherFileSetting },
  data() {
    return {
      zjControl: this.$api.entInfoManage,
      pageType: this.$route.meta.pageType,
      dictionary: {},

      old_projectInfoList: [],

      form: {
        // ----------- 企业基本信息  ---------------
        name: '',//企业名称
        bizLicence: '',//统一社会信用代码
        invoiceTaxpayerId: '',//纳税人识别号
        entType: '',//平台客户类型
        supplierType: '',//供应商类型
        isOpenBill: false, //是否需要开单
        parentEntId: '',//隶属企业
        sealEntId: '',//签章企业
        shortName: '',//企业简称
        beforeName: '',//曾用名
        customCode: '',//客户编码
        fastMailName: '',//收件人
        fastMailPhone: '',//收件电话
        fastMailAddress: '',//收件地址
        projectInfoList: [
          {
            id: '',
            projectId: '',
            projectName: '',
            operationFlag: 'A',
            selectProductList: []
          }
        ],//所属项目
        // ----------- 企业开票信息  ---------------
        //企业名称
        //纳税人识别号
        invoiceEmail: '',//电子邮箱
        invoiceAddress: '',//地址
        invoicePhone: '',//电话
        invoiceBankAccno: '',//银行账号
        // ----------- 企业操作员信息  ---------------
        sysUserList: [],
        // ----------- 法人信息  ---------------
        legalPersonName: '',//姓名
        legalMaritalStatues: '',//婚姻状况
        legalCertType: '',//证件类型
        legalCertNo: '',//证件号码
        legalCertRegDate: '',//证件号码起始日
        legalCertExpireDate: '',//证件号码截止日
        // ----------- 控制人信息  ---------------
        actualController: '',//姓名
        controllerMaritalStatues: '',//婚姻状况
        controllerCertType: '',//证件类型
        controllerCertNo: '',//证件号码
        controllerCertRegDate: '',//证件号码起始日
        controllerCertExpireDate: '',//证件号码截止日
        // ----------- 经营信息  ---------------
        companyType: '',//公司类型
        companyIndustry: '',//所属行业
        // ----------- 企业附件  ---------------
        pubAttachList: []
      },
      rules: {
        //企业基本信息
        name: [
          { name: '企业名称', max: 200, required: true, validator: this.inputValidator, trigger: 'change' }
        ],
        bizLicence: [
          {
            required: true, validator: (rule, value, callback) => {
              let bizLicencesReg = /[0-9A-Z]{18}$/
              if (!value && rule.required) {
                callback(new Error('请输入统一社会信用代码'))
              } else if (!bizLicencesReg.test(value)) {
                callback(new Error('统一社会信用代码格式不正确(18位的阿拉伯数字或大写英文字母)'))
              } else {
                callback()
              }
            }, trigger: 'change'
          }
        ],
        invoiceTaxpayerId: [
          {
            required: true, max: 20, validator: (rule, value, callback) => {
              let itiReg = /^([\d]+)|([A-Z]+)$/
              if (!value && rule.required) {
                callback(new Error('请输入纳税人识别号'))
              } else if (value && value.length > rule.max) {
                callback(new Error(`纳税人识别号不可超过${rule.max}字符`))
              } else if (value && !itiReg.test(value)) {
                callback(new Error('纳税人识别号格式不正确'))
              } else {
                callback()
              }
            }, trigger: 'change'
          }
        ],
        entType: [
          { name: '平台客户类型', required: true, validator: this.radioSelectValidator, trigger: 'change' }
        ],
        supplierType: [
          { name: '供应商类型', required: true, validator: this.radioSelectValidator, trigger: 'change' }
        ],
        sealEntId: [
          { name: '签章企业', required: true, validator: this.radioSelectValidator, trigger: 'change' }
        ],
        shortName: [
          { name: '企业简称', max: 200, required: true, validator: this.inputValidator, trigger: 'change' }
        ],
        beforeName: [
          { name: '曾用名', max: 200, required: false, validator: this.inputValidator, trigger: 'change' }
        ],
        customCode: [
          { name: '客户编码', max: 20, required: false, validator: this.inputValidator, trigger: 'change' }
        ],
        fastMailName: [
          { name: '收件人', max: 50, required: false, validator: this.inputValidator, trigger: 'change' }
        ],
        fastMailPhone: [
          { name: '收件电话', max: 20, required: false, validator: newValidateFixedPhone, trigger: 'change' }
        ],
        fastMailAddress: [
          { name: '收件地址', max: 400, required: false, validator: this.inputValidator, trigger: 'change' }
        ],
        //企业开票信息 - 一填必填
        invoiceEmail: [
          { name: '企业开票电子邮箱', required: false, validator: validateEmail, trigger: 'change' }
        ],
        invoiceAddress: [
          { name: '企业开票地址', max: 400, required: false, validator: this.inputValidator, trigger: 'change' }
        ],
        invoicePhone: [
          { name: '企业开票电话', max: 20, required: false, validator: newValidateFixedPhone, trigger: 'change' }
        ],
        invoiceBankAccno: [
          { name: '企业开票银行账号', max: 50, required: false, validator: validateBankAcct, trigger: 'change' }
        ],
        //法定代表人
        legalPersonName: [
          { name: '法定代表人姓名', max: 50, required: true, validator: this.inputValidator, trigger: 'change' }
        ],
        legalMaritalStatues: [
          { name: '法定代表人婚姻状况', required: false, validator: this.radioSelectValidator, trigger: 'change' }
        ],
        legalCertType: [
          { name: '法定代表人', varName: 'legal', required: false, validator: this.certTypeValidator, trigger: 'change' }
        ],
        legalCertNo: [
          { name: '法定代表人', varName: 'legal', required: false, validator: this.certNoValidator, trigger: 'change' }
        ],
        legalCertRegDate: [
          { name: '法定代表人', varName: 'reg', required: false, validator: this.regExpireValidator, trigger: 'change' }
        ],
        legalCertExpireDate: [
          { name: '法定代表人', varName: 'expire', required: false, validator: this.regExpireValidator, trigger: 'change' }
        ],
        //控制人信息
        actualController: [
          { name: '实际控制人姓名', max: 50, required: false, validator: this.inputValidator, trigger: 'change' }
        ],
        controllerMaritalStatues: [
          { name: '实际控制人婚姻状况', required: false, validator: this.radioSelectValidator, trigger: 'change' }
        ],
        controllerCertType: [
          { name: '实际控制人', varName: 'controller', required: false, validator: this.certTypeValidator, trigger: 'change' }
        ],
        controllerCertNo: [
          { name: '实际控制人', varName: 'controller', required: false, validator: this.certNoValidator, trigger: 'change' }
        ],
        controllerCertRegDate: [
          { name: '实际控制人', varName: 'reg', required: false, validator: this.regExpireValidator, trigger: 'change' }
        ],
        controllerCertExpireDate: [
          { name: '实际控制人', varName: 'expire', required: false, validator: this.regExpireValidator, trigger: 'change' }
        ],
        //经营信息
        companyType: [
          { name: '公司类型', required: false, validator: this.radioSelectValidator, trigger: 'change' }
        ],
        companyIndustry: [
          { name: '所属行业', required: false, validator: this.radioSelectValidator, trigger: 'change' }
        ],

      },
      //过渡值
      ob: false, //是否需要开单
      sealEntSelect: [
        { sealEntId: '0', sealEntName: ' ' }, //默认为自己
      ], //签章企业下拉列表
      oldRow: {},//旧的表格数据

      //是否是详情页
      isDetail: false,
      //是否是修改页
      isEdit: false,
    }
  },
  watch: {
    'form.name'(val) {
      if (this.$route.name === 'entManageAdd') {
        this.sealEntSelect[0].sealEntId = '0'
      } else {
        this.sealEntSelect[0].sealEntId = this.form.id
      }
      this.sealEntSelect[0].sealEntName = val
      //当签章企业选择自己时，若企业名为空则删除签章选中
      if (!val && (this.form.sealEntId === '0' || this.form.sealEntId === this.form.id)) {
        this.form.sealEntId = ''
      }
      if (this.$route.name === 'entManageAdd') {
        this.form.shortName = val
      }
    },
  },
  created() {
    this.queryEntDictionary()
    this.getApi()
    this.getRow()

    //所属项目
    this.getProjectList()

    //详情页判断
    this.isDetail = this.$route.name === 'entManageDetail'
    //修改页判断
    this.isEdit = this.$route.name === 'entManageEdit'

  },
  methods: {
    //查询天眼查信息
    searchEye() {
      this.$refs.eyeDialog.open()
    },
    //天眼查返回
    eyeReturn(data) {
      if (!data || JSON.stringify(data) === '{}') { return }
      let { creditCode, taxNumber, legalPersonName } = data
      this.form.bizLicence = creditCode
      this.form.invoiceTaxpayerId = taxNumber
      this.form.legalPersonName = legalPersonName
    },

    //字典
    queryEntDictionary() {
      this.zjControl.queryEntDictionary().then(res => {
        let tableDic = {
          entTypeCheckList: JSON.parse(
            JSON.stringify(res.data.entTypeList)
              .replace(/code/g, 'key')
              .replace(/desc/g, 'label')
          ),
          userCertTypeTableList: JSON.parse(
            JSON.stringify(res.data.userCertTypeList)
              .replace(/code/g, 'value')
              .replace(/desc/g, 'label')
          ),
          bankAcctTypeTableList: JSON.parse(
            JSON.stringify(res.data.bankAcctTypeList)
              .replace(/code/g, 'value')
              .replace(/desc/g, 'label')
          ),
          sysRoleTableList: JSON.parse(
            JSON.stringify(res.data.sysRoleList)
              .replace(/code/g, 'value')
              .replace(/desc/g, 'label')
          ),
        }
        this.dictionary = Object.assign(tableDic, res.data)
        this.projectInfoList = this.dictionary.projectInfoList
        this.projectInfoListCHECKBOX = JSON.parse(
          JSON.stringify(this.dictionary.projectInfoList).replace(/code/g, 'key').replace(/desc/g, 'label')
        )
        // 新增时
        if (this.$route.name === 'entManageAdd') {  //设置企业附件
          this.dictionary.busTypeList.map(item => {
            this.form.pubAttachList.push({
              busType: item.code,
              fileId: '',
              fileName: ''
            })
          })
        }
        //修改-详情 时
        else {
          let params = {
            id: this.row.id
          }
          this.zjControl.getEnterprise(params).then(res => {
            this.detailsChange(res)
          })
        }
      })
    },

    //获取详情处理
    detailsChange(res) {
      res.data.projectInfoList.map(item => { item.operationFlag = '' })
      res.data.isOpenBill = res.data.isOpenBill === '1' ? true : false //是否需要开单处理
      this.form = res.data

      this.old_projectInfoList = [...[], ...this.form.projectInfoList]

      this.invoiceOneAndAll() //企业开票附件

      this.projectInit() //所属项目初始化

      //签章初始化
      this.sealEntSelect[0].sealEntId = this.form.id || '0'
      this.sealEntSelect[0].sealEntName = this.form.name
      if (this.form.entType !== 'B') {
        this.form.sealEntId = ''
      }
      //隶属企业
      this.parentEntIdChange(this.form.parentEntId, true)

      //公司类型
      if (this.form.companyType) {
        let boo = this.dictionary.companyTypeList.some(item => item.code === this.form.companyType)
        if (!boo) {
          this.dictionary.companyTypeList.push({
            code: this.form.companyType,
            desc: this.form.companyType
          })
        }

      }


      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })
    },

    //输入框校验封装
    inputValidator(rule, value, callback) {
      if (!value && rule.required) {
        callback(new Error(`请输入${rule.name}`))
      } else if (value && rule.max && (value.length > rule.max)) {
        callback(new Error(`${rule.name}不可超过${rule.max}字符`))
      } else {
        callback()
      }
    },
    //单选框-下拉框校验封装
    radioSelectValidator(rule, value, callback) {
      if (rule.required && !value) {
        callback(new Error(`请选择${rule.name}`))
      } else {
        callback()
      }
    },
    //证件类型校验封装
    certTypeValidator(rule, value, callback) {
      if (rule.required && !value) {
        callback(new Error(`请选择${rule.name}证件类型`))
      } else {
        if (this.form[rule.varName + 'CertNo']) {
          this.$refs.form.validateField(rule.varName + 'CertNo')
        }
        callback()
      }
    },
    //证件号码校验封装
    certNoValidator(rule, value, callback) {
      if (rule.required && !value) {
        callback(new Error(`请输入${rule.name}证件号码`))
      } else {
        if (this.form[rule.varName + 'CertType'] === '01') {
          let idReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
          if (!idReg.test(value)) {
            callback(new Error(`${rule.name}证件号码格式不正确`))
          } else {
            callback()
          }
        } else {
          callback()
        }
      }
    },
    //证件日期起止校验封装
    regExpireValidator(rule, value, callback) {
      if (rule.required && !value) {
        callback(
          new Error(
            `请选择${rule.name}证件有效期${rule.varName === 'reg' ? '起始日' :
              rule.varName === 'expire' ? '截止日' : ''
            }`
          )
        )
      } else {
        callback()
      }
    },
    //值发生改变封装
    valueChange(varName) {
      this.$refs.form.validateField(varName)
    },

    //平台客户类型发生改变
    entTypeChange() {
      this.form.supplierType = ''
      this.form.isOpenBill = ''
      this.ob = false

      this.form.parentEntId = ''
      this.sealEntId = ''
      if (this.form.entType === 'B' && this.form.entType === 'S') {
        this.form.projectInfoList = [...[], ...this.old_projectInfoList]
        this.projectInit()
      } else {
        this.old_projectInfoList = [...[], this.form.projectInfoList]
      }

    },
    //需要开单发生变化
    iobChange(boo) {
      if (boo) {
        this.$refs.orderDialog.open()
      }
    },
    //隶属企业发生改变
    parentEntIdChange(id, boo) {
      // 当boo存在时视为初始化---修改、详情页 第一次进入时获取数据时用到
      if (!boo) {
        this.form.sealEntId = ''
      }
      if (!id) {
        this.sealEntSelect = [{
          sealEntId: this.form.id || '0',
          sealEntName: this.form.name
        }]
        return
      }
      //获取新的签章企业
      let sealEntItem = this.dictionary.sysEnterpriseList.find(item => item.id === id)
      this.sealEntSelect[1] = {
        sealEntId: sealEntItem.sealEntId,
        sealEntName: sealEntItem.sealEntName
      }
    },

    //所属项目校验
    projectValidator(rule, value, callback) {
      if (rule.required && !value && rule.item.operationFlag !== 'D') {
        callback(new Error('请选择所属项目'));
      } else if (rule.required && rule.item.operationFlag !== 'D' && this.form.projectInfoList[rule.index].selectProductList.length <= 0) {
        callback(new Error('请选择产品'));
      } else {
        callback()
      }
    },
    //所属项目初始化
    projectInit() {
      this.projectInfoListCHECKBOX.map(item => {
        item.disabled = this.form.projectInfoList.some(citem => citem.projectId === item.projectId)
      })
    },
    //修改所属项目
    projectEdit(item) {
      if (item.operationFlag) {
        if (item.operationFlag === 'A') {
          item.operationFlag = 'A'
        } else {
          item.operationFlag = 'u'
        }
      } else {
        item.operationFlag = 'U'
      }
      item.projectName = this.projectInfoListCHECKBOX.find(citem => citem.projectId === item.projectId).projectName
      //再次调用初始化
      this.projectInit()
    },
    //新增所属项目
    projectAdd() {
      this.form.projectInfoList.push({
        id: '',
        projectId: '',
        projectName: '',
        operationFlag: 'A',
        selectProductList: []
      })
    },
    //删除所属项目
    projectDel(item, index) {
      if (item.operationFlag === 'A') {
        this.form.projectInfoList.splice(index, 1)
      } else {
        item.operationFlag = 'D'
        item.selectProductList = []
      }
      this.projectInfoListCHECKBOX.map(citem => {
        if (citem.projectId === item.projectId) {
          citem.disabled = false
        }
      })
    },
    //企业开票一填必填
    invoiceOneAndAll() {
      let invoiceList = ['invoiceEmail', 'invoiceAddress', 'invoicePhone', 'invoiceBankAccno']
      let boo = false
      invoiceList.map(item => {
        if (this.form[item]) {
          boo = true
        }
      })
      invoiceList.map(item => {
        this.$set(
          this.rules[item][0], 'required', boo
        )
      })
    },

    //企业操作员编辑检测
    sysUserIng() {
      let key = this.$refs.sysUser.getActiveRecord() ? true : false
      if (key) {
        this.$messageBox({
          content: '请您先保存正在编辑的数据',
          type: 'info'
        })
      }
      return key
    },
    //新增企业操作员
    sysUserAdd() {
      if (this.sysUserIng()) { return }
      let item = {
        loginName: '',//用户名
        roleId: '',//操作员角色
        userName: '',//姓名
        certType: '',//证件类型
        certNo: '',//证件号码
        mobileNo: '',//手机号码
        email: '',//电子邮箱
        save: false,//是否保存过
      }
      this.form.sysUserList.push(item)
      this.$refs.sysUser.setActiveRow(item)
    },
    //修改企业操作员
    sysUserEdit(row) {
      if (this.sysUserIng()) { return }
      this.oldRow = JSON.parse(JSON.stringify(row))
      this.$refs.sysUser.setActiveRow(row)
    },
    //删除企业操作员
    sysUserDel(rowIndex) {
      if (this.sysUserIng()) { return }
      this.form.sysUserList.splice(rowIndex, 1)
    },
    //保存企业操作员
    sysUserSave(row, rowIndex) {
      let flag = false
      for (let key in row) {
        if (key !== '_XID' && typeof (row[key]) !== 'boolean' && row[key].trim()) {
          flag = true
        }
      }
      if (flag) {
        if (!row.loginName) { return this.$Message.warning('请填写用户名') }
        let loginNameElReg1 = /^_+$/g
        let loginNameElReg = /^[a-zA-Z0-9_]{4,20}$/i
        if (
          row.loginName && (
            (row.loginName.length < 6 || row.loginName.length > 20) ||
            !loginNameElReg.test(row.loginName) ||
            loginNameElReg1.test(row.loginName)
          )
        ) { return this.$Message.warning('用户名为6-20位英文字母、数字组成，可包含下划线') }

        let loIndex = this.form.sysUserList.findIndex(item => item._XID === row._XID)
        let loBoo = true
        this.form.sysUserList.map((item, index) => {
          if (item.loginName === row.loginName && index !== loIndex) {
            loBoo = false
          }
        })
        if (!loBoo) { return this.$Message.error(`用户名为：${row.loginName} ，在列表中已存在`) }

        if (!row.roleId) { return this.$Message.warning('请选择操作员角色') }
        if (!row.userName) { return this.$Message.warning('请填写姓名') }
        if (row.userName && row.userName.length > 50) { return this.$Message.warning('姓名不可超过50字符') }
        if (!row.certType) { return this.$Message.warning('请选择证件类型') }
        if (!row.certNo) { return this.$Message.warning('请填写证件号码') }
        let idReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
        if (row.certType === '01' && !idReg.test(row.certNo)) { return this.$Message.warning('请填写正确身份证号码') }
        if (row.certType !== '01' && row.certNo.length > 50) { return this.$Message.warning('证件号码不可超过50字符') }
        if (!row.mobileNo) { return this.$Message.warning('请填写手机号码') }
        let phoneReg = /^((\(\d{3}\))|(\d{3}\u002d))?(1[3456789]\d{9})$/i
        if (row.mobileNo && !phoneReg.test(row.mobileNo)) { return this.$Message.warning('手机号码格式不正确') }
        if (!row.email) { return this.$Message.warning('请填写电子邮箱') }
        let emailReg = /^[0-9A-Za-z_-]+[@][0-9A-Za-z]+([.][0-9A-Za-z]+){1,2}$/
        if (row.email && !emailReg.test(row.email)) { return this.$Message.warning('邮箱号码格式不正确') }
        row.save = true
        this.$refs.sysUser.clearActived()
        return
      } else {
        this.sysUserDel(rowIndex)
      }
    },
    //取消企业操作员
    sysUserCancel(row, rowIndex) {
      if (!row.save) {
        this.form.sysUserList.splice(rowIndex, 1)
      } else {
        this.form.sysUserList.splice(rowIndex, 1, JSON.parse(JSON.stringify(this.oldRow)))
      }
      this.$refs.sysUser.clearActived()
    },

    //企业附件下载
    pubAttachDownload(row) {
      let params = {
        fileId: row.fileId,
        fileUrl: row.fileId,
        fileName: row.fileName,
      }
      this.$api.baseCommon.downloadFile(params)
    },
    //企业附件上传
    pubAttachUpload(data) {
      let formData = new FormData()
      formData.append('file', data.file)
      this.$api.baseCommon.uploadFile(formData).then(res => {
        data.data.row.fileId = res.data.fileId
        data.data.row.fileName = res.data.fileName
      })

    },

    //保存
    save(flag = 'add') {

      //1.校验表单
      this.$refs.form.validate(boo => {
        if (!boo) {
          return this.$messageBox({
            type: 'warning',
            content: `请把信息补充完整！`
          })
        }
        //2.校验企业附件
        if (this.form.entType === 'B' || this.form.entType === 'S') {
          //判断企业操作员 --- 新增时
          if (this.$route.name === 'entManageAdd') {
            if (this.sysUserIng()) { return }
            if (this.form.sysUserList.length < 1) {
              return this.$messageBox({
                type: 'warning',
                content: `请添加企业操作员信息！`
              })
            }
          }

          //判断附件
          let item = this.form.pubAttachList.find(item => !item.fileId && item.busType !== 'QYZZ' && item.busType !== 'QYKZRZ')
          if (item) {
            return this.$messageBox({
              type: 'warning',
              content: `请上传${this.typeMap(this.dictionary.busTypeList, item.busType)}附件！`
            })
          }
        }

        let params = JSON.parse(JSON.stringify(this.form))
        params.isOpenBill = params.isOpenBill ? '1' : '0'
        if (this.$route.name === 'entManageAdd' && params.entType !== 'S' && params.entType !== 'B') {
          params.projectInfoList = []
        }
        if (flag === 'add') {
          this.$messageBox({
            title: '新增确认',
            type: 'confirm',
            content: '确认后将新增企业！',
            messageResolve: () => {
              this.zjControl.addEnterprise(params).then(() => {
                this.$Message.success('企业新增成功！')
                this.goParent()
              })
            }
          })
        }
        else if (flag === 'edit') {
          this.$messageBox({
            title: '修改确认',
            type: 'confirm',
            content: '确认后将更新企业信息！',
            messageResolve: () => {
              this.zjControl.updateEnterprise(params).then(() => {
                this.$Message.success('企业信息修改成功！')
                this.goParent()
              })
            }
          })
        }
      })
    },
    cancel() {
      this.goParent()
    }
  },
  computed: {
    projectFlag() {
      let flag = false
      if (this.form.projectInfoList && this.form.projectInfoList.length) {
        let dList = this.form.projectInfoList.filter(item => item.operationFlag === 'D') || []
        flag = this.form.projectInfoList.length - dList.length > 1
      }
      return flag
    }
  }
}
