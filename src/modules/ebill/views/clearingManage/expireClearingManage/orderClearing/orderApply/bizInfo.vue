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
          <el-col :span="8">
            <el-form-item label="待清算金额总计：">
              {{money(baseInfo.totalEbillAmt)}}
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
    <!--   待清算订单清单   -->
    <zj-content-block>
      <zj-header title="待清算订单清单"></zj-header>
      <zj-content>
        <zj-table ref="billTable"
                  :pager="false"
                  :dataList="billList" >
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
          <zj-table-column field="capitalSerialno" title="融资流水号" />
          <zj-table-column field="repaymentOrderNo" title="收款单号"/>
          <zj-table-column field="confirmRepaymentDate" title="确认收款日期" :formatter="date"/>
          <zj-table-column field="confirmRepaymentAmt" title="确认收款金额" :formatter="money"/>
          <zj-table-column field="actualPaymentAmt" title="实际付款金额" :formatter="money"/>
        </zj-table>
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
  }
}
</script>
