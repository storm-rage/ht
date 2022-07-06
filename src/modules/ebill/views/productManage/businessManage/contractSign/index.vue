<template>
  <zj-content-container>
    <zj-top-header title="供应商续签合同申请"></zj-top-header>
    <el-form ref="form" label-width="160px">
      <!--  供应商基本信息  -->
      <supplier-base-info title="供应商基本信息" is-edit></supplier-base-info>
      <!--  贸易关系  -->
      <trade-list></trade-list>
    </el-form>
    <zj-content-footer>
      <zj-button @click="back">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>
<script>
import SupplierBaseInfo from '../components/supplierBaseInfo';
import TradeList from './tradeList';
export default {
  components: {SupplierBaseInfo,TradeList},
  data () {
    return {
      form: {},
      customList: []
    };
  },
  methods: {
    back () {}
  }
};
</script>
