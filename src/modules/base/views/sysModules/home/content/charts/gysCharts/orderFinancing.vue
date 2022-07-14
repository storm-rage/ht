<template>
  <ve-histogram
    :loading="loading"
    :height="height"
    :data="chartData"
    :extend="chartExtend"
    :settings="chartSetting"
    :legend-visible="false"
    :data-empty="!chartData.rows.length"></ve-histogram>
</template>
<script>
import VeHistogram from 'v-charts/lib/histogram.common.min'
import echarts from 'echarts/lib/echarts';
import 'v-charts/lib/style.min.css'
export default {
  components: {
    VeHistogram
  },
  props: {
    height: String,
    extendConfig: Object
  },
  data () {
    this.chartSetting = {
      labelMap: {
        amount: '订单融资总额'
      },
      yAxisName: ['单位：万元'],
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0,0,0,1,[
            {offset: 0,color:'#165DFF'},
            {offset: 1,color:'#3196FF'}
          ])
        }
      }
    }
    this.chartExtend = {
      ...this.extendConfig
    }
    return {
      loading: false,
      chartData: {
        columns: ['month','amount'],
        rows: [
          {'month': '01','amount': 500},
          {'month': '02','amount': 1500},
          {'month': '03','amount': 2500},
          {'month': '04','amount': 100},
          {'month': '05','amount': 0},
          {'month': '06','amount': 5000},
          {'month': '07','amount': 789},
          {'month': '08','amount':10},
          {'month': '09','amount': 0},
          {'month': '10','amount': 0},
          {'month': '11','amount': 0},
          {'month': '12','amount': 0},
        ]
      }
    }
  }
}
</script>
