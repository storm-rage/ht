<template>
<el-dialog
  class="forgotPassword-editPhone header"
  :visible.sync="show"
  width="400px"
  center
  :close-on-click-modal="false"
  @close="close"
  :title=" type === 'success' ? '修改成功' :'温馨提示'"
  :class="type === 'success' ? 'success-dialog' : 'warning-dialog' "
>
  <div class="body-box">
    <el-row>
      <el-col :span="6">
        <i class="el-icon-info fs70" style="color: #D3B366" v-show="type !== 'success' "/>
        <i class="el-icon-success zj-f-s-50" style="color: #92B676" v-show="type === 'success' "/>
      </el-col>

      <!-- 忘记手机号 -->
      <el-col :span="18" v-show="type === 'phone'">
        <div>
          <el-row class="zj-fw-b">如果您的手机号发生变更，请下载：</el-row>
          <el-row class="zj-m-b-15">
            <span class="primary pointer" @click="down">{{detailData.fileName}}</span>
          </el-row>
          <el-row class="zj-fw-b">填写完毕后，请发送至邮箱：</el-row>
          <el-row class="zj-m-b-15 td-u">{{detailData.email}}</el-row>
        </div>
      </el-col>
      <!-- 忘记登录名 -->
      <el-col :span="18" v-show="type === 'login'">
        <div>
          <el-row class="zj-fw-b">已将登录名发送至您的邮箱：</el-row>
          <el-row class="zj-m-b-15">
            <span class="primary pointer">{{userEmail}}</span>
          </el-row>
          <el-row class="zj-fw-b zj-m-b-15">请前往邮箱登录后查看</el-row>
        </div>
      </el-col>
      <!-- 修改成功 -->
      <el-col :span="18" v-show="type === 'success'">
        <div class="zj-f-s-16 lh-50">恭喜您！账号密码修改成功!</div>
      </el-col>

      <el-col :span="24" class="ta-c zj-p-t-20">
        <!-- 忘记系列 -->
        <el-row class="checkI" v-show="type !== 'success' ">如有疑问，请联系客服：{{detailData.telPhone}}</el-row>
        <!-- 成功系列 -->
        <el-row v-show="type === 'success' " class="w125">
          <zj-button status="success" @click="$router.push({name:'login'})">去首页登录</zj-button>
        </el-row>
      </el-col>
    </el-row>
  </div>
</el-dialog>
</template>

<script>
    export default {
        name: "editPhone",
        props:{
          detailData:Object
        },
        data(){
          return {
            show:false,
            type:'phone',
            userEmail:'',//用户邮箱
          }
        },
        methods:{
          //打开
          open(type,userEmail){
            this.type = type
            this.userEmail = userEmail
            this.show = true
          },
          //下载
          down(){
            let {fileName,fileUrl,fileId} = this.detailData
            let params = {
              fileName,fileUrl,fileId
            }
            this.$api.baseCommon.downloadFile(params)
          },
          //关闭
          close(){
            this.show = false
          }
        }
    }
</script>

<style lang="less">
.success-dialog{
  .el-dialog__header{
    background-color: #92B676!important;
  }
}
.warning-dialog{
  .el-dialog__header{
    background-color: #D3B366!important;
  }
}


.forgotPassword-editPhone{
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
    /*padding-bottom: 50px;*/
    .body-box{
      .checkI{
        color: #95A9BE;
      }
    }
  }
}
</style>
