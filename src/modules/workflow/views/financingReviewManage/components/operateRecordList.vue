<template>
  <zj-content-block>
    <zj-header title="操作记录"/>
    <zj-content>
      <zj-table ref="logTable"
                :dataList="logList"
                :pager="false"
      >
        <zj-table-column type="seq" width="60" title="序号"/>
        <zj-table-column field="tranType" title="业务节点"/>
        <zj-table-column field="creator" title="处理人"/>
        <zj-table-column field="createDatetime" title="处理时间"/>
        <zj-table-column field="operFlag" title="审批结果"/>
        <zj-table-column field="notes" title="审批意见"/>
      </zj-table>
    </zj-content>
  </zj-content-block>
</template>
<script>
// 操作记录
export default {
  name:'operateRecordList',
  props: {
    logList:{
      type: Array,
      required: true
    }
  },
  data () {
    return {};
  }
}
</script>
