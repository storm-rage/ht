<template>
  <zj-content-block>
    <zj-top-header title="债权凭证作废复核" />
    <zj-content>
      <!--凭证详情-->
      <zj-content>
        <el-row>
          <el-col :span="12">作废原因：{{ detailData.rejectNotes }}</el-col>
          <el-col :span="12">对账单编号：{{ detailData.acctBillCode }}</el-col>
        </el-row>
      </zj-content>
      <div>
        <span>融单编号：{{ detailData.ebillCode }}</span>
      </div>
      <table
        class="detail-table"
        border="0"
        cellspacing="0"
        cellpadding="0"
        width="100%"
      >
        <tr>
          <td colspan="3" class="right">融单开立方</td>
          <td colspan="3">{{ detailData.payEntName }}</td>
          <td colspan="3" class="right">统一社会信用代码</td>
          <td colspan="3">{{ detailData.payBizLicence }}</td>
        </tr>
        <tr>
          <td rowspan="4" colspan="3">融单接收方</td>
          <td rowspan="4" colspan="3">{{ detailData.receiptEntName }}</td>
          <td colspan="3">统一社会信用代码</td>
          <td colspan="3">{{ detailData.holderBizLicence }}</td>
        </tr>
        <tr>
          <td colspan="3">开户行</td>
          <td colspan="3">{{ detailData.receiptBankName }}</td>
        </tr>
        <tr>
          <td colspan="3">银行账号</td>
          <td colspan="3">{{ detailData.receiptBankAccno }}</td>
        </tr>
        <tr>
          <td colspan="3">联行号</td>
          <td colspan="3">{{ detailData.receiptBankNo }}</td>
        </tr>
        <tr>
          <td rowspan="2">融单</td>
          <td colspan="2">金额（大写）</td>
          <td colspan="9">
            <span style="float: left">{{ detailData.ebillAmtUpper }}</span>
            <span style="float: right">（小写）{{ detailData.ebillAmt }}</span>
          </td>
        </tr>
        <tr>
          <td colspan="2">开立日期</td>
          <td colspan="3">{{ detailData.openDate }}</td>
          <td colspan="3">到期日期</td>
          <td colspan="3">{{ detailData.expireDate }}</td>
        </tr>
        <tr>
          <td colspan="12">
            我司同意按照
            <zj-button type="text" @click="attaDownload"
              >《开单确认书》</zj-button
            >
            的约定，到期无条件向融单最终持有人兑付融单项下全部应付款项。
          </td>
        </tr>
        <tr>
          <td colspan="12" align="left">
            <div>备注：</div>
            <div>{{ detailData.remark }}</div>
          </td>
        </tr>
        <tr>
          <td colspan="12" align="left">
            <div class="">企业签章：</div>
            <div>
              <span v-for="item in detailData.entSignatures" :key="item">
                <img
                  :src="'data:image/png;base64,' + item"
                  alt="签章图片"
                  width="150"
                  height="150"
                />
              </span>
            </div>
          </td>
        </tr>
      </table>
    </zj-content>

    <zj-content-footer>
      <zj-button type="primary" @click="toReview">复核通过</zj-button>
      <zj-button @click="toReject">拒绝</zj-button>
      <zj-button type="back" @click="goParent">返回</zj-button>
    </zj-content-footer>

    <!--  拒绝弹框  -->
    <zj-reject-dialog
      ref="rejectDialog"
      @reject="reviewReject"
      title="债权凭证作废复核拒绝"
      label="拒绝原因"
      message="请输入拒绝原因"
      :max="100"
    ></zj-reject-dialog>
  </zj-content-block>
</template>

<script>
export default {
  name: "billSignForDetail",
  data() {
    return {
      zjControl: this.$api.billRejectAudit,
      detailData: {},
    };
  },
  methods: {
    attaDownload() {},
    toReview() {
      this.$confirm(
        `您本次复核同意作废<b style="font-size: 18px;">1</b>笔电子债权凭证，<br/>
          共计：<b style="font-size: 18px;">${this.detailData.ebillAmt}</b>元<br/>请确认`,
        "债权凭证作废复核确认",
        {
          dangerouslyUseHTMLString: true,
          confirmButtonText: "确定",
          cancelButtonText: "取消",
        }
      ).then(() => {
        let params = { ebillCode: this.row.ebillCode, invalidReviewFlag: "1" };
        this.zjControl.submitRejectAudit(params).then((res) => {
          this.$message.success("复核通过!");
          this.goParent();
        });
      });
    },
    getRejectAuditDetail() {
      let params = {
        ebillCode: this.row.ebillCode,
      };
      this.zjControl.getRejectAuditDetail(params).then((res) => {
        this.detailData = res.data;
      });
    },

    //拒绝
    toReject() {
      this.$refs.rejectDialog.open();
    },
    reviewReject(text) {
      let params = {
        ebillCode: this.row.ebillCode,
        invalidReviewFlag: "2",
        rejectNotes: text,
      };
      this.zjControl.submitRejectAudit(params).then(() => {
        this.$message.success("拒绝成功！");
        this.goParent();
        this.$refs.rejectDialog.close();
      });
    },
  },
  created() {
    this.getApi();
    this.getRow();
    this.getRejectAuditDetail();
  },
};
</script>

<style scoped lang="less">
.detail-table {
  border-collapse: collapse;
  text-align: center;
  th,
  td {
    border: 1px solid #dcdfe6;
    padding: 10px;
  }
}
</style>
