<template>
  <span class="header-left-tip" :style="{backgroundColor}"><slot><i style="color:#F18C3C;margin-right: 5px;" class="el-icon-info"></i>{{text}}</slot></span>
</template>
<script>
export default {
  name: 'ZjContentTip',
  props: {
    text:String,
    backgroundColor: {
      type: String,
      default: 'rgba(250,171,12,0.20)'
    }
  }
}
</script>
<style lang="less" scoped>
.header-left-tip {
  border-radius: 2px;
  font-size: 12px;
  padding: 4px 25px 4px 16px;
  color: #909399;
  min-width: 300px;
  font-weight: normal;
}
</style>
