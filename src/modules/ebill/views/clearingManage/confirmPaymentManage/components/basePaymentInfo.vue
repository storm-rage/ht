<template>
  <el-form ref="form" label-width="160px">
    <zj-content-block>
      <zj-header title="基础信息"></zj-header>
      <zj-content>
        <el-row :gutter="10" v-if="isBill">
          <el-col :span="8">
            <el-form-item label="确认收款总金额：">
              {{money(billInfo.confirmRepaymentTotalAmt)}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="确认收款日期：">
              {{date(billInfo.confirmRepaymentDate)}}
            </el-form-item>
          </el-col>
        </el-row>
        <zj-table ref="supplierTable"
                  :pager="false"
                  :dataList="[bankCapitalFlow]" >
          <zj-table-column field="capitalSerialno" title="资金流水号"/>
          <zj-table-column field="payerEntName" title="付款方名称"/>
          <zj-table-column
            field="repayAmt"
            title="收款金额"
            :formatter="money"
          />
          <zj-table-column
            field="repayDate"
            title="收款时间"
          />
          <zj-table-column field="repayEntName" title="收款方名称"/>
          <zj-table-column field="repayAcctNo" title="收款账号" />
          <zj-table-column field="outOrederNo" title="业务系统单号"/>
          <zj-table-column field="relationAmt" title="已关联金额" :formatter="money"/>
          <zj-table-column field="entShortName" title="供应商简称"/>
        </zj-table>
      </zj-content>
    </zj-content-block>
  </el-form>
</template>
<script>
/**
 * 凭证收款和非凭证收款基础信息
 */
export default {
  props: {
    // 是否是凭证收款
    isBill: {
      type: Boolean,
      default: true
    },
    // bill信息
    billInfo: Object,
    // 银行流水信息
    bankCapitalFlow: {
      type: Object,
      required: true
    }
  }
}
</script>
