<template>
  <!-- 搜索按钮 -->
  <el-row class="zj-search-header">
    <div class="btnBox">
      <slot ></slot>
    </div>
  </el-row>
</template>

<script>
export default {
  name: "ZjListHeader"
}
</script>
<style lang="less" scoped>
@import "~@assets/less/listLayout/header.less";
</style>
