<template>
  <div>
    <zj-table ref="searchTable" :dataList="dataList" >
      <zj-table-column field="invoiceType" title="发票类型"/>
      <zj-table-column field="invoiceNumber" title="发票号码"/>
      <zj-table-column field="invoiceCode" title="发票代码"/>
      <zj-table-column field="totalAmtLowcase" title="发票金额" :formatter="money"/>
      <zj-table-column field="seller" title="销售方" />
      <zj-table-column field="buyer" title="购买方" />
      <zj-table-column field="invoiceDate" title="发票日期" :formatter="date"/>
      <zj-table-column field="fileName" title="发票附件" />
      <zj-table-column title="操作" fixed="right">
        <template v-slot="{row}">
          <zj-button type="text" @click="downLoad(row)">下载</zj-button>
        </template>
      </zj-table-column>
    </zj-table>

  </div>
</template>

<script>
export default {
  name: "invoice",
  props: {
    dataList: Array,
  },
  data() {
    return {
    }
  },
  methods: {
    downLoad(row){
      this.$api.baseCommon.downloadFile({
        fileId: row.fileId,
        fileName: row.fileName,
      })
    },
  },
}
</script>

<style scoped>

</style>
