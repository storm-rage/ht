<template>
  <zj-content-block>
    <zj-header title="操作记录"></zj-header>
    <zj-content>
      <zj-table ref="logTable"
                :dataList="logList"
                :pager="false">
        <zj-table-column type="seq" width="60" title="序号"/>
        <zj-table-column field="operType" title="业务节点"/>
        <zj-table-column
          field="operPerson"
          title="处理人"
        />
        <zj-table-column
          field="operDatetime"
          title="处理时间"
        />
        <zj-table-column field="operResult" title="审核结果"/>
        <zj-table-column field="notes" title="审核意见"/>
      </zj-table>
    </zj-content>
  </zj-content-block>
</template>
<script>
// 操作记录
export default {
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
