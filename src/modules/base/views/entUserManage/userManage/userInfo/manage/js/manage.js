import view from "@pubComponent/preview/view";
import addEditUser from '../../components/addEdit/AddEditUser.vue'
import manage_Mixin from "./manage_Mixin";
export default {
    name: "ManageUser",
    components:{addEditUser},
    mixins:[view,manage_Mixin],
    data(){return{
        resetKey:true, //重置密码获取的钥匙,
        // 点击修改时，传给子组件的数据
        editInfo:{}
    }},
    methods:{
        // 修改个人信息
        editUserInfo(){
            this.$refs.addEditUser.open(false)
            // 传入所需信息
            this.editInfo = this.userInfos
        },
        //账户冻结
        freeze(){
          this.$messageBox({
            type:'confirm',
            title:`冻结确认`,
            content:`确认冻结该账户？冻结后用户将不能使用本系统，可在该页面进行解冻`,
            showCancelButton:true,
            messageResolve:()=>{
              this.zjControl.freeze({id:this.row.id}).then(()=>{
                this.getNewUserInfo(true)
                this.$message.success('冻结账户成功！')
              })
            }
          })
        },
        // 账户解冻
        thaw(){
          this.$messageBox({
            type:'confirm',
            title:`解冻确认`,
            content:`确认将该账户解冻？解冻后，用户将获得授权可继续使用本系统`,
            showCancelButton:true,
            messageResolve:()=>{
              this.zjControl.unfreeze({id:this.row.id}).then(()=>{
                this.getNewUserInfo(true)
                this.$message.success('账户解冻成功！')
              })
            }
          })
        },
        //账户注销
        wroteOff(){
          this.$messageBox({
            type:'confirm',
            title:`注销确认`,
            content:`确认申请账户注销？注销的账户将不能使用本系统，注销的账户不可恢复。`,
            confirmText:`提交`,
            showCancelButton:true,
            messageResolve:()=>{
              this.zjControl.cancel({id:this.row.id}).then(()=>{
                this.getNewUserInfo(true)
                this.$message.success('注销账户成功！')
              })
            }
          })
        },
        //重置密码
        resetPassword(){
            if(!this.resetKey){
                return this.$message.warning({message:'请稍后再重置密码！',duration:1000})
            }

          this.$messageBox({
            type:'confirm',
            title:`重置确认`,
            content:`系统将自动发送新密码至该用户的手机号，确认重置？`,
            showCancelButton:true,
            messageResolve:()=>{
              this.zjControl.reset({id:this.row.id}).then(()=>{
                this.getNewUserInfo(true)
                this.$message.success('重置成功，新密码已成功发送！')
                //限制一分钟才能重新进行重置
                setTimeout(()=>{
                  this.resetKey = true
                },6000)
              })
            }
          })
        },
    },
}
