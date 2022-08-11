<template>
  <div class="ht-login-footer">
    <div class="content">
      <span>关于</span>
      <div>|</div>
      <span>帮助中心</span>
      <div>|</div>
      <span>公司主页</span>
      <div>|</div>
      <span>联系我们</span>
    </div>
    <div class="bottom">@2021 海天</div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
.ht-login-footer {
  background: #EDF4FB;
  .content {
    width: 100%;
    padding: 20px 10%;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    span{
      font-size: 16px;
      color:#303133;
    }
    div{
      color: #DCDFE6;
    }
  }
  .bottom {
    width: 100%;
    font-size: 14px;
    color: #909399;
    text-align: center;
    padding-bottom: 20px;
  }
}
</style>
