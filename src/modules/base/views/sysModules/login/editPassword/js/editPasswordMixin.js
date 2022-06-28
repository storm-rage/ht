export default {
    name: "LoginEditPassword",
    // props:['userInfo','userSinfo'],
    props:{
      userInfoS:{
        type:Object,
        default(){
          return {}
        }
      },
      userSinfo:{
        type:Object,
        default(){
          return {}
        }
      },
    },
    data(){
        // 定义输入旧密码的校验
        let oldValidator = (rule, value, callback) => {
            if(value.trim() === ''){
                callback(new Error('请输入旧密码'));
            }
            else if (value !== this.userInfoS.password) {
                callback(new Error('旧密码输入不正确'));
            }else{
                callback()
                this.isClickBtn()
            }
        }
        // 定义输入新密码的校验
        let newValidator = (rule, value, callback) => {
            let num = new RegExp(/[\d]+/)
            let eng = new RegExp(/[a-zA-Z]+/)
            let cnReg = new RegExp(/[\u4E00-\u9fA5]+/g)
            if (value === '') {
                callback(new Error('请输入新的密码'));
            }
            else if (value === this.userInfoS.password) {
                callback(new Error('新密码不能与旧密码相同'));
            }
            else if ( value.length < 8 ||  value.length > 20) {
                callback(new Error('请输入8-20位的密码'));
            }
            else if(cnReg.test(value)){
              callback(new Error('新密码格式不正确'));
            }
            else if ( !num.test(value) || !eng.test(value)) {
                callback(new Error('新密码必须包含数字、英文'));
            }
            else {
                callback();
                this.isClickBtn()
            }
        };
        // 定义再次输入密码的校验
        let againValidator = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.passwordForm.newPassword) {
                callback(new Error('您当前输入的密码与新密码不一致，请重新输入!'));
            } else {
                callback();
                this.isClickBtn()
            }
        }
        return{
            // 密码表单绑定的校验规则
            passwordRules:{
                // oldPassword:[
                //     { validator: oldValidator},
                // ],
                newPassword: [
                    { validator: newValidator},
                ],
                againPassword: [
                    { validator: againValidator}
                ]
            }
        }
    }
}
