<template>
  <div class="zj-header">
    <h4 class="header-left-title">
      <slot>{{title}}</slot>
      <slot v-if="$slots.tip" name="tip"></slot>
      <span v-if="tipText" class="header-left-tip"><i style="color:#F18C3C;margin-right: 5px;" class="el-icon-info"></i>{{tipText}}</span>
    </h4>
    <div class="zj-header-right" v-if="$slots.right"><slot name="right"></slot></div>
  </div>
</template>
<script>
export default {
  name: 'ZjHeader',
  props: {
    title: {
      type: String,
      default: ''
    },
    //标题字体大小
    size: {
      type: String,
      default: 'normal'
    },
    tipText: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="less" scoped>
@import "~@assets/less/variables";
.zj-header {
  position: relative;
  &::after{
    content: '';
    clear: both;
  }
  .header-left-title {
    font-size: 18px;
    height: 22px;
    line-height: 22px;
    color: #333333;
    border-left: 4px solid @primary-main-color;
    width: 100%;
    padding: 0 10px 5px 10px;
    margin-bottom: 16px;
  }
  .header-left-tip {
    background: rgba(250,171,12,0.20);
    border-radius: 2px;
    margin-left: 43px;
    font-size: 12px;
    padding: 4px 25px 4px 16px;
    color: #909399;
    min-width: 300px;
    font-weight: normal;
  }
  .zj-header-right {
    position: absolute;
    right: 10px;
    top: -3px;
  }
}


</style>
