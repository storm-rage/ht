<template>
  <div id="transactionQueryDetails">
    <el-row class="ta-c mb-20">
      <label class="jc20">凭证签发复核</label>
    </el-row>
    <!-- 折叠面板 -->
    <el-collapse ref="elCollapse" v-model="collActive" class="zjcoll-noSelect">
      <!-- 交易信息 -->
      <el-collapse-item class="mb-20" name="orderInfo" :disabled="true">
        <template slot="title">
          <h4 class="orderTitle">电子债权凭证信息</h4>
        </template>
        <el-row class="infoItem rzjycx zj-p-l-30">
          <el-col :span="8">
            <label>签发人：</label>
            <span>1</span>
          </el-col>
          <el-col :span="8">
            <label>供应商：</label>
            <span>2</span>
          </el-col>
          <el-col :span="8">
            <label>凭证到期日：</label>
            <span>3</span>
          </el-col>
          <el-col :span="8">
            <label>凭证金额：</label>
            <span>5</span>
          </el-col>
        </el-row>
      </el-collapse-item>
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
          <zj-table-column prop="id" title="po单号" />
          <zj-table-column field="" title="dn单号" />
          <zj-table-column field="" title="物料编码" />
          <zj-table-column field="" title="物料名称" />
          <zj-table-column field="" title="单位" />
          <zj-table-column field="" title="入库日期" :formatter="date" />
          <zj-table-column field="" title="仓库" />
          <zj-table-column field="" title="入库数量" />
          <zj-table-column field="" title="退货数量" />
          <zj-table-column field="" title="等级" />
          <zj-table-column field="" title="订单单价" />
          <zj-table-column field="" title="折价" />
          <zj-table-column field="" title="结算单价" />
          <zj-table-column field="" title="税率%" />
          <zj-table-column field="" title="净额" />
          <zj-table-column field="" title="税额" />
          <zj-table-column field="" title="总计金额" />
        </zj-table>
      </el-collapse-item>
    </el-collapse>
    <!-- 工作流 -->
    <el-row class="ta-c w85 fixed-footer-btns">
      <el-row class="ta-c w85 zj-m-b-5">
        <el-checkbox v-model="XYchecked" class="check-text"
          >已阅读并同意协议</el-checkbox
        >
      </el-row>
      <div>
        <zj-button @click="&quot;&quot;;" :api="zjBtn.passRecheck"
          >复核通过</zj-button
        >
        <zj-button
          class="btn-warning"
          @click="&quot;&quot;;"
          :api="zjBtn.rejectRecheck"
          >拒绝</zj-button
        >
        <zj-button
          class="back"
          @click="$router.push('/issuanceReview')"
          :api="zjBtn.passBillSignBatch"
          >返回</zj-button
        >
      </div>
    </el-row>
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