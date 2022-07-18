<template>
  <div>
    <!-- 供应商基本信息   -->
    <supplier-base-info title="供应商基本信息"></supplier-base-info>
    <!-- 贸易关系   -->
    <trade-list></trade-list>
    <!-- 贸易合同附件   -->
    <trade-contract-atta/>
  </div>
</template>
<script>
import SupplierBaseInfo from '../components/supplierBaseInfo';
import TradeList from '../components/tradeList';
import tradeContractAtta from '../components/tradeContractAtta';
export default {
  components: {
    SupplierBaseInfo,
    TradeList,
    tradeContractAtta
  },
  data () {
    return {
      tradeList: []
    };
  },
  methods: {}
};
</script>
