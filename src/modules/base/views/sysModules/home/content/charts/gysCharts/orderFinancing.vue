<template>
  <ve-histogram
    :loading="loading"
    :height="height"
    :data="chartData"
    :extend="chartExtend"
    :settings="chartSetting"
    :legend-visible="false"
    :data-empty="!chartData.rows.length"
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
    height: String,
    extendConfig: Object,
    dataList: Array,
  },
  data () {
    this.chartSetting = {
      labelMap: {
        amt: '订单融资总额'
      },
      label: {
        show: true,
        position: 'top'
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
        grid: {
          top: '10%',
          right: '0',
          bottom: '0'
        },
        yAxis: {
          axisLine: {
            show: true,
            lineStyle: {
              color: '#d9d9d9'
            }
          },
          axisLabel: {
            color: '#5f5f5f'
          }
        },
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
