<template>
  <zj-content-block>
    <zj-header title="操作记录"></zj-header>
    <zj-content>
      <zj-table ref="logTable" >
        <zj-table-column type="seq" width="60" title="序号"/>
        <zj-table-column field="field2" title="业务节点"/>
        <zj-table-column
          field="field3"
          title="处理人"
        />
        <zj-table-column
          field="field4"
          title="处理时间"
        />
        <zj-table-column field="field5" title="审核结果"/>
        <zj-table-column field="field6" title="审核意见"/>
      </zj-table>
    </zj-content>
  </zj-content-block>
</template>
<script>
// 操作记录
export default {
  data () {
    return {};
  }
}
</script>
