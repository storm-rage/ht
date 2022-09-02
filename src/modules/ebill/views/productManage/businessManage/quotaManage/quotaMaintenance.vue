<template>
  <zj-content-container>
    <zj-top-header :title="`供应商额度${row.applyType=='EDXQ'?'续签':'变更'}`"></zj-top-header>
    <el-form ref="form" label-width="160px">
      <!--  供应商基本信息  -->
      <supplier-base-info title="供应商基本信息"
                          :params="businessParamModel"
                          :dic="dictionary"></supplier-base-info>
      <!--   贸易关系   -->
      <zj-content-block>
        <zj-header title="贸易关系"></zj-header>
        <zj-content>
          <zj-table ref="tradeTable"  :dataList="tradeList" :pager="false">
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
        </zj-content>
      </zj-content-block>
      <!--   产品名称   -->
      <zj-content-block v-if="tradeRelationModel.orderFactoringModel">
        <zj-header :title="businessParamModel.ddProductName"></zj-header>
        <zj-content>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="保理合同编号：" prop="contractNo">
               {{tradeRelationModel.orderFactoringModel.contractNo}}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="保理合同有效期：" prop="field1">
                {{tradeRelationModel.orderFactoringModel.contractStartDate}}～{{tradeRelationModel.orderFactoringModel.contractEndDate}}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="保理合同状态：" prop="contractStatus">
                {{typeMap(dictionary.contractStatus, tradeRelationModel.orderFactoringModel.contractStatus)}}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="保理追索方式：" prop="factoringRecourse">
                {{typeMap(dictionary.factoringRecourse, tradeRelationModel.orderFactoringModel.factoringRecourse)}}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="保理融资形式：" prop="factoringFinancingForm">
                {{typeMap(dictionary.factoringFinancingForm, tradeRelationModel.orderFactoringModel.factoringFinancingForm)}}
              </el-form-item>
            </el-col>
          </el-row>
          <zj-table ref="financeTable"
                    keep-source
                    :pager="false"
                    :edit-config="{trigger: 'manual',mode: 'row',icon: '-',autoClear: false,showStatus: true}"
                    :dataList="orderTradeList">
            <zj-table-column
              field="factoringCreditAmount"
              :edit-render="{name: '$input',props: {maxlength: 200}}"
              :formatter="money"
              title="订单保理额度（元）">
            </zj-table-column>
            <zj-table-column
              field="factoringCreditStartDate"
              title="订单保理额度有效期">
              <template v-slot="{row}">
                {{row.factoringCreditStartDate}}～{{row.factoringCreditEndDate}}
              </template>
            </zj-table-column>
            <zj-table-column
              field="accountStartDate"
              title="应收账款转让有效期">
              <template v-slot="{row}">
                {{row.accountStartDate}}～{{row.accountEndDate}}
              </template>
            </zj-table-column>
            <zj-table-column
              field="factoringFinancingMonthRate"
              :formatter="rateEpd"
              title="订单融资月利率"/>
            <zj-table-column
              field="factoringCredit"
              title="订单额度状态"
              :formatter="(obj) => typeMap(dictionary.factoringCredit, obj.cellValue)"/>
            <zj-table-column title="操作" fixed="right">
              <template v-slot="scope">
                <template v-if="$refs.financeTable.isActiveByRow(scope.row)">
                  <zj-button type="text" @click="toSave(scope.row,scope.rowIndex)">保存</zj-button>
                  <zj-button type="text" style="margin-left: 0px" @click="toCancel(scope.row,scope.rowIndex)">取消</zj-button>
                </template>
                <template v-else>
                  <zj-button v-if="row.applyType=='EDXQ'" type="text" @click="toReSign(scope.row)">续签</zj-button>
                  <zj-button v-else-if="row.applyType=='EDBG'" type="text" @click="toMaintenance(scope.row)">维护</zj-button>
                </template>
              </template>
            </zj-table-column>
          </zj-table>
        </zj-content>
      </zj-content-block>
      <!--  其他附件    -->
      <other-file-setting ref="ofileSetting"
                          is-edit
                          :remark="tradeRelationModel.remark"
                          :attachList="tradeRelationModel.attachModelList"></other-file-setting>
    </el-form>
    <quota-re-sign ref="quotaReSign" :dic="dictionary" @done="handleReSignInfo"></quota-re-sign>
    <zj-content-footer>
      <zj-button type="primary" :disabled="loading" :api="zjBtn.applyLimit" @click="apply">提交申请</zj-button>
      <zj-button  @click="goParent">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>
<script>
import SupplierBaseInfo from '../components/supplierBaseInfo';
import OtherFileSetting from '../components/otherFileSetting';
import QuotaReSign from './dialog/quotaReSign';
export default {
  components: {
    SupplierBaseInfo,
    OtherFileSetting,
    QuotaReSign
  },
  data () {
    return {
      zjControl: {
        getDataDirectory: this.$api.businessManage.getDataDirectory,
        getTradeRelationDetail: this.$api.businessManage.getTradeRelationDetail,
        applyLimit: this.$api.businessManage.applyLimit, // 额度续签
        checkContractRenewal: this.$api.businessManage.checkContractRenewal, 
        applyLimitChange: this.$api.businessManage.applyLimitChange, // 额度变更
      },
      // 字典
      dictionary: {},
      // 客户基本信息
      businessParamModel: {},
      // 单个贸易关系
      tradeRelationModel: {},
      //单个贸易关系列表
      tradeList: [],
      // 订单保理列表
      orderTradeList: [],
      loading: false,
      currentEditRow: {}
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
      this.zjControl.getTradeRelationDetail({id: this.row.id,busTradeId: this.row.busTradeId,tradeId: this.row.tradeId}).then(res => {
        this.businessParamModel = res.data.businessParamModel;
        this.tradeRelationModel = res.data.tradeRelationModel;
        this.tradeList = [res.data.tradeRelationModel];
        this.orderTradeList = [this.tradeRelationModel.orderFactoringModel];
      });
    },
    getDic () {
      this.zjControl.getDataDirectory().then(res => {
        this.dictionary = res.data
      })
    },
    /**
     * 提交申请操作
     */
    apply() {
      this.$confirm('是否确认提交？','提示',{
        type: 'warning',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.loading = true;
        this.zjControl.checkContractRenewal({sellerId: this.businessParamModel.sellerId}).then(res => {
          if (res.data.checkFlag) {
            this.$confirm('该供应商有在途融资，是否发起额度续签？','提示',{
              type: 'warning',
              confirmButtonText: '确定',
              cancelButtonText: '取消'
            }).then(() => {
              this.realSubmit();
            }).catch(() => {
              this.loading = false;
            })
          }else {
            this.realSubmit();
          }
        }).catch(() => {
          this.loading = false;
        })
      })
    },
    /**
     * 提交数据到服务器
     */
    realSubmit () {
      // 附件
      const fileData = this.$refs.ofileSetting.getData();
      const tradeRelationParamModel = this.tradeRelationModel;
      tradeRelationParamModel.attachModelList = fileData.list;
      tradeRelationParamModel.remark = fileData.remark;
      const params = {
        id: this.row.id,
        tradeRelationParamModel
      }
      let request = this.row.applyType == 'EDXQ' ?
                          this.zjControl.applyLimit : 
                          this.zjControl.applyLimitChange
      request(params).then(res => {
        this.loading = false;
        //成功，关闭
        if (res.success) {
          this.$message.success(res.msg);
          this.goParent();
        }
      }).catch(() => {
        this.loading = false;
      })
    },
    /**
     * 维护订单保理产品
     * @returns {boolean}
     */
    isTableEdit () {
      let key = true;
      if (this.$refs.financeTable && this.$refs.financeTable.getActiveRecord()) {
        key = false;
      }
      if (!key) {
        this.$log.alert('请保存当前正在编辑的数据')
      }
      return key;
    },
    /**
     * 续签订单保理产品
     * @param row
     */
    toReSign (rowData) {
      this.$refs.quotaReSign.show(this.tradeRelationModel, `额度续签-${this.businessParamModel.sellerName}`,`${this.businessParamModel.ddProductName}额度续签-${this.tradeRelationModel.buyerName}`)
    },
    /**
     * 续签订单保理维护之后回调
     * @param obj
     */
    handleReSignInfo(obj) {
      this.tradeRelationModel = {...obj};
      this.$set(this.tradeList, 0, {...obj});
      this.$set(this.orderTradeList, 0, obj.orderFactoringModel);
    },
    /**
     * 维护订单保理产品
     * @param row
     */
    toMaintenance(row) {
      if (!this.isTableEdit()) {return;}
      this.currentEditRow = {...row};
      this.$refs.financeTable.setActiveRow(row);
    },
    // 保存
    toSave (row,index) {
      if (!row.factoringCreditAmount) {
        this.$messageBox({
          type: 'warning',
          content: '请输入订单保理额度',
          title: '提示',
          showConfirmButton: true,
          center: true
        })
        return;
      }else if (!/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(row.factoringCreditAmount)) {
        this.$messageBox({
          type: 'warning',
          content: '请输入正确的金额',
          title: '提示',
          showConfirmButton: true,
          center: true
        })
        return;
      }
      this.$set(this.orderTradeList,index,Object.assign({},row));
      this.$refs.financeTable.clearActived();
      this.$message.success('保存成功')
    },
    // 取消
    toCancel (row,index) {
      this.$set(this.orderTradeList,index,{...this.currentEditRow});
      this.$refs.financeTable.clearActived();
      this.currentEditRow = {};
    },
  }
};
</script>
