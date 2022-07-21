<template>
  <zj-content-container>
    <zj-top-header title="供应商续签合同申请"></zj-top-header>
    <el-form ref="form" label-width="160px">
      <!--  供应商基本信息  -->
      <supplier-base-info title="供应商基本信息"
                          ref="baseInfo"
                          is-edit
                          :params="businessParamModel"
                          :dic="dictionary"></supplier-base-info>
      <!--  贸易关系  -->
      <trade-list  ref="tradeInfo"
                   :tradeList="tradeRelationModelList"
                   :bizId="row.id"
                   :dic="dictionary"></trade-list>
    </el-form>
    <zj-content-footer>
      <zj-button type="primary" @click="submit" :api="zjBtn.maintainTradeRelation">提交申请</zj-button>
      <zj-button @click="goParent">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>
<script>
import SupplierBaseInfo from '../components/supplierBaseInfo';
import TradeList from './tradeList';
export default {
  provide(){
    return {
      bizId: this.row.id
    }
  },
  components: {
    SupplierBaseInfo,
    TradeList
  },
  data () {
    return {
      zjControl: {
        getDataDirectory: this.$api.businessManage.getDataDirectory,
        getBusinessParamDetail: this.$api.businessManage.getBusinessParamDetail,
        maintainTradeRelation: this.$api.businessManage.maintainTradeRelation
      },
      // 客户基本信息
      businessParamModel: {},
      //贸易关系列表
      tradeRelationModelList: [],
      // 字典
      dictionary: {}
    };
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
      });
    },
    getDic () {
      this.zjControl.getDataDirectory().then(res => {
        this.dictionary = res.data
      })
    },
    /**
     * 提交申请
     */
    submit () {}
  }
};
</script>
