import {
    validatePhone, //手机号码（电话）
    validateEmail, // 电子邮箱
} from '@common/utils/rules'

export default {
    name: "addUser",
    props:{
        // 此条件是修改时所需的信息
        editInfo:{
            type:Object
        },
        //字典
        uDictionary:Object
    },
    watch:{
        // 每次数据更新时
        editInfo(newData){
           this.addFormData = newData
        },
    },
    data(){
        return{
            isAdd:true,//默认为新增
            zjControl: {
                uploadAttach:this.$api.userInfoManage.uploadAttach, //获取企业用户可以绑定的正常企业信息
                entList:this.$api.userInfoManage.queryEntInformation, //获取企业用户可以绑定的正常企业信息
                roleList:this.$api.userInfoManage.queryEntUserRoleInformation, //获取企业用户可以绑定角色信息
                downloadFile:this.$api.userInfoManage.downloadFile, //下载附件
                addUser:this.$api.userInfoManage.addUser, //新增用户
                updateUser:this.$api.userInfoManage.updateUser, //修改用户
            },
            //下拉
            selectList:{
                enterprises:[],//企业
                enterprisesFilters:(id) => {
                    if(!id){return}
                    let results = this.selectList.enterprises.find(item=> item.id === id)
                    let ress = results ? (results.name ? results.name : id || '-') : id || '-'
                    return ress
                },
                roles:[],//角色
                rolesFilters:(id) => {
                    if(!id){return}
                    let results = this.selectList.roles.find(item=> item.id === id)
                    let ress = results ? (results.name ? results.name : id || '-') : id || '-'
                    return ress
                }
            },
            // 表单校验规则
            addFormRules:{
                entId:[
                    {required:false,message:'请选择所属企业', trigger: "change"}
                ],
                userName:[
                    {required:false,message:'请输入姓名', trigger: "blur"},
                    {validator:(rule,value,callback) =>{
                        // message:'请输入姓名',
                        if (!value && rule.required) {
                          callback(new Error('请输入姓名'))
                        }else if(value && value.length > 50){
                          callback(new Error('姓名不可超过50字符'))
                        }else{
                          callback()
                        }
                      }, trigger: "blur"}
                ],
                loginName:[
                    {required:false,message:'请输入用户名', trigger: "blur"},
                    {validator:(rule,value,callback) =>{
                        let xhx = /^_+$/g
                        let loginNameRegSW = /^[a-zA-Z0-9_]{6,20}$/i
                        if (!value && rule.required) {
                          callback(new Error('请输入用户名'))
                        }else if(value && !loginNameRegSW.test(value)){
                          callback(new Error('用户名不合法(6-20位英文字母、数字、下划线)'))
                        }else if(value && xhx.test(value)){
                          callback(new Error('用户名不合法(6-20位英文字母、数字、下划线)'))
                        }else{
                          callback()
                        }
                      }
                    , trigger: "blur"}
                ],
                certType:[
                    {required:false,message:'请选择证件类型', trigger: "change"}
                ],
                certNo:[
                    {required:false,message:'请输入证件号码', trigger: "blur"},
                    {validator: this.validateIdCard, trigger: 'blur'}
                ],
                certStartDate:[
                    {required:false,message:'请选择证件有效起始日期', trigger: "change"}
                ],
                certEndDate:[
                    {required:false,message:'请选择证件有效终止日期', trigger: 'change'}
                ],
                mobileNo:[
                    {required:false,message:'请填写手机号码', trigger: "blur"},
                    {validator: validatePhone, trigger: 'blur'}
                ],
                email:[
                    {required:false,message:'请填写邮箱号码', trigger: "blur"},
                    {validator: validateEmail,trigger: "blur"}
                ],
                roles:[
                    {required:false,message:'请选择角色',trigger: "change"}
                ],
                idCardAttach:[
                    {required:false,message:'请上传证件扫描件',trigger: "change"}
                ],
            },
        }
    },
    methods:{
        //下载
        downFile(row){
          let params = {
            fileId:row.fileId,
            fileName:row.fileName || row.attachName,
          }
          this.zjControl.downloadFile(params)
        },
        //证件类型切换时
        certTypeChange(){
          this.addFormData.certNo ? this.$refs.addFormData.validateField('certNo')
                                  : this.$refs.addFormData.clearValidate('certNo')
        },
        //身份证号码校验
        validateIdCard(rule, value, callback){
          let idReg = /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
          // let idReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
          if (!value && rule.required) {
            callback(new Error('请输入证件号码'))
          } else if (value && this.addFormData.certType === '01' && !idReg.test(value)) {
            callback(new Error('请输入正确身份证号码'))
          } else {
            callback()
          }
        },
        //打开dialog
        open(boo = true){
          this.isAdd = boo
          this.show = true
          this.getEntList()
          this.getRoleList()
          this.addORedit()
        },
        //获取企业
        getEntList(){
            this.zjControl.entList().then(res => {
                this.selectList.enterprises = res.data.enterprises
            })
        },
        //获取角色
        getRoleList(){
            this.zjControl.roleList().then(res => {
                this.selectList.roles = res.data.roles
                //调用角色下拉初始化
                this.initRoles()
            })
        },
        //角色下拉初始化
        initRoles(){
            this.selectList.roles.forEach(item => {
                item.disabled = this.addFormData.roles.some(ritem => ritem.roleId === item.id)
            })
        },
        //必填星号设置
        addORedit(){
            // this.addFormRules.entId[0].required = this.isAdd
            // this.addFormRules.loginName[0].required = this.isAdd
        },
        //当证件有效期发生改变时
        certStartChange(){
            this.$refs.addFormData.validateField('certStartDate')
        },
        certEndChange(){
            this.$refs.addFormData.validateField('certEndDate')
        }
    }
}
