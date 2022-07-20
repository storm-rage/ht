<template>
  <zj-content-container>
    <zj-top-header title="供应商业务设置详情"></zj-top-header>
    <!--  客户基本信息  -->
    <supplier-base-info title="供应商基本信息"
                        :params="businessParamModel"
                        :dic="dictionary"></supplier-base-info>
    <!--  贸易关系  -->
    <trade-detail
      :tradeList="tradeRelationModelList"
      :dic="dictionary"
      :prodInfo="prodInfo"></trade-detail>
    <zj-content-footer>
      <zj-button  @click="goParent">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>
<script>
import SupplierBaseInfo from '../components/supplierBaseInfo';
import TradeDetail from './tradeDetail';
export default {
  components: {
    SupplierBaseInfo,
    TradeDetail
  },
  data() {
    return {
      zjControl: {
        getDataDirectory: this.$api.businessManage.getDataDirectory,
        getBusinessParamDetail: this.$api.businessManage.getBusinessParamDetail
      },
      // 客户基本信息
      businessParamModel: {},
      //贸易关系列表
      tradeRelationModelList: [],
      // 字典
      dictionary: {},
      // 产品信息
      prodInfo: {}
    }
  },
  created() {
    this.getApi();
    this.getDic();
    this.getRow();
    this.getDetail();
  },
  methods: {
    getDetail() {
      this.zjControl.getBusinessParamDetail({id: this.row.id}).then(res => {
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
}
</script>
