<template>
  <div>
    <!-- 供应商基本信息   -->
    <supplier-base-info title="供应商基本信息"
                        :params="businessParamModel"
                        :dic="dictionary"></supplier-base-info>
    <!--  贸易关系  -->
    <trade-detail :tradeList="tradeRelationModelList"
                  :dic="dictionary"
                  :prodInfo="prodInfo"></trade-detail>
  </div>
</template>
<script>
/**
 * 业务申请复核详情
 */
import SupplierBaseInfo from '../components/supplierBaseInfo';
import TradeDetail from '../detailPage/tradeDetail';
export default {
  props: {
    bizId: String
  },
  components: {
    SupplierBaseInfo,
    TradeDetail
  },
  data () {
    return {
      zjControl: {
        getDataDirectory: this.$api.businessManage.getDataDirectory,
        getRecheckDetail: this.$api.businessManageWorkflow.getRecheckDetail
      },
      // 字典
      dictionary: {},
      // 客户基本信息
      businessParamModel: {},
      //贸易关系列表
      tradeRelationModelList: [],
      // 产品信息
      prodInfo: {}
    };
  },
  created() {
    this.getDic();
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      this.zjControl.getRecheckDetail({id: this.bizId}).then(res => {
        this.businessParamModel = res.data.businessParamModel;
        this.tradeRelationModelList = res.data.tradeRelationModelList;
        this.prodInfo = {
          productTypes: this.businessParamModel.productType.split(','),
          rdProductName: this.businessParamModel.rdProductName,
          ddProductName: this.businessParamModel.ddProductName
        }
      });
    },
    getDic () {
      this.zjControl.getDataDirectory().then(res => {
        this.dictionary = res.data
      })
    }
  }
};
</script>
