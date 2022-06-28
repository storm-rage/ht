<template>
  <div id="transactionQueryDetails">
    <el-row class="ta-c mb-20">
      <label class="jc20">应收账款转让通知详情</label>
    </el-row>
    <!-- 折叠面板 -->
    <el-collapse ref="elCollapse" v-model="collActive" class="zjcoll-noSelect">
      <!-- 基础信息 -->
      <el-collapse-item name="orderInfo" :disabled="true">
        <template slot="title">
          <h4 class="orderTitle">基础信息</h4>
        </template>
        <el-row class="infoItem rzjycx zj-p-l-30 mt-10">
          <el-col :span="8">
            <label>申请流水号：</label>
            <span>1</span>
          </el-col>
          <el-col :span="8">
            <label>转出企业：</label>
            <span>2</span>
          </el-col>
          <el-col :span="8">
            <label style="width: 120px">签收企业/资金方：</label>
            <span style="width: calc(100% - 120px)">3</span>
          </el-col>
          <el-col :span="8">
            <label>转让日期：</label>
            <span>4</span>
          </el-col>
          <el-col :span="8">
            <label>签署回执时间：</label>
            <span>5</span>
          </el-col>
        </el-row>
      </el-collapse-item>

      <!-- 协议信息 -->
      <el-collapse-item name="orderInfo" :disabled="true">
        <template slot="title">
          <h4 class="orderTitle mb-10">协议信息</h4>
        </template>
        <zj-table
          ref="searchTable"
          :params="searchForm"
          :api="zjControl.tableApi"
        >
          <zj-table-column field="issueEntName" title="序号" />
          <zj-table-column field="issueEntName" title="协议附件" />
          <zj-table-column title="操作" fixed="right">
            <template>
              <zj-button
                type="text"
                @click="&quot;&quot;;"
                :api="zjBtn.getEnterprise"
                >下载</zj-button
              >
            </template>
          </zj-table-column>
        </zj-table>
      </el-collapse-item>
    </el-collapse>
    <!-- 工作流 -->
    <zj-workflow>
      <el-row slot="right">
        <zj-button
          class="back"
          @click="$router.push('/transactionQuery')"
          :api="zjBtn.passBillSignBatch"
          >返回</zj-button
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
      collActive: ["orderInfo"],
      checked: false,
    };
  },
  created() {},
  methods: {},
};
</script>
<style lang="less" scoped>
#transactionQueryDetails {
  padding: 20px 0;
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