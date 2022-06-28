<template>
  <div class="zj-form-block">
    <slot></slot>
  </div>
</template>
<script>
export default {
  data () {
    return {};
  },
  mounted() {
    console.info(this.$el.childNodes);
    const nodeList = this.$el.childNodes;
    const nodeName = nodeList[0].nodeName.toLowerCase();
    if (nodeName === 'form') {
      const nodeChilds = nodeList[0].childNodes;
      console.info(nodeChilds);
    }
  }
};
</script>
<style lang="less" scoped>
 .zj-form-block {}
</style>
