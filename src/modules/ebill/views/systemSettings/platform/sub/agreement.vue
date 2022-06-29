<template>
  <div>
    <zj-table ref="tradeTable" class="zj-search-table orderTable"
              :dataList="dataList" :pager="false" keep-source
    >
      <zj-table-column type="seq" title="序号" width="60"/>
      <zj-table-column field="name" title="协议名称" width="500"/>
<!--      <zj-table-column field="agreementType" title="协议类型" width="230"/>-->
      <zj-table-column field="agreementVersion" title="版本号" width="200"/>
      <zj-table-column field="remark" title="说明"/>
      <zj-table-column title="操作" fixed="right" width="200">
        <template v-slot="{row}">
          <zj-button type="text" @click="downloadProtocol(row)" :api="zjBtn.downloadProtocolPubProject">下载</zj-button>
        </template>
      </zj-table-column>
    </zj-table>
  </div>
</template>
<script>
export default {
  props: {
    dics: Object,
    dataList: Array
  },
  data () {
    return {
      zjControl:{
        downloadProtocolPubProject:this.$api.pubProjectSetting.downloadProtocolPubProject,//下载协议
      }
    };
  },
  created() {
    this.getRow()
    this.getApi()
  },
  methods: {
    downloadProtocol (row) {
      let params = {
        id: row.id,
        protocolName: row.name
      }
      this.zjControl.downloadProtocolPubProject(params);
    },
  }
};
</script>
<style lang="less" scoped></style>
