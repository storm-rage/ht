<template>
  <div class="zj-top-header" :class="[`zj-${direction}`]">
    <slot>{{title}}</slot>
  </div>
</template>
<script>
export default {
  name: 'ZjTopHeader',
  props:{
    //方向，center-居中，right-居右，left-居左
    direction: {
      type: String,
      default: 'center'
    },
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="less" scoped>
.zj-top-header {
  font-weight: 600;
  font-size: 24px;
  color: #333333;
  letter-spacing: 1px;
}
</style>
