<template>
  <div>
    <zj-content-block>
      <zj-header title="贸易合同附件"></zj-header>
      <zj-content>
        <zj-table ref="searchContractTable"  :dataList="tableData" :pager="false">
          <zj-table-column type="seq" title="序号" width="60px"/>
          <zj-table-column field="fileName" title="合同附件"/>
          <zj-table-column field="fileRemark" title="附件说明"/>
          <zj-table-column title="操作" fixed="right">
            <template v-slot="{row}">
              <zj-button type="text" @click="downLoad(row)">下载</zj-button>
            </template>
          </zj-table-column>
        </zj-table>
      </zj-content>
    </zj-content-block>
  </div>
</template>
<script>
import baseCommon from "../../../../../../base/api/baseCommonApi";

export default {
  props: {
    tableData: Array,
  },
  components: {},
  data () {
    return {
      zjControl: {
        downLoadFile:this.$api.baseCommon.downloadFile,
      },
    }
  },
  methods: {
    downLoad(row) {
      this.zjControl.downLoadFile({...row,fileUrl: row.fileId})
    }
  }
};
</script>
