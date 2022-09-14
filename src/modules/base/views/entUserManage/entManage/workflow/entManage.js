import {
  validateEmail, newValidateFixedPhone, validateBankAcct, validateIdCard
} from '@utils/rules'
import OperateLog from '@modules/workflow/views/components/operateLog';
import OtherFileSetting from './../components/otherFileSetting';

export default {
  name: "enterpriseManage",
  components: { OperateLog, OtherFileSetting },
  props: {
    form: {
      type: Object,
      default: () => {
        return {
        }
      }
    },
  },
  watch: {
    form(data) {
      this.queryEntDictionary()
    }
  },
  data() {
    const mobileNoValid = ({ cellValue }) => {
      if (cellValue && !/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(cellValue)) {
        return new Error('手机号格式不正确')
      }
    }
    const emailValid = ({ cellValue }) => {
      if (cellValue && !/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(cellValue)) {
        return new Error('邮箱格式不正确')
      }
    }
    const roleIdValid = ({ cellValue }) => {
      if (cellValue.length === 0) {
        return new Error('请选择操作员角色')
      }
    }
    const statementAccountTypeValid = ({ cellValue, row }) => {
      if (cellValue.length === 0 && !this.isDstatementAccountType) {
        return new Error('请选择对账单类型权限')
      }
    }
    return {
      zjControl: this.$api.entInfoManage,
      pageType: this.$route.meta.pageType,
      dictionary: {},
      old_projectInfoList: [],
      statementAccountTypeTable: [],
      sysUserList: [], // 企业操作员信息
      sysUserItem: {
        htSysCode: '', //账号
        userName: '',//用户名
        roleIds: [],//操作员角色
        certNo: '',//证件号码
        mobileNo: '',//手机号码
        email: '',//电子邮箱
        statementAccountType: [], //对账单类型
        save: false,//是否保存过
      },
      isDstatementAccountType: true,
      validRules: { // 企业操作员校验
        htSysCode: [
          { required: true, message: '娅米账号/业务系统账号必须填写' }
        ],
        userName: [
          { required: true, message: '姓名必须填写' }
        ],
        mobileNo: [
          { required: false, validator: mobileNoValid, trigger: 'change' }
        ],
        email: [
          { required: false, validator: emailValid }
        ],
        roleIds: [
          { required: true, message: '操作员角色必须填写', validator: roleIdValid }
        ],
        statementAccountType: [
          { required: true, message: '开凭证对账单类型权限必须填写', validator: statementAccountTypeValid }
        ]
      },
      pubAttachList: [], // 企业附件
      // form: {
      //   isHtEnterprise: '1', // 是否海天集团
      //   isDoublePost: '1', // 是否双岗
      //   sysUserList: [], // 企业操作员信息
      //   pubAttachList: [] // 企业附件
      // },
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
        isHtEnterprise: [
          { name: '是否海天集团', required: true, message: "请选择是否海天集团", trigger: 'blur' }
        ],
        isDoublePost: [
          { name: '是否双岗', required: true, message: "请选择是否双岗", trigger: 'blur' }
        ],
        registerStartDate: [
          { name: '成立日期', required: true, message: "请输入成立日期", trigger: 'blur' }
        ],
        registerCapital: [
          { name: '注册资本', required: true, message: "请输入注册资本" }
        ],
        registerEndDate: [
          { name: '企业工商有效期', required: true, message: "请输入企业工商有效期", trigger: 'blur' }
        ],
        address: [
          { name: '营业执照注册地址', required: true, message: "请输入营业执照注册地址" }
        ],
        entType: [
          { name: '平台客户类型', required: true, validator: this.radioSelectValidator, trigger: 'blur' }
        ],
        supplierType: [
          { name: '供应商类型', required: true, validator: this.radioSelectValidator, trigger: 'blur' }
        ],
        sealEntId: [
          { name: '签章企业', required: true, validator: this.radioSelectValidator, trigger: 'change' }
        ],
        // shortName: [
        //   { name: '企业简称', max: 200, required: true, validator: this.inputValidator, trigger: 'change' }
        // ],
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
          { name: '企业手机号', max: 20, required: false, validator: newValidateFixedPhone, trigger: 'change' }
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
        legalCertNo: [
          { name: '法定代表人身份证号', varName: 'legal', required: false, validator: validateIdCard, trigger: 'change' }
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
          { name: '控制人身份证号', varName: 'controller', required: false, validator: validateIdCard, trigger: 'change' }
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
      //是否是新增页
      isAdd: false,
      // 工作流状态
      workflowState: this.$route.meta.workflowState,
      //操作记录
      logList: []
    }
  },
  created() {
    this.getRow()
    this.getApi()
    console.log(this.form)
    //详情页判断
    this.isDetail = this.$route.meta.pageType === 'detail' || this.$route.meta.pageType === 'audit'
    //新增页判断
    this.isAdd = this.$route.meta.pageType === 'add'
    //修改页判断
    this.isEdit = this.$route.meta.pageType === 'edit'
    if (this.isAdd) {
      this.queryEntDictionary()
    }
  },
  methods: {
    getForm() {
      return this.$refs.form
    },
    getData() {
      return this.form;
    },
    queryEntDictionary() {
      this.zjControl.queryEntDictionary().then(res => {
        let tableDic = {
          roleIdListTableList: JSON.parse(JSON.stringify(res.data.roleIdList).replace(/code/g, 'value').replace(/desc/g, 'label')),
          statementAccountTypeListTable: JSON.parse(JSON.stringify(res.data.statementAccountTypeList).replace(/code/g, 'value').replace(/desc/g, 'label')),
          hxqySysRoleListTable: JSON.parse(JSON.stringify(res.data.hxqySysRoleList).replace(/code/g, 'value').replace(/desc/g, 'label')),
          blSysRoleListTable: JSON.parse(JSON.stringify(res.data.blSysRoleList).replace(/code/g, 'value').replace(/desc/g, 'label')),
        }
        this.dictionary = Object.assign(tableDic, res.data)
        this.projectInfoList = this.dictionary.projectInfoList
        // this.$emit('getDictionary', this.dictionary)
        //设置企业附件
        this.pubAttachList = []
        this.dictionary.sysAttachTypeList.map(item => {
          this.pubAttachList.push({
            busType: item.code,
            fileId: '',
            fileName: ''
          })
        })
        //   // 新增时
        if (this.isAdd) {
          this.form.entType = 'B' // 平台客户类型
          this.form.isHtEnterprise = '1' // 是否海天集团
          this.form.isDoublePost = '0' // 是否双岗
        }
        this.detailsHandle()
        this.$refs.form.clearValidate()
      })
    },

    //获取详情处理
    detailsHandle() {
      this.$nextTick(() => {
        if (!!this.form.pubAttachList) { // 企业附件回显
          this.pubAttachList = this.form.pubAttachList
        }
        // 操作员
        this.sysUserList = this.form.sysUserList || this.form.entUserList || []
        // 其他附件
        this.$refs.ofileSetting.$data.fileList = this.form.pubOtherAttachList || []
        // 企业操作员
        if (this.form.entType === "B") {
          this.statementAccountTypeTable = this.dictionary.hxqySysRoleListTable //操作角色
        }
        if (this.form.entType === "BL") {
          this.statementAccountTypeTable = this.dictionary.blSysRoleListTable
        }
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
      // this.sysUserList = []
      if (this.form.entType === "B") {
        this.form.isHtEnterprise = '1' // 是否海天集团
        // this.form.isDoublePost = '1' // 是否双岗
        this.statementAccountTypeTable = this.dictionary.hxqySysRoleListTable
      }
      if (this.form.entType === "BL") {
        this.form.isHtEnterprise = '1' // 是否海天集团
        this.form.isDoublePost = '1' // 是否双岗
        this.statementAccountTypeTable = this.dictionary.blSysRoleListTable
      }
    },

    //企业开票一填必填
    invoiceOneAndAll() {
      // let invoiceList = ['invoiceEmail', 'invoiceAddress', 'invoicePhone', 'invoiceBankAccno']
      // let boo = false
      // invoiceList.map(item => {
      //   if (this.form[item]) {
      //     boo = true
      //   }
      // })
      // invoiceList.map(item => {
      //   this.$set(
      //     this.rules[item][0], 'required', boo
      //   )
      // })
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
      if (this.form.entType === "B") {
        this.statementAccountTypeTable = this.dictionary.hxqySysRoleListTable //操作角色
      }
      if (this.form.entType === "BL") {
        this.statementAccountTypeTable = this.dictionary.blSysRoleListTable
      }
      if (this.sysUserIng()) { return }
      let sysUserItem = {
        htSysCode: '', //账号
        userName: '',//用户名
        roleIds: [],//操作员角色
        certNo: '',//证件号码
        mobileNo: '',//手机号码
        email: '',//电子邮箱
        statementAccountType: [], //对账单类型
        save: false,//是否保存过
      }
      this.sysUserList.push(sysUserItem)
      this.$refs.sysUser.setActiveRow(sysUserItem)
    },
    //修改企业操作员
    sysUserEdit(row) {
      if (!Array.isArray(row.statementAccountType)) {
        row.statementAccountType = row.statementAccountType.split(',')
      }
      if (this.sysUserIng()) { return }
      this.oldRow = JSON.parse(JSON.stringify(row))
      this.$refs.sysUser.setActiveRow(row)
    },
    //删除企业操作员
    sysUserDel(rowIndex) {
      if (this.sysUserIng()) { return }
      this.sysUserList.splice(rowIndex, 1)
    },
    // 输完操作员账号获取海天员工信息
    getEmployeeInfo(row, rowIndex) {
      if (this.form.isHtEnterprise === '1' && !!row.htSysCode) {
        this.zjControl.getEmployeeInfo({ htSysCode: row.htSysCode, customCode: this.form.customCode }).then((res) => {
          if (res.data.realName) {
            let sysUserItem = {
              htSysCode: row.htSysCode,
              userName: res.data.realName,//用户名
              certNo: res.data.idcardNo,//证件号码
              mobileNo: res.data.tel,//手机号码
              email: res.data.email,//电子邮箱
              roleIds: [],//操作员角色
              statementAccountType: [], //对账单类型
              save: false,//是否保存过
              isSave: true // 是否可以保存
            }
            // 返回的数据不能修改
            if (!!sysUserItem.htSysCode) sysUserItem.isHtSysCodeDis = true //是否禁用
            if (!!sysUserItem.userName) sysUserItem.isUserNameDis = true //是否禁用
            if (!!sysUserItem.certNo) sysUserItem.isCertNoDis = true //是否禁用
            if (!!sysUserItem.mobileNo) sysUserItem.isMobileNoNameDis = true //是否禁用
            if (!!sysUserItem.email) sysUserItem.isEmailDis = true //是否禁用

            this.$refs.sysUser.setActiveRow(sysUserItem)
            this.$set(this.sysUserList, rowIndex, sysUserItem)
            this.$message.success('查询成功！')
          } else {
            this.$refs.sysUser.setActiveRow(this.sysUserItem)
            this.$set(this.sysUserList, rowIndex, this.sysUserItem)
            this.$message.error('娅米账号/业务系统账号不存在！')
          }
        })
      }
    },
    //保存企业操作员
    async sysUserSave(row) {
      let roleArr = []
      row.roleIds.forEach(item => {
        roleArr.push(item)
        if (roleArr.includes('8') && roleArr.includes('9') || roleArr.includes('11') && roleArr.includes('12')) {
          this.$message.error('同一账号不能同时选经办员和复核员！')
          return
        }
      })
      const errMap = await this.$refs.sysUser.validate(row).catch(errMap => errMap)
      if (!errMap && !row.isSave) {
        this.$message.error('请先查询账号信息！')
      }
      if (!errMap && row.isSave) {
        let items = this.sysUserList.filter(item => item.htSysCode === row.htSysCode)
        if (items.length > 1) {
          this.$message.error('存在相同的账号！')
          return
        }
        items = this.sysUserList.filter(item => item.certNo === row.certNo)
        if (items.length > 1) {
          this.$message.error('存在相同的身份证号码！')
          return
        }
        items = this.sysUserList.filter(item => item.mobileNo === row.mobileNo)
        if (items.length > 1) {
          this.$message.error('存在相同的手机号码！')
          return
        }
        row.save = true
        this.$refs.sysUser.clearActived()
      }
    },
    //取消企业操作员
    sysUserCancel(row, rowIndex) {
      if (row.id || row.save) {
        this.sysUserList.splice(rowIndex, 1, JSON.parse(JSON.stringify(this.oldRow)))
      } else {
        this.sysUserList.splice(rowIndex, 1)
      }
      this.$refs.sysUser.clearActived()
    },
    // 选择对账单类型
    statementAccountTypeChange({ row }) {
      let roleIds = row.roleIds
      if (roleIds.includes('8') || roleIds.includes('9') || roleIds.includes('11') || roleIds.includes('12')) {
        this.isDstatementAccountType = false //风险接收人禁用对账单类型
      } else {
        this.isDstatementAccountType = true
        row.statementAccountType = []
      }
    },
    //企业附件下载
    pubAttachDownload(row) {
      this.$api.baseCommon.downloadFile(row)
    },
    //企业附件上传
    pubAttachUpload(data) {
      let formData = new FormData()
      formData.append('file', data.file)
      this.$api.baseCommon.uploadFile(formData).then(res => {
        data.data.row.fileId = res.data.fileId
        data.data.row.fileName = res.data.fileName
        data.data.row.fileSize = res.data.fileSize
      })
    },

    //保存
    async handleForm() {
      if (!this.form.bizLicence || this.form.bizLicence === '') {
        this.$message.error('请先搜索企业！')
        return
      }
      let params = JSON.parse(JSON.stringify(this.form))
      //1.校验表单
      this.$refs.form.validate(boo => {
        if (boo || this.isDetail) {
          if (this.isAdd) {
            //企业操作员校验
            if (this.sysUserIng()) { return }
            let codeArr = []
            let sysUserList = this.sysUserList
            sysUserList.forEach(item => {
              if (Array.isArray(item.roleIds)) {
                codeArr.push(...item.roleIds)
              }
            })
            if (this.form.entType === 'B') {
              if (this.form.isDoublePost === '1') {
                //核心企业是海天集团双岗，必须录入经办员、复核员和风险接收人
                if (!codeArr.includes('8') || !codeArr.includes('9') || !codeArr.includes('10') || !sysUserList.length) {
                  return this.$messageBox({
                    type: 'warning',
                    content: `核心企业是海天集团双岗，必须录入经办员、复核员和风险接收人！`
                  })
                }
              }
              if (this.form.isDoublePost === '0') {
                //核心企业是海天集团单岗，必须录入经办员、风险接收人
                if (!codeArr.includes('8') || !codeArr.includes('10') || !sysUserList.length) {
                  return this.$messageBox({
                    type: 'warning',
                    content: `核心企业是海天集团单岗，必须录入经办员、风险接收人！`
                  })
                }
              }
            }

            if (this.form.entType === 'BL') {
              //保理公司必须录入经办员、复核员和风险接收人
              if (!codeArr.includes('11') || !codeArr.includes('12') || !codeArr.includes('13') || !sysUserList.length) {
                return this.$messageBox({
                  type: 'warning',
                  content: `保理公司，必须录入经办员、复核员和风险接收人！`
                })
              }
            }
          }
          // 其他附件
          params.pubOtherAttachList = this.$refs.ofileSetting.getData()
          // 企业操作员
          params.sysUserList = this.sysUserList
          if (params.sysUserList) {
            params.sysUserList.forEach(item => {
              if (Array.isArray(item.statementAccountType)) {
                item.statementAccountType = item.statementAccountType.join(',')
              }
            })
          }
          // 企业附件
          params.pubAttachList = this.pubAttachList
          this.$emit('formPass', params)
        } else {
          return this.$messageBox({
            type: 'warning',
            content: `请把信息补充完整！`
          })
        }
      })
    },
    // 暂存
    saveEnterprise() {
      if (!!this.form.bizLicence) {
        let params = JSON.parse(JSON.stringify(this.form))
        // 其他附件
        params.pubOtherAttachList = this.$refs.ofileSetting.getData()
        // 企业操作员
        params.sysUserList = this.sysUserList
        if (params.sysUserList) {
          params.sysUserList.forEach(item => {
            if (Array.isArray(item.statementAccountType)) {
              item.statementAccountType = item.statementAccountType.join(',')
            }
          })
        }
        // 企业附件
        params.pubAttachList = this.pubAttachList
        this.zjControl.saveEnterprise(params).then(() => {
          this.$message.success('暂存成功！')
          this.goParent()
        })
      } else {
        this.$message.error('请先搜索企业！')
      }
    },
    // 获取暂存
    getEnterpriseConfirm() {
      this.zjControl.getEnterpriseConfirm({ name: this.form.name }).then((res) => {
        this.$emit('update:form', res.data)
        // this.sysUserList = res.data.entUserList || []
        this.detailsHandle()
      })
    },
    cancel() {
      this.goParent()
    }
  }
}
