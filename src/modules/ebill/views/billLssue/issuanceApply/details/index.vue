<template>
  <div id="transactionQueryDetails">
    <el-row class="ta-c mb-20">
      <label class="jc20">产品开通申请</label>
    </el-row>
    <!-- 折叠面板 -->
    <el-collapse ref="elCollapse" v-model="collActive" class="zjcoll-noSelect">
      <!-- 对账单信息 -->
      <el-collapse-item name="orderInfo" :disabled="true">
        <template slot="title">
          <h4 class="orderTitle">对账单信息</h4>
        </template>
        <zj-table
          ref="searchTable"
          :params="searchForm"
          :api="zjControl.tableApi"
        >
          <zj-table-column prop="id" title="对账单编号" />
          <zj-table-column field="" title="买方名称" />
          <zj-table-column field="" title="供应商编码" />
          <zj-table-column field="" title="供应商名称" />
          <zj-table-column field="" title="对账日期" :formatter="date" />
          <zj-table-column field="" title="预计付款日期" :formatter="date" />
          <zj-table-column field="" title="对账单金额" />
          <zj-table-column field="" title="是否开立凭证" />
          <zj-table-column field="" title="对账单来源" />
        </zj-table>
      </el-collapse-item>

      <!-- 对账单明细 -->
      <el-collapse-item name="orderInfo" :disabled="true">
        <template slot="title">
          <h4 class="orderTitle">对账单明细</h4>
        </template>
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
    <!-- 工作流 -->
    <zj-workflow>
      <el-row slot="right">
        <zj-button
          class="back"
          @click="$router.push('/issuanceApply')"
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