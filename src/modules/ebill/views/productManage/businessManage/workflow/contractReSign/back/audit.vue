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
      :bizId="bizId"
      :dic="dictionary"></trade-list>
  </div>
</template>
<script>
/**
 * 驳回
 */
import SupplierBaseInfo from '../../../components/supplierBaseInfo';
import TradeList from '../../../contractSign/tradeList';
export default {
  props: {
    bizId: String
  },
  components: {
    SupplierBaseInfo,
    TradeList
  },
  data () {
    return {
      zjControl: {
        getDataDirectory: this.$api.businessManage.getDataDirectory,
        getDetail: this.$api.businessManageWorkflow.getContractRenewalRebutDetail
      },
      // 字典
      dictionary: {},
      // 客户基本信息
      businessParamModel: {},
      //贸易关系列表
      tradeRelationModelList: [],
    };
  },
  created() {
    this.getDic();
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    getDic () {
      this.zjControl.getDataDirectory().then(res => {
        this.dictionary = res.data
      })
    },
    getDetail() {
      this.zjControl.getDetail({id: this.bizId}).then(res => {
        this.businessParamModel = res.data.businessParamModel;
        this.tradeRelationModelList = res.data.tradeRelationModelList;
      });
    },
    getList() {
      return this.$refs.tradeInfo.getList();
    }
  }
};
</script>
