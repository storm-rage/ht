<template>
  <div class="zj-content-block">
   <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'ZjContentBlock'
}
</script>
<style lang="less" scoped>
.zj-content-block{
  padding: 12px;
  background-color: #FFFFFF;
  border-radius: 4px;
}
</style>
