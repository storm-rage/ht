<template>
  <zj-content-container>
    <ZjTopHeader>贸易关系详情</ZjTopHeader>

    <info />

    <ZjContentFooter>
        <zj-button @click="goback()">返回</zj-button>
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
  methods:{
    goback(){
      this.$router.go(-1)
    }
  }
};
</script>

<style lang="less" scoped>
</style>