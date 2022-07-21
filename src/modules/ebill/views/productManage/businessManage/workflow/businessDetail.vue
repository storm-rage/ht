<template>
  <div>
    <!-- 供应商基本信息   -->
    <supplier-base-info title="供应商基本信息"></supplier-base-info>
    <!--  贸易关系  -->
    <trade-detail></trade-detail>
    <!--  其他附件    -->
<!--    <other-file-setting></other-file-setting>-->
  </div>
</template>
<script>
import SupplierBaseInfo from '../components/supplierBaseInfo';
// import OtherFileSetting from '../components/otherFileSetting';
import TradeDetail from '../detailPage/tradeDetail';
export default {
  components: {
    SupplierBaseInfo,
    TradeDetail
  },
  data () {
    return {};
  },
  methods: {}
};
</script>
