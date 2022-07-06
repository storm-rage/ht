<template>
  <div>
    <!-- 供应商基本信息   -->
    <supplier-base-info title="供应商基本信息"></supplier-base-info>
    <!-- 贸易关系   -->
    <trade-list></trade-list>
  </div>
</template>
<script>
import SupplierBaseInfo from '../components/supplierBaseInfo';
import TradeList from '../contractSign/tradeList';
export default {
  components: {
    SupplierBaseInfo,
    TradeList
  },
  data () {
    return {
      tradeList: []
    };
  },
  methods: {}
};
</script>
