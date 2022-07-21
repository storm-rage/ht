<template>
  <div>
    <!--  客户基本信息  -->
    <supplier-base-info title="客户基本信息"
                        :params="businessParamModel"
                        :dic="dictionary"></supplier-base-info>
    <!--   贸易关系   -->
    <quota-maintenance-form ref="tradeInfo"
                            :ddProductName="businessParamModel.ddProductName"
                            :sellerName="businessParamModel.sellerName"
                            :is-edit="isEdit"
                            :params="tradeRelationModel"
                            :dictionary="dictionary"></quota-maintenance-form>
    <!--  其他附件    -->
    <other-file-setting ref="ofileSetting"
                        :is-edit="isEdit"
                        :remark="tradeRelationModel.remark"
                        :attachList="tradeRelationModel.attachModelList"></other-file-setting>
  </div>
</template>
<script>
/**
 * 复核和驳回
 * 驳回处理 isEdit=true
 */
import SupplierBaseInfo from '../components/supplierBaseInfo';
import OtherFileSetting from '../components/otherFileSetting';
import QuotaMaintenanceForm from '../quotaManage/quotaMaintenanceForm';
export default {
  props: {
    //业务参数ID
    bizId: String,
    //业务参数与贸易关系关联ID
    busTradeId : String,
    // 贸易关系ID
    tradeId  : String,
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  components: {
    SupplierBaseInfo,
    QuotaMaintenanceForm,
    OtherFileSetting
  },
  data () {
    return {
      zjControl: {
        getDataDirectory: this.$api.businessManage.getDataDirectory,
        getLimitRecheckDetail: this.$api.businessManageWorkflow.getLimitRecheckDetail
      },
      // 字典
      dictionary: {},
      // 客户基本信息
      businessParamModel: {},
      //贸易关系信息
      tradeRelationModel: {},
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
      this.zjControl.getLimitRecheckDetail({id: this.bizId,busTradeId: this.busTradeId,tradeId: this.tradeId}).then(res => {
        this.businessParamModel = res.data.businessParamModel;
        this.tradeRelationModel = res.data.tradeRelationModel;
      });
    },
    getDic () {
      this.zjControl.getDataDirectory().then(res => {
        this.dictionary = res.data
      })
    },
    /**
     * 获取维护之后的数据
     * @returns {*}
     */
    getData () {
      const params = this.$refs.tradeInfo.getData();
      // 附件
      const fileData = this.$refs.ofileSetting.getData()
      // 赋值
      params.attachModelList = fileData.list;
      params.remark = fileData.remark;
      return params;
    }
  }
}
</script>
