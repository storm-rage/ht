<template>
    <zj-content-block>
      <zj-header :title="title"></zj-header>
      <zj-content>
        <zj-table :dataList="tableData" :pager="false">
          <zj-table-column field="supplierName" title="供应商名称"/>
          <zj-table-column field="supplierCode" title="供应商编码"/>
          <zj-table-column field="bizLicence" title="供应商统一社会信用代码"/>
        </zj-table>
      </zj-content>
    </zj-content-block>
</template>
<script>
export default {
  props: {
    title: String,
    tableData: Array,
  },
  data () {
    return {

    };
  },
  methods: {

  }
};
</script>
