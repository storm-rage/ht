<template>
  <div class="zj-main" :class="{
      'detailContent': detailClass,
      'noPadding':$route.name === 'myBasicInformation' || $route.name === 'myBillingInformation'
  }">
    <transition name="fade-transform" mode="out-in">
      <keep-alive>
        <router-view class="router-view" v-if="$route.meta.keepAlive" :key="key">{{key}}</router-view>
      </keep-alive>
    </transition>
    <transition name="fade-transform" mode="out-in">
      <router-view class="router-view" v-if="!$route.meta.keepAlive"></router-view>
    </transition>


  </div>
</template>

<script>
export default {
  name: 'AppMain',
  data () {
    return {
      detailClass: false
    }
  },
  computed: {
    key() {
      let key = this.$route.name + '_' + this.$route.meta.refreshIndex
      return key
    },
  },
  watch: {
    '$route':{
        deep:true,
        handler(val){
          if (val.meta.tagName === 'detail') {
            this.detailClass = true
          } else {
            this.detailClass = false
          }
        }
    }
  },
  created() {
    if (this.$route.meta.tagName === 'detail') {
      this.detailClass = true
    } else {
      this.detailClass = false
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
      &.noPadding{
        padding: 0;
      }
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
