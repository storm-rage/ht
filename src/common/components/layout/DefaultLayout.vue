<template>
  <div class="layout">
    <el-container style="height: 100%">
      <div class="zj-main">
        <transition name="fade-transform" mode="out-in">
          <router-view class="router-view"></router-view>
        </transition>
      </div>
    </el-container>
  </div>
</template>
<script>
export default {
  name: 'DefaultLayout'
};
</script>
<style lang="less" scoped>
.layout {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #EFF3F6;
  overflow: hidden;
  .zj-main{
    min-width: 830px;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: #eff3f6;
    /*background: white;*/
    padding: 15px;
    >div{
      width: 100%;
      height: 100%;
      padding-bottom: 50px;
      background-color: white;
      overflow-y: auto;
    }
    .router-view{
      word-wrap:break-word;
      word-break:keep-all;
    }
  }
}
</style>
