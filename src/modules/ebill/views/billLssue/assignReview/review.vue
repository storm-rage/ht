<template>
  <zj-content-container>
    <zj-top-header>凭证转让复核</zj-top-header>
    <zj-header>交易信息</zj-header>
    <el-form ref="form" label-width="160px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="申请流水号：">
            {{ detailData.getEbBillTranferInfo.serialNo | value }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="转让凭证总数：">
            {{ detailData.getEbBillTranferInfo.tranNumber | value }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="转让总金额：">
            {{ detailData.getEbBillTranferInfo.tranAmt | value }}
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <zj-content-block>
      <zj-header>电子债权凭证信息</zj-header>
      <zj-content>
        <zj-table :dataList="detailData.getEbBillBasicInfoList">
          <zj-table-column field="rootCode" title="原始凭证编号">
          </zj-table-column>
          <zj-table-column field="ebillCode" title="凭证编号" />
          <zj-table-column field="payEntName" title="签发人" :formatter="money" />
          <zj-table-column field="receiptEntName" title="原始持有人" :formatter="money" />
          <zj-table-column field="payableIssuanceDate" title="凭证签发日" :formatter="money" />
          <zj-table-column field="payableExpireDate" title="凭证到期日" :formatter="date" />
          <zj-table-column field="holderName" title="转让企业" :formatter="date" />
          <zj-table-column field="ebillAmt" title="凭证金额" :formatter="date" />
          <zj-table-column field="holderDate" title="凭证签收日" :formatter="date" />
          <zj-table-column field="stateDesc" title="凭证状态" />
          <zj-table-column title="操作" fixed="right">
            <template v-slot="{ row }">
              <zj-button type="text" @click="goChild('entManageDetail', row)" :api="zjBtn.getEnterprise">贸易背景</zj-button>
            </template>
          </zj-table-column>
        </zj-table>
      </zj-content>
    </zj-content-block>

    <zj-content-block>
      <zj-header>转让信息</zj-header>
      <zj-content>
        <zj-table :dataList="detailData.getEbBillBankInfoList">
          <zj-table-column field="ebillCode" title="凭证编号" />
          <zj-table-column field="receiptEntName" title="被转让人名称">
          </zj-table-column>
          <zj-table-column field="tranAmt" title="转让金额" :formatter="money" />
          <zj-table-column field="receiptAcctNo" title="收款账号" />
          <zj-table-column field="receiptAcctName" title="收款账户户名" />
          <zj-table-column field="receiptBankNo" title="收款银行联行号" />
          <zj-table-column field="receiptBankName" title="收款账户开户行" />
          <zj-table-column field="remark" title="备注" />
          <zj-table-column title="操作" fixed="right">
            <template v-slot="{ row }">
              <zj-button type="text" @click="goChild('entManageDetail', row)" :api="zjBtn.getEnterprise">相关协议</zj-button>
            </template>
          </zj-table-column>
        </zj-table>
      </zj-content>
    </zj-content-block>

    <zj-content-footer>
      <span style="display: inline-block; margin-right: 10px">
        <el-checkbox v-model="agreeCheck" class="check-text">已阅读并同意以上相关协议</el-checkbox>
      </span>
      <zj-button type="primary" @click="toReview">复核通过</zj-button>
      <zj-button @click="toReject">拒绝</zj-button>
      <zj-button @click="goParent">返回</zj-button>
    </zj-content-footer>
    <!--  拒绝弹框  -->
    <zj-reject-dialog ref="rejectDialog" @reject="reviewReject" title="提前还款复核拒绝" label="拒绝原因" message="请输入拒绝原因" :max="100"></zj-reject-dialog>
    <!-- 云证书签章 -->
    <zj-certuficate ref="certuficate" @confirm="confirm" />
  </zj-content-container>
</template>

<script>
export default {
  data() {
    return {
      zjControl: this.$api.billAssignReview,
      agreeCheck: false,
      detailData: {
        getEbBillBankInfoList: [],
        getEbBillBasicInfoList: [],
        getEbBillTranferInfo: {}
      },
    };
  },
  created() {
    this.getRow()
    this.getBillApplyReviewDetail()
  },
  methods: {
    // 获取详情
    getBillApplyReviewDetail() {
      this.zjControl.getBillApplyReviewDetail({ id: this.row.id }).then((res) => {
        this.detailData = res.data;
      });
    },
    toReview() {
      if (this.agreeCheck) {
        this.$confirm(
          `您本次申请转让<b style="font-size: 18px;">${this.detailData.getEbBillTranferInfo.tranNumber}</b>笔电子债权凭证,共计：
          <b style="font-size: 18px;">${this.detailData.getEbBillTranferInfo.tranAmt}</b>元，请确认`,
          "转让复核确认",
          {
            dangerouslyUseHTMLString: true,
            confirmButtonText: "确定",
            cancelButtonText: "取消",
          }
        ).then(() => {
          this.$refs.certuficate.open(); //打开云证书
        });
      } else {
        this.$alert("请阅读并同意相关协议", "提示", {
          type: "warning",
        });
      }
    },
    //云证书确认事件
    confirm() {
      let params = {
        id: this.row.id,
        operResult: "0"
      };
      this.zjControl.sumbitEbBillReview(params).then(() => {
        this.$message.success("复核通过！");
        this.goParent();
      });
    },
    reviewReject(text) {
      let params = {
        id: this.row.id,
        operResult: "1",
        rejectReason: text
      };
      this.zjControl.sumbitEbBillReview(params).then(() => {
        this.$message.success("拒绝成功！");
        this.goParent();
      });
      this.$refs.rejectDialog.close();
    },
    toReject() {
      this.$refs.rejectDialog.open();
    },
  },
};
</script>

<style lang="less" scoped>
.detail {
  .btnBox {
    display: inline-block;
    margin-left: 10px;
  }
}
</style>