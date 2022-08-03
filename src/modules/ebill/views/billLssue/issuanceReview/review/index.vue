<template>
  <zj-content-container>
    <ZjTopHeader>债权凭证签发复核</ZjTopHeader>
    <!-- 电子债权凭证信息 -->
    <zj-content-block>
      <zj-header>电子债权凭证信息</zj-header>
      <zj-content>
        <el-form ref="form" label-width="160px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="签发人：">
                {{ detailData.serialNo | value }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="供应商：">
                {{ detailData.serialNo | value }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="凭证到期日：">
                {{ detailData.serialNo | value }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="凭证金额：">
                {{ detailData.serialNo | value }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="开立凭证说明：">
                {{ detailData.serialNo | value }}
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </zj-content>
    </zj-content-block>
    <!-- 对账单信息 -->
    <zj-content-block>
      <zj-header>对账单信息</zj-header>
      <zj-table
        ref="searchTable"
        :pager="false"
        :params="searchForm"
        :api="zjControl.tableApi"
      >
        <zj-table-column prop="id" title="对账单编号" />
        <zj-table-column field="" title="买方名称" />
        <zj-table-column field="" title="供应商编码" />
        <zj-table-column field="" title="供应商名称" />
        <zj-table-column field="" title="对账日期" :formatter="date" />
        <zj-table-column field="" title="预计付款日期" :formatter="date" />
        <zj-table-column field="" title="对账单金额" :formatter="money" />
        <zj-table-column field="" title="是否开立凭证" />
        <zj-table-column field="" title="对账单来源" />
      </zj-table>
    </zj-content-block>

    <!-- 对账单明细 -->
    <zj-content-block>
      <zj-header>对账单明细</zj-header>
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
        <zj-table-column field="" title="入库数量" :formatter="money" />
        <zj-table-column field="" title="退货数量" :formatter="money" />
        <zj-table-column field="" title="等级" />
        <zj-table-column field="" title="订单单价" :formatter="money" />
        <zj-table-column field="" title="折价" />
        <zj-table-column field="" title="结算单价" :formatter="money" />
        <zj-table-column field="" title="税率%" :formatter="money" />
        <zj-table-column field="" title="净额" />
        <zj-table-column field="" title="税额" />
        <zj-table-column field="" title="总计金额" :formatter="money" />
      </zj-table>
    </zj-content-block>
    <zj-content-footer>
      <span style="display: inline-block; margin-right: 10px">
        <el-checkbox v-model="agreeCheck">我已阅读并同意</el-checkbox>&nbsp;
        <el-link :underline="false" type="primary">《开单确认书》</el-link>
      </span>
      <zj-button type="primary" @click="toReview">复核通过</zj-button>
      <zj-button @click="toReject">拒绝</zj-button>
      <zj-button @click="goParent">返回</zj-button>
    </zj-content-footer>
    <!--  拒绝弹框  -->
    <zj-reject-dialog
      ref="rejectDialog"
      @reject="reviewReject"
      title="提前还款复核拒绝"
      label="拒绝原因"
      message="请输入拒绝原因"
      :max="100"
    ></zj-reject-dialog>
  </zj-content-container>
</template>
<script>
export default {
  data() {
    return {
      zjControl: {},
      detailData: {},
      agreeCheck: false,
    };
  },
  created() {},
  methods: {
    toReview() {
      if (this.agreeCheck) {
        this.$confirm(
          `您本次提前还款金额：<b style="font-size: 18px;">${this.detailData.applyAmt}</b>元，请确认。`,
          "提前还款复核确认",
          {
            dangerouslyUseHTMLString: true,
            confirmButtonText: "确定",
            cancelButtonText: "取消",
          }
        ).then(() => {
        });
      } else {
        this.$alert("请阅读并同意《开单确认书》", "提示", {
          type: "warning",
        });
      }
    },
    toReject() {
      this.$refs.rejectDialog.open();
    },
    reviewReject(text) {
      let params = {
        id: this.row.id,
        submitFlag: "0",
      };
      this.zjControl.repaymentSubmit(params).then(() => {
        this.$message.success("拒绝成功！");
        this.goParent();
      });
      this.$refs.rejectDialog.close();
    },
  },
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