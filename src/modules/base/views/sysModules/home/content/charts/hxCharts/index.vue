<template>
  <div>
    <zj-header :title="title"></zj-header>
    <ve-histogram
      :loading="loading"
      :data-empty="!chartData.rows.length"
      :height="height"
      :data="chartData"
      :extend="chartExtend"
      :settings="chartSetting"
      :legend-visible="false"
    ></ve-histogram>
  </div>
</template>
<script>
import VeHistogram from 'v-charts/lib/histogram.common.min'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/component/title'
import 'v-charts/lib/style.min.css'
export default {
  components: {
    VeHistogram
  },
  props: {
    title: String,
    height: String,
    extendConfig: Object
  },
  data () {
    this.chartSetting = {
      labelMap: {
        amt: '签发凭证总金额'
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
      title: {
        text: '签发凭证总金额',
        left: 'center'
      }
    }
    return {
      loading: false,
      zjControl: {
        getPayableIssuanceAmt: this.$api.home.getPayableIssuanceAmt
      },
      chartData: {
        columns: ['month', 'amt'],
        rows: []
      }
    }
  },
  created () {
    // this.getApi()
    this.getData()
  },
  methods: {
    getData () {
      this.loading = true
      this.zjControl
        .getPayableIssuanceAmt()
        .then(res => {
          this.loading = false
          this.dataList = res.data.payableIssuanceMonths || []
        })
        .catch(err => {
          this.loading = false
        })
    }
  }
}
</script>
