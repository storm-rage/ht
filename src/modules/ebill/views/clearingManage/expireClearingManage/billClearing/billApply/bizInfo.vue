<template>
  <el-form ref="form" label-width="160px">
    <!-- 基础信息   -->
    <zj-content-block>
      <zj-header title="基础信息"></zj-header>
      <zj-content>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="当前持有人名称：">
              {{baseInfo.holderName}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="签发人：">
              {{baseInfo.payEntName}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="待清算凭证金额总计：">
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
    <!--   待清算凭证   -->
    <zj-content-block>
      <zj-header title="待清算凭证"></zj-header>
      <zj-content>
        <zj-table ref="billTable"
                  :pager="false"
                  :dataList="billList" >
          <zj-table-column field="rootCode" title="原始凭证编号"/>
          <zj-table-column field="repaymentOrderNo" title="收款单号"/>
          <zj-table-column
            field="capitalSerialno"
            title="资金流水号"
          />
          <zj-table-column
            field="ebillCode"
            title="凭证编号"
          />
          <zj-table-column field="payEntName" title="签发人"/>
          <zj-table-column field="openDate" title="签发日期" />
          <zj-table-column field="receiptEntName" title="原始持有人"/>
          <zj-table-column field="holderName" title="当前持有人"/>
          <zj-table-column field="ebillAmt" title="凭证金额" :formatter="money"/>
          <zj-table-column field="expireDate" title="凭证到期日"/>
          <zj-table-column field="actualExpireDate" title="凭证实际到期日"/>
          <zj-table-column field="payAmt" title="最终付款金额" :formatter="money"/>
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
