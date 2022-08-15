<template>
  <ve-bar
    :loading="loading"
    :data-empty="!chartData.rows.length"
    :height="height"
    :data="chartData"
    :extend="chartExtend"
    :settings="chartSetting"
    :legend-visible="false"
  ></ve-bar>
</template>
<script>
import VeBar from 'v-charts/lib/bar.common.min'
import echarts from 'echarts/lib/echarts'
import 'v-charts/lib/style.min.css'
export default {
  components: {
    VeBar
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
        amt: '融资金额'
      },
      label: {
        show: true,
        position: 'right',
        formatter: rows => {
          return this.chartData.rows[rows.dataIndex].percentage + '%'
        }
      },
      // xAxisName: ['单位：万元'],
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
      grid: {
        left: '1%',
        top: '10%',
        right: '15%',
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
      },
      xAxis: {
        show: false
      },
      yAxis: {
        axisLine: {
          show: true,
          lineStyle: {
            color: '#d9d9d9'
          }
        },
        axisLabel: {
          color: '#5f5f5f',
          // formatter: params => {
          //   var newParamsName = '' // 最终拼接成的字符串
          //   var paramsNameNumber = params.length // 实际标签的个数
          //   var provideNumber = 4 // 每行能显示的字的个数
          //   var rowNumber = Math.ceil(paramsNameNumber / provideNumber) // 换行的话，需要显示几行，向上取整
          //   /**
          //    * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
          //    */
          //   // 条件等同于rowNumber>1
          //   if (paramsNameNumber > provideNumber) {
          //     /** 循环每一行,p表示行 */
          //     for (var p = 0; p < rowNumber; p++) {
          //       var tempStr = '' // 表示每一次截取的字符串
          //       var start = p * provideNumber // 开始截取的位置
          //       var end = start + provideNumber // 结束截取的位置
          //       // 此处特殊处理最后一行的索引值
          //       if (p == rowNumber - 1) {
          //         // 最后一次不换行
          //         tempStr = params.substring(start, paramsNameNumber)
          //       } else {
          //         // 每一次拼接字符串并换行
          //         tempStr = params.substring(start, end) + '\n'
          //       }
          //       newParamsName += tempStr // 最终拼成的字符串
          //     }
          //   } else {
          //     // 将旧标签的值赋给新标签
          //     newParamsName = params
          //   }
          //   //将最终的字符串返回
          //   return newParamsName
          // }
        }
      },
      barWidth: '12'
    }
    return {
      loading: false,
      chartData: {
        columns: ['entName', 'amt'],
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
