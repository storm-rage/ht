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
import SupplierBaseInfo from '../components/supplierBaseInfo';
import TradeDetail from '../detailPage/tradeDetail';
export default {
  props: {
    bizId: {
      type: String,
      required: true
    },
    // 请求API
    detailApi: {
      type: Function,
      required: true
    },
    rowData: Object
  },
  components: {
    SupplierBaseInfo,
    TradeDetail
  },
  data () {
    return {
      zjControl: {
        getDataDirectory: this.$api.businessManage.getDataDirectory,
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
      let params = {id: this.bizId}
      if(this.rowData && this.rowData.tabAtive!='agenda') {
        params.finish = true
      }
      this.detailApi(params).then(res => {
        this.businessParamModel = res.data.businessParamModel;
        this.tradeRelationModelList = res.data.tradeRelationModelList || Array.isArray(res.data.tradeRelationModel)?res.data.tradeRelationModel:[res.data.tradeRelationModel];
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
