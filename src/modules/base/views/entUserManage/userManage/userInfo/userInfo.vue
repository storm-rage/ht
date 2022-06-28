<template>
<div class="userManage-userInfo">
  <div class="zj-search-condition">
    <el-row class="quick-row border-bottom">
      <zj-quick-query ref="quickQuery"
                      @search="search"
                      :start.sync="searchForm.createDateStart"
                      :end.sync="searchForm.createDateEnd"
      />
    </el-row>
    <el-row class="button-row">
      <zj-button class="append" icon="el-icon-circle-plus-outline" @click="addUser" :api="uBtn.uAddUser">新增</zj-button>
      <zj-button class="export" icon="iconfont icon-daochu" @click="exportData" :api="uBtn.uExportUsers">导出数据</zj-button>
      <zj-button class="reset" icon="el-icon-refresh" @click="resetSearch">重置</zj-button>
      <zj-button class="search" icon="el-icon-search" @click="search">查询</zj-button>
    </el-row>
    <el-form ref="searchForm"  class="search-form">
      <el-form-item label="企业名称：">
        <el-input v-model="searchForm.entNameLike" @keyup.enter.native="enterSearch"/>
      </el-form-item>
      <el-form-item label="用户名：" class="col-center">
        <el-input v-model="searchForm.loginNameLike" @keyup.enter.native="enterSearch"/>
      </el-form-item>
      <el-form-item label="新增日期：" class="col-right">
        <zj-date-range-picker
          @startChange="$refs.quickQuery.queryIndex = 0"
          @endChange="$refs.quickQuery.queryIndex = 0"
          :startDate.sync="searchForm.createDateStart"
          :endDate.sync="searchForm.createDateEnd"
        />
      </el-form-item>
      <el-form-item label="手机号码：">
        <el-input v-model="searchForm.mobileNo" @keyup.enter.native="enterSearch"/>
      </el-form-item>
      <el-form-item label="姓名：" class="col-center">
        <el-input v-model="searchForm.userNameLike" @keyup.enter.native="enterSearch"/>
      </el-form-item>
      <el-form-item label="证件号码：" class="col-right">
        <el-input v-model="searchForm.certNo" @keyup.enter.native="enterSearch"/>
      </el-form-item>
    </el-form>
  </div>
  <div class="zj-search-response">
    <zj-table
      ref="searchTable"
      :params="searchForm"
      :api="zjControl.uTableApi"
    >
      <zj-table-column field="entName" title="企业名称"/>
      <zj-table-column field="loginName" title="用户名"/>
      <zj-table-column field="userName" title="用户姓名"/>
      <zj-table-column field="mobileNo" title="手机号码"/>
      <zj-table-column field="createDate" title="新增日期"/>
      <zj-table-column field="userState" title="当前状态" :formatter="(obj)=> typeMap(uDictionary.userState,obj.cellValue)"/>
      <zj-table-column field="roleNames" title="角色"/>
      <zj-table-column title="联网核查" v-if="uDictionary.isIdCheck === '1'">
        <template v-slot="{row}">
          <zj-button type="text" @click="verification(row)" :api="uBtn.uValidateMobileRealName">联网核查</zj-button>
        </template>
      </zj-table-column>
      <zj-table-column title="操作" fixed="right">
        <template v-slot="{row}">
          <zj-button type="text" @click="goChild('userManageMag',row)" :api="uBtn.uUpdateUser">管理</zj-button>
          <zj-button type="text" @click="makeCertKey(row)" v-if="row.keyFlag" :api="uBtn.uMakeCertKey">制key</zj-button>
          <zj-button type="text" @click="goChild('userManageDetail',row)" :api="uBtn.uGetUserInformationDetail">详情</zj-button>
        </template>
      </zj-table-column>
    </zj-table>
  </div>
      <!--  新增  -->
      <add-edit-user ref="addEditUser" :uDictionary="uDictionary" @showIndex="addSuccess" />
</div>
</template>

<script>
    import addEditUser from './components/addEdit/AddEditUser.vue'
    export default {
        name: "userInfo",
        components:{
          addEditUser
        },
        props:{
          zjControl: Object,
          uDictionary:Object,
          uBtn:Object
        },
        data(){
          return{
            searchForm:{
              entNameLike:'',//企业名称
              loginNameLike:'',//用户名
              createDateStart:'',//新增日期开始
              createDateEnd:'',//新增日期结束
              mobileNo:'',//手机号码
              userNameLike:'',//姓名
              certNo:'',//证件号码
            },
          }
        },
        methods:{
          //查询之前
          beforeSearch(){
            this.$refs.quickQuery.editDate()
          },
          //重置之前
          beforeResetSearch(){
            this.$refs.quickQuery.editDate()
          },
          //新增用户
          addUser(){
            this.$refs.addEditUser.open(true) //显示
          },
          //新增完成
          addSuccess(boo){
            boo ? this.resetSearch() : this.search()
          },
          // 导出数据
          exportData(){
            this.zjControl.uExportUsers(this.searchForm)
          },
          //联网核查
          verification(row){
            this.$messageBox({
              type:'confirm',
              title:`核查确认`,
              content:`确定为 企业：${row.entName}，用户名：${row.loginName}  进行联网核查吗？`,
              showCancelButton:true,
              messageResolve:()=>{
                let params = {
                  id:row.id
                }
                this.zjControl.uValidateMobileRealName(params).then(()=>{
                  this.$Message.success('联网核查成功！')
                  this.search(false)
                })
              }
            })
          },
          //制key
          makeCertKey(row){
            this.$messageBox({
              type:'confirm',
              title:`制key确认`,
              content:`${ row.certType === '1'
                ? '确认后将为用户：'+ row.userName + '  -  制作硬key'
                : '确认后将为用户：'+ row.userName + '  -  绑定云证书'
              }`,
              showCancelButton:true,
              messageResolve:()=>{
                if(row.certType === '1'){
                  let paramsKey = {
                    userId:row.id,
                    p10:''
                  }
                  this.zjControl.uMakeCertKey(paramsKey).then(() => {
                    this.$Message.success(`已为用户：${row.userName}  -  制Key成功`)
                    this.search(false)
                  })
                }
                else if(row.certType === '2'){
                  let paramsClound = {
                    entId:row.entId,
                    userId:row.id
                  }
                  this.zjControl.uBindCloudCerUser(paramsClound).then(() => {
                    this.$Message.success(`已为用户：${row.userName}  -  绑定云证书成功！`)
                    this.search(false)
                  })
                }
              }
            })

          }
        },
    }
</script>

<style scoped>

</style>
