<template>
  <div>
    <zj-table ref="searchTable" :dataList="list" >
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
