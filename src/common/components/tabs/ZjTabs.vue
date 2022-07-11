<template>
  <el-tabs v-bind="$attrs"
           v-on="$listeners"
           type="card"
           class="zj-tabs-card">
    <slot></slot>
  </el-tabs>
</template>

<script>
export default {
  name: "ZjTabs",
}
</script>
<style lang="less">

</style>
