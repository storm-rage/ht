<template>
  <div>
    <zj-table ref="searchTable" :dataList="list" >
      <zj-table-column field="invoiceType" title="发票类型"/>
      <zj-table-column field="invoiceNumber" title="发票号码"/>
      <zj-table-column field="invoiceCode" title="发票代码"/>
      <zj-table-column field="sellAmount" title="发票金额"/>
      <zj-table-column field="seller" title="销售方" />
      <zj-table-column field="buyer" title="购买方" />
      <zj-table-column field="invoiceDate	" title="发票日期" :formatter="date"/>
      <zj-table-column field="fileName" title="发票附件" />
      <zj-table-column title="操作" fixed="right">
        <template v-slot="{row}">
          <zj-button type="text" @click="downs(row)">下载</zj-button>
        </template>
      </zj-table-column>
    </zj-table>

  </div>
</template>

<script>
export default {
  name: "invoice",
  data() {
    return {
      zjControl: {
        downloadFile:this.$api.baseCommon.downloadFile,//文件下载
      },
      form: {},
      list: [
        {
          field1: 'scm00001',
          field2: '某某产品一号',
          field3: '上游',
          field4: '订单保理',
          field5: '2022.09.08 11:18:19',
          field6: '生效',
          field7: '是'
        }
      ],
    }
  },
  methods: {
    downs(row){
      this.zjControl.downloadFile(row.fileId)
    },
  },
}
</script>

<style scoped>

</style>
