import {mapState} from "vuex";
import md5 from 'js-md5'
export  default {
    name: "userInfo",
    created(){
        this.getUserInfo()
    },
    computed: {
        ...mapState({
            userInfo:state => state.user.userInfo
        })
    },
    data(){
        return {
            //api
            zjControl:{
                getUserInfo: this.$api.userInfo.getLoginUserInfo,//获取用户信息
                editEmail:this.$api.userInfo.editEmail,//修改邮箱
                editPassword:this.$api.userInfo.editPassword,//修改密码
            },
            zjBtn:{},
            //dialog
            editFlag:false,
            //是邮箱还是密码
            isEmail:false,
            //修改的表单校验
            editRules:{
                email:[
                    {required:true, validator: this.newEmailValidator}
                ],
                oldPassword:[
                    { validator: this.oldValidator},
                ],
                newPassword: [
                    { validator: this.newValidator},
                ],
                againPassword: [
                    { validator: this.againValidator}
                ]
            }
        }
    },
    methods:{
        md5,
        // 定义输入旧密码的校验
        oldValidator(rule, value, callback){
            if(value.trim() === ''){
                callback(new Error('请输入旧密码'));
            }
            else if (value !== this.userInfo.password) {
                callback(new Error('旧密码输入不正确'));
            }else{
                callback()
            }
        },
        // 定义输入新密码的校验
        newValidator(rule, value, callback){
            // let reg = new RegExp(/([\d]+[a-zA-Z]+)|([a-zA-Z]+[\d]+)|([\W_]{0,}[0-9]+[a-zA-Z]+)|([0-9]+[\W_]{0,}[a-zA-Z]+)|([0-9]+[a-zA-Z]+[\W_]{0,})/)
            let passReg = /^(?![^A-Za-z]+$)(?![^0-9]+$)[0-9A-Za-z_]+$/
            if(!value){
                callback(new Error('请输入新的密码'))
            }else if(value && (value.length <8 || value.length >20) ){
                callback(new Error('新密码格式不正常：密码由英文字母、数字下划线组成的8到20位的字符串，且必须包含字母和数字'))
            }else if(!passReg.test(value)){
                callback(new Error('新密码格式不正常：密码由英文字母、数字下划线组成的8到20位的字符串，且必须包含字母和数字'))
            }else if(value === this.editForm.password){
                callback(new Error('新密码不可与原密码相同'))
            }else {
                callback()
            }
        },
        // 定义再次输入密码的校验
        againValidator(rule, value, callback){
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.editForm.newPassword) {
                callback(new Error('您当前输入的密码与新密码不一致，请重新输入!'));
            } else {
                callback();
            }
        },
        // 新邮箱校验
        newEmailValidator(rule, value, callback){
            let emailReg = /^[0-9A-Za-z_-]+[@][0-9A-Za-z]+([.][0-9A-Za-z]+){1,2}$/
            if(!value){
                callback(new Error('请输入新的邮箱号码'))
            }else if(value === this.userShowInfo.email){
                callback(new Error('新的邮箱号码不能与旧的邮箱号码相同'))
            }else if(!emailReg.test(value)){
                callback(new Error('新的邮箱号码格式不正确'))
            }else {
                callback()
            }
        },
        //证件号码
        noFilters(str){
            if(!str){return}
            return String(str).slice(0,6) + '*********' + String(str).slice(-4)
        },
        //手机号码
        phoneFilters(str){
            if(!str){return}
            return String(str).slice(0,3) + '*****' + String(str).slice(-2)
        },
        //获取用户信息
        getUserInfo(){
            this.zjControl.getUserInfo().then(res => {
                this.userShowInfo = res.data
            })
        },
    },
    mounted(){
        let zjObj = Object.assign({},this.zjControl)
        this.$api.baseCommon.getPermission(zjObj).then(res => {
            this.zjBtn = res
        })
    },
}
