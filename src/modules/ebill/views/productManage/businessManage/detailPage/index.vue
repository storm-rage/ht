<template>
  <zj-content-container>
    <zj-top-header title="供应商业务设置详情"></zj-top-header>
    <!--  客户基本信息  -->
    <supplier-base-info title="供应商基本信息"></supplier-base-info>
    <!--  贸易关系  -->
    <trade-detail></trade-detail>
    <!--  其他附件    -->
    <other-file-setting></other-file-setting>
    <zj-content-footer>
      <zj-button  @click="back">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>
<script>
import SupplierBaseInfo from '../components/supplierBaseInfo';
import OtherFileSetting from '../components/otherFileSetting';
import TradeDetail from './tradeDetail';
export default {
  components: {
    SupplierBaseInfo,
    TradeDetail,
    OtherFileSetting
  },
  data() {
    return {
    }
  },
  methods: {
    back() {}
  }
}
</script>
