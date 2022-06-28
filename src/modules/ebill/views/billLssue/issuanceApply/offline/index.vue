<template>
  <div>
    <div class="zj-search-condition">
      <el-row class="button-row">
        <el-button type="primary" @click="&quot;&quot;;"
          >上传开立凭证文件</el-button
        >
        <a class="file-download">点击下载《批量开立凭证导入模版》</a>
      </el-row>
    </div>
    <div class="zj-search-response">
      <zj-table ref="searchTable" :params="searchForm" :api="''">
        <zj-table-column prop="id" title="对账单编号" />
        <zj-table-column field="" title="供应商编码" />
        <zj-table-column field="" title="供应商名称" />
        <zj-table-column field="" title="对账日期" :formatter="date" />
        <zj-table-column field="" title="对账单金额" />
        <zj-table-column field="" title="付款日期" :formatter="date" />
        <zj-table-column field="" title="开立凭证说明" />
      </zj-table>
    </div>
    <!-- 工作流 -->
    <zj-workflow>
      <el-row slot="right">
        <zj-button @click="&quot;&quot;;" :api="zjBtn.passBillSignBatch"
          >签发凭证</zj-button
        >
        <zj-button @click="&quot;&quot;;" :api="zjBtn.passBillSignBatch"
          >删除</zj-button
        >
      </el-row>
    </zj-workflow>
  </div>
</template>
<script>
export default {
  data() {
    return {
      zjControl: {},
      searchForm: {},
      tableData: [{ id: 1 }],
    };
  },
  created() {
    this.getApi();
  },
  methods: {},
};
</script>
<style lang="less" scoped>
.file-download {
  vertical-align: bottom;
  padding-left: 20px;
}
/deep/#ZjWorkflow {
  .workflow-top {
    .el-row {
      padding: 5px 0 0;
      text-align: center;
    }
  }
  .workflow-bottom {
    .right {
      width: 100%;
      text-align: center;
    }
  }
}

</style>