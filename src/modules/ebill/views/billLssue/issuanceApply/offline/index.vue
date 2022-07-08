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

    <zj-list-layout>
      <template slot="searchForm">
        <el-form ref="searchForm" :model="searchForm">
          <el-form-item label="对账单编号：">
            <el-input
              v-model="searchForm.issueEntName"
              @keyup.enter.native="enterSearch"
            />
          </el-form-item>
          <el-form-item label="供应商业务系统编码：">
            <el-input
              v-model="searchForm.issueEntName"
              @keyup.enter.native="enterSearch"
            />
          </el-form-item>
          <el-form-item label="供应商名称：">
            <el-input
              v-model="searchForm.issueEntName"
              @keyup.enter.native="enterSearch"
            />
          </el-form-item>
          <el-form-item label="对账日期：" class="col-right">
            <zj-date-range-picker
              :startDate.sync="searchForm.expireDateStart"
              :endDate.sync="searchForm.expireDateEnd"
            />
          </el-form-item>
          <el-form-item label="预计付款日期：" class="col-right">
            <zj-date-range-picker
              :startDate.sync="searchForm.expireDateStart"
              :endDate.sync="searchForm.expireDateEnd"
            />
          </el-form-item>
        </el-form>
      </template>
      <div class="zj-search-response">
        <zj-table ref="searchTable" :params="searchForm" :api="''">
          <zj-table-column prop="id" title="对账单编号" />
          <zj-table-column field="" title="供应商编码" />
          <zj-table-column field="" title="供应商名称" />
          <zj-table-column field="" title="对账日期" :formatter="date" />
          <zj-table-column field="" title="对账单金额" />
          <zj-table-column field="" title="付款日期" :formatter="date" />
          <zj-table-column field="" title="开立凭证说明" />
          <zj-table-column title="操作" fixed="right">
            <template v-slot="{ row }">
              <zj-button type="text" @click="toDatails(row)"
                >维护组件</zj-button
              >
            </template>
          </zj-table-column>
        </zj-table>
        <zj-content style="padding-top: 0">
          <zj-content-tip
            text="注：1.凭证到期日=付款日期+开单宽限期限。"
          ></zj-content-tip>
        </zj-content>
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
    </zj-list-layout>
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
  methods: {
    toDatails(row) {
      this.$router.push("/offlineDatails");
    },
  },
};
</script>
<style lang="less" scoped>

.zj-search-condition {
  margin-top: 10px;
  margin-left: 20px;
}
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