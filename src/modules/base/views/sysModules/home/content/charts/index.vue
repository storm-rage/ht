<template>
  <home-content-block class="home-content-charts">
    <!--  供应商    -->
    <gys-charts
      v-if="entInfo.entType === constEntType.GYS"
      :title="title"
      :height="height"
      :extendConfig="extendConfig"
    ></gys-charts>
    <!--  核心企业    -->
    <hx-charts
      v-if="entInfo.entType === constEntType.HX"
      :title="title"
      :height="height"
      :extendConfig="extendConfig"
    ></hx-charts>
    <!--  保理    -->
    <yy-charts
      v-if="entInfo.entType === constEntType.BL"
      :title="title"
      :height="height"
      :extendConfig="extendConfig"
    ></yy-charts>
  </home-content-block>
</template>
<script>
import { mapState } from 'vuex'
import { EntType } from '@modules/constant'
import HomeContentBlock from '../../components/homeContentBlock'
import GysCharts from './gysCharts'
import HxCharts from './hxCharts'
import YyCharts from './yyCharts'
export default {
  computed: {
    ...mapState({
      entInfo: state => state.enterprise.entInfo
    })
  },
  components: {
    HomeContentBlock,
    GysCharts,
    HxCharts,
    YyCharts
  },
  data () {
    return {
      constEntType: EntType,
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
