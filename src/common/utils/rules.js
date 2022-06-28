/**
 * @Description: 校验公共方法
*/
// 密码验证
let passwordReg = /^(?=.*?[a-zA-Z])(?=.*?[0-9])[a-zA-Z0-9_]{8,20}$/
// 电话
let phoneReg = /^((\(\d{3}\))|(\d{3}\u002d))?(1[3456789]\d{9})$/i
// 身份证
let idReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
// 企业名称 (企业名称由中文、字母、数字或半角括号组成，3-30位)
let entNameReg = /^[\u0391-\uFFE50-9a-zA-Z()]{3,30}$/i
// 纳税人识别号 （允许1-30位，允许字母数字）
let invoiceTaxpayerIdReg = /^[a-zA-Z0-9]{1,30}$/i
// 用户名 （允许4-20字节，允许字母数字下划线）
let loginNameReg = /^[a-zA-Z0-9_]{4,20}$/i
// 姓名 （允许中文或英文字母，最多不超过7个中文字符） 姓名
let userNameReg = /^[\u0391-\uFFE5a-zA-Z]{1,15}$/i
// 营业执照号码或统一社会信用代码格式
let businessNoReg = /^([0-9a-zA-Z]{15}([0-9a-zA-Z]{3})?)$/
// 银行账户账号
let bankAcctReg = /^(\d{8,})$/
// 银行联行号
let bankNoReg = /^(\d{1,12})$/
// 邮政编码
let postalCodeReg = /^\d{6}$/i
//------------------------------------------------whl---------------------------------------------------
// 电子邮箱
let emailReg = /^[0-9A-Za-z_-]+[@][0-9A-Za-z]+([.][0-9A-Za-z]+){1,2}$/
// 用户登录名 （允许6-20字节，允许字母数字下划线）
let loginNameRegSW = /^[a-zA-Z0-9_]{6,20}$/i
// 电话（座机）
// let fixedReg = /(^(0\d{2})-(\d{8})$)|(^(0\d{3})-(\d{7})$)|(^(0\d{2})-(\d{8})-(\d+)$)|(^(0\d{3})-(\d{7})-(\d+)$)|(^\d{7}$)|(^\d{8}$)/
let fixedReg = /^(\d{3,4}-)?\d{7,8}$/i
// 姓名-中1-25--英1-50
let ZhEnNameReg =  /(^[\u4E00-\u9FA5]{1,25}$)|(^[a-zA-Z]{1,50}$)/i
// 登录名
let loginNameElReg1 = /^_+$/g
let loginNameElReg = /^[a-zA-Z0-9_]{4,20}$/i
// 金额校验
let num = /(^[1-9]*\d*$)/    // 数字
let NoNum = /[^\d]/ //非数字校验
let twoReg = /^\d+\.\d{0,2}$/ //支持两位小数
let fiveReg = /^\d+\.\d{0,4}$/ //支持四位小数
// 大额行号（12位数字）
let bigBankNo = /^[0-9]{12}$/
// 开户行 validateBankName
// 账户名 validateBankAcctName

export function validatePhone (rule, value, callback) {
  if (!value && rule.required) {
    callback(new Error('请输入手机号码'))
  } else if (value && !phoneReg.test(value)) {
    callback(new Error('手机号码格式不正确'))
  } else {
    callback()
  }
}

export function validateIdCard (rule, value, callback) {
  if (!value && rule.required) {
    callback(new Error('请输入身份证号'))
  } else if (value && !idReg.test(value)) {
    callback(new Error('请输入正确身份证号码'))
  } else {
    callback()
  }
}

// api：验证企业名是否在系统中存在的接口方法
// exist：Boolean true为在系统存在时不通过校验（注册时）, false为在系统存在通过校验（填隶属企业时）
export function validateEntName (api, exist, _this) {
  return (rule, value, callback) => {
    if (!value && rule.required) {
      callback(new Error('请输入企业名称'))
    } else if (value && !entNameReg.test(value)) {
      callback(new Error('企业名称由中文、字母、数字或半角括号组成，3-30位'))
    } else {
      if (typeof api === 'function') {
        if (value) {
          api({ name: value }).then(res => {
            if (res.id) {
              if (exist) {
                if (_this) _this.form.parentEntId = ''
                callback(new Error('该企业已注册'))
              } else {
                if (_this) _this.form.parentEntId = res.id
                callback()
              }
            } else {
              if (_this) _this.form.parentEntId = ''
              exist ? callback() : callback(res.msg)
            }
          }).catch(res => {
            if (_this) _this.form.parentEntId = ''
            exist ? callback(res.msg) : callback(res.msg)
          })
        } else {
          if (_this) _this.form.parentEntId = ''
          callback()
        }
      } else {
        if (_this) _this.form.parentEntId = ''
        callback()
      }
    }
  }
}

export function validateInvoiceTaxpayerId (rule, value, callback) {
  if (!value && rule.required) {
    callback(new Error('请输入纳税人识别号'))
  } else if (value && !invoiceTaxpayerIdReg.test(value)) {
    callback(new Error('纳税人识别号不合法（允许1-30位，允许字母数字）'))
  } else {
    callback()
  }
}

export function validateLoginName (api, _this) {
  return (rule, value, callback) => {
    if (!value && rule.required) {
      callback(new Error('请输入用户名'))
    } else if (value && !loginNameReg.test(value)) {
      callback(new Error('用户名不合法（允许4-20字节，允许字母数字下划线）'))
    } else {
      if (typeof api === 'function') {
        if (value && ((_this && value !== _this.loginName) || !_this)) {
          api({ loginName: value }).then(() => {
            callback()
          }).catch(res => {
            callback(new Error(res.msg))
          })
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
  }
}

export function validateLoginNameSW(rule, value, callback) {
  let xhx = /^_+$/g
  if (!value && rule.required) {
    callback(new Error('请输入用户名'))
  } else if (value && !loginNameRegSW.test(value)) {
    callback(new Error('用户名不合法(允许6-20字节、字母数字下划线)'))
  }else if(value && xhx.test(value)){
    callback(new Error('用户名不合法(允许6-20字节、字母数字下划线)'))
  }else{
    callback()
  }
}

export function validateUserNameReg (rule, value, callback) {
  if (!value && rule.required) {
    callback(new Error('请输入姓名'))
  } else if (value && !userNameReg.test(value)) {
    callback(new Error('请输入中文或英文字母，最多不超过7个中文字符'))
  } else {
    callback()
  }
}

export function validSinglePassword (rule, value, callback) {
  if (!value && rule.required) {
    callback(new Error('请输入密码'))
  } else if (value && !passwordReg.test(value)) {
    callback(new Error('8~20位字母、数字、下划线，且必须含有字母和数字'))
  } else {
    callback()
  }
}

export function validPassword (password, passwordConfirm, filed, ref) {
  let validPass = (rule, value, callback) => {
    password = value
    if (!value && rule.required) {
      callback(new Error('请输入密码'))
    } else if (value && !passwordReg.test(value)) {
      callback(new Error('8~20位字母、数字、下划线，且必须含有字母和数字'))
    } else {
      if (passwordConfirm) {
        ref.validateField(filed)
      }
      callback()
    }
  }
  let validPass2 = (rule, value, callback) => {
    passwordConfirm = value
    if (!value && rule.required) {
      callback(new Error('请再次输入密码'))
    } else if (value && !passwordReg.test(value)) {
      callback(new Error('8~20位字母、数字、下划线，且必须含有字母和数字'))
    } else if (value && value !== password) {
      callback(new Error('两次输入密码不一致!'))
    } else {
      callback()
    }
  }
  return {
    validPass,
    validPass2
  }
}

export function validateBusinessNo (rule, value, callback) {
  if (!value && rule.required) {
    callback(new Error('请输入营业执照号码或统一社会信用代码'))
  } else if (value && !businessNoReg.test(value)) {
    callback(new Error('营业执照号码或统一社会信用代码格式不正确'))
  } else {
    callback()
  }
}

export function validateOrgCode (businessNo) {
  let cutBusinessNo
  if (businessNo.length) cutBusinessNo = businessNo.substring(businessNo.length - 10, businessNo.length - 1)
  return (rule, value, callback) => {
    if (!value && rule.required) {
      callback(new Error('请输入组织机构代码或统一社会信用代码'))
    } else if (businessNo.length === 18 && value !== cutBusinessNo) {
      callback(new Error('组织机构代码是数字和字母且为营业执照号码的9~17位'))
    } else if (businessNo.length !== 18 && !/^([a-z]|[A-Z]|[0-9]){8}-(([a-z]|[A-Z]|[0-9])){1}$/.test(value)) {
      callback(new Error('组织机构代码为10字母或数字位，并且第九位是-'))
    } else {
      callback()
    }
  }
}

export function validateBankAcct (rule, value, callback) {
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
}

export function validateBankNo (rule, value, callback) {
  if (!value && rule.required) {
    callback(new Error('请输入银行联行号'))
  }else if (value && rule.max && value.length > rule.max) {
    callback(new Error(`银行联行号不可超过${rule.max}字符`))
  } else if (value && !bankNoReg.test(value)) {
    callback(new Error('银行联行号格式不正确'))
  } else {
    callback()
  }
}

export function validatePostalCode (rule, value, callback) {
  if (!value && rule.required) {
    callback(new Error('请输入邮政编码'))
  } else if (value && !postalCodeReg.test(value)) {
    callback(new Error('邮政编码格式不正确'))
  } else {
    callback()
  }
}

export function validateEmail(rule, value, callback) {
  if (!value && rule.required) {
    callback(new Error(`请输入${rule.name || '邮箱地址'}`))
  } else if (value && !emailReg.test(value)) {
    callback(new Error(`${rule.name || '邮箱'}格式不正确`))
  } else {
    callback()
  }
}

export function validateFixed(rule,value,callback) {
  if (!value && rule.required) {
    callback(new Error('请输入固定电话号码'))
  } else if (value && !fixedReg.test(value)) {
    callback(new Error('固定电话格式不正确'))
  } else {
    callback()
  }
}

export  function  validateZhEnName(rule, value, callback) {
  if (!value && rule.required) {
    callback(new Error('请输入姓名'))
  } else if (value && !ZhEnNameReg.test(value)) {
    callback(new Error('姓名应为纯中文或纯英文组成，中文为1-25,英文为1-50位'))
  } else {
    callback()
  }
}

export  function  validateLoginNameEl(rule, value, callback) {
  if (!value) {
    callback(new Error('请输入登录用户名'))
  } else if(value.length < 4 || value.length > 20 ){
    callback(new Error('登录用户名不合法(允许4-20字节，允许字母数字下划线)'))
  } else if(!loginNameElReg.test(value)){
    callback(new Error('登录用户名不合法(允许4-20字节，允许字母数字下划线)'))
  } else if(loginNameElReg1.test(value)){
    callback(new Error('登录用户名不合法(允许4-20字节，允许字母数字下划线)'))
  }
  else{
    callback()
  }
}

export function moneyTwoValidate(rule, value, callback) {
  if(!value){
    callback(new Error('请输入金额'))
  } else if( value && String(value).indexOf('.') <= 0 ){ //当无小数点时
    if(!num.test(value)){
      if(NoNum.test(value)){
        callback(new Error('请输入正确的金额'))
      } else{
        callback()
      }
    } else {
      callback()
    }
  } else if( value && String(value).indexOf('.') >= 0) { //当有小数点时
    //记录第一个小数点出现的位置
    var oneXsd = String(value).indexOf('.')
    //计算小数点个数
    var xsd = 0
    for (var i = 0; i < value.length; i++) {
      if (value[i] === '.') {
        xsd++
      }
    }
    //将内容按小数点切割
    var arr = String(value).split('.')
    for (var j = 0; j < arr.length; j++) {
      if (NoNum.test(arr[j])) {
        callback(new Error('请输入正确的金额'))
      }
    }
    // 1.根据小数点个数判断
    if (xsd > 1 || oneXsd + 1 === value.length) {
      callback(new Error('请输入正确的金额'))
    } else if (!twoReg.test(value)) {
      callback(new Error('金额仅支持2位小数！'))
    } else {
      callback()
    }
  } else {
    callback()
  }
}

export function moneyFiveValidate(rule, value, callback) {
  if(!value){
    callback(new Error('请输入金额'))
  }
  else if( value && String(value).indexOf('.') <= 0 ){ //当无小数点时
    if(!num.test(value)){
      if(NoNum.test(value)){
        callback(new Error('请输入正确的金额'))
      }
      else{
        callback()
      }
    }
  }
  else if( value && String(value).indexOf('.') >= 0) { //当有小数点时
    //记录第一个小数点出现的位置
    var oneXsd = String(value).indexOf('.')
    //计算小数点个数
    var xsd = 0
    for (var i = 0; i < value.length; i++) {
      if (value[i] === '.') {
        xsd++
      }
    }
    //将内容按小数点切割
    var arr = String(value).split('.')
    for (var j = 0; j < arr.length; j++) {
      if (NoNum.test(arr[j])) {
        callback(new Error('请输入正确的金额'))
      }
    }
    // 1.根据小数点个数判断
    if (xsd > 1 || oneXsd + 1 === value.length) {
      callback(new Error('请输入正确的金额'))
    } else if (!fiveReg.test(value)) {
      callback(new Error('金额仅支持4位小数！'))
    } else {
      callback()
    }
  }
}

export function bankNoValidate(rule, value, callback) {
  if(!value && rule.required){
    callback(new Error('请输入大额行号'))
  }
  else if(!bigBankNo.test(value)){
    callback(new Error('大额行号为12位数字'))
  }
  else {
    callback()
  }
}

export function validateBankName(rule, value, callback) {
  if(!value && value.required){
    callback(new Error('请输入开户行'))
  }else if(value && rule.max && value.length > rule.max){
    callback(new Error(`开户行不可超过${rule.max}字符`))
  }else if (value && !rule.max && value.length >= 200) {
    return callback(new Error('开户行仅支持200个字符以内'))
  }
  return callback()
}

export function validateBankAcctName(rule, value, callback) {
  if(!value && value.required){
    callback(new Error('请输入户名'))
  }
  if (value && value.length >= 100) {
    return callback(new Error('户名只支持100个字符以内'))
  }
  return callback()
}

//手机号与座机
export function validateFixedPhone(rule, value, callback) {
  if (!value && rule.required) {
    callback(new Error('请输入办公电话/手机号码'))
  }else if(value && rule.max && value.length > rule.max){
    callback(new Error(`办公电话/手机号码不可超过${rule.max}字符`))
  }else if(value && (!phoneReg.test(value) && !fixedReg.test(value))){
    callback(new Error('固定电话或手机号码格式不正确'))
  }else {
    callback()
  }
}
export function newValidateFixedPhone(rule, value, callback) {
  if (!value && rule.required) {
    callback(new Error(`请输入${rule.name || '办公电话/手机号码'}`))
  }else if(value && rule.max && value.length > rule.max){
    callback(new Error(`${rule.name || '办公电话/手机号码'}不可超过${rule.max}字符`))
  }else if(value && (!phoneReg.test(value) && !fixedReg.test(value))){
    callback(new Error(`${rule.name || '固定电话或手机号码'}格式不正确`))
  }else {
    callback()
  }
}
