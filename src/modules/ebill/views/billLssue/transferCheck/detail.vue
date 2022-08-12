<template>
  <zj-content-container>
    <zj-top-header>凭证转让复核</zj-top-header>
    <zj-header>交易信息</zj-header>
    <el-form ref="form" label-width="160px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="申请流水号：">
            {{ detailData.serialNo | value }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="转让凭证总数：">
            {{ detailData.serialNo | value }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="转让总金额：">
            {{ detailData.serialNo | value }}
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <zj-content-block>
      <zj-header>电子债权凭证信息</zj-header>
      <zj-content>
        <zj-table>
          <zj-table-column field="ebillCode" title="原始凭证编号">
          </zj-table-column>
          <zj-table-column field="issueEntName" title="凭证编号" />
          <zj-table-column field="ebillAmt" title="签发人" :formatter="money" />
          <zj-table-column
            field="transferAmt"
            title="原始持有人"
            :formatter="money"
          />
          <zj-table-column
            field="splusAmt"
            title="凭证签发日"
            :formatter="money"
          />
          <zj-table-column
            field="issueDate"
            title="凭证到期日"
            :formatter="date"
          />
          <zj-table-column
            field="receiveDate"
            title="转让企业"
            :formatter="date"
          />
          <zj-table-column
            field="expireDate"
            title="凭证金额"
            :formatter="date"
          />
          <zj-table-column
            field="expireDate"
            title="凭证签收日"
            :formatter="date"
          />
          <zj-table-column
            field="state"
            title="凭证状态"
            :formatter="
              (obj) => typeMap(dictionary.enterpriseStateList, obj.cellValue)
            "
          />
          <zj-table-column title="操作" fixed="right">
            <template v-slot="{ row }">
              <zj-button
                type="text"
                @click="goChild('entManageDetail', row)"
                :api="zjBtn.getEnterprise"
                >贸易背景</zj-button
              >
            </template>
          </zj-table-column>
        </zj-table>
      </zj-content>
    </zj-content-block>

    <zj-content-block>
      <zj-header>转让信息</zj-header>
      <zj-content>
        <zj-table>
          <zj-table-column field="issueEntName" title="凭证编号" />
          <zj-table-column field="ebillCode" title="被转让人名称">
          </zj-table-column>
          <zj-table-column
            field="ebillAmt"
            title="转让金额"
            :formatter="money"
          />
          <zj-table-column field="issueEntName" title="收款账号" />
          <zj-table-column field="issueEntName" title="收款账户户名" />
          <zj-table-column field="issueEntName" title="收款银行联行号" />
          <zj-table-column field="issueEntName" title="收款账户开户行" />
          <zj-table-column field="issueEntName" title="备注" />
          <zj-table-column title="操作" fixed="right">
            <template v-slot="{ row }">
              <zj-button
                type="text"
                @click="goChild('entManageDetail', row)"
                :api="zjBtn.getEnterprise"
                >相关协议</zj-button
              >
            </template>
          </zj-table-column>
        </zj-table>
      </zj-content>
    </zj-content-block>

    <zj-content-footer>
      <span style="display: inline-block; margin-right: 10px">
        <el-checkbox v-model="agreeCheck" class="check-text"
          >已阅读并同意以上相关协议</el-checkbox
        >
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
    <!-- 云证书签章 -->
    <zj-certuficate ref="certuficate" @confirm="confirm" />
  </zj-content-container>
</template>

<script>
export default {
  data() {
    return {
      zjControl: {},
      agreeCheck: false,
      detailData: {},
    };
  },
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
      let params = {};
      this.zjControl.repaymentSubmit(params).then(() => {
        this.$message.success("复核通过！");
        this.goParent();
      });
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