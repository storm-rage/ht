<template>
  <div>
    <h1 class="top_titel">凭证转让申请</h1>

    <h1 slot="title" class="orderTitle bl">电子债权凭证信息</h1>

    <zj-table :params="searchForm">
      <zj-table-column field="ebillCode" title="原始凭证编号">
      </zj-table-column>
      <zj-table-column field="issueEntName" title="凭证编号" />
      <zj-table-column field="ebillAmt" title="签发人" :formatter="money" />
      <zj-table-column
        field="transferAmt"
        title="原始持有人"
        :formatter="money"
      />
      <zj-table-column field="splusAmt" title="凭证签发日" :formatter="money" />
      <zj-table-column field="issueDate" title="凭证到期日" :formatter="date" />
      <zj-table-column field="receiveDate" title="转让企业" :formatter="date" />
      <zj-table-column field="expireDate" title="凭证金额" :formatter="date" />
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
            >转让申请</zj-button
          >
        </template>
      </zj-table-column>
    </zj-table>

    <h1 slot="title" class="orderTitle bl">转让信息</h1>

    <el-form ref="searchForm" :model="searchForm">
      <el-form-item label="被转让人名称：">
        <el-select v-model="contractType">
          <el-option value="1" />
          <el-option value="2" />
          <el-option value="3" />
        </el-select>
      </el-form-item>

      <el-form-item label="转让金额：">
        <el-input
          v-model="searchForm.issueEntName"
          @keyup.enter.native="enterSearch"
        />
      </el-form-item>

      <el-form-item label="收款账号："> </el-form-item>

      <el-form-item label="收款账户户名：">
        <el-input
          v-model="searchForm.issueEntName"
          @keyup.enter.native="enterSearch"
        />
      </el-form-item>

      <el-form-item label="收款银行联行号：">
        <el-input
          v-model="searchForm.issueEntName"
          @keyup.enter.native="enterSearch"
        />
      </el-form-item>

      <el-form-item label="收款账户开户行：">
        <el-input
          v-model="searchForm.issueEntName"
          @keyup.enter.native="enterSearch"
        />
      </el-form-item>
    </el-form>

    <el-form-item label="收款账户开户行：">
      备注：<el-input
        type="textarea"
        autosize
        :rows="2"
        placeholder="请输入内容"
        v-model="textarea"
      >
      </el-input>
    </el-form-item>

    <div class="down">
      <el-row class="button-row">
        <el-button class="reset" type="primary" @click="dialogVisible = true"
          >转让申请</el-button
        >
        <el-button class="search" type="primary" @click="reTrun"
          >返回</el-button
        >
      </el-row>
    </div>

    <el-dialog
      title="额度调整申请确认"
      width="30%"
      :visible.sync="dialogVisible"
    >
      <div data-v-2cce9ee5="" class="money-block">
        <span data-v-2cce9ee5="" class="text">您本次申请调整额度：</span
        ><span data-v-2cce9ee5="" class="money">411,909,755.60</span
        ><span data-v-2cce9ee5="" class="tips-text">元，请确认。</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="binGo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchForm: {},
      formInline: {
        user: "",
        region: "",
      },
      dialogVisible: false,
      textarea: "",
      applicationStatus: "待复核",
      contractType: "1",
    };
  },
  methods: {
    reTrun() {
      this.$router.push("/quotaChangeApplication");
    },
    reviewApproved() {
      this.dialogVisible == true;
    },
    binGo() {
      this.dialogVisible == false;
      this.$router.push("/quotaChangeApplication");
    },
  },
};
</script>

<style scoped>
.top_titel {
  width: 100%;
  height: 27px;
  font-size: 25px;
  text-align: center;
  margin: 30px 0 30px 0;
}

.demo-form-inline {
  margin: 0 0 0 40px;
}

.down_tip {
  margin: 10px 0 0 -125px;
}

a:active {
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  -webkit-user-select: none;
  -moz-user-focus: none;
  -moz-user-select: none;
}

.down {
  margin-left: 750px;
}
</style>