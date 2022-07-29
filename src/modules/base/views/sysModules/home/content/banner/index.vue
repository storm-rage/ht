<template>
  <home-content-block class="home-content-banner">
    <el-carousel height="100%" :autoplay="false" arrow="never" indicator-position="none">
      <el-carousel-item>
        <img src="@assets/img/home/dataDriver/banner_bg.png" alt="图片丢失了" style="width: 100%;height: 100%">
      </el-carousel-item>
    </el-carousel>
    <div class="content">
      <header class="title">供应链金融平台</header>
      <div class="text">金融信息安、工作高效协同的一站式金融管理</div>
    </div>
  </home-content-block>
</template>
<script>
/**
 * 广告位
 */
import HomeContentBlock from '../../components/homeContentBlock';
export default {
  components: {
    HomeContentBlock
  },
  data() {
    return {
      // bannerList: ['1']
    };
  },
}
</script>
<style lang="less" scoped>
.home-content-banner {
  padding: 0;
  height: 100%;
  position: relative;
  .el-carousel {
    height: 100%;
  }
  .content {
    position: absolute;
    top: 30px;
    left: 33px;
    z-index: 10;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content:center;
    color: #293D57;
    .title {
      font-weight: bold;
      font-size: 60px;
    }
    .text {
      font-weight: 400;
      font-size: 24px;
      margin-top: 15px;
    }
  }
}
</style>
