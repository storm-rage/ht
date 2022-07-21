<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="80%"
    @close="close">
    <el-form :model="form" ref="form" label-width="180px">
      <zj-content-block>
        <zj-content>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item :disabled="!isEdit" label="核心企业名称：" >
                {{form.buyerEntName}}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :disabled="!isEdit" label="核心企业业是否海天集团：" >
                {{typeMap(dic.isHtEnterprise, form.buyerIsHtEnterprise)}}
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
                <el-select :disabled="!isEdit" v-model="form.cactoringLogo">
                  <el-option v-for="(item,index) in dic.cactoringLogo"
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
                  <el-option v-for="(item,index) in dic.cactoringLogo"
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
      <!--  其他附件    -->
      <other-file-setting ref="ofileSetting"
                          :is-edit="isEdit"
                          :remark="form.remark"
                          :attachList="[]"></other-file-setting>
    </el-form>
    <div slot="footer" class="zj-center" style="display: block;width: 100%">
      <el-button size="small" :loading="loading" type="primary" v-if="isEdit" @click="save">保存</el-button>
      <el-button size="small" @click="close">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import {ProductType} from '@modules/constant.js';
import OrderProductBizSetting from '../../components/orderProductBizSetting';
import BillProductBizSetting from '../../components/billProductBizSetting';
import OtherFileSetting from '../../components/otherFileSetting';
export default {
  props: {
    // 字典
    dic: Object,
    // 业务ID
    bizId: String
  },
  computed: {
    // 电子债券凭证
    isRD () {
      return this.prodInfo.productTypes&&this.prodInfo.productTypes.includes(ProductType.RD);
    },
    // 订单保理
    isDDBL () {
      return  this.prodInfo.productTypes&&this.prodInfo.productTypes.includes(ProductType.DDBL);
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
    show(row,isEdit = false) {
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
    },
    async save () {
      this.loading = true;
      const valid = await this.$refs.form.validate();
      console.log(valid);
      if (valid) {
        let rdChildValid = null;
        let ddChildValid = null;
        if (this.isRD) {
          const billData = this.$refs.bbizSetting.getData();
          if (billData.billFactoringModelList.length) {
            rdChildValid = true;
          }else {
            rdChildValid = false;
            this.$messageBox({
              type:'warning',
              content:`请维护${this.prodInfo.rdProductName}业务设置`
            })
          }
        }
        if(this.isDDBL) {
          ddChildValid = await this.$refs.pbizSetting.getForm().validate();
        }
        console.info(rdChildValid)
        console.info(ddChildValid)
        if (rdChildValid===false||rdChildValid===null) {
          this.loading = false;
        }else if (ddChildValid===false||ddChildValid===null) {
          this.loading = false;
        }else {
          // todo:
        }
      }else {
        this.loading = false;
      }
    },
    close () {
      this.dialogVisible = false;
    }
  }
};
</script>
