<template>
  <span class="text-link">{{text}}</span>
</template>
<script>
/**
 * 文件链接
 */
export default {
  props: {
    text:String
  }
}
</script>
<style lang="less" scoped>
@import "~@assets/less/variables";
.text-link {
  font-size: 14px;
  font-weight: 400;
  color: @primary-main-color;
  cursor: pointer;
  &:hover{
    opacity: .8;
  }
}
</style>
