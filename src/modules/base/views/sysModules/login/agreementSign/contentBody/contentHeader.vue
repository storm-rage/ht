<template>
  <div class="content-body-center-title">
    <h2>
      <template v-if="isSuccess">
        <img src="~@assets/img/faceRecognition/success.png"/>
        恭喜您！已成功注册！
      </template>
      <template v-else>
        <img src="~@assets/img/faceRecognition/warningRrror.png" style="transform: translateY(0.8vh)"/>
        <span style="color: red">发生错误！请联系管理员！</span>
      </template>
    </h2>
  </div>
</template>
<script>
export default {
  props: {
    isSuccess: {
      type: Boolean,
      default: true
    }
  }
};
</script>
<style lang="less" scoped>
.content-body-center-title {
  text-align: center;
  padding-bottom: 15px;
  h2{
    color: #8ec31f;
    font-weight: normal;
    text-indent: 3px;
    img{
      width: 28px;
      height: 30px;
      padding-top: 2px
    }
  }
  span{
    color: #333;
    display: inline-block;
    padding: 10px 0 15px 0;
  }
}
</style>
