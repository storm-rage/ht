<template>
  <div class="zj-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :max="10" :include="includeRules">
        <router-view class="router-view" :key="key">{{key}}</router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.name + '_' + this.$store.state.tab.currentRouteIndex
    },
    includeRules () {
      return this.$store.state.tab.cachedName;
    }
  }
}
</script>

<style lang="less" scoped>
  .zj-main{
      min-width: 830px;
      width: 100%;
      height: 100%;
      overflow: auto;
      background-color: #eff3f6;
      /*background: white;*/
      padding: 15px;
      >div{
        width: 100%;
        height: 100%;
        padding-bottom: 50px;
        background-color: white;
        overflow-y: auto;
      }
    .router-view{
      word-wrap:break-word;
      word-break:keep-all;
    }
  }
</style>
