<template>
  <el-dialog
    :title="title"
    top="1vh"
    :visible.sync="dialogVisible"
    width="80%"
    @close="close">
    <el-form :model="form" ref="form" label-width="180px">
      <zj-content-block>
        <zj-content>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item :disabled="!isEdit" label="核心企业名称：" >
                {{form.buyerName}}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :disabled="!isEdit" label="核心企业业是否海天集团：" >
                {{typeMap(dic.isHtEnterprise, form.isHtEnterprise)}}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :disabled="!isEdit" label="核心企业代码：" >
                {{form.bizLicence}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="保理标识："
                            prop="cactoringLogo"
                            :rules="[
                          {required: true,message: '请选择保理标识',trigger: ['change','blur']}
                        ]">
                <el-select :disabled="!isEditCactoringLogo||!isEdit" v-model="form.cactoringLogo" @change="handleCactoringLogoChange">
                  <el-option v-for="(item,index) in cactoringLogoList"
                             :key="`${index}cactoringLogo`"
                             :label="item.desc"
                             :value="item.code"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="预计年采购金额："
                            prop="estimatedAnnualProcurementAmount"
                            :rules="[
                          {required: true,message: '请输入预计年采购金额',trigger: ['change','blur']}
                        ]">
               <zj-number-input :disabled="!isEdit" v-model="form.estimatedAnnualProcurementAmount">
                 <template slot="append">
                   元
                 </template>
               </zj-number-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="结算周期："
                            prop="settlementCycle"
                            :rules="[
                          {required: true,message: '请选择结算周期',trigger: ['change','blur']}
                        ]">
                <el-select :disabled="!isEdit" v-model="form.settlementCycle" placeholder="请选择">
                  <el-option v-for="(item,index) in dic.settlementCycle"
                             :key="`${index}settlementCycle`"
                             :label="item.desc"
                             :value="item.code"></el-option>
                </el-select>
                &nbsp;<zj-text-tip text="注：结算周期从mdm取值仅供参考，最终以平台维护为准。"></zj-text-tip>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="供应商总额度："
                            prop="totalCreditAmount"
                            :rules="[
                          {required: true,message: '请输入供应商总额度',trigger: ['change','blur']}
                        ]">
                <zj-number-input :disabled="!isEdit" v-model="form.totalCreditAmount">
                  <template slot="append">
                    元
                  </template>
                </zj-number-input>
                &nbsp;<zj-text-tip text="注：供应商总额度。若开通订单保理，则为订单保理额度。若开通凭证产品，则为凭证总控额度。"></zj-text-tip>
                <p class="zj-right" style="width: 220px">{{digitUp(form.totalCreditAmount)}}</p>
              </el-form-item>
            </el-col>
          </el-row>
        </zj-content>
      </zj-content-block>
      <div v-if="isShowProdSetting">
        <!--  订单保理产品业务设置    -->
        <order-product-biz-setting ref="pbizSetting"
                                   v-if="isDDBL"
                                   :title="`${prodInfo.ddProductName}业务设置-${form.buyerName}`"
                                   :is-edit="isEdit"
                                   :dic="dic"
                                   :params="form.orderFactoringModel"></order-product-biz-setting>
        <!--  电子凭证产品业务设置    -->
        <bill-product-biz-setting v-if="isRD"
                                  ref="bbizSetting"
                                  :title="`${prodInfo.rdProductName}业务设置-${form.buyerName}`"
                                  :dic="dic"
                                  :openGraceDays="form.openGraceDays"
                                  :list="form.billFactoringModelList"
                                  :is-edit="isEdit"></bill-product-biz-setting>
      </div>
      <!--  其他附件    -->
      <other-file-setting ref="ofileSetting"
                          :is-edit="isEdit"
                          :remark="form.remark"
                          :attachList="form.attachModelList"></other-file-setting>
    </el-form>
    <div slot="footer" class="zj-center" style="display: block;width: 100%">
      <el-button size="small" style="width: 100px" :loading="loading" type="primary" v-if="isEdit" @click="save">保存</el-button>
      <el-button size="small" style="width: 100px" @click="close">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import {ProductType,CactoringLogo} from '@modules/constant.js';
import OrderProductBizSetting from '../../components/orderProductBizSetting';
import BillProductBizSetting from '../../components/billProductBizSetting';
import OtherFileSetting from '../../components/otherFileSetting';
export default {
  props: {
    // 字典
    dic: Object,
    // 业务ID
    bizId: String,
    isEditCactoringLogo: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    cactoringLogoList () {
      if (this.dic.cactoringLogo) {
        return this.dic.cactoringLogo.filter((item) => {
          if(this.isDDBL) {
            //若开通订单保理产品，则只能维护为“订单保理”
            return item.code!==CactoringLogo.BILLBL
          }else if(this.isRD) {
            //若开通凭证保理产品，则只能维护为“凭证保理”
            return item.code!==CactoringLogo.ORDERBL
          }
          return false;
        });
      }
      return [];
    },
    // 电子债券凭证
    isRD () {
      return this.prodInfo.productTypes&&this.prodInfo.productTypes.includes(ProductType.RD);
    },
    // 订单保理
    isDDBL () {
      return  this.prodInfo.productTypes&&this.prodInfo.productTypes.includes(ProductType.DDBL);
    },
    /**
     * 是否显示产品设置
     * @returns {boolean}
     */
    isShowProdSetting () {
      return this.form.cactoringLogo !== CactoringLogo.NOTBL;
    }
  },
  components: {
    OrderProductBizSetting,
    BillProductBizSetting,
    OtherFileSetting
  },
  data () {
    return {
      title: '业务设置-供应商名称',
      dialogVisible: false,
      isEdit: false,
      form: {},
      // 产品信息
      prodInfo:{},
      loading: false
    }
  },
  methods: {
    show(row,isEdit = false,isNeedReq = true) {
      if (isNeedReq) {
        this.$api.businessManage.getTradeRelationDetail({busTradeId: row.busTradeId,id: this.bizId,tradeId: row.tradeId}).then(res => {
          this.form = res.data.tradeRelationModel
          const businessParamModel = res.data.businessParamModel;
          this.prodInfo = {
            productTypes: businessParamModel.productType.split(','),
            rdProductName: businessParamModel.rdProductName,
            ddProductName: businessParamModel.ddProductName
          }
          this.isEdit = isEdit;
          this.dialogVisible = true;
        });
      }else {
        this.form = {...row};
        this.isEdit = isEdit;
        this.dialogVisible = true;
      }

    },
    handleCactoringLogoChange() {
    },
    save () {
      this.loading = true;
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 附件
          const fileData = this.$refs.ofileSetting.getData()
          if (this.isShowProdSetting) {
            // 有三种情况
            if (this.isRD&&!this.isDDBL) {
              const billData = this.$refs.bbizSetting.getData();
              if (billData.billFactoringModelList.length) {
                // 赋值
                this.form.attachModelList = fileData.list;
                this.form.remark = fileData.remark;
                this.form.openGraceDays = billData.openGraceDays;
                this.form.billFactoringModelList = billData.billFactoringModelList;
                this.$emit('done',this.form);
                this.loading = false;
                this.close();
              }else {
                this.loading = false;
                this.$messageBox({
                  type:'warning',
                  content:`请维护${this.prodInfo.rdProductName}业务设置`
                })
                return;
              }
            }else if(!this.isRD&&this.isDDBL) {
              this.$refs.pbizSetting.getForm().validate((valid) => {
                if (valid) {
                  // 赋值
                  this.form.attachModelList = fileData.list;
                  this.form.remark = fileData.remark;
                  const orderData = this.$refs.pbizSetting.getData();
                  this.form.orderFactoringModel = orderData;
                  this.$emit('done',this.form);
                  this.loading = false;
                  this.close();
                }else {
                  this.loading = false;
                }
              });
            }else if(this.isRD&&this.isDDBL) {
              const billData = this.$refs.bbizSetting.getData();
              if (!billData.billFactoringModelList.length) {
                this.loading = false;
                this.$messageBox({
                  type:'warning',
                  content:`请维护${this.prodInfo.rdProductName}业务设置`
                })
                return;
              }
              this.$refs.pbizSetting.getForm().validate((valid) => {
                if (valid) {
                  // 赋值
                  this.form.attachModelList = fileData.list;
                  this.form.remark = fileData.remark;
                  this.form.openGraceDays = billData.openGraceDays;
                  this.form.billFactoringModelList = billData.billFactoringModelList;
                  const orderData = this.$refs.pbizSetting.getData();
                  this.form.orderFactoringModel = orderData;
                  this.$emit('done',this.form);
                  this.loading = false;
                  this.close();
                }else {
                  this.loading = false;
                }
              });
            }
          }else {
            // 非保理的清空
            // 赋值
            this.form.attachModelList = fileData.list;
            this.form.remark = fileData.remark;
            this.$emit('done',this.form);
            this.loading = false;
            this.close();
          }
        }else {
          this.loading = false;
        }
      });
    },
    close () {
      this.dialogVisible = false;
    }
  }
};
</script>
