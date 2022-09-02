<template>
  <zj-content-block>
    <div class="zj-center mb-20">融单编号：{{ dataForm.ebillCode }}</div>
    <zj-content>
      <!--凭证详情-->
      <zj-collapse :title="`根单编号${ dataForm.rootCode }`">
        <table
          class="detail-table"
          border="0"
          cellspacing="0"
          cellpadding="0"
          width="100%"
        >
          <tr>
            <td rowspan="3" class="right">开单企业</td>
            <td>企业名称</td>
            <td colspan="2">{{ dataForm.payEntName }}</td>
            <td rowspan="5" class="right">收单企业</td>
            <td>企业名称</td>
            <td colspan="2">{{ dataForm.receiptEntName }}</td>
          </tr>
          <tr>
            <td colspan="1" rowspan="2">统一社会信用代码</td>
            <td colspan="2" rowspan="2">{{ dataForm.payBizLicence }}</td>
            <td>统一社会信用代码</td>
            <td colspan="2">{{ dataForm.receiptBizLicence }}</td>
          </tr>
          <tr>
            <td>开户行</td>
            <td colspan="2">{{ dataForm.receiptBankName }}</td>
          </tr>
          <tr>
            <td colspan="2">开单日期</td>
            <td colspan="2">{{ dataForm.openDate?date(dataForm.openDate):'' }}</td>
            <td>银行账号</td>
            <td colspan="2">{{ dataForm.receiptBankAccno }}</td>
          </tr>
          <tr>
            <td colspan="2">到期日期</td>
            <td colspan="2">{{ dataForm.expireDate?date(dataForm.expireDate):'' }}</td>
            <td>联行号</td>
            <td colspan="2">{{ dataForm.receiptBankNo }}</td>
          </tr>
          <tr>
            <td colspan="2">金额</td>
            <td colspan="6">（大写）{{ dataForm.ebillAmtUpper }}元 （小写）{{ dataForm.ebillAmt }}</td>
          </tr>
          <tr>
            <td colspan="2">开单说明</td>
            <td colspan="6">{{ dataForm.remark }}</td>
          </tr>
          <tr>
            <td colspan="8"><span class="underline red"></span></td>
          </tr>
<!--          <tr>-->
<!--            <td colspan="8" align="left">-->
<!--              <div class="">签章处:</div>-->
<!--              <div>-->
<!--                &lt;!&ndash; <span v-for="item in detailData.billInfo.entSignatures" :key="item">-->
<!--                      <img :src="'data:image/png;base64,'+item" alt="签章图片" width="150" height="150">-->
<!--                    </span> &ndash;&gt;-->
<!--              </div>-->
<!--            </td>-->
<!--          </tr>-->
        </table>
      </zj-collapse>
    </zj-content>
  </zj-content-block>
</template>

<script>
export default {
  name: 'billDetail',
  props: {
    dataForm: Object,
  },
  data() {
    return {

    };
  },
  methods: {

  },
  created() {
  },
};
</script>

<style scoped lang="less">
.detail-table {
  border-collapse: collapse;
  text-align: center;
  th,td {
    border: 1px solid #DCDFE6;
    padding: 10px;
  }
}
</style>
