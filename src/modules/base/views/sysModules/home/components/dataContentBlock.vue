<template>
  <div class="data-content-block">
    <div class="content-block">
      <slot></slot>
    </div>
  </div>
</template>
<script>
/**
 * 数据驾驶舱内容块
 */
export default {};
</script>
<style lang="less" scoped>
@import "~@assets/less/variables";
.data-content-block {
  background-color: #FFF;
  border: 1px solid #BBDEFE;
  border-radius: 8px;
  padding: 4px;
  max-width: 400px;
  margin-top: 20px;
  .content-block {
    background-image: linear-gradient(0deg,#FFFFFF 0%,#E8F4FF 100%);
    border-radius: 4px;
    padding: 20px;
    max-width: 400px;
    .title {
      font-weight: bold;
      font-size: 16px;
      color: #303133;
      margin-bottom: 20px;
    }
    .item {
      font-weight: 400;
      font-size: 14px;
      display: flex;
      .left-text {
        color: #606266;
      }
      .left-num {
        margin-left: 12px;
      }
      .num-red-cl {
        color: @danger-color;
      }
      .right-content {
        text-align: right;
        width: 100px;
        flex: auto;
      }
    }
    .item+.item {
      margin-top: 10px;
    }
  }

}
</style>
