<template>
  <div class="zj-content">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'ZjContent'
}
</script>
<style lang="less" scoped>
.zj-content{
  padding: 12px;
  background-color: #FFFFFF;
  border-radius: 4px;
}
</style>
