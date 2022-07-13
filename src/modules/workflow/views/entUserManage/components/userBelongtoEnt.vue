<template>
  <zj-content-block>
    <zj-header title="用户归属企业信息"></zj-header>
    <zj-content>
      <zj-table :dataList="fileList">
        <zj-table-column field="field1" title="企业代码" />
        <zj-table-column field="field2" title="客户业务系统编码" />
        <zj-table-column field="field3" title="企业名称" />
        <zj-table-column field="field3" title="是否海天集团" />
        <zj-table-column field="field3" title="平台客户类型" />
        <zj-table-column field="field3" title="创建日期" />
        <zj-table-column field="field3" title="企业状态" />
        <zj-table-column field="field3" title="用户状态" />
        <zj-table-column field="field4" title="角色" />
      </zj-table>
    </zj-content>
  </zj-content-block>
</template>
<script>
// 操作记录
export default {
  data() {
    return {};
  },
};
</script>
