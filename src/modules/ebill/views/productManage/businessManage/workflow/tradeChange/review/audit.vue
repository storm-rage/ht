<template>
  <div>
    <!--  客户基本信息  -->
    <supplier-base-info title="客户基本信息"
                        :params="businessParamModel"
                        :dic="dictionary"></supplier-base-info>
    <!--   贸易关系   -->
    <trade-maintenance-form ref="tradeInfo"
                            :is-edit="isEdit"
                            :prods="prods"
                            :oldCactoringLogo="tradeRelationModel.cactoringLogo"
                            :productType="businessParamModel.productType"
                            :params="tradeRelationModel"
                            :dictionary="dictionary"></trade-maintenance-form>
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
import SupplierBaseInfo from '../../../components/supplierBaseInfo';
import OtherFileSetting from '../../../components/otherFileSetting';
import TradeMaintenanceForm from '../../../tradeManage/tradeMaintenanceForm';
export default {
  props: {
    //业务参数ID
    bizId: String,
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    cactoringLogoList () {
      if (this.dictionary.cactoringLogo && this.form.cactoringLogo) {
        return this.dictionary.cactoringLogo.filter((item) => {
          return item.code==='2'||item.code === String(this.form.cactoringLogo)
        });
      }
      return [];
    }
  },
  components: {
    SupplierBaseInfo,
    TradeMaintenanceForm,
    OtherFileSetting
  },
  data () {
    return {
      zjControl: {
        getDataDirectory: this.$api.businessManage.getDataDirectory,
        getTradeRecheckDetail: this.$api.businessManageWorkflow.getTradeRecheckDetail
      },
      // 字典
      dictionary: {},
      // 客户基本信息
      businessParamModel: {},
      //贸易关系信息
      tradeRelationModel: {},
      // 产品信息
      prods: []
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
      this.zjControl.getTradeRecheckDetail({id: this.bizId}).then(res => {
        this.businessParamModel = res.data.businessParamModel;
        this.tradeRelationModel = res.data.tradeRelationModel;
        const productTypes = this.businessParamModel.productType.split(',');
        this.prods = productTypes.map((item) => {
          const row = {
            code: item,
            rdProductName: this.businessParamModel.rdProductName,
            ddProductName: this.businessParamModel.ddProductName,
          }
          return row;
        })
      });
    },
    getDic () {
      this.zjControl.getDataDirectory().then(res => {
        this.dictionary = res.data
      })
    },
    /**
     * 校验数据
     * @returns {Promise<unknown>}
     */
    validData () {
      return  this.$refs.tradeInfo.validForm
    },
    /**
     * 获取维护之后的数据
     * @returns {*}
     */
    getData () {
      const params = this.$refs.tradeInfo.getData();
      if (params) {
        // 附件
        const fileData = this.$refs.ofileSetting.getData()
        // 赋值
        params.attachModelList = fileData.list;
        params.remark = fileData.remark;
        return params;
      }else {
        return null;
      }
    }
  }
};
</script>
