<template>
  <el-form ref="form" label-width="160px">
    <!-- 基础信息   -->
    <zj-content-block>
      <zj-header title="基础信息"></zj-header>
      <zj-content>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="收款人名称：">
              {{baseInfo.repaymentEntName}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="签发人：">
              {{baseInfo.payEntName}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="待清算尾款金额总计：">
              {{money(baseInfo.totaloddAmt)}}
            </el-form-item>
          </el-col>
        </el-row>
        <zj-collapse title="供应商收款银行账号" class="zj-m-t-10">
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="收款账户名称：">
                {{baseInfo.bankAccname}}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="收款账号：">
                {{baseInfo.bankAccno}}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="收款账户开户行：">
                {{baseInfo.bankName}}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="银行联行号：">
                {{baseInfo.bankNo}}
              </el-form-item>
            </el-col>
          </el-row>
        </zj-collapse>
      </zj-content>
    </zj-content-block>
    <!--   待清算凭证尾款   -->
    <zj-content-block>
      <zj-header title="待清算凭证尾款"></zj-header>
      <zj-content>
        <zj-table ref="billTable"
                  :pager="false"
                  @radio-change="handleRadioChange"
                  :radio-config="{highlight: true}"
                  :dataList="billList">
          <zj-table-column type="radio" width="40px" fixed="left"></zj-table-column>
          <zj-table-column field="rootCode" title="原始凭证编号"/>
          <zj-table-column field="repaymentOrderNo" title="收款单号"/>
          <zj-table-column
            field="capitalSerialno"
            title="资金流水号"
          />
          <zj-table-column
            field="ebillCode"
            title="凭证编号"
          >
            <template v-slot="{row}">
              <el-link @click="toViewDetail(row)" type="primary" :underline="false">{{row.ebillCode}}</el-link>
            </template>
          </zj-table-column>
          <zj-table-column field="payEntName" title="签发人"/>
          <zj-table-column field="openDate" title="签发日期" />
          <zj-table-column field="ebillAmt" title="凭证金额" :formatter="money"/>
          <zj-table-column field="oddAmt" title="尾款金额" :formatter="money"/>
          <zj-table-column field="expireDate" title="凭证到期日" :formatter="date"/>
          <zj-table-column field="actualExpireDate" title="凭证实际到期日" :formatter="date"/>
          <zj-table-column field="repaymentEntName" title="收款人"/>
        </zj-table>
      </zj-content>
    </zj-content-block>
    <zj-content-block v-if="currentSelectBill.id">
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
            <el-form-item label="实际计息天数：">
              {{financingInfo.estimateDays}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="实际利息：">
              {{money(financingInfo.interestAmt)}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="实际尾款金额：">
              {{money(financingInfo.oddAmt)}}
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
  beforeCreate() {
    this.getDic();
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
        clearId: this.currentSelectBill.id
      }).then(res => {
        this.financingInfo = res.data;
      });
    },
    toViewDetail (row) {}
  }
}
</script>
