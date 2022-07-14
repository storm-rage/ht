<template>
  <ve-bar
    :loading="loading"
    :data-empty="!chartData.rows.length"
    :height="height"
    :data="chartData"
    :extend="chartExtend"
    :settings="chartSetting"
    :legend-visible="false" ></ve-bar>
</template>
<script>
import VeBar from 'v-charts/lib/bar.common.min'
import echarts from 'echarts/lib/echarts';
import 'v-charts/lib/style.min.css'
export default {
  components: {
    VeBar
  },
  props: {
    title: String,
    height: String,
    extendConfig: Object
  },
  data () {
    this.chartSetting = {
      labelMap: {
        amount: '融资金额'
      },
      label: {
        show: true,
        position: 'right'
      },
      // xAxisName: ['单位：万元'],
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
      grid: {
        left: '1%',
        top: '10%',
        right: '35px',
        bottom: '1%'
      },
      title: {
        left: 'right',
        subtext: '单位：万元',
        textStyle: {
          fontWeight: 'lighter',
          fontSize: 13,
          height: 0
        }
      }
    }
    return {
      loading: false,
      chartData: {
        columns: ['entName','amount'],
        rows: [
          {'entName': '公司101','amount': 500},
          {'entName': '公司102','amount': 1500},
          {'entName': '公司103','amount': 2500},
          {'entName': '公司104','amount': 100},
          {'entName': '公司105','amount': 0},
          {'entName': '公司106','amount': 5000},
          {'entName': '公司107','amount': 789},
          {'entName': '公司108','amount':10},
        ]
      }
    }
  }
};
</script>
