<template>
  <div class="my-home" style="background: rgba(0,0,0,0)">
   <!-- 顶部   -->
    <home-header></home-header>
    <!--  内容区域  -->
    <home-content></home-content>
  </div>
</template>

<script>
import HomeHeader from './header/home-header';
import HomeContent from'./content/index';
export default {
  components: {
    HomeHeader,
    HomeContent
  }
}
</script>
<style lang="less" scoped>
.my-home {
  overflow: hidden;
}
</style>
<style lang="less">
.my-home {
  .zj-header {
    .header-left-title {
      margin-bottom: 12px;
    }
  }
}
</style>
