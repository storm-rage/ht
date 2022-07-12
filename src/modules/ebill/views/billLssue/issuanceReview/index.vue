<template>
  <zj-content-container>
    <zj-list-layout>
      <template slot="searchForm"
        ><el-form ref="searchForm" :model="searchForm">
          <el-form-item label="供应商：">
            <el-input v-model="searchForm.issueEntName" />
          </el-form-item>
          <el-form-item label="对账单编号：">
            <el-input v-model="searchForm.issueEntName" />
          </el-form-item>
          <el-form-item label="申请日期：" class="col-right">
            <zj-date-range-picker
              :startDate.sync="searchForm.expireDateStart"
              :endDate.sync="searchForm.expireDateEnd"
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
      >
        <zj-table-column fixed="left" type="checkbox" width="50px" />
        <zj-table-column field="ebillCode" title="凭证编号">
          <template v-slot="{ row }">
            <span class="table-elbill-code" @click="toBillDetails(row)">{{
              row.ebillCode
            }}</span>
          </template>
        </zj-table-column>
        <zj-table-column field="issueEntName" title="凭证签发人" />
        <zj-table-column field="transferAmt" title="供应商" />
        <zj-table-column field="ebillAmt" title="凭证金额" :formatter="money" />
        <zj-table-column
          field="issueDate"
          title="凭证到期日期"
          :formatter="date"
        />
        <zj-table-column field="transferAmt" title="开立凭证说明" />
        <zj-table-column
          field="receiveDate"
          title="申请日期"
          :formatter="date"
        />
        <zj-table-column field="expireDate" title="对账单编号" />
        <zj-table-column title="操作" fixed="right">
          <template>
            <zj-button
              type="text"
              @click="&quot;&quot;;"
              :api="zjBtn.getEnterprise"
              >开单确认书</zj-button
            >
          </template>
          <template>
            <zj-button
              type="text"
              @click="&quot;&quot;;"
              :api="zjBtn.getEnterprise"
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
        <zj-button type="primary" @click="toReview">复核通过</zj-button>
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
      zjControl: {},
      searchForm: {},
      // 是否阅读协议
      agreeCheck: false,
    };
  },
  created() {
    this.getApi();
  },
  methods: {
    toBillDetails(row) {
      console.log(row);
    },
    toReview() {
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
          // todo:请求
        });
      } else {
        this.$alert("请阅读并同意《额度调整申请书》", "提示", {
          type: "warning",
        });
      }
    },
    toReject() {
      this.$refs.rejectDialog.open();
    },
    reviewReject(text) {
      this.$refs.rejectDialog.close();
    },
  },
};
</script>
