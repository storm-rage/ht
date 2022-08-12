<template>
  <ve-histogram
    :loading="loading"
    :data-empty="!chartData.rows.length"
    :height="height"
    :data="chartData"
    :extend="chartExtend"
    :settings="chartSetting"
    :legend-visible="false"
  ></ve-histogram>
</template>
<script>
import VeHistogram from 'v-charts/lib/histogram.common.min'
import echarts from 'echarts/lib/echarts'
import 'v-charts/lib/style.min.css'
export default {
  components: {
    VeHistogram
  },
  props: {
    title: String,
    height: String,
    extendConfig: Object,
    dataList: Array
  },
  data () {
    this.chartSetting = {
      labelMap: {
        amt: '签发凭证总金额'
      },
      label: {
        show: true,
        position: 'top',
        distance: 1
      },
      yAxisName: ['单位：万元'],
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#165DFF' },
            { offset: 1, color: '#3196FF' }
          ])
        }
      }
    }
    this.chartExtend = {
      ...this.extendConfig,
      ...{
        barWidth: '12',
        tooltip: {
          formatter: '{b0}月<br /><p style="text-indent: 2em;">{a0}: {c0}</p>'
        }
      }
    }
    return {
      loading: false,
      chartData: {
        columns: ['month', 'amt'],
        rows: []
      }
    }
  },
  watch: {
    dataList: {
      handler (val) {
        this.chartData.rows = val
      },
      deep: true,
      immediate: true
    }
  }
}
</script>
