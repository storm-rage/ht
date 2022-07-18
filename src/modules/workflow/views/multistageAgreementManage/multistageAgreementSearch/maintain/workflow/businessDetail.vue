<template>
  <div>
    <!-- 供应商基本信息   -->
    <supplier-base-info title="供应商基本信息"></supplier-base-info>
    <!-- 贸易关系  -->
    <trade-list></trade-list>
    <!-- 阶段性协议信息   -->
    <multistage-agreement-detail/>
  </div>
</template>
<script>
import SupplierBaseInfo from '../components/supplierBaseInfo';
import multistageAgreementDetail from '../components/multistageAgreementDetail';
import tradeList from '../components/tradeList';
export default {
  components: {
    SupplierBaseInfo,
    tradeList,
    multistageAgreementDetail
  },
  data () {
    return {};
  },
  methods: {}
};
</script>
