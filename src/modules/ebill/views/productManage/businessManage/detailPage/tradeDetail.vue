<template>
  <el-form ref="form" label-width="160px">
    <zj-content-block>
      <zj-header title="贸易关系"></zj-header>
      <zj-content>
        <zj-table ref="tradeTable"
                  :dataList="tradeList"
                  row-id="tradeId"
                  :pager="false"
                  @radio-change="handleRadioChange"
                  :radio-config="{highlight: true,checkRowKey: defaultSelectRowId}">
          <zj-table-column type="radio"  width="50"/>
          <zj-table-column field="buyerName" title="核心企业名称"/>
          <zj-table-column field="isHtEnterprise" title="核心企业是否海天集团" :formatter="(obj) => typeMap(dic.isHtEnterprise, obj.cellValue)"/>
          <zj-table-column
            field="bizLicence"
            title="核心企业统一社会信用代码"
          />
          <zj-table-column
            field="cactoringLogo"
            title="保理标识"
            :formatter="(obj) => typeMap(dic.cactoringLogo, obj.cellValue)"
          />
          <zj-table-column field="settlementCycle" title="结算周期" :formatter="(obj) => typeMap(dic.settlementCycle, obj.cellValue)"/>
          <zj-table-column field="totalCreditAmount" title="供应商总额度" :formatter="money"/>
          <zj-table-column field="estimatedAnnualProcurementAmount" title="预计年采购金额" :formatter="money"/>
          <zj-table-column field="state" title="贸易关系状态" :formatter="(obj) => typeMap(dic.state, obj.cellValue)"/>
        </zj-table>
      </zj-content>
    </zj-content-block>
    <!--  产品  -->
    <div v-if="currentTrade.tradeId">
      <zj-content-block v-if="isDDBL&&currentTrade.orderFactoringModel">
        <zj-header :title="`${prodInfo.ddProductName}业务设置-${currentTrade.buyerName}`"></zj-header>
        <zj-content>
          <div style="width: 67%;margin: 0 auto">
            <el-row>
              <el-col :span="12">
                <el-form-item label="保理追索方式：" >
                  <el-select v-model="currentTrade.orderFactoringModel.factoringRecourse" disabled>
                    <el-option v-for="(item,index) in dic.factoringRecourse"
                               :key="`${index}factoringRecourse`"
                               :label="item.desc"
                               :value="item.code"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="保理融资形式：">
                  <el-select v-model="currentTrade.orderFactoringModel.factoringFinancingForm" disabled>
                    <el-option v-for="(item,index) in dic.factoringFinancingForm"
                               :key="`${index}factoringFinancingForm`"
                               :label="item.desc"
                               :value="item.code"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="订单保理额度开始日：">
                  <el-date-picker v-model="currentTrade.orderFactoringModel.factoringCreditStartDate" value-format="yyyyMMdd" disabled></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="订单保理额度到期日：">
                  <el-date-picker v-model="currentTrade.orderFactoringModel.factoringCreditEndDate" value-format="yyyyMMdd" disabled></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="受让应收账款开始日：">
                  <el-date-picker v-model="currentTrade.orderFactoringModel.accountStartDate" value-format="yyyyMMdd" disabled></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="受让应收账款结束日：">
                  <el-date-picker v-model="currentTrade.orderFactoringModel.accountEndDate" value-format="yyyyMMdd"  disabled></el-date-picker>&nbsp;共{{cacluateAccountDays}}天
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="订单融资月利率：">
                  <el-input disabled v-model="currentTrade.orderFactoringModel.factoringFinancingMonthRate">
                    <template slot="append">%</template>
                  </el-input>&nbsp;<zj-text-tip text="注：订单融资日利率=订单融资月利率/30"></zj-text-tip>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </zj-content>
      </zj-content-block>
      <zj-content-block v-if="isRD">
        <zj-header :title="`${prodInfo.rdProductName}业务设置-${currentTrade.buyerName}`"></zj-header>
        <zj-content>
          <el-row>
            <el-col :span="24">
              <el-form-item label="开单宽限天数：">
                {{currentTrade.openGraceDays}}天
              </el-form-item>
            </el-col>
          </el-row>
          <zj-table :dataList="currentTrade.billFactoringModelList" :pager="false">
            <zj-table-column
              field="field1"
              title="电子债权凭证期限（天）">
              <template v-slot="{row}">
                <span>{{row.rdDateStart}}</span>～
                <span>{{row.rdDateEnd}}</span>
              </template>
            </zj-table-column>
            <zj-table-column
              field="availableDiscountsRate"
              :formatter="rateEpd"
              title="凭证可用折扣"/>
            <zj-table-column
              field="rdFinancingMonthRate"
              :formatter="rateEpd"
              title="凭证融资月利率"/>
          </zj-table>
          <bill-info-text-tip></bill-info-text-tip>
        </zj-content>
      </zj-content-block>
      <!--  其他附件    -->
      <other-file-setting
        :attachList="currentTrade.attachModelList"
        :remark="currentTrade.currentTrade"></other-file-setting>
    </div>
  </el-form>
</template>
<script>
import {ProductType} from '@modules/constant.js';
import BillInfoTextTip from '../components/billInfoTextTip';
import OtherFileSetting from '../components/otherFileSetting';
export default {
  props: {
    tradeList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    prodInfo: Object,
    // 字典
    dic: Object,
  },
  watch: {
    tradeList: {
      deep: true,
      handler() {
        if (this.tradeList&& this.tradeList.length) {
          this.setFirstRow(this.tradeList[0])
        }
      }
    }
  },
  computed: {
    // 电子债券凭证
    isRD () {
      return this.prodInfo.productTypes.includes(ProductType.RD);
    },
    // 订单保理
    isDDBL () {
      return this.prodInfo.productTypes.includes(ProductType.DDBL);
    },
    cacluateAccountDays () {
      return Math.max(0,this.$moment(this.currentTrade.orderFactoringModel.accountEndDate).diff(this.currentTrade.orderFactoringModel.accountStartDate, 'days'));
    }
  },
  components: {
    BillInfoTextTip,
    OtherFileSetting
  },
  data () {
    return {
      // 默认勾选第一个供应商
      defaultSelectRowId: '',
      //当前选中的贸易对象
      currentTrade: {}
    };
  },
  methods: {
    /**
     * 默认选中第一行
     * @param row
     */
    setFirstRow(row) {
      this.$refs.tradeTable.setRadioRow(row);
      this.handleRadioChange({row});
    },
    handleRadioChange({row}) {
      this.currentTrade = row;
    }
  }
};
</script>
