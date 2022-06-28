<template>
<el-dialog
  class="home-signAgree"
  :visible.sync="show"
  width="400px"
  center
  :close-on-click-modal="false"
  @close="close"
  title="温馨提醒"
>
  <div class="body-box">
    <el-row>
      <el-col :span="5">
        <i class="el-icon-info zj-f-s-60" style="color: #D3B366"/>
      </el-col>
      <el-col :span="19">
        您的中信银行《资金登记簿开通申请书》尚未签署，为避免影响您的正常业务，请及时在
        <zj-button type="text" @click="goParent('agreementManage')">“协议签署”</zj-button>
        功能中进行签署
      </el-col>
    </el-row>
    <el-row class="ta-c w100 zj-p-t-15">
      <zj-button status="info" @click="close">下次再说</zj-button>
      <zj-button status="primary" @click="signed">现在去签署</zj-button>
    </el-row>
  </div>
</el-dialog>
</template>

<script>
    export default {
        name: "signAgree",
        data(){
          return {
            show:false,
          }
        },
        methods:{
          open(){
            this.show = true
          },
          close(){
            this.show = false
              this.$store.dispatch('user/closeUserSignZJDJBFlag')
          },
          signed(){
            this.goParent('agreementManage')
            this.close()
          }
        }
    }
</script>

<style lang="less">
.home-signAgree{
  .el-dialog--center{
    border:none!important;
  }
  .el-dialog__header{
    padding:8px 0;
    text-align: left;
    text-indent: 1em;
    font-weight: bold;
    background-color: rgba(20, 130, 240, 0.51);
    .el-dialog__title{
      font-size: 16px;
      color: white;
    }
    .el-dialog__headerbtn{
      top: 10px;
      i{
        color: white;
        font-weight: bold;
      }
    }
  }
  .el-dialog__body{
    padding-bottom: 30px;
  }
}
</style>
