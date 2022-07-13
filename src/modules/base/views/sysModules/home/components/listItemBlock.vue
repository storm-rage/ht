<template>
  <div class="list-item-block">
    <div class="left-content">
      <slot name="title"></slot>
    </div>
    <div :class="[isRound?'new-tip-round':'new-tip']" v-if="$slots.tip">
      <slot name="tip"></slot>
    </div>
    <div class="right-date">
      <slot name="date"></slot>
    </div>
  </div>
</template>
<script>
/**
 * 公告和消息的列表块
 */
export default {
  props: {
    isRound: {
      type: Boolean,
      default: false
    }
  }
};
</script>
<style lang="less" scoped>
@import "~@assets/less/variables";
.list-item-block {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
  color: #606266;
  cursor: pointer;
  .left-content {
    max-width: 65%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .new-tip {
    background-color: @danger-color;
    border-radius: 2px;
    font-size: 12px;
    color: #fff;
    text-align: center;
    padding: 2px 5px;
    margin-left:5px;
  }
  .new-tip-round {
    border-radius:50px;
    width: 6px;
    height: 6px;
    margin-left:5px;
    background-color: @danger-color;
  }
  .right-date {
    text-align: right;
    width: 100px;
    flex: auto;
  }
}
.list-item-block+.list-item-block {
  margin-top: 15px;
}
</style>
