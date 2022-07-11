import LoginHeader from '../../components/LoginHeader'
import LoginFooter from '../../components/LoginFooter'
import LoginEditPassword from "../../editPassword/LoginEditPassword";
// import FaceRecognition from "../../faceRecognition/FaceRecognition"
import sw_cookie from "@utils/cookie";
import frozenDialog from "../../components/frozenDialog";
import {getMenuPower} from '@utils/menuTree';
import LoginType from '../loginType';

export default {
  name: 'login',
  components: {
    LoginHeader,
    LoginFooter,
    LoginEditPassword,
    frozenDialog,
    LoginType
  },
  data() {
    const validLoginName = (rule,value,callback) => {
      if (!value) {
        if (this.userData.pwdVerifyMode === '1'){
          return callback(new Error('请输入账户名'))
        }else {
          return callback(new Error('请输入手机号'))
        }
      }else if (this.userData.pwdVerifyMode === '2' && !/^((\(\d{3}\))|(\d{3}\u002d))?(1[3456789]\d{9})$/i.test(value)) {
        return callback(new Error('请输入正确手机号码'))
      }else {
        callback()
      }
    }
    return {
      //  表单校验规则
      userRules: {
        loginName: [{validator: validLoginName, trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}],
        captcha: [{required: true, message: '请输入验证码', trigger: 'blur'}, {min: 4, max: 4, message: '验证码为四位数'}],
        smsCode: [{required: true, message: '请输入手机验证码', trigger: 'blur'}],
      },
      zjControl: {
        getCaptcha: this.$api.baseCommon.getCaptcha,//获取图片验证码
        sendMobileCaptcha: this.$api.login.sendMobileCaptcha, //获取手机验证码
        login: this.$api.login.login,//登录
      }
    }
  },
  methods: {
    //  设置定时器
    smsCodeTime(num) {
      this.isSmsCode = false // 关闭获取手机验证码功能
      let valTime = setInterval(() => {
        num--
        if (num === 0) {
          this.isSmsCode = true // 开启获取手机验证码功能
          this.smsText = `重新获取验证码`
          clearInterval(valTime)
        } else {
          this.smsText = `${num}秒后重新获取`
        }
      }, 1000)
    },
    // 判断是否记住用户名
    rememberName() {
      if (this.remember) { //记住
        if (sw_cookie.get('loginName') !== this.userData.loginName || !sw_cookie.get('remember')) {
          sw_cookie.set('remember', '1', 7)
        }
        if (sw_cookie.get('loginName') !== this.userData.loginName || !sw_cookie.get('loginName')) {
          sw_cookie.set('loginName', this.userData.loginName, 7)
        }
      } else { //不记住就清掉
        sw_cookie.remove('remember')
        sw_cookie.remove('loginName')
      }
    },
    // 清空事件---清空表单内容，只留用户名
    clearForm() {
      let loginNameS = ' '
      for (let key in this.userData) {
        if (key !== 'loginName') {
          this.userData[key] = ''
        } else {
          loginNameS = this.userData[key]
        }
      }
      this.$refs.userForm.resetFields() // 清空校验规则
      this.userData.loginName = loginNameS // 保留用户名
      this.isOneLogin = false // 隐藏手机验证码输入框
    },
    //保存相关信息
    saveInfo(loginRes) {
      // 设置项目列表
      this.$store.dispatch('enterprise/setEntList', loginRes.entInfoList);
      if (loginRes.entInfoList && loginRes.entInfoList.length) {
        this.$store.dispatch('enterprise/setEntInfo', loginRes.entInfoList[0]);
      }
      const menuList = loginRes.resList
      // 保存菜单树
      this.$store.dispatch('menu/setMenuTreeList', menuList)
      // 保存菜单列表
      this.$store.dispatch('menu/setMenuList', menuList)

      // 保存用户信息
      this.$store.dispatch('user/setUserInfo', {
        userName: loginRes.userName,
        loginName: loginRes.loginName,
        // password:this.userData.password,
        entName: loginRes.entName,
        entType: loginRes.entType,
        entId: loginRes.entId,
        mobileNo: loginRes.mobileNo,
        power: getMenuPower(menuList),
        signZJDJBFlag: loginRes.signZJDJBFlag
      })
      //设置默认到账户中心
      this.$store.dispatch('menu/setNavMenuActive', '0')
    },
    // input修改背景色
    inputFocus(e) {
      //用户名记录
      if (e.currentTarget.name === 'loginName') {
        this.updateName = this.userData.loginName
      }
    },
    inputBlur(e) {
      if (e.target.value) {
        e.currentTarget.style.backgroundColor = ''
      } else {
        e.currentTarget.style.backgroundColor = 'rgba(155,155,155,0.1)'
        window.setTimeout(() => {
          this.$refs.userForm.clearValidate([e.target.name])
        }, 20)
      }
      //用户名记录
      if (e.currentTarget.name === 'loginName') {
        if (this.updateName !== this.userData.loginName) {
          this.loginCount = 0 //重置次数
          this.isOneLogin = false // 隐藏手机验证码填入框
        }
      }
    },
    //回车登录
    keyDown(e) {
      if (e.keyCode == 13) {
        this.submitForm()
      }
    }
  },
  mounted() {
    this.getCaptcha() // 获取验证码
    // 获取cookie
    this.remember = sw_cookie.get('remember') === '1'
    this.userData.loginName = sw_cookie.get('loginName') || ''
    //绑定回车登录
    window.addEventListener('keydown', this.keyDown, true)
  },
  destroyed() {
    //最后销毁事件
    window.removeEventListener('keydown', this.keyDown, false);
  }
}
