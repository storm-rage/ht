<template>
<div class="userManage-userInfo">
  <div class="zj-search-condition">
    <el-row class="button-row">
      <zj-button class="reset" icon="el-icon-refresh" @click="resetSearch">重置</zj-button>
      <zj-button class="search" icon="el-icon-search" @click="search">查询</zj-button>
    </el-row>
    <el-form ref="searchForm">
      <el-form-item label="企业名称：">
        <el-input v-model="searchForm.entNameLike" @keyup.enter.native="enterSearch"/>
      </el-form-item>
      <el-form-item label="用户名：" class="col-center">
        <el-input v-model="searchForm.loginNameLike" @keyup.enter.native="enterSearch"/>
      </el-form-item>
      <el-form-item label="维护日期：" class="col-right">
        <zj-date-range-picker
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
      :api="zjControl.mTableApi"
    >
      <zj-table-column field="entName" title="企业名称"/>
      <zj-table-column field="loginName" title="用户名"/>
      <zj-table-column field="userName" title="用户姓名"/>
      <zj-table-column field="mobileNo" title="手机号码"/>
      <zj-table-column field="email" title="邮箱"/>
      <zj-table-column field="roleNames" title="角色"/>
      <zj-table-column field="certType" title="证件类型" :formatter="(obj)=> typeMap(mDictionary.certType,obj.cellValue)"/>
      <zj-table-column field="certNo" title="证件号码"/>
      <zj-table-column title="证件有效期">
        <template v-slot="{row}">
          {{ row.certStartDate || '-'}} 至 {{ row.certEndDate || '-'}}
        </template>
      </zj-table-column>
      <zj-table-column field="certFileName" title="证件附件">
        <template v-slot="{row}">
          <span class="td-u pointer primary" @click="certDown(row)">{{row.certFileName}}</span>
        </template>
      </zj-table-column>
      <zj-table-column field="createDatetime" title="维护日期"/>
      <zj-table-column field="operType" title="维护类型" :formatter="(obj)=> typeMap(mDictionary.operType,obj.cellValue)"/>
    </zj-table>
  </div>
</div>
</template>

<script>
    export default {
        name: "maintainRecord",
        props:{
          zjControl:Object,
          mDictionary:Object
        },
        data(){
          return {
            searchForm:{
              entNameLike:'',//企业名称
              loginNameLike:'',//用户名
              createDateStart:'',//维护日期起
              createDateEnd:'',//维护日期止
              mobileNo:'',//手机号码
              userNameLike:'',//姓名
              certNo:'',//证件号码
            },
          }
        },
        methods:{
          //证件附件下载
          certDown(row){
            let params = {
              fileId:row.certFileId,
              fileUrl:row.certFileId,
              fileName:row.certFileName
            }
            this.$api.baseCommon.downloadFile(params)
          }
        },
    }
</script>

<style scoped>

</style>
