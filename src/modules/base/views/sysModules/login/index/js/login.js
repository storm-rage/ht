import loginMixin from "./loginMixin";
// import sw_cookie from "@utils/cookie";
import md5 from 'js-md5'
import piMixin from './piMixin'
export default {
    mixins:[loginMixin,piMixin],
    data () {
        return {
            headerList:[{label:'首页',path:'/login'}/*,{label:'联系我们',path:''}*/],
            remember:false, //是否记住用户名
            // 0是1否
            // 首次登录
            isOneLogin: '1', // 先设置成不是第一次登录
            loginCount: 0, //记录点击登录的次数
            // 图片验证码的地址
            imgCodeString: '',
            // 手机验证码
            isSmsCode:true, // 是否允许获取
            smsText: '发送验证码', // 显示的文字
            // smsText:'59秒后重新获取',
            // 登录按钮是否可用
            isSumbit:false,
            // 登录验证需要提交的表单
            userData: {
                loginName: '', // 用户名
                password: '', // 密码
                captcha:'', // 图片验证码
                smsCode:'' // 手机验证码
            },
            // 保存登录成功后的信息
            loginSuccess:{},
            //第一次登录标识
            oneLoginFlag:false,
            //追加-强制修改密码后需进入系统
            loginRes:{},
            //追加-用户名变更后隐藏手机号输入框
            updateName:'',
            passwordType:'password'
        }
    },
    mounted() {
    },
    beforeDestroy() {
    },
    methods: {
        // 获取图片验证码
        getCaptcha () {
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
        submitForm (epFlag) {
            if(!this.$refs.userForm){return}
            let whiteList = []
            if(this.isOneLogin !== '0'){
              whiteList.push('smsCode')
            }
            if(typeof(epFlag) === 'boolean' && epFlag){
              whiteList.push('captcha')
            }
            // let key = this.notEmptyCheck('userData','userRules',whiteList)
            // if(!key){return;}
            this.$refs.userForm.validate(boo => {
                if (!boo) { return } // 不通过直接return掉
                this.rememberName() //调用cookie保存信息

                // 发送登录请求 --- md5加密
                let params = JSON.parse(JSON.stringify(this.userData))
                params.password = md5(params.password).toUpperCase()
                if(typeof(epFlag) === 'boolean' && epFlag){
                  params.loginChannel = '4'
                }
                if(this.oneLoginFlag){
                  params.oneLoginFlag = this.oneLoginFlag
                }

                // 发送登录请求
                this.zjControl.login(params).then(res => {
                    this.oneLoginFlag = false

                    let loginRes = res.data

                    // 冻结状态
                    if(loginRes.frozenState){
                        this.$refs.frozenDialog.open(loginRes.frozenPhone)
                        this.clearForm()
                    }
                    // 当为第一次登录时
                    else if (loginRes.loggedState === '0') {
                        // 不带手机验证码
                        if (this.loginCount === 0) {
                            this.loginCount ++ // 将登录次数递增--限制卡死在第一次登录上
                            this.isOneLogin = '0' // 显示手机验证码填入框
                            this.$message.warning({
                                message: '请输入手机验证码',
                                duration: 1500,
                                offset: 200
                            })
                            this.userData.captcha = ''
                            this.getCaptcha() // 重新请求验证码

                            //更新标识
                            this.oneLoginFlag = true
                        }
                        // 再次登录时,强制修改密码
                        else {
                            this.loginRes = loginRes
                            this.$refs.editPassword.dialogVisible = true
                            this.oneLoginFlag = false
                        }
                    }
                    // 需要人脸识别 或者签 协议
                    else if(loginRes.faceCheck || loginRes.userServiceAgreementFlag === '1'){
                        const loginResMix = Object.assign({}, loginRes, this.userData);
                        this.loginSuccess = JSON.parse(JSON.stringify({
                            loginRes: loginResMix
                        }))
                        //跳人脸识别
                        // this.$refs.FaceRecognition.dialogVisible = true
                        loginRes.password = this.userData.password
                        sessionStorage.setItem('frLoginRes',JSON.stringify(loginResMix))
                        this.goChild('faceRecognition',this.loginSuccess)
                        this.oneLoginFlag = false
                    }else{
                      loginRes.loginName = this.userData.loginName;
                      this.saveInfo(loginRes) // 保存所需信息
                      this.$router.push('/') //进入系统
                    }
                }).catch(() => {
                    this.getCaptcha()  // 重新请求验证码
                    this.userData.smsCode = ''
                })
            })
        },
        // 用户修改密码完成
        editSuccess (newInfo) {
            // this.$refs.userForm.resetFields() // 清空校验规则
            // console.error(newInfo)
            this.userData.loginName = newInfo.loginName //用户名
            this.userData.password = newInfo.newPassword //更新密码
            // this.userData.captcha = '' //清空图片验证码
            this.isOneLogin = '1' //隐藏手机输入框
            this.loginCount = 0 //重置登录次数
            this.submitForm(true)
            // if(this.loginRes.faceCheck || this.loginRes.userServiceAgreementFlag === '1'){
            //
            // }else{
            //   this.saveInfo(this.loginRes) // 保存所需信息
            //   this.$router.push('/home') //进入系统
            // }
        },
        // 重置页面状态
        resetState(){
            this.clearForm()
            this.loginCount = 0
            this.isOneLogin = '1'
            this.getCaptcha()
            this.oneLoginFlag = false
            // this.$refs.editPassword.dialogVisible = false
            // this.$refs.FaceRecognition.dialogVisible = false
        },
        changePwdType () {
          if (this.passwordType =='password') {
            this.passwordType = 'text';
          } else {
            this.passwordType = 'password';
          }
        }
    }
}
