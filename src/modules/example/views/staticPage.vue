<template>
<div id="whl_xzw-staticPage">
  <zj-fold :row="3">
    <el-row>
      <zj-fold-item>
        123
      </zj-fold-item>
    </el-row>
  </zj-fold>
</div>
</template>

<script>
    import ZjFold from "@pubComponent/fold/ZjFold";
    import ZjFoldItem from "@pubComponent/fold/ZjFoldItem";
    export default {
        name: "staticPage",
        components: {ZjFold,ZjFoldItem}
    }
</script>

<style lang="less">
#whl_xzw-staticPage{

}
</style>
