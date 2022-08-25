<template>
  <el-form ref="form" :model="form"  label-width="160px">
    <zj-content-block>
      <zj-header title="贸易关系"></zj-header>
      <zj-content>
        <zj-table ref="tradeTable" :dataList="tradeList" :pager="false">
          <zj-table-column field="buyerName" title="核心企业名称"/>
          <zj-table-column field="isHtEnterprise"
                           title="核心企业是否海天集团"
                           :formatter="(obj) => typeMap(dictionary.isHtEnterprise, obj.cellValue)"/>
          <zj-table-column
            field="bizLicence"
            title="核心企业统一社会信用代码"
          />
          <zj-table-column
            field="cactoringLogo"
            title="保理标识"
            :formatter="(obj) => typeMap(dictionary.cactoringLogo, obj.cellValue)"
          />
          <zj-table-column field="settlementCycle"
                           title="结算周期"
                           :formatter="(obj) => typeMap(dictionary.settlementCycle, obj.cellValue)"/>
          <zj-table-column field="totalCreditAmount" title="供应商总额度" :formatter="money"/>
          <zj-table-column field="estimatedAnnualProcurementAmount" title="预计年采购金额" :formatter="money"/>
          <zj-table-column field="state"
                           title="贸易关系状态"
                           :formatter="(obj) => typeMap(dictionary.state, obj.cellValue)"/>
        </zj-table>
        <div>
          <zj-collapse title="基础信息维护"  class="zj-m-t-10">
            <el-row>
              <el-col :span="12">
                <el-form-item label="保理标识："
                              prop="cactoringLogo"
                              :rules="[
                          {required: true,message: '请选择保理标识',trigger: ['change','blur']}
                        ]">
                  <el-select v-model="form.cactoringLogo" placeholder="请选择" :disabled="!isEdit"  @change="handleCactoringLogoChange">
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
                  <zj-number-input v-model="form.estimatedAnnualProcurementAmount" :disabled="!isEdit">
                    <template slot="append">元</template>
                  </zj-number-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="结算周期："
                              prop="settlementCycle"
                              :rules="[
                          {required: true,message: '请选择结算周期',trigger: ['change','blur']}
                        ]">
                  <el-select v-model="form.settlementCycle" placeholder="请选择" :disabled="!isEdit">
                    <el-option v-for="(item,index) in dictionary.settlementCycle"
                               :key="`${index}settlementCycle`"
                               :label="item.desc"
                               :value="item.code"></el-option>
                  </el-select>
                  &nbsp;<zj-text-tip text="注：结算周期从mdm取值仅供参考，最终以平台维护为准。"></zj-text-tip>
                </el-form-item>
              </el-col>
            </el-row>
          </zj-collapse>
        </div>
      </zj-content>
    </zj-content-block>
    <zj-content-block v-if="isShowProdTree">
      <zj-header title="请选择需要维护产品"></zj-header>
      <zj-content>
        <el-tree
          :data="treeData"
          show-checkbox
          node-key="code"
          default-expand-all
          :props="defaultProps"
          :default-checked-keys="treeDefaultSelect"
          @check="handleTreeChange"
        ></el-tree>
      </zj-content>
    </zj-content-block>
    <div v-for="(item,index) in needMaintenanceProducts" :key="`${index}product`">
      <!--  订单保理产品业务设置    -->
      <order-product-biz-setting ref="pbizSetting"
                                 v-if="item.code===constProductType.DDBL"
                                 :title="`${item.label}业务设置-${form.buyerName}`"
                                 :isOnlyMonthRateEdit="isEdit"
                                 :dic="dictionary"
                                 :params="form.orderFactoringModel"></order-product-biz-setting>
      <!--  电子凭证产品业务设置    -->
      <bill-product-biz-setting v-if="item.code===constProductType.RD"
                                ref="bbizSetting"
                                :title="`${item.label}业务设置-${form.buyerName}`"
                                :dic="dictionary"
                                :openGraceDays="form.openGraceDays"
                                :list="form.billFactoringModelList"
                                :is-edit="isEdit"></bill-product-biz-setting>
    </div>
  </el-form>
</template>
<script>
import {ProductType,CactoringLogo} from "@modules/constant";
import OrderProductBizSetting from '../components/orderProductBizSetting';
import BillProductBizSetting from '../components/billProductBizSetting';

/**
 * 贸易维护表单(工作流驳回和初次提交生气)
 */
export default {
  components: {
    OrderProductBizSetting,
    BillProductBizSetting
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    dictionary: {
      type: Object,
      required: true
    },
    // 一开始的非保理标识，用于处理非保理的情况
    oldCactoringLogo: {
      type: String,
      required: true
    },
    params: {
      type: Object,
      required: true
    },
    // 开通的产品
    prods:{
      type: Array,
      required: true
    },
    // 产品类型
    productType:{
      type: String,
      required: true
    },
    // 产品树默认选中
    // treeDefaultSelect: {
    //   type: Array,
    //   default:() => {
    //     return [];
    //   }
    // }
  },
  computed: {
    cactoringLogoList () {
      if (this.dictionary.cactoringLogo) {
        return this.dictionary.cactoringLogo.filter((item) => {
          if (this.productType.indexOf(ProductType.DDBL)>=0) {
            //若开通订单保理产品，则只能维护为“订单保理”
            return item.code!==CactoringLogo.BILLBL
          }else if(this.productType.indexOf(ProductType.RD)>=0){
            //若开通凭证保理产品，则只能维护为“凭证保理”
            return item.code!==CactoringLogo.ORDERBL
          }
          return false;
        })
      }
      return [];
    },
    /**
     * 是否显示产品树
     * @returns {boolean}
     */
    isShowProdTree () {
      return this.oldCactoringLogo !== CactoringLogo.NOTBL && this.form.cactoringLogo !== CactoringLogo.NOTBL;
    },
    // 产品树
    treeData () {
      const tree = [
        {
          code: 'ALL',
          label: '全部',
          disabled: !this.isEdit,
          children: []
        }
      ];
      if (this.prods && this.prods.length) {
        tree[0].children = this.prods.map((item)=>{
          let label = '';
          if (item.code===ProductType.RD) {
            label =  item.rdProductName;
          }else if (item.code === ProductType.DDBL) {
            label =  item.ddProductName;
          }
          return {
            code: item.code,
            disabled: !this.isEdit,
            label
          }
        })
      }
      return tree
    }
  },
  watch: {
    params: {
      deep: true,
      handler () {
        this.form = this.params||{};
        this.tradeList = [this.form];
        if (this.params.billFactoringModelList) {
          this.treeDefaultSelect.push(ProductType.RD)
        }
        if (this.params.orderFactoringModel) {
          this.treeDefaultSelect.push(ProductType.DDBL)
        }
      }
    }
  },
  data () {
    return {
      form: {},
      // 树配置
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      //单个贸易关系列表
      tradeList: [],
      // 勾选的产品
      needMaintenanceProducts: [],
      // 常量
      constProductType: ProductType,
      // 默认选中
      treeDefaultSelect: []
    };
  },
  methods: {
    /**
     * 处理树选择事件
     * @param list
     * @param checkedNodes
     */
    handleTreeChange (list,{checkedNodes}) {
      this.needMaintenanceProducts = checkedNodes.filter((item) => {
        return item.code !== 'ALL';
      })
    },
    /**
     * 处理保理标识改变事件
     */
    handleCactoringLogoChange () {
      if (this.form.cactoringLogo === CactoringLogo.NOTBL) {
        this.needMaintenanceProducts = [];
        if (this.oldCactoringLogo !== CactoringLogo.NOTBL) {
          // todo:如果一开始不是非保理需要清空选中
        }
      }else {
        // 如果一开始是非保理添加需要维护的产品信息
        if (this.oldCactoringLogo === CactoringLogo.NOTBL) {
          if (this.form.cactoringLogo === CactoringLogo.ORDERBL) {
            const order = this.prods.find((prod) => prod.code === ProductType.DDBL);
            const bill = this.prods.find((prod) => prod.code === ProductType.RD);
            //订单保理
            const orderRow = {
              code: ProductType.DDBL,
              label: order.ddProductName
            }
            const billRow = {
              code: ProductType.RD,
              label: bill.rdProductName
            }
            this.needMaintenanceProducts=[orderRow,billRow]
          }else if (this.form.cactoringLogo === CactoringLogo.BILLBL) {
            const bill = this.prods.find((prod) => prod.code === ProductType.RD);
            //凭证保理
            const billRow = {
              code: ProductType.RD,
              label: bill.rdProductName
            }
            this.needMaintenanceProducts=[billRow]
          }
        }
      }
    },
    getForm () {
      return this.$refs.form;
    },
    getData () {
      // 切换非保理不用清空，非保理应该不更新那些信息
      if (this.form.cactoringLogo === CactoringLogo.NOTBL) {
        const codes = this.needMaintenanceProducts.map((item) => {
          return item.code
        });
        if (codes.length) {
          if (codes.includes(ProductType.RD)&&!codes.includes(ProductType.DDBL)) {
            // 只包含电子凭证保理
            const billData = this.$refs.bbizSetting.getData();
            // 赋值
            this.form.openGraceDays = billData.openGraceDays;
            this.form.billFactoringModelList = billData.billFactoringModelList;

          }else if (!codes.includes(ProductType.RD)&&codes.includes(ProductType.DDBL)) {
            // 赋值
            const orderData = this.$refs.pbizSetting.getData();
            this.form.orderFactoringModel = orderData;

          }else if (codes.includes(ProductType.RD)&&codes.includes(ProductType.DDBL)) {
            // 赋值
            const billData = this.$refs.bbizSetting.getData();
            const orderData = this.$refs.pbizSetting.getData();
            this.form.orderFactoringModel = orderData;
            this.form.openGraceDays = billData.openGraceDays;
            this.form.billFactoringModelList = billData.billFactoringModelList;
          }
          return this.form;
        }else {
          return null
        }
      }else {
        return this.form;
      }
    },
    /**
     * 校验表单
     * @returns {Promise<unknown>}
     */
    validForm() {
      return new Promise((resolve) => {
        this.getForm().validate((valid) => {
          if (valid) {
            const rdForm = this.getRdForm();
            const ddBlForm = this.getDDBlForm()
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
      });
    },
    getRdForm () {
      return this.$refs.bbizSetting;
    },
    getDDBlForm () {
      return this.$refs.pbizSetting;
    }
  }
};
</script>
