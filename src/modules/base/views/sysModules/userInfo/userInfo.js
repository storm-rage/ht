import userInfoMixin from "./userInfoMixin";
export default {
    mixins:[userInfoMixin],
    data(){
        return {

            userShowInfo:{},//渲染的数据

            //修改的表单
            editForm:{
                userId:'',
                email:'',
                oldPassword:'',
                newPassword:'',
                againPassword:''
            },

        }
    },
    methods:{
        //修改
        editInfo(flag){
            this.isEmail = flag === 'email'
            //获取数据
            this.editForm = {
                userId:this.userShowInfo.id,
                email:'',
                oldPassword:'',
                newPassword:'',
                againPassword:''
            }
            this.editFlag = true
        },
        //修改关闭
        editClose(){
            for(let key in this.editForm){
                this.editForm[key] = ''
            }
            this.editFlag = false
            this.$nextTick(()=>{
                this.$refs.editForm.clearValidate()
            })
        },
        //修改邮箱
        editEmail(){
            this.$refs.editForm.validate(boo =>{
                if(!boo){return}
              this.$messageBox({
                type:'confirm',
                title:`邮箱修改确认`,
                content:`确认后邮箱将会更变`,
                showCancelButton:true,
                messageResolve:()=>{
                  let params = {
                    userId:this.editForm.userId,
                    email:this.editForm.email
                  }
                  this.zjControl.editEmail(params).then(() => {
                    this.getUserInfo()
                    this.editClose()
                    this.$Message.success('邮箱修改成功!')
                  })
                }
              })
            })
        },
        //修改密码
        editPassWord(){
            if(!this.editForm.oldPassword){
                this.$Message.error('请输入旧密码')
            }
            if(this.editForm.newPassword && (this.editForm.newPassword.trim().length > 20 || this.editForm.newPassword.trim().length <8)){
                return this.$Message.error('新密码格式不正常：密码由英文字母、数字下划线组成的8到20位的字符串，且必须包含字母和数字！')
            }
            if(this.editForm.oldPassword === this.editForm.newPassword){
                return this.$Message.error('新密码不可与原密码相同！')
            }
            this.$refs.editForm.validate(boo =>{
                if(!boo){return}
              this.$messageBox({
                type:'confirm',
                title:`密码修改确认`,
                content:`确认后密码将会更变`,
                showCancelButton:true,
                messageResolve:()=>{
                  let params = {
                    userId:this.editForm.userId,
                    oldPassword:this.md5(this.editForm.oldPassword).toUpperCase(),
                    newPassword:this.md5(this.editForm.newPassword).toUpperCase()
                  }
                  this.zjControl.editPassword(params).then(() => {
                    // 保存用户信息
                    this.$store.dispatch('user/setUserInfo', {
                      userName: this.userInfo.userName,
                      password:this.editForm.newPassword,
                      entName: this.userInfo.entName
                    })
                    this.getUserInfo()
                    this.editClose()
                    this.$Message.success('密码修改成功!')
                    this.$router.replace({name:'login'})
                  })
                }
              })
            })
        }
    },
}
