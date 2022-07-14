<template>
<ve-pie :loading="loading"
        :height="height"
        :data="chartData"
        :settings="chartSetting"
        :legend="{bottom: 0}"
        :data-empty="!chartData.rows.length"></ve-pie>
</template>
<script>
import VePie from 'v-charts/lib/pie.common.min'
import 'v-charts/lib/style.min.css'
export default {
  components: {
    VePie
  },
  props: {
    height: String,
    extendConfig: Object
  },
  data () {
    this.chartSetting = {
      label: {
        position: 'inner',
        formatter: (obj) => {
          const dataIndex = obj.dataIndex;
          const row = this.chartData.rows[dataIndex];
          return `${row.amount},${row.rate}%`
        }
      },
      labelLine: {
        show: false
      },
      offsetY: 120
    }
    this.chartExtend = {
      ...this.extendConfig
    }
    return {
      loading: false,
      chartData: {
        columns: ['label','rate'],
        rows: [
          {'label': '正常持有','rate': '40','amount': 100000},
          {'label': '已清算','rate': '10','amount': 5000},
          {'label': '已融资','rate': '0','amount': 10000},
          {'label': '已转让','rate': '10','amount': 50000},
        ]
      }
    }
  }
}
</script>
