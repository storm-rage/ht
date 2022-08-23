<template>
  <div>
    <zj-table ref="searchTable" :dataList="dataList" >
      <zj-table-column field="contractNo" title="贸易合同编号"/>
      <zj-table-column field="buyerSigner" title="买方"/>
      <zj-table-column field="sellerSigner" title="卖方"/>
      <zj-table-column field="contractMonthLimit" title="合同期限（月）" :formatter="date"/>
      <zj-table-column field="contractAmt" title="合同金额" :formatter="money"/>
      <zj-table-column field="signDate" title="签订日期"  :formatter="date"/>
      <zj-table-column field="goodsName" title="货物名称"/>
      <zj-table-column field="fileName" title="合同附件" />
      <zj-table-column field="agreementNo" title="阶段性协议编号" />
      <zj-table-column field="agreementName" title="阶段性协议名称" />
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
  name: "tradeContract",
  props: {
    dataList: Array,
  },
  data() {
    return {

    }
  },
  methods: {
    downLoad(row) {
      this.$api.baseCommon.downloadFile({
        fileUrl:row.fileId,
        fileName:row.fileName,
      })
    }
  },
}
</script>

<style scoped>

</style>
