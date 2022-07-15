<template>
  <zj-content-container>
    <zj-top-header>企业详情</zj-top-header>
    <ent-info />
  </zj-content-container>
</template>

<script>
import entInfo from "./entInfo";
export default {
  components: {
    entInfo,
  },
  data() {
    return {
      zjControl: {},
      detailData: {},
    };
  },
  methods: {
  },
};
</script>

<style scoped>
</style>
