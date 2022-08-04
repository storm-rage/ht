<template>
  <zj-content-container>
    <zj-top-header>债权凭证签发复核</zj-top-header>
    <!-- 电子债权凭证信息 -->
    <zj-content-block>
      <zj-header>电子债权凭证信息</zj-header>
      <zj-content>
        <el-form ref="form" label-width="160px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="签发人：">
                {{ detailData.payEntName | value }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="供应商：">
                {{ detailData.receiptEntName | value }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="凭证到期日：">
                {{ detailData.payableExpireDate | value }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="凭证金额：">
                {{ detailData.payableAmt | value }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="开立凭证说明：">
                {{ detailData.payableNotes | value }}
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </zj-content>
    </zj-content-block>
    <!-- 对账单信息 -->
    <zj-content-block>
      <zj-header>对账单信息</zj-header>
      <zj-table ref="billTable" :pager="false" :api="zjControl.tableApi">
        <zj-table-column prop="acctBillCode" title="对账单编号" />
        <zj-table-column field="companyName" title="买方名称" />
        <zj-table-column field="supplierCode" title="供应商编码" />
        <zj-table-column field="supplierName" title="供应商名称" />
        <zj-table-column
          field="checkBillDate"
          title="对账日期"
          :formatter="date"
        />
        <zj-table-column
          field="estimatedPaymentDate"
          title="预计付款日期"
          :formatter="date"
        />
        <zj-table-column
          field="checkBillAmt"
          title="对账单金额"
          :formatter="money"
        />
        <zj-table-column field="isIssueVoucher" title="是否开立凭证" />
        <zj-table-column field="billSource" title="对账单来源" />
      </zj-table>
    </zj-content-block>

    <!-- 对账单明细 -->
    <zj-content-block>
      <zj-header>对账单明细-{{ detailData.acctBillCode }}</zj-header>
      <zj-table ref="searchTable" :api="zjControl.billDetailList">
        <zj-table-column prop="poNo" title="po单号" />
        <zj-table-column field="dnNo" title="dn单号" />
        <zj-table-column field="matterCode" title="物料编码" />
        <zj-table-column field="matterName" title="物料名称" />
        <zj-table-column field="unit" title="单位" />
        <zj-table-column field="inputDate" title="入库日期" :formatter="date" />
        <zj-table-column field="storeHouse" title="仓库" />
        <zj-table-column
          field="inputNumber"
          title="入库数量"
          :formatter="money"
        />
        <zj-table-column
          field="returnDate"
          title="退货数量"
          :formatter="money"
        />
        <zj-table-column field="level" title="等级" />
        <zj-table-column
          field="orderPrice"
          title="订单单价"
          :formatter="money"
        />
        <zj-table-column field="convertPrice" title="折价" />
        <zj-table-column
          field="settleAccountPrice"
          title="结算单价"
          :formatter="money"
        />
        <zj-table-column field="taxRate" title="税率%" :formatter="money" />
        <zj-table-column field="netAmount" title="净额" />
        <zj-table-column field="taxAmount" title="税额" />
        <zj-table-column
          field="totalAmount"
          title="总计金额"
          :formatter="money"
        />
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
      zjControl: this.$api.openBillAudit,
      detailData: {},
      agreeCheck: false,
      billTable: [], //对账单信息
    };
  },
  created() {
    this.getBillDetail();
    this.getDirectory();
  },
  methods: {
    // 获取字典
    getDirectory() {
      this.zjControl.getDirectory().then((res) => {
        this.dictionary = res.data;
      });
    },
    // 获取详情
    getBillDetail() {
      this.zjControl
        .getBillDetail({ acctBillCode: this.row.id })
        .then((res) => {
          this.detailData = res.data;
          this.billTable = [res.data];
        });
    },
    toReview() {
      if (this.agreeCheck) {
        this.$confirm(
          `您本次复核同意签发<b style="font-size: 18px;">${this.detailData.applyAmt}</b>笔电子债权凭证，<br/>
          共计：<b style="font-size: 18px;">${this.detailData.applyAmt}</b>元请确认<br>注：确认后进入盖章环节，如有需要，请及时联系签章人员！`,
          "凭证签发复核确认",
          {
            dangerouslyUseHTMLString: true,
            confirmButtonText: "确定",
            cancelButtonText: "取消",
          }
        ).then(() => {});
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