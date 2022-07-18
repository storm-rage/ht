<template>
  <div>
    <zj-content-block>
      <zj-header title="贸易关系"></zj-header>
      <zj-content>
        <zj-table ref="searchContractTable"  :dataList="tradeList">
          <zj-table-column field="field1" title="核心企业编码"/>
          <zj-table-column field="field1" title="核心企业名称"/>
          <zj-table-column field="field2" title="核心企业是否海天集团"/>
          <zj-table-column field="field4" title="保理标识"/>
          <zj-table-column field="field8" title="贸易关系状态"/>
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
          field5: '12',
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
    }
  }
};
</script>
