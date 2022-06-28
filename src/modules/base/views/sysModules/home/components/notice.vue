<template>
<el-dialog
    class="home-notice"
    :visible.sync="show"
    width="900px"
    center
    :close-on-click-modal="false"
    @close="show = false">

    <!-- title -->
    <template slot="title">
      <el-row class="ta-r zj-m-r-40">
        <zj-button type="text" @click="noHint">不再提示</zj-button>
      </el-row>
    </template>

    <!-- body -->
    <div class="home-notice_body">

    </div>

</el-dialog>
</template>

<script>
    export default {
        name: "notice",
        data(){
          return{
            show:false
          }
        },
        methods:{
          //不再提示
          noHint(){
            console.log('发送不再提示请求')

            this.show = false
          },
        }
    }
</script>

<style lang="less">
.home-notice{
  //关闭按钮 X
  .el-dialog__close{
    font-weight: bold;
  }
  //内容区body
  .home-notice_body{

  }
}
</style>
