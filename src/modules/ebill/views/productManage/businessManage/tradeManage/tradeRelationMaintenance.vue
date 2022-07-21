<template>
  <zj-content-container>
    <zj-top-header title="维护供应商业务参数"></zj-top-header>
    <el-form ref="form" :model="form"  label-width="160px">
      <!--  客户基本信息  -->
      <supplier-base-info title="客户基本信息"
                          :params="businessParamModel"
                          :dic="dictionary"></supplier-base-info>
      <!--   贸易关系   -->
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
                    <el-select v-model="form.cactoringLogo" placeholder="请选择">
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
                   <zj-number-input v-model="form.estimatedAnnualProcurementAmount">
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
                    <el-select v-model="form.settlementCycle" placeholder="请选择">
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
      <zj-content-block>
        <zj-header title="请选择需要维护产品"></zj-header>
        <zj-content>
          <el-tree
            :data="treeData"
            show-checkbox
            node-key="code"
            default-expand-all
            :props="defaultProps"
            @check="handleTreeChange"
          ></el-tree>
        </zj-content>
      </zj-content-block>
      <div v-for="(item,index) in needMaintenanceProducts" :key="`${index}product`">
        <!--  订单保理产品业务设置    -->
        <order-product-biz-setting ref="pbizSetting"
                                   v-if="item.code===constProductType.DDBL"
                                   :title="`${item.label}业务设置-${form.buyerName}`"
                                   :isOnlyMonthRateEdit="true"
                                   :dic="dictionary"
                                   :params="form.orderFactoringModel"></order-product-biz-setting>
        <!--  电子凭证产品业务设置    -->
        <bill-product-biz-setting v-if="item.code===constProductType.RD"
                                  ref="bbizSetting"
                                  :title="`${item.label}业务设置-${form.buyerName}`"
                                  :dic="dictionary"
                                  :openGraceDays="form.openGraceDays"
                                  :list="form.billFactoringModelList"
                                  :is-edit="true"></bill-product-biz-setting>
      </div>
      <!--  其他附件    -->
      <other-file-setting ref="ofileSetting" is-edit
                          :remark="form.remark"
                          :attachList="form.attachModelList"></other-file-setting>
    </el-form>
    <zj-content-footer>
      <zj-button type="primary" :disabled="loading" :api="zjBtn.maintainTradeRelation" @click="apply">提交申请</zj-button>
      <zj-button @click="goParent">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>
<script>
import {ProductType} from '@modules/constant.js';
import SupplierBaseInfo from '../components/supplierBaseInfo';
import OtherFileSetting from '../components/otherFileSetting';
import OrderProductBizSetting from '../components/orderProductBizSetting';
import BillProductBizSetting from '../components/billProductBizSetting';
export default {
  components: {
    SupplierBaseInfo,
    OtherFileSetting,
    OrderProductBizSetting,
    BillProductBizSetting
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
  data () {
    return {
      zjControl: {
        getDataDirectory: this.$api.businessManage.getDataDirectory,
        getTradeRelationDetail: this.$api.businessManage.getTradeRelationDetail,
        maintainTradeRelation: this.$api.businessManage.maintainTradeRelation
      },
      form: {},
      // 字典
      dictionary: {},
      // 客户基本信息
      businessParamModel: {},
      // 单个贸易关系
      // tradeRelationModel: {},
      loading: false,
      //单个贸易关系列表
      tradeList: [],
      // 产品树
      treeData: [
        {
          code: 'ALL',
          label: '全部',
          children: []
        }
      ],
      // 树配置
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      // 勾选的产品
      needMaintenanceProducts: [],
      // 常量
      constProductType: ProductType
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
      this.zjControl.getTradeRelationDetail({id: this.row.id,busTradeId: this.row.busTradeId,tradeId: this.row.tradeId}).then(res => {
        this.businessParamModel = res.data.businessParamModel;
        // this.tradeRelationModel = res.data.tradeRelationModel;
        this.form = res.data.tradeRelationModel;
        this.tradeList = [res.data.tradeRelationModel];
        const productTypes = this.businessParamModel.productType.split(',');
        this.treeData[0].children = productTypes.map((item) => {
          const row = {
            code: item
          }
          if (item===ProductType.RD) {
            row.label =  this.businessParamModel.rdProductName;
          }else if (item === ProductType.DDBL) {
            row.label =  this.businessParamModel.ddProductName;
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
     * 校验并提交操作
     */
    apply () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 附件
          const fileData = this.$refs.ofileSetting.getData()
          // 赋值
          this.form.attachModelList = fileData.list;
          this.form.remark = fileData.remark;
          const codes = this.needMaintenanceProducts.map((item) => {
            return item.code
          });
          if (codes.length) {
            this.loading = true;
            if (codes.includes(ProductType.RD)&&!codes.includes(ProductType.DDBL)) {
              // 只包含电子凭证保理
              const billData = this.$refs.bbizSetting.getData();
              if (billData.billFactoringModelList.length) {
                // 赋值
                this.form.openGraceDays = billData.openGraceDays;
                this.form.billFactoringModelList = billData.billFactoringModelList;
              }else {
                this.loading = false;
                this.$messageBox({
                  type:'warning',
                  content:`请维护${this.businessParamModel.rdProductName}业务设置`
                })
                return;
              }
            }else if (!codes.includes(ProductType.RD)&&codes.includes(ProductType.DDBL)) {
              // 只包含订单保理
              this.$refs.pbizSetting.getForm().validate((valid) => {
                if (valid) {
                  // 赋值
                  const orderData = this.$refs.pbizSetting.getData();
                  this.form.orderFactoringModel = orderData;
                }else {
                  this.loading = false;
                  return;
                }
              })
            }else if (codes.includes(ProductType.RD)&&codes.includes(ProductType.DDBL)) {
              // 两者都包含
              const billData = this.$refs.bbizSetting.getData();
              if (!billData.billFactoringModelList.length) {
                this.loading = false;
                this.$messageBox({
                  type:'warning',
                  content:`请维护${this.businessParamModel.rdProductName}业务设置`
                })
                return;
              }
              this.$refs.pbizSetting.getForm().validate((valid) => {
                if (valid) {
                  // 赋值
                  const orderData = this.$refs.pbizSetting.getData();
                  this.form.orderFactoringModel = orderData;
                  this.form.openGraceDays = billData.openGraceDays;
                  this.form.billFactoringModelList = billData.billFactoringModelList;
                }else {
                  this.loading = false;
                  return;
                }
              })
            }
            // 提交操作
            this.$confirm('是否确认提交？','提示',{
              type: 'warning',
              confirmButtonText: '确定',
              cancelButtonText: '取消'
            }).then(() => {
              this.zjControl.maintainTradeRelation({
                id: this.row.id,
                tradeRelationParamModel: this.form
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
            }).catch(() => {
              this.loading = false;
            })
          }else {
            this.$messageBox({
              type:'warning',
              content:'请选择需要维护产品'
            })
          }
        }
      })
    }
  }
};
</script>
