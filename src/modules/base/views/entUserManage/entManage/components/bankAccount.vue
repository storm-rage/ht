<template>
  <zj-content-block>
    <zj-collapse title="银行账户">
      <zj-table :pager="false" :dataList="dataList">
        <zj-table-column field="changeTime" title="银行账户名称" />
        <zj-table-column field="changeItem" title="银行账号" />
        <zj-table-column field="changeItem" title="银行账户开户行" />
        <zj-table-column field="changeItem" title="银行联行号" />
        <zj-table-column field="changeItem" title="银行类型" />
        <zj-table-column field="changeItem" title="核查方式" />
      </zj-table>
    </zj-collapse>
  </zj-content-block>
</template>
<script>
// 业务申请信息
export default {
  components: {},

  data() {
    return {
      dataList: []
    };
  },
};
</script>
