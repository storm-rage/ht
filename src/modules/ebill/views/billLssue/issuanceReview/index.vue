<template>
  <zj-content-container>
    <zj-list-layout>
      <template slot="searchForm"
        ><el-form ref="searchForm" :model="searchForm">
          <el-form-item label="供应商：">
            <el-input v-model="searchForm.receiptEntName" />
          </el-form-item>
          <el-form-item label="对账单编号：">
            <el-input v-model="searchForm.acctBillCode" />
          </el-form-item>
          <el-form-item label="申请日期：" class="col-right">
            <zj-date-range-picker
              :startDate.sync="searchForm.payableApplyDateStart"
              :endDate.sync="searchForm.payableApplyDateEnd"
            />
          </el-form-item>
          <el-form-item label="凭证编号：" class="col-center">
            <el-input
              v-model="searchForm.ebillCode"
              @keyup.enter.native="enterSearch"
            />
          </el-form-item>
        </el-form>
      </template>

      <zj-table
        ref="searchTable"
        :params="searchForm"
        :api="zjControl.tableApi"
        @checkbox-change="tableCheckChange"
        @checkbox-all="tableCheckChange"
      >
        <zj-table-column fixed="left" type="checkbox" width="50px" />
        <zj-table-column field="ebillCode" title="凭证编号" />
        <zj-table-column field="payEntName" title="凭证签发人" />
        <zj-table-column field="receiptEntName" title="供应商" />
        <zj-table-column
          field="ebillCode"
          title="凭证金额"
          :formatter="money"
        />
        <zj-table-column
          field="payableExpireDate"
          title="凭证到期日期"
          :formatter="date"
        />
        <zj-table-column field="payableNotes" title="开立凭证说明" />
        <zj-table-column
          field="payableApplyDate"
          title="申请时间"
          :formatter="date"
        />
        <zj-table-column field="acctBillCode" title="对账单编号" />
        <zj-table-column title="操作" fixed="right">
          <template>
            <zj-button
              type="text"
              @click="goChild('issuanceReview', row)"
              :api="zjBtn.cancelSubmit"
              >开单确认书</zj-button
            >
          </template>
          <template>
            <zj-button
              type="text"
              @click="toReview([row.id])"
              :api="zjBtn.cancelSubmit"
              >复核</zj-button
            >
          </template>
        </zj-table-column>
      </zj-table>
      <zj-content-footer>
        <span style="display: inline-block; margin-right: 5px">
          <el-checkbox v-model="agreeCheck"
            >已阅读并同意以上相关协议</el-checkbox
          >&nbsp;
        </span>
        <zj-button type="primary" @click="toReview(ids)">复核通过</zj-button>
        <zj-button type="primary" @click="toReject">拒绝</zj-button>
      </zj-content-footer>
      <!--  拒绝弹框  -->
      <zj-reject-dialog
        ref="rejectDialog"
        @reject="reviewReject"
        title="凭证签发复核拒绝"
        label="拒绝原因"
        message="请输入拒绝原因"
        :max="100"
      ></zj-reject-dialog>
    </zj-list-layout>
  </zj-content-container>
</template>
<script>
export default {
  data() {
    return {
      zjControl: this.$api.openBillAudit,
      searchForm: {},
      // 是否阅读协议
      agreeCheck: false,
      ids: [],
    };
  },
  created() {
    this.getApi();
  },
  methods: {
    toReview(ids) {
      if (this.agreeCheck) {
        let num, money;
        this.$confirm(
          `您本次复核同意签发<b style="font-size: 18px;">${num}</b>笔电子债权凭证，共计<b style="font-size: 18px;">${money}</b>元，请确认。`,
          "凭证签发复核确认",
          {
            dangerouslyUseHTMLString: true,
            confirmButtonText: "确定",
            cancelButtonText: "取消",
          }
        ).then(() => {
          let params = { ids: ids, operateType: "PASS" };
          this.zjControl.cancelSubmit(params).then((res) => {
            this.$message.success("申请成功!");
            this.search();
          });
        });
      } else {
        this.$alert("请阅读并同意《额度调整申请书》", "提示", {
          type: "warning",
        });
      }
    },
    tableCheckChange({ records }) {
      console.log(records);
      this.ids = [];
      records.forEach((item) => {
        this.ids.push(item.id);
      });
    },
    toReject() {
      this.$refs.rejectDialog.open();
    },
    reviewReject(text) {
      let params = {
        id: this.row.id,
        operateType: "REJECT",
        rejectNotes: text,
      };
      this.zjControl.cancelSubmit(params).then(() => {
        this.$message.success("拒绝成功！");
        this.search();
        this.$refs.rejectDialog.close();
      });
    },
  },
};
</script>
