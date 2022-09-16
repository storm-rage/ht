<template>
  <div class="ht-login-header">
    <div class="login-img">
      <img class="top-img" src="@assets/img/layout/Logo2.png">
    </div>
    <div class="login-title">海云信平台</div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
.ht-login-header {
  display: flex;
  justify-content: center;
  align-items: center;
  .login-img {
    .top-img {
      width: 59px;
      height: 59px;
    }
  }
  .login-title {
    font-weight: Bold;
    font-size: 28px;
    color: #303133;
    margin-left: 20px;
  }
}
</style>
