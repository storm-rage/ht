<template>
  <home-content-block class="home-content-charts">
    <!--  供应商    -->
    <gys-charts v-if="currentEnt==='2'" :title="title" :height="height" :extendConfig="extendConfig"></gys-charts>
    <!--  核心企业    -->
    <hx-charts v-if="currentEnt==='1'" :title="title" :height="height" :extendConfig="extendConfig"></hx-charts>
    <!--  保理    -->
    <yy-charts v-if="currentEnt==='3'" :title="title" :height="height" :extendConfig="extendConfig"></yy-charts>
  </home-content-block>
</template>
<script>
import HomeContentBlock from '../../components/homeContentBlock';
import GysCharts from './gysCharts';
import HxCharts from './hxCharts';
import YyCharts from './yyCharts';
export default {
  components: {
    HomeContentBlock,
    GysCharts,
    HxCharts,
    YyCharts
  },
  data () {
    return {
      currentEnt: '3',
      title: '数据展示',
      height: '280px',
      extendConfig: {
        grid: {
          left: '1%',
          right: '1%',
          bottom: '1%'
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.home-content-charts {
  height: 100%;
}
</style>
