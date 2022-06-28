<template>
<!-- 我的企业用户 -->
<div id="myBusinessUsers" class="content-wrap">
  <zj-table
    class="zj-search-table"
    :api="zjControl.queryEntUsersInfoPage"
    :params="{}"
    stripe
  >
    <zj-table-column field="userName" title="姓名"/>
    <zj-table-column field="certType" title="证件类型"/>
    <zj-table-column field="certNo" title="证件号码"/>
    <zj-table-column field="loginName" title="用户名"/>
    <zj-table-column field="roleName" title="角色"/>
    <zj-table-column field="mobileNo" title="手机号码"/>
    <zj-table-column field="state" title="用户状态"/>
    <!-- :formatter="(obj) => typeMap(dictionary,obj.cellValue)" -->
  </zj-table>
</div>
</template>

<script>
    export default {
        name: "myBusinessUsers",
        data(){
          return{
            zjControl:{
              queryEntUsersInfoPage:this.$api.myBasicInformation.queryEntUsersInfoPage,//登陆企业下的所有操作用户信息
            }
          }
        }
    }
</script>

<style lang="less">
#myBusinessUsers{

}
</style>
