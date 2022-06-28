<template>
<el-dialog
  id="entManage-orderDialog"
  custom-class="header-shadow"
  title="温馨提示"
  :visible.sync="show"
  width="47%"
  :close-on-click-modal="false"
  @close="close">

  <div class="editMessage">
    <el-row class="weight">如果您正在操作将供应商需要开单，变更完成后，还需要关注以下后续业务操作</el-row>
    <el-row class="weight">一、为该企业用户分配核心企业角色</el-row>
    <el-row class="routerTransfer">
      1）可以直接为该企业用户分配当前核心企业的经办员、复核员角色，
      访问路径：<span @click="transferRouter('sysUser')">企业用户管理→管理→修改个人信息→修改角色</span>
    </el-row>
    <el-row class="routerTransfer">
      2）如果当前系统的经办员角色不满足要求，可以先新增一个核心企业角色，例如：供应商开单角色，为该新角色分配权限&nbsp;
      访问路径：<span @click="transferRouter('rolePower')">设置→项目设置→角色权限设置→新增角色</span>
    </el-row>
    <el-row class="weight">二、为该企业配置开单参数</el-row>
    <el-row class="routerTransfer">访问路径：<span @click="transferRouter('ebBuyerSettingAdd')">设置→开单企业设置→新增</span></el-row>
  </div>

  <div slot="footer" class="ta-c">
    <zj-button status="primary" @click="close">确 定</zj-button>
  </div>
</el-dialog>
</template>

<script>
    export default {
        name: "orderDialog",
        data(){
          return {
            show:false
          }
        },
        methods:{
          open(){
            this.show = true
          },
          close(){
            this.show = false
          },
          transferRouter(name){
            this.close()
            this.$router.push({name})
          }
        }
    }
</script>

<style lang="less">
#entManage-orderDialog{
  .el-dialog{
    min-width: 753px;
  }
  .editMessage{
    padding:0 0 6px 12px;
    font-size: 12px;
    .weight{
      font-weight: 900;
      font-size: 14px;
      padding: 8px 6px 5px;
    }
    a{
      text-decoration: underline;

    }
    .routerTransfer{
      span{
        text-decoration: underline;
        color: #5494f2;
        cursor: pointer;
      }
    }
  }
}
</style>
