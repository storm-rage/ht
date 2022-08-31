<template>
  <div class="home-content">
    <el-row :gutter="15" type="flex">
      <el-col :span="14">
        <home-banner style="height: 350px;"></home-banner>
        <!-- <home-charts></home-charts> -->
      </el-col>
      <el-col :span="10">
        <home-notice class="home-content-notice"></home-notice>
        <!-- <home-message class="home-content-message" style="margin-top: 15px"></home-message> -->
      </el-col>
    </el-row>
    <el-row :gutter="15" type="flex" style="margin-top: 15px;">
      <el-col :span="14">
        <home-todo></home-todo>
      </el-col>
      <el-col :span="10">
        <home-message class="home-content-message"></home-message>
      </el-col>
    </el-row>
    <!-- <el-row class="zj-m-t-15" :gutter="15" type="flex"> -->
      <!-- <el-col :span="8">
        <data-driver></data-driver>
      </el-col> -->
      <!-- 去除数据仓 span 调整为16，原8 -->
      <!-- <el-col :span="16"> 
        <home-charts></home-charts>
      </el-col>
      <el-col :span="8">
        <home-todo></home-todo>
      </el-col> -->
    <!-- </el-row> -->
  </div>
</template>
<script>
// import DataDriver from './dataDriver/index'
import HomeNotice from './notice';
import HomeTodo from './todo';
import HomeMessage from './message'
import HomeBanner from './banner'
// import HomeCharts from './charts';
export default {
  components: {
    // DataDriver,
    HomeNotice,
    HomeTodo,
    HomeMessage,
    HomeBanner,
    // HomeCharts
  }
}
</script>
<style lang="less" scoped>
.home-content {
  padding: 15px 20px;
}
.home-content-notice,.home-content-message {
  // max-height: 206px;
  min-height: 200px;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
// @media screen and (max-height: 1080px) {
//     .home-content-notice,.home-content-message {
//         max-height: 206px; // 250 -44
//     }
// }
// @media screen and (max-height: 1050px) {
//     .home-content-notice,.home-content-message {
//         max-height: 190px;  // 234 - 44
//     }
// }
// @media screen and (max-height: 900px) {
//     .home-content-notice,.home-content-message {
//         max-height: 116px; // 160 - 44
//     }
// }
// @media screen and (max-height: 768px) {
//     .home-content-notice,.home-content-message {
//         max-height: 132px;
//     }
// }
</style>
