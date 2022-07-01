<template>
  <span class="header-left-tip"><i style="color:#F18C3C;margin-right: 5px;" class="el-icon-info"></i>{{text}}</span>
</template>
<script>
export default {
  name: 'ZjContentTip',
  props: {
    text:String
  }
}
</script>
<style lang="less" scoped>
.header-left-tip {
  background: rgba(250,171,12,0.20);
  border-radius: 2px;
  font-size: 12px;
  padding: 4px 25px 4px 16px;
  color: #909399;
  min-width: 300px;
  font-weight: normal;
}
</style>
