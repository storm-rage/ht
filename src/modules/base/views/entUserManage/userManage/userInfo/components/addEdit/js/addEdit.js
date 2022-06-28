import addeditMixin from './addEditMixin'
export default {
    mixins:[addeditMixin],
    data(){
        return{
            show:false,
            //表单
            addFormData:{
                entId:'',//企业ID
                userName:'',//姓名
                loginName:'',//用户名
                certType:'',//证件类型
                certNo:'',//证件号码
                certStartDate:'',//证件有效期起
                certEndDate:'',//证件有效期止
                mobileNo:'',//手机号码
                email:'',//邮箱
                roles:[], //角色
                idCardAttach:[],//证件扫描件
            },
            roleTran:''
        }
    },
    methods:{
        //添加角色
        addRole(type){
            //this.roleTran
            if (type === ''){ return } //当值为空时直接ruturn，避免占用内存

            let addkey = this.addFormData.roles.some(item => item.roleId === type) //循环看是否已存在
            if (addkey){ return } //当存在时不添加
            //不存在则添加
            let rolesIndex = this.selectList.roles.findIndex(item => item.id === type)
            if(rolesIndex >= 0){
                this.addFormData.roles.push({
                    roleId:this.selectList.roles[rolesIndex].id,
                    roleName:this.selectList.roles[rolesIndex].name
                })
                this.roleTran = '' //再清空选择的值
                this.selectList.roles[rolesIndex].disabled = true //设置该项禁用
                this.$refs.addFormData.validateField('roles')
            }
        },
        //删除角色
        removeRole(dItem){
            //从已选中列表删除该项
            let dIndex = this.addFormData.roles.findIndex(item => item.roleId === dItem.roleId)
            this.addFormData.roles.splice(dIndex,1)
            //再讲已删除的该项设置为可选择
            let rolesIndex = this.selectList.roles.findIndex(item => item.id === dItem.roleId)
            this.selectList.roles[rolesIndex].disabled = false

        },
        //证件扫描件上传
        certUpload({ file }){
          let key = /^\.(jpg|jpeg|png|gif|svg|bmp)$/i.test(((file.name.match(/\.[^\\./]+$/ig) || '')[0] || '').toLowerCase())
                    || /^\.pdf$/i.test(((file.name.match(/\.[^\\./]+$/ig) || '')[0] || '').toLowerCase())
          if (!key) {
            return this.$Message.error('仅支持上传 图片/PDF格式 附件')
          }
            let formData = new FormData()
            formData.append('file',file)
            this.zjControl.uploadAttach(formData).then(res => {
              if(this.addFormData.idCardAttach.length < 1){
                this.$set(
                  this.addFormData.idCardAttach,0,{attachName:'',fileName:'',fileId:''}
                )
                // this.addFormData.idCardAttach.push({})
              }
              this.addFormData.idCardAttach[0].attachName = res.data.fileName
              this.addFormData.idCardAttach[0].fileName = res.data.fileName
              this.addFormData.idCardAttach[0].fileId = res.data.fileId
                this.$refs.addFormData.validateField('idCardAttach') //调用校验
                this.$Message.success('上传附件成功！');
            })
        },
        // 保存
        save(){
            let editWhiteList = ['entId','loginName','idCardAttach']
            let key = true
            key = this.notEmptyCheck('addFormData','addFormRules',editWhiteList)
            if(!key){return}
            this.$refs.addFormData.validate(boo => {
                if (!boo){ return }
                this.isAdd ? this.Added() :this.amend()
            })
        },
        // 新增
        Added(){
            this.zjControl.addUser(this.addFormData).then(() => {
                this.$message.success('新增用户成功！');
                this.showOff(true)
            })
        },
        // 修改
        amend(){
            this.zjControl.updateUser(this.addFormData).then(() => {
                this.$message.success('用户信息修改成功！');
                this.showOff(true)
            })
        },
        // 关闭
        showOff(boo){
            this.$refs.addFormData.resetFields() //重置表单并移除校验
            for(let key in this.addFormData){
              if(Array.isArray(this.addFormData[key])){
                this.addFormData[key] = []
              }else{
                this.addFormData[key] = ''
              }
            }
            this.$nextTick(() => {
              this.$refs.addFormData.resetFields()
            })
            this.show = false //关闭本页面
            this.$emit('showIndex',boo) //打开主页面
        }
    }
}
