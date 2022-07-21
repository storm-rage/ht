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
import SupplierBaseInfo from '../components/supplierBaseInfo';
import OtherFileSetting from '../components/otherFileSetting';
import TradeMaintenanceForm from '../tradeManage/tradeMaintenanceForm';
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
      this.zjControl.getTradeRecheckDetail({id: this.bizId,busTradeId: this.busTradeId,tradeId: this.tradeId}).then(res => {
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
      return new Promise((resolve) => {
        this.$refs.tradeInfo.getForm().validate((valid) => {
          if (valid) {
            const rdForm = this.$refs.tradeInfo.getRdForm();
            const ddBlForm = this.$refs.tradeInfo.getDDBlForm()
            if (rdForm && !ddBlForm) {
              if(rdForm.getData().billFactoringModelList.length) {
                resolve(true);
              }else {
                this.$messageBox({
                  type:'warning',
                  content:`请维护${this.businessParamModel.rdProductName}业务设置`
                })
                resolve(false)
              }
            }else if (!rdForm && ddBlForm) {
              ddBlForm.getForm().validate((valid) => {
                if (valid) {
                  resolve(true);
                }else {
                  resolve(false)
                }
              })
            }else if (rdForm && ddBlForm) {
              if(!rdForm.getData().billFactoringModelList.length) {
                this.$messageBox({
                  type:'warning',
                  content:`请维护${this.businessParamModel.rdProductName}业务设置`
                })
                resolve(false);
              }else {
                ddBlForm.getForm().validate((valid) => {
                  if (valid) {
                    resolve(true);
                  }else {
                    resolve(false)
                  }
                })
              }
            }
          }else {
            resolve(false)
          }
        })
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
};
</script>
