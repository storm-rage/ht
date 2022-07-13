<template>
  <div class="my-home" style="background: rgba(0,0,0,0)">
   <!-- 顶部   -->
    <home-header></home-header>
    <!-- 广告区域   -->
    <!--  内容区域  -->
    <home-content></home-content>
    <!-- 图标区域   -->
<!--    <home-charts></home-charts>-->
  </div>
</template>

<script>
import HomeHeader from './header/home-header';
import HomeContent from'./content/index';
import HomeCharts from './charts/index'
export default {
  components: {
    HomeHeader,
    HomeContent,
    HomeCharts
  }
}
</script>
<style lang="less" scoped>
.my-home {
  overflow: hidden;
}
</style>
