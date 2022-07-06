<template>
  <span class="zj-text-tip">{{text}}</span>
</template>
<script>
export default {
  name: 'ZjTextTip',
  props: {
    text: String
  }
}
</script>
<style lang="less" scoped>
.zj-text-tip {
  font-size: 12px;
  color: #909399;
  font-weight: normal;
}
</style>
