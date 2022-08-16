<template>
  <div id="transactionQueryDetails">
    <ZjTopHeader>债权凭证签发申请</ZjTopHeader>
    <!-- 折叠面板 -->
    <el-collapse ref="elCollapse" v-model="collActive" class="zjcoll-noSelect">
      <!-- 对账单信息 -->
      <el-collapse-item name="orderInfo" :disabled="true">
        <ZjHeader>签发债权凭证信息</ZjHeader>

        <el-row class="infoItem">
          <el-col :span="8">
            <label>签发人： </label>
            <span>上海电气股份有限公司</span>
          </el-col>
          <el-col :span="8">
            <label>签收企业： </label>
            <span>广州材料工程有限公司</span>
          </el-col>
          <el-col :span="8">
            <label>对账单编号：</label>
            <span>test</span>
          </el-col>

          <el-col :span="8">
            <label>凭证金额： </label>
            <span>100,000,000.00</span>
          </el-col>
          <el-col :span="8">
            <label>凭证到期日： </label>
            <span>2022.04.07</span>
          </el-col>
          <el-col :span="8">
            <label>开立凭证说明：</label>
            <span>test</span>
          </el-col>
        </el-row>

        <h3 class="myTitles">收款银行账户</h3>
        <zj-table
          ref="searchTable"
          :params="searchForm"
          :api="zjControl.tableApi"
        >
          <zj-table-column prop="id" title="收款账户户名" />
          <zj-table-column field="" title="收款账号" />
          <zj-table-column field="" title="收款银行联行号" />
          <zj-table-column field="" title="收款账户开户行" />
        </zj-table>
      </el-collapse-item>

      <el-collapse-item name="orderInfo" :disabled="true">
        <ZjHeader
          >贸易合同
          <template slot="right">
            <div class="addBtns">
              <i class="el-icon-circle-plus-outline"></i>
              <span>新增</span>
            </div>
          </template></ZjHeader
        >
        <zj-table
          ref="searchTable"
          :params="searchForm"
          :api="zjControl.tableApi"
        >
          <zj-table-column prop="id" title="合同类型" />
          <zj-table-column field="" title="基础交易合同编号" />
          <zj-table-column field="" title="基础交易合同名称" />
          <zj-table-column field="" title="合同金额" />
          <zj-table-column field="" title="合同日期" :formatter="date" />
          <zj-table-column field="" title="上传文件名称" />
          <zj-table-column title="操作" fixed="right">
            <template v-slot="{ row }">
              <zj-button type="text" @click="previewFile(row)" v-if="row.fileId"
                >查看</zj-button
              >
              <zj-button type="text" @click="downs(row)" v-if="row.fileId"
                >下载</zj-button
              >
            </template>
          </zj-table-column>
        </zj-table>
      </el-collapse-item>

      <el-collapse-item name="orderInfo" :disabled="true">
        <ZjHeader>发票信息</ZjHeader>
        <zj-table
          ref="searchTable"
          :params="searchForm"
          :api="zjControl.tableApi"
        >
          <zj-table-column prop="id" title="发票联系" />
          <zj-table-column field="" title="发票代码" />
          <zj-table-column field="" title="发票号码" />
          <zj-table-column field="" title="旅行日期" :formatter="date" />
          <zj-table-column field="" title="发票金额(含税)" />
          <zj-table-column field="" title="发票金额(含税)" />
          <zj-table-column field="" title="发票使用金额" />
          <zj-table-column title="操作" fixed="right">
            <template v-slot="{ row }">
              <zj-button type="text" @click="previewFile(row)" v-if="row.fileId"
                >查看</zj-button
              >
              <zj-button type="text" @click="downs(row)" v-if="row.fileId"
                >下载</zj-button
              >
            </template>
          </zj-table-column>
        </zj-table>
      </el-collapse-item>

      <!-- 对账单明细 -->
      <el-collapse-item name="orderInfo" :disabled="true">
        <ZjHeader
          >其他附件
          <template slot="right">
            <div class="addBtns">
              <i class="el-icon-circle-plus-outline"></i>
              <span>新增</span>
            </div>
          </template></ZjHeader
        >
        <zj-table
          ref="searchTable"
          :params="searchForm"
          :api="zjControl.tableApi"
        >
          <zj-table-column prop="id" title="DN合并号" />
          <zj-table-column field="" title="客户编号" />
          <zj-table-column field="" title="客户名称" />
          <zj-table-column field="" title="旅行日期" :formatter="date" />
          <zj-table-column field="" title="运输方式" />
          <zj-table-column field="" title="路径描述" />
          <zj-table-column field="" title="重量" />
          <zj-table-column field="" title="数量" />
          <zj-table-column field="" title="单价" />
          <zj-table-column field="" title="基本运费" />
          <zj-table-column field="" title="扣罚金额" />
          <zj-table-column field="" title="实际总运费" />
        </zj-table>
      </el-collapse-item>
    </el-collapse>
    <ZjContentFooter
      >
      <zj-button type="primary">提交复核</zj-button>
      <zj-button
        class="back"
        @click="handleBack"
        :api="zjBtn.passBillSignBatch"
        >返回</zj-button
      ></ZjContentFooter
    >
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
  methods: {
    handleBack() {
      this.$store.commit('tab/tabDel',this.$route)
      this.$router.push('/openBillApply')
    }
  },
};
</script>
<style lang="less" scoped>
#transactionQueryDetails {
  padding: 20px 0;

  h3.myTitles {
    padding: 0 10px;
  }

  .addBtns {
    i {
      color: #165dff;
      font-size: 14px;
    }
    span {
      color: #165dff;
      font-size: 14px;
      margin-left: 4px;
    }
  }
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