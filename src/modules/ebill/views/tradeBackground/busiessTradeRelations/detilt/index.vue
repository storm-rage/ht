<template>
  <zj-content-container>
    <ZjTopHeader>贸易关系详情</ZjTopHeader>

    <info />

    <ZjContentFooter>
        <zj-button>返回</zj-button>
    </ZjContentFooter>
  </zj-content-container>
</template>

<script>
import info from './info'
export default {
  components: {
    info
  },
  data() {
    return {
      searchForm: {},
      zjControl: {},
    };
  },
};
</script>

<style lang="less" scoped>
</style>