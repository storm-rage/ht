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
    <component :is="currentComp" :height="height" :extendConfig="extendConfig"></component>
  </div>
</template>
<script>
import orderFinancing from './orderFinancing';
import myBill from './myBill';
export default {
  components: {orderFinancing,myBill},
  props: {
    title: String,
    height: String,
    extendConfig: Object
  },
  data () {
    return {
      currentComp: 'orderFinancing'
    }
  }
};
</script>
