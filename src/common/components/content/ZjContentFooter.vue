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
<style lang="less">
/** 提交区域按钮组 **/
.fixed-footer-btns {
  background-color: #fff;
  box-shadow: 0px -3px 5px #eee;
  position: absolute;
  left: 15px;
  right: 15px;
  bottom: 0;
  z-index: 100;
  padding: 5px 0;
  text-align: center;
  button{
    min-width: 100px;
  }
  .btn-sucess {
    border: 0;
    &.is--disabled {
      background-color: #d4d4d4;
      color: #fff;
      border: #d0d0d0;
      &:hover {
        background-color: #d4d4d4;
        color: #fff;
        border: #d0d0d0;
      }
    }
  }
  .btn-warning {
    &.is--disabled {
      &:hover {
        border: 1px solid #d0d0d0;
        color: #333;
        background-color: #fff;
      }
    }
  }
  //button {
  //  height: 26px!important;
  //  line-height: 25px!important;
  //}
}
</style>

