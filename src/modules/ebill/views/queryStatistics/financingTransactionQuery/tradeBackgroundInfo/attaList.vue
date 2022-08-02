<template>
  <div>
    <zj-table ref="searchTable" :dataList="attaList" >
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
    attaList:Array,
  },
  data() {
    return {
      zjControl: {
        downloadFile:this.$api.baseCommon.downloadFile,//文件下载
      },
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
