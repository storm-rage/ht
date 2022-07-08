<template>
  <!-- 搜索条件 -->
  <div class="zj-search-form" v-if="$slots.searchForm">
    <slot name="searchForm"></slot>
  </div>
</template>

<script>
export default {
  name: "ZjListForm"
}
</script>
<style lang="less" scoped>
@import "~@assets/less/listLayout/searchBody.less";
</style>
