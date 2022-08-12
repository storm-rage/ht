<template>
  <div>
    <zj-header :title="title">
      <template slot="right">
        <el-radio-group v-model="currentComp" size="mini">
          <el-radio-button label="orderFinancing">订单融资总额</el-radio-button>
          <el-radio-button label="myBill">我的凭证</el-radio-button>
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
import { EntType } from '@modules/constant'
import orderFinancing from './orderFinancing'
import myBill from './myBill'
export default {
  components: { orderFinancing, myBill },
  props: {
    title: String,
    height: String,
    extendConfig: Object
  },
  data () {
    return {
      loading: false,
      currentComp: 'orderFinancing',
      zjControl: {
        getOrderFinancingAmt: this.$api.home.getOrderFinancingAmt,
        getMyBill: this.$api.home.getMyBill,
      },
      dataList: []
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
        orderFinancing: this.zjControl.getOrderFinancingAmt, // 订单融资总额
        myBill: this.zjControl.getMyBill // 我的凭证
      }
      requestUrl[this.currentComp]()
        .then(res => {
          this.loading = false
          let dataType = {
            orderFinancing: 'orderFinancingAmtMonths', // 订单融资总额
            myBill: 'loanAmtMonths' // 我的凭证
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
