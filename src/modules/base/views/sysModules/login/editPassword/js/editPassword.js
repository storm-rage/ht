import editPasswordMixin from './editPasswordMixin'
export default {
    mixins:[editPasswordMixin],
    data () {
        return {
            dialogVisible: false,
            // 是否可以点击提交
            isSubmit:false,
            //  密码表单绑定的数据
            passwordForm:{
                oldPassword: '',
                newPassword: '',
                againPassword: ''
            },
            //
            zjControl:{
              upDatePassword:this.$api.login.upDatePassword
            }
        }
    },
    methods: {
        // 是否可以点击修改按钮
        isClickBtn(){
            if( this.passwordForm.newPassword !== this.passwordForm.oldPassword
                && this.passwordForm.againPassword === this.passwordForm.newPassword
                && this.passwordForm.againPassword.length >= 8
                && this.passwordForm.newPassword.length >= 8
            ){
                this.isSubmit = true
            }
        },
        // 确认修改密码
        determinePassword () {
            let that = this // 保存this，方便到异步或强制改变this中的函数中使用
            this.$refs.passwordForm.validate(boo => {
                if(!boo){return} //不通过直接return掉
                // 发送修改密码请求
                let params = {
                    oldPassword: that.passwordForm.oldPassword,
                    newPassword: that.passwordForm.newPassword
                }
                this.zjControl.upDatePassword(params).then(() => {
                    // 获取成功时---显示提示
                    this.$message.success({
                        message: '密码修改成功，请牢记新密码！',
                        duration: 1200,
                    });
                    // console.log(this.userSinfo)

                    let newInfo = Object.assign({},this.userInfoS)
                    newInfo.newPassword = that.passwordForm.newPassword
                    that.$emit('editSuccess',newInfo) // 最后传回一个事件给父亲，告诉他更新密码成功
                    that.handleClose() // 关闭dialog--还原成初始状态
                })
            })
        },
        // 关闭dialog
        handleClose () {
            // 关闭
            this.dialogVisible = false
            // 清空值
            this.passwordForm = { newPassword: '', againPassword: ''}
            // 清空校验
            this.$refs.passwordForm.resetFields()
        },
    }
}
