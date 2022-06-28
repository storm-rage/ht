export default {
    data(){
        return{
            zjControl:{
                getDictionary:this.$api.userInfoManage.getUserDictionary, //数据字典
                downloadFile:this.$api.userInfoManage.downloadFile, //下载附件
                downloadFlow:this.$api.userInfoManage.downloadFlow, //下载附件流

                getUserInformationDetail:this.$api.userInfoManage.getUserInformationDetail, //获取用户详情
                userInfo:this.$api.userInfoManage.getUserInformation, //获取用户详情

                entList:this.$api.userInfoManage.queryEntInformation, //获取已注册企业
                roleList:this.$api.userInfoManage.queryEntUserRoleInformation, //获取角色列表
                freeze:this.$api.userInfoManage.freezeUser, //账户冻结
                unfreeze:this.$api.userInfoManage.unfreezeUser,//账户解冻
                cancel:this.$api.userInfoManage.cancelUser,//账户注销
                reset:this.$api.userInfoManage.resetPassword, //重置密码
                updateUser:this.$api.userInfoManage.updateUser, //修改用户
            },
            dictionary:{},

            // 请求回来的数据
            userInfos:{},  //用户
            entList:[],  //企业
            roleList:[], //角色
            //是否交了修改
            isEdit:false,
        }
    },
    methods:{
        //获取数据字典
        getDictionary(){
          this.zjControl.getDictionary().then(res => {
            this.dictionary = res.data
          })
        },
        // 获取企业列表
        getEntList(){
            this.zjControl.entList().then(ret => {
                let res = ret.data
                this.entList = res.enterprises
            })
        },
        //获取角色列表
        getRoleList(){
            this.zjControl.roleList().then(ret => {
                let res = ret.data
                this.roleList = res.roles
            })
        },
        // 获取用户信息
        getUserInfo(){
            if(this.$route.meta.isManage){
              this.zjControl.userInfo({id:this.row.id}).then(ret => {
                let res = ret.data
                this.userInfos = res
              })
            }else{
              this.zjControl.getUserInformationDetail({id:this.row.id}).then(ret => {
                let res = ret.data
                this.userInfos = res
              })
            }

        },
        // 打开本页面时，若id发生改变则调用，用户信息修改更改则调用
        getNewUserInfo(){
            this.getEntList()
            this.getRoleList()
            this.getUserInfo()
        },
        // 子组件传回来的方法
        showIndex(){
            this.getUserInfo()
        },
        //企业过滤
        entFilters(id){
            if(!id){return}
            if(!Array.isArray(this.entList) && this.entList.length <= 0){return}
            let newObj = this.entList.find(item => item.id === id)
            return newObj ? (newObj.name ? newObj.name : id || '-') : '-'
        },
        //角色过滤
        rolesFilters(id){
            if(!id){return}
            if(!Array.isArray(this.roleList) || this.roleList.length <= 0){return}
            let newObj = this.roleList.find(item => item.id === id)
            return newObj ? (newObj.name ? newObj.name : id || '-') : '-'
        },
    },
    created(){
      this.getRow()
      this.getApi()
      this.getDictionary()
      this.getNewUserInfo()
      this.viewApi = this.zjControl.downloadFlow
      this.downApi = this.zjControl.downloadFile
    }
}
