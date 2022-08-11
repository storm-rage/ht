<template>
  <div>
    <zj-header :title="title">
      <template slot="right">
        <el-radio-group v-model="currentComp" size="mini">
          <el-radio-button label="financing">融资金额</el-radio-button>
          <el-radio-button label="payment">放款总额</el-radio-button>
        </el-radio-group>
      </template>
    </zj-header>
    <component
      v-loading="loading"
      :is="currentComp"
      :height="height"
      :extendConfig="extendConfig"
      :dataList="dataList"
    ></component>
  </div>
</template>
<script>
import financing from './financing'
import payment from './payment'
export default {
  components: { financing, payment },
  props: {
    title: String,
    height: String,
    extendConfig: Object
  },
  data () {
    return {
      loading: false,
      zjControl: {
        getFinancingAmt: this.$api.home.getFinancingAmt, // 融资金额
        getLoanAmt: this.$api.home.getLoanAmt // 放款金额
      },
      currentComp: 'financing',
      dataList: [] // 图表数据
    }
  },
  created () {
    this.getApi()
    this.getData()
  },
  watch: {
    currentComp (val) {
      this.getData()
    }
  },
  methods: {
    getData () {
      this.loading = true
      let requestUrl = {
        financing: this.zjControl.getFinancingAmt, // 融资金额
        payment: this.zjControl.getLoanAmt // 放款总额
      }
      requestUrl[this.currentComp]()
        .then(res => {
          this.loading = false
          let dataType = {
            financing: 'companyFinancingAmtList', // 融资金额
            payment: 'loanAmtMonths' // 放款总额
          }
          this.dataList = res.data[dataType[this.currentComp]] || []
        })
        .catch(err => {
          this.loading = false
        })
    }
  }
}
</script>
