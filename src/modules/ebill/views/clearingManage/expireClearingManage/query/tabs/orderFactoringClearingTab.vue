<template>
  <div>
    <zj-content>
      <el-radio-group v-model="selectTag">
        <el-radio-button label="orderClearingList">订单清算清单</el-radio-button>
        <el-radio-button label="orderBalanceClearingList">订单尾款清算清单</el-radio-button>
<!--        <el-radio-button label="orderAdvanceClearingList">提前还款清算清单</el-radio-button>-->
      </el-radio-group>
    </zj-content>
    <component :is="selectTag"></component>
  </div>
</template>
<script>
import orderClearingList from './order/orderClearingList';
import orderBalanceClearingList from './order/orderBalanceClearingList';
// import orderAdvanceClearingList from './order/orderAdvanceClearingList';
export default {
  components: {
    orderClearingList,
    orderBalanceClearingList
    // orderAdvanceClearingList
  },
  data () {
    return {
      selectTag: 'orderClearingList'
    };
  }
};
</script>
