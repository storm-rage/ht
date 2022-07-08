<template>
  <div>
   <!-- 基础信息   -->
    <base-payment-info is-bill></base-payment-info>
    <zj-content-block>
      <zj-header title="待确认收款凭证"></zj-header>
      <zj-content>
        <zj-table ref="billTable"
                  :pager="false"
                  :dataList="billList" >
          <zj-table-column field="field1" title="凭证编号"/>
          <zj-table-column field="field2" title="签发人"/>
          <zj-table-column
            field="field3"
            title="原始持有人"
          />
          <zj-table-column
            field="field4"
            title="签发日期"
          />
          <zj-table-column field="field5" title="凭证金额" :formatter="money"/>
          <zj-table-column field="field6" title="凭证到期日" />
          <zj-table-column field="field7" title="备注"/>
          <zj-table-column field="field8" title="确认凭证金额" :formatter="money"/>
          <zj-table-column field="field9" title="凭证实际到期日"/>
        </zj-table>
      </zj-content>
    </zj-content-block>
  </div>
</template>
<script>
/**
 * 凭证收款信息
 */
import BasePaymentInfo from './basePaymentInfo';
export default {
  components: {
    BasePaymentInfo
  },
  data () {
    return {
      billList: [
        {
          field1: '5435435435',
          field2: '犯得上发射点',
          field3: '房贷首付',
          field4: '2022-10-10',
          field5: '100000',
          field6: '2022-10-10',
          field7: '的事发生发射点反对十分士大夫十分士大夫的',
          field8: '20000',
          field9: '2023-10-10'
        }
      ]
    }
  }
};
</script>
