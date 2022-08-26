<template>
  <div>
    <!-- 供应商基本信息   -->
    <supplier-base-info title="供应商基本信息" :tableData="formData.supplierInfoList"/>
    <!-- 贸易关系  -->
    <trade-list :tableData="formData.tradeRelationModelList"/>
    <!-- 阶段性协议信息   -->
    <multistage-agreement-detail v-bind="$attrs" :tableData="formData.phasedAgreementList" :zjControl="zjControl"/>
  </div>
</template>
<script>
import SupplierBaseInfo from '../components/supplierBaseInfo';
import multistageAgreementDetail from '../components/multistageAgreementDetail';
import tradeList from '../components/tradeList';
export default {
  props: {
    formData: Object,
    zjControl: Object,
  },
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
