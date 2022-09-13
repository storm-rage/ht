<template>
  <div>
    <zj-content-block>
      <zj-header title="操作记录"></zj-header>
      <zj-content>
        <zj-table ref="searchContractTable"  :dataList="tableData">
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
  props: {
    tableData: Array
  },
  data () {
    return {
    };
  },
  methods: {}
};
</script>
