<template>
  <div>
    <zj-content-block>
      <zj-header title="贸易关系"></zj-header>
      <zj-content>
        <zj-table ref="searchTable" :dataList="tableData" :pager="false">
          <zj-table-column field="buyerCode" title="核心企业编码"/>
          <zj-table-column field="buyerName" title="核心企业名称"/>
          <zj-table-column field="isHtEnterprise" title="核心企业是否海天集团"/>
          <zj-table-column field="cactoringLogo" title="保理标识"/>
          <zj-table-column field="tradeState" title="贸易关系状态" />
        </zj-table>
      </zj-content>
    </zj-content-block>
  </div>
</template>
<script>
export default {
  props: {
    tableData: Array,
    dictionary: Object,
  },
  data () {
    return {

    };
  },
  methods: {

  }
};
</script>
