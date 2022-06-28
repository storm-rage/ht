<template>
<el-dialog
  class="login-frozenDialog header error-dialog"
  :visible.sync="show"
  width="350px"
  center
  :close-on-click-modal="false"
  @close="close"
  title="登录失败"
>
  <div class="body-box">
    <el-row>
      <el-col :span="6">
        <i class="el-icon-warning zj-f-s-60" style="color: #EF6666"/>
      </el-col>
      <el-col :span="18">
        <div>
          <el-row>当前账户是冻结状态，如有疑问</el-row>
          <el-row>请联系客服人员：</el-row>
          <el-row class="zj-m-b-15">
            <span class="primary pointer" >{{phone}}</span>
          </el-row>
        </div>
      </el-col>
      <el-col :span="24" class="ta-c w100">
        <zj-button status="danger" @click="close">确认</zj-button>
      </el-col>
    </el-row>
  </div>
</el-dialog>
</template>

<script>
    export default {
        name: "frozenDialog",
        data(){
          return {
            show:false,
            phone:''
          }
        },
        methods:{
          open(phone){
            this.phone = phone
            this.show = true
          },
          close(){
            this.show = false
            this.$emit('frozenClose')
          }
        }
    }
</script>

<style lang="less">
.error-dialog{
  .el-dialog__header{
    background-color: #EF6666!important;
  }
}
.login-frozenDialog{
  .el-dialog{
    background-color: rgba(0,0,0,0);
    background: none;
  }


  .el-dialog__header{
    border-radius: 12px 12px 0 0;
    background-color: #D3B366;
    .el-dialog__close{
      font-size: 20px;
    }
  }


  .el-dialog__body{
    background-color: white;
    border-radius: 0 0 12px 12px;
    /*padding: 5px 0 0;*/
  }
}
</style>
