<template>
  <div>
    <zj-content-block>
      <zj-header title="协议信息"/>
      <zj-table ref="searchTable" class="zj-search-table" :dataList="dataList" :pager="false"
      >
        <zj-table-column type="seq" title="序号" />
        <zj-table-column field="agreementCode" title="协议编号" />
        <zj-table-column field="agreementName" title="协议名称" />
        <zj-table-column title="操作" >
          <template v-slot="{row}">
            <zj-button type="text" @click="agreementDownLoad(row)">下载</zj-button>
          </template>
        </zj-table-column>
      </zj-table>
    </zj-content-block>
  </div>
</template>

<script>
export default {
  name: "agreementInfoList",
  props: {
    dataList: Array,
  },
  data() {
    return {
      agreementDownLoad(row) {
        this.$api.baseCommon.downloadFile({
          fileId: row.fileId,
          fileName: row.fileName,
        })
      }

    }
  },
  methods: {

  },
}
</script>

<style scoped>

</style>
