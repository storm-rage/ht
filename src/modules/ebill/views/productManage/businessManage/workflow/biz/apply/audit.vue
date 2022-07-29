<template>
  <div>
    <!-- 供应商基本信息   -->
    <supplier-base-info title="供应商基本信息"
                        :params="businessParamModel"
                        :dic="dictionary"></supplier-base-info>
    <!-- 贸易关系   -->
    <trade-list
    ref="tradeInfo"
    :tradeList="tradeRelationModelList"
    :is-edit-cactoringLogo="true"
    :bizId="bizId"
    :dic="dictionary"></trade-list>
  </div>
</template>
<script>
/**
 * 初审和驳回
 */
import SupplierBaseInfo from '../../../components/supplierBaseInfo';
import TradeList from '../../../contractSign/tradeList';
export default {
  props: {
    bizId:String,
    // 字典
    dictionary: Object,
    // 客户基本信息
    businessParamModel: String,
    //贸易关系列表
    tradeRelationModelList: Array
  },
  components: {
    SupplierBaseInfo,
    TradeList
  },
  methods: {
    getList() {
     return this.$refs.tradeInfo.getList();
    }
  }
};
</script>
