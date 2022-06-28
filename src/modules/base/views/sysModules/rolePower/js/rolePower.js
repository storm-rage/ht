export default {
    name: "rolePower",
    data(){
        return{
            zjControl: {},
            showInput: false,
            searchValue: null,
            currentId: '',
            list: [],
            currentPage: 1,
            total: 0,
            currentRoleList: [],
            sysPowerList: [],
            sysRolePowerList: [],
            nodeList: [],
        }
    },
    methods:{
        // 获取角色列表
        getRoleList (roleNameLike) {
            this.zjControl.search && this.zjControl.search({
                page: this.currentPage,
                roleNameLike,
                rows: 10
            }).then(res => {
                if (roleNameLike !== this.cacheValue) this.currentId = ''
                this.currentRoleList = res.data.rows
                this.total = parseInt(res.data.total)
            })
        },
        // 获取数据
        getList (roleId) {
            this.zjControl.get && this.zjControl.get({ roleId: roleId }).then(res => {
              // console.log('List',res)
                this.sysPowerList = this.getPowerList(res.data.sysPowerList)
                this.nodeList = this.getNodeList(this.sysPowerList)
                if (roleId) {
                    this.sysRolePowerList = (res.data.sysRolePowerList || []).map(item => item.powerCode)
                    this.collapseAll()
                    this.$refs.rolePowerTree.setCheckedKeys(this.sysRolePowerList)
                    this.currentId = roleId
                }
            })
        },
        // 全部折叠
        collapseAll () {
            let self = this
            let treeList = this.sysPowerList
            for (let i = 0; i < treeList.length; i++) {
                self.$refs.rolePowerTree.store.nodesMap[treeList[i].code].expanded = false
            }
        },
        // 获取权限树状数据
        getPowerList (originList) {
            const list = JSON.parse(JSON.stringify(originList))
            const rootList = list.filter(item => !item.parentCode || item.parentCode === item.code)
            const result = rootList.map(item => {
                return this.getChildList(list, item)
            })
            return result
        },
        getChildList (list, obj) {
            if (!obj.children) {
                obj.children = []
            }
            list.find(item => {
                if (item.parentCode === obj.code && item.code !== obj.code) {
                    obj.children.push(item)
                    obj.children.sort(function (a, b) { return a.sequence - b.sequence })
                    this.getChildList(list, item)
                }
            })
            return obj
        },
        // 获取所有子节点
        getNodeList (sysPowerList) {
            let arr = []
            function hasChild (item) {
                if (item.children.length) {
                    arr.push(item.code)
                    item.children.map(i => {
                        hasChild(i)
                    })
                }
            }
            sysPowerList.map(item => {
                hasChild(item)
            })
            return arr
        },
        // 换页
        handleCurrentChange (val) {
            this.currentPage = val
            this.getRoleList()
        },
        // 点击权限触发事件
        async changeRolePower () {
            let currentRolePowerList = await this.$refs.rolePowerTree.getCheckedKeys().filter(item => this.nodeList.indexOf(item) === -1)
            let powerCodeList = await this.filterArray(this.sysRolePowerList, currentRolePowerList)

            //添加还是删除
            let operationType = currentRolePowerList.length >= this.sysRolePowerList.length ? 1 : 2
            //删除null项
            let powerArr = JSON.parse(JSON.stringify(powerCodeList))
            for(let i=0; i<powerArr.length; i++){
                if(powerArr[i] === null || powerArr[i] === 'null' || typeof powerArr[i] === 'undefined'){
                    powerArr.splice(i,1)
                    i--
                }
            }
            // let indexArr = powerArr.findIndex(item => item === null || item === 'null' || typeof item === 'undefined')
            // if(indexArr.length)
            // indexArr.forEach((item,index) => {
            //     if(item === true){
            //         powerArr.splice(index,1)
            //     }
            // })
            await this.zjControl.update && this.zjControl.update({
                operationType,
                roleId: this.currentId,
                powerCodeList:powerArr
            }).then(() => {
                this.sysRolePowerList = currentRolePowerList
                this.$Message.success('更新成功')
                // this.$message({
                //     message: '更新成功',
                //     type: 'success'
                // })
            })
        },
        // 获取增或者删除的权限
        filterArray (arr1, arr2) {
            return arr1.concat(arr2).filter((v, i, arr) => {
                return arr.indexOf(v) === arr.lastIndexOf(v)
            })
        },
        search () {
            this.currentPage = 0
            this.getRoleList(this.searchValue)
        },
        //设置滚动条初始位置
        scrollY(){
            this.$refs.rolePower.scrollTop = '0px'
        }
    },
    mounted(){
        const zjControl = {
            get: this.$api.rolePower.getRolePower,//获取权限列表
            update: this.$api.rolePower.updateRolePower, //更新角色权限
            search: this.$api.rolePower.quertRolePage //角色列表查询
        }
        this.zjControl = zjControl
      this.getApi()
        this.getRoleList()
        this.getList()
        this.scrollY()
    }
}
