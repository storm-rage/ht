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
    extendConfig: Object,
    dataList: Array,
  },
  data () {
    this.chartSetting = {
      label: {
        position: 'inner',
        formatter: (obj) => {
          const dataIndex = obj.dataIndex;
          const row = this.chartData.rows[dataIndex];
          return `${row.amount}`
        }
      },
      labelLine: {
        show: true
      },
      offsetY: 120
    }
    this.chartExtend = {
      ...this.extendConfig
    }
    return {
      loading: false,
      chartData: {
        columns: ['label','amount'],
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
