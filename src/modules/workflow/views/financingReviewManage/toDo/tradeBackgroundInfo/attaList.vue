<template>
  <div>
    <zj-table ref="searchTable" :dataList="dataList" >
      <zj-table-column type="seq" title="序号"/>
      <zj-table-column field="fileName" title="文件名称"/>
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
  name: "attaList",
  props: {
    dataList: Array,
  },
  data() {
    return {
    }
  },
  methods: {
    downs(row){
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
