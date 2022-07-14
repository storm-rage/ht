<template>
  <home-content-block class="home-content-banner">
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
  }
}
</script>
<style lang="less" scoped>
.home-content-banner {
  padding-left: 30px;
  height: 100%;
  background-image: url("~@assets/img/home/dataDriver/banner_bg.png");
  background-repeat: no-repeat;
  background-position: 100% 100%;
  .content {
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
