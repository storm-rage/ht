<template>
  <div>
    <el-form ref="form" label-width="160px">
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
        </zj-content>
      </zj-content-block>
      <!--   产品名称   -->
      <zj-content-block v-if="tradeRelationModel.orderFactoringModel">
        <zj-header :title="ddProductName"></zj-header>
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
            <zj-table-column :visible="isEdit" title="操作" fixed="right">
              <template v-slot="{ row,rowIndex }">
                <template v-if="$refs.financeTable.isActiveByRow(row)">
                  <zj-button type="text" @click="toSave(row,rowIndex)">保存</zj-button>
                  <zj-button type="text" style="margin-left: 0px" @click="toCancel(row,rowIndex)">取消</zj-button>
                </template>
                <template v-else>
                  <zj-button type="text" @click="toReSign(row)">续签</zj-button>
                  <zj-button type="text" @click="toMaintenance(row)">维护</zj-button>
                </template>
              </template>
            </zj-table-column>
          </zj-table>
        </zj-content>
      </zj-content-block>
    </el-form>
    <quota-re-sign ref="quotaReSign" :dic="dictionary" @done="handleReSignInfo"></quota-re-sign>
  </div>
</template>
<script>
/**
 * 额度管理表单（初次提交申请和驳回）
 */
import QuotaReSign from './dialog/quotaReSign';
export default {
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    // 订单保理产品名称
    ddProductName:String,
    // 供应商名称
    sellerName:String,
    dictionary: Object,
    params: Object,
  },
  components: {
    QuotaReSign
  },
  watch: {
    params: {
      deep: true,
      handler () {
        this.tradeRelationModel = this.params||{};
        this.tradeList = [this.tradeRelationModel];
        this.orderTradeList = [this.tradeRelationModel.orderFactoringModel];
      }
    }
  },
  data () {
    return {
      // 单个贸易关系
      tradeRelationModel: {},
      //单个贸易关系列表
      tradeList: [],
      // 订单保理列表
      orderTradeList: [],
      currentEditRow: {}
    };
  },
  methods: {
    getData () {
      return this.tradeRelationModel;
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
    toReSign () {
      this.$refs.quotaReSign.show(this.tradeRelationModel, `额度续签-${this.sellerName}`,`${this.ddProductName}额度续签-${this.tradeRelationModel.buyerName}`)
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
