<template>
  <el-form ref="form" label-width="160px">
    <!-- 基础信息   -->
    <zj-content-block>
      <zj-header title="基础信息"></zj-header>
      <zj-content>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="供应商名称：">
              {{baseInfo.holderName}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="核心企业名称：">
              {{baseInfo.payEntName}}
            </el-form-item>
          </el-col>
        </el-row>
      </zj-content>
    </zj-content-block>
    <!--   待清算提前收款   -->
    <zj-content-block>
      <zj-header title="待清算提前收款"></zj-header>
      <zj-content>
        <zj-table ref="billTable"
                  :pager="false"
                  @radio-change="handleRadioChange"
                  :radio-config="{highlight: true}"
                  :dataList="billList" >
          <zj-table-column type="radio" width="40px" fixed="left"></zj-table-column>
          <zj-table-column field="payEntCode" title="核心企业代码"/>
          <zj-table-column field="payEntName" title="核心企业名称"/>
          <zj-table-column
            field="holderCode"
            title="供应商编码"
          />
          <zj-table-column
            field="holderName"
            title="供应商名称"
          >
          </zj-table-column>
          <zj-table-column field="repaymentOrderNo" title="收款单号"/>
          <zj-table-column field="financingSerialno" title="融资流水号" />
          <zj-table-column field="preRepaymentDate" title="提前还款日期" :formatter="date"/>
          <zj-table-column field="preRepaymentAmt" title="提前还款金额" :formatter="money"/>
          <zj-table-column field="repaymentPrincipal" title="还款本金" :formatter="money"/>
          <zj-table-column field="repaymentInterest" title="还款利息" :formatter="money"/>
        </zj-table>
      </zj-content>
    </zj-content-block>
    <zj-content-block v-if="currentSelectBill.clearId">
      <zj-header :title="`融资详情-${currentSelectBill.ebillCode}`"></zj-header>
      <zj-content>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="融资流水号：">
              {{financingInfo.financingSerialno}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="放款单号：">
              {{financingInfo.paymentOrderNo}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="融资金额：">
              {{money(financingInfo.ebillAmt)}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="融资类型：">
              {{typeMap(dictionary.financingProductTypeList,financingInfo.financingType)}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="融资开始日：">
              {{financingInfo.applyDatetime}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="融资到期日：">
              {{financingInfo.expireDate}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="实际融资到期日：">
              {{financingInfo.actualExpireDate}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="融资月利率：">
              {{financingInfo.interestRate}}%
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="已还款本金：">
              {{money('1000000000')}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="往期未偿还利息：">
              {{money('1000000000')}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="利息起算日：">
              2023-09-08
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="本次还款日期：">
              2023-09-08
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="本次计息天数：">
              30
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="本次还款金额：">
              {{money('122222')}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="本次还款本金：">
              {{money('122222')}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="本次还款利息：">
              {{money('122222')}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="还款状态：">
              {{typeMap(dictionary.payStatusList,financingInfo.payStatus)}}
            </el-form-item>
          </el-col>
        </el-row>
      </zj-content>
    </zj-content-block>
  </el-form>
</template>
<script>
/**
 * 业务信息，工作流共享
 */
export default {
  props: {
    baseInfo: {
      type: Object,
      default:() => {
        return {};
      }
    },
    billList: {
      type: Array,
      default:() => {
        return [];
      }
    }
  },
  watch: {
    billList: {
      deep: true,
      handler() {
        if (this.billList && this.billList.length) {
          this.setFirstRow(this.billList[0]);
        }
      }
    }
  },
  data () {
    return {
      zjControl: {
        getFinanceDetails: this.$api.expireClearingManage.getFinanceDetails,
        getDictionary: this.$api.expireClearingManage.getBillClearDictionary
      },
      // 当前选中的行
      currentSelectBill: {},
      // 凭证关联的融资信息
      financingInfo: {},
      dictionary: {}
    }
  },
  methods: {
    getDic() {
      this.zjControl.getDictionary().then(res => {
        this.dictionary = res.data
      });
    },
    /**
     * 默认选中第一行
     * @param row
     */
    setFirstRow(row) {
      this.$refs.billTable.setRadioRow(row);
      this.handleRadioChange({row});
    },
    handleRadioChange({row}) {
      this.currentSelectBill = row;
      this.getFinancingInfo();
    },
    /**
     * 根据选择的清算记录获取融资详情
     */
    getFinancingInfo() {
      this.zjControl.getFinanceDetails({
        clearId: this.currentSelectBill.clearId
      }).then(res => {
        this.financingInfo = res.data;
      });
    },
  }
}
</script>
