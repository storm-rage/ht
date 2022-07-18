<template>
  <div>
    <zj-content-block>
      <zj-header title="操作记录"></zj-header>
      <zj-content>
        <zj-table ref="searchContractTable"  :dataList="tradeList">
          <zj-table-column field="index" title="序号" width="60px"/>
          <zj-table-column field="field1" title="业务节点"/>
          <zj-table-column field="field1" title="处理人"/>
          <zj-table-column field="field5" title="处理时间" :formatter="date"/>
          <zj-table-column field="field1" title="审核结果"/>
          <zj-table-column field="field1" title="审核意见"/>
        </zj-table>
      </zj-content>
    </zj-content-block>
  </div>
</template>
<script>
export default {
  components: {},
  data () {
    return {
      tradeList: [
        {
          field1: '海天高明公司',
          field2: '是',
          field3: '655555333544',
          field4: '非保理',
          field5: '20220520',
          field6: '100000',
          field7: '20000',
          field8: '正常'
        }
      ]
    };
  },
  methods: {
    toEditTrade (row) {
      this.$refs.tradeEditDetail.show(row,true)
    },
    viewTradeDetail (row) {
      this.$refs.tradeEditDetail.show(row,false)
    },
    downLoad(row) {

    }
  }
};
</script>
