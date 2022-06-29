<template>
<el-row :class="[`zj-${direction}`,fixedBottom?'fixed-footer-btns':'']">
  <slot></slot>
</el-row>
</template>

<script>
export default {
  name: 'ZjContentFooter',
  props: {
    //方向，center-居中，right-居右，left-居左
    direction: {
      type: String,
      default: 'center'
    },
    //是否固定底部
    fixedBottom: {
      type: Boolean,
      default: true
    }
  }
}
</script>

