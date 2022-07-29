import loginMixin from "./loginMixin";
import md5 from 'js-md5'
import piMixin from './piMixin'

export default {
  mixins: [loginMixin, piMixin],
  data() {
    return {
      remember: false, //是否记住用户名
      // 0是1否
      // 首次登录
      isOneLogin: false, // 先设置成不是第一次登录
      loginCount: 0, //记录点击登录的次数
      // 图片验证码的地址
      imgCodeString: '',
      // 手机验证码
      isSmsCode: true, // 是否允许获取
      smsText: '发送验证码', // 显示的文字
      // smsText:'59秒后重新获取',
      // 登录按钮是否可用
      isSumbit: false,
      // 登录验证需要提交的表单
      userData: {
        loginName: '', // 用户名
        password: '', // 密码
        captcha: '', // 图片验证码
        smsCode: '', // 手机验证码
        pwdVerifyMode: '1', //登录密码验证方式 1.登录密码验证 2.手机验证码验证
        resId:"0",
        // 登录网络标识 0-内网 1-外网
        loginNetTag: '0'
      },
      // 保存登录成功后的信息
      loginSuccess: {},
      //追加-强制修改密码后需进入系统
      loginRes: {},
      //追加-用户名变更后隐藏手机号输入框
      updateName: '',
      passwordType: 'password'
    }
  },

  methods: {
    // 获取图片验证码
    getCaptcha() {
      this.zjControl.getCaptcha().then(res => {
        this.imgCodeString = 'data:image/png;base64,' + btoa(
          new Uint8Array(res).reduce((data, byte) => data + String.fromCharCode(byte), '')
        )
      })
    },
    // 获取手机验证码
    getSmsCode() {
      this.zjControl.sendMobileCaptcha(this.userData).then(() => {
        // 获取成功时---显示提示
        this.$message.success({
          message: '手机验证码发送成功，请注意查收！',
          duration: 2000,
        });
        // 调用定时器
        this.smsCodeTime(60)
      })
    },

    //  my登录
    submitForm(epFlag) {
      if (!this.$refs.userForm) {
        return
      }
      this.$refs.userForm.validate(valid => {
        if (valid) {
          this.rememberName() //调用cookie保存信息

          // 发送登录请求 --- md5加密
          let params = JSON.parse(JSON.stringify(this.userData))
          params.password = md5(params.password).toUpperCase()
          if (typeof (epFlag) === 'boolean' && epFlag) {
            params.loginChannel = '4'
          }
          if (this.oneLoginFlag) {
            params.oneLoginFlag = this.oneLoginFlag
          }

          // 发送登录请求
          this.zjControl.login(params).then(res => {
            let loginRes = res.data

            // 冻结状态
            if (loginRes.frozenState) {
              this.$refs.frozenDialog.open(loginRes.frozenPhone)
              this.clearForm()
            }
            // 当为第一次登录时
            else if (loginRes.oneLoginFlag&&this.userData.pwdVerifyMode==='1') {
              // 不带手机验证码
              if (this.loginCount === 0) {
                this.loginCount++ // 将登录次数递增--限制卡死在第一次登录上
                this.isOneLogin = loginRes.oneLoginFlag // 显示手机验证码填入框
                this.$message.warning({
                  message: '请输入手机验证码',
                  duration: 1500,
                  offset: 200
                })
                this.userData.captcha = ''
                this.getCaptcha() // 重新请求验证码
              }
              // 再次登录时,强制修改密码
              else {
                this.loginRes = loginRes
                this.$refs.editPassword.dialogVisible = true
                this.oneLoginFlag = false
              }
            }
            // 需要签 协议
            else if (loginRes.userServiceAgreementFlag === '1') {
              const loginResMix = Object.assign({}, loginRes, this.userData);
              this.loginSuccess = JSON.parse(JSON.stringify({
                loginRes: loginResMix
              }))
              //跳人脸识别
              // this.$refs.FaceRecognition.dialogVisible = true
              loginRes.password = this.userData.password
              sessionStorage.setItem('frLoginRes', JSON.stringify(loginResMix))
              this.goChild('faceRecognition', this.loginSuccess)
              this.oneLoginFlag = false
            } else {
              loginRes.loginName = this.userData.loginName;
              this.saveInfo(loginRes) // 保存所需信息
              this.$router.push('/') //进入系统
            }
          }).catch(() => {
            this.getCaptcha()  // 重新请求验证码
            this.userData.smsCode = ''
          })
        }
      })
    },
    // 用户修改密码完成
    editSuccess(newInfo) {
      this.userData.loginName = newInfo.loginName //用户名
      this.userData.password = newInfo.newPassword //更新密码
      this.isOneLogin = false //隐藏手机输入框
      this.loginCount = 0 //重置登录次数
      this.submitForm(true)
    },
    // 重置页面状态
    resetState() {
      this.clearForm()
      this.loginCount = 0 //重置登录次数
      this.isOneLogin = false
      this.getCaptcha()
    },
    /**
     * 改变登陆方式
     */
    handleChangeLoginType () {
      this.userData.loginName = '';
      this.userData.password = '';
      this.userData.captcha = '';
      this.userData.smsCode = '';
      this.loginCount = 0 //重置登录次数
      this.getCaptcha()
    }
  }
}
