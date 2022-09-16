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
                   :product-type="businessParamModel.productType"
                   :bizId="row.id"
                   :dic="dictionary"></trade-list>
    </el-form>
    <zj-content-footer>
      <zj-button type="primary" :disabled="loading" @click="submit" :api="zjBtn.applyContractRenewal">提交申请</zj-button>
      <zj-button @click="goParent">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>
<script>
import SupplierBaseInfo from '../components/supplierBaseInfo';
import TradeList from './tradeList';
export default {
  components: {
    SupplierBaseInfo,
    TradeList
  },
  data () {
    return {
      zjControl: {
        getDataDirectory: this.$api.businessManage.getDataDirectory,
        getBusinessParamDetail: this.$api.businessManage.getBusinessParamDetail,
        applyContractRenewal: this.$api.businessManage.applyContractRenewal,
        checkContractRenewal: this.$api.businessManage.checkContractRenewal
      },
      // 客户基本信息
      businessParamModel: {},
      //贸易关系列表
      tradeRelationModelList: [],
      // 字典
      dictionary: {},
      loading: false
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
    submit () {
      this.$refs.baseInfo.getForm().validate((valid) => {
        if (valid) {
          const list = this.$refs.tradeInfo.getList();
          if (list.length) {
            this.$confirm('是否确认提交？','提示',{
              type: 'warning',
              confirmButtonText: '确定',
              cancelButtonText: '取消'
            }).then(() => {
              // 基础信息存在修改
              const baseInfo = this.$refs.baseInfo.getData();
              this.loading = true;
              this.zjControl.checkContractRenewal({sellerId: baseInfo.sellerId}).then(res => {
                if (res.data.checkFlag) {
                  this.$confirm('该供应商有在途融资，是否发起合同续签？','提示',{
                    type: 'warning',
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                  }).then(() => {
                    this.realSubmit(baseInfo, list);
                  }).catch(() => {
                    this.loading = false;
                  })
                }else {
                  this.realSubmit(baseInfo, list);
                }
              }).catch(() => {
                this.loading = false;
              })
            })
          }else {
            this.$messageBox({
              type:'warning',
              content:'请至少维护一条贸易关系的业务设置！'
            })
          }
        }
      })
    },
    /**
     * 提交数据到服务器
     * @param baseInfo
     * @param list
     */
    realSubmit (baseInfo, list) {
      this.zjControl.applyContractRenewal({
        id: this.row.id,
        businessParamModel: baseInfo,
        tradeRelationParamModelList: list
      }).then(res => {
        this.loading = false;
        //成功，关闭
        if (res.success) {
          this.$message.success(res.msg);
          this.goParent();
        }
      }).catch(() => {
        this.loading = false;
      })
    }
  }
};
</script>
