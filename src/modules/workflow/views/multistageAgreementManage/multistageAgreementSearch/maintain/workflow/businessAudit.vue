<template>
  <div>
    <!-- 供应商基本信息   -->
    <supplier-base-info title="供应商信息" :tableData="formData.supplierInfoList"/>
    <!-- 贸易关系   -->
    <trade-list :tableData="formData.tradeRelationModelList"/>
    <!-- 贸易合同附件   -->
    <trade-contract-atta v-if="!rowData.maintainType||rowData.maintainType!='1'" :tableData="formData.contractInfoList"/>
  </div>
</template>
<script>
import SupplierBaseInfo from '../components/supplierBaseInfo';
import TradeList from '../components/tradeList';
import tradeContractAtta from '../components/tradeContractAtta';
export default {
  props: {
    formData: Object,
    rowData: Object,
  },
  components: {
    SupplierBaseInfo,
    TradeList,
    tradeContractAtta,
  },
  data () {
    return {
    };
  },
  methods: {}
};
</script>
