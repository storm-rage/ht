<template>
  <div>
    <zj-content-block>
      <zj-header title="贸易合同附件"></zj-header>
      <zj-content>
        <zj-table ref="searchContractTable"  :dataList="tradeList">
          <zj-table-column field="index" title="序号" width="60px"/>
          <zj-table-column field="field1" title="合同附件"/>
          <zj-table-column field="field1" title="附件说明"/>
          <zj-table-column title="操作" fixed="right">
            <template v-slot="{row}">
              <zj-button type="text" @click="downLoad(row)">下载</zj-button>
            </template>
          </zj-table-column>
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
    },
    downLoad(row) {

    }
  }
};
</script>
