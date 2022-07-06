<template>
  <div class="detail">
    <ZjTopHeader>凭证转让复核</ZjTopHeader>

    <ZjHeader>交易信息</ZjHeader>
    <el-row class="infoItem">
      <el-col :span="8">
        <label>申请流水号： </label>
        <span>1</span>
      </el-col>
      <el-col :span="8">
        <label>转让凭证总数： </label>
        <span>2</span>
      </el-col>
      <el-col :span="8">
        <label>转让总金额：</label>
        <span>3</span>
      </el-col>
    </el-row>

    <ZjHeader>电子债权凭证信息</ZjHeader>
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
            >贸易背景</zj-button
          >
        </template>
      </zj-table-column>
    </zj-table>

    <ZjHeader>转让信息</ZjHeader>
    <zj-table :params="searchForm">
      <zj-table-column field="issueEntName" title="凭证编号" />
      <zj-table-column field="ebillCode" title="被转让人名称">
      </zj-table-column>
      <zj-table-column field="ebillAmt" title="转让金额" :formatter="money" />
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

    <ZjContentFooter>
      <el-checkbox v-model="protocolCheck" class="check-text"
        >已阅读并同意以上相关协议</el-checkbox
      >
      <div class="btnBox">
        <zj-button type="primary" @click="check">复核通过</zj-button>
        <zj-button @click="dialogVisible2 = true">拒绝</zj-button>
        <zj-button @click="reTrun">返回</zj-button>
      </div>
    </ZjContentFooter>

    <el-dialog
      :title="showAttest ? '转让复核确认' : '云证书验证'"
      width="30%"
      :visible.sync="dialogVisible"
    >
      <div class="money-block" v-if="showAttest">
        <p class="text">您本次申请转让40笔电子债权凭证，共计：</p>
        <p class="money">1,232,231.00元，</p>
        <p class="tips-text">请确认。</p>
      </div>
      <div v-else class="attest">
        <div class="exp zj-m-b-5">
          <span>已发送验证码至您的手机号！</span>
        </div>
        <div class="code">
          <span>验证码：</span>
          <el-input v-model="code" />
          <zj-button class="zj-m-l-5" type="primary">发送验证码</zj-button>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button v-if="showAttest" @click="dialogVisible = false"
          >取 消</el-button
        >
        <el-button v-if="showAttest" type="primary" @click="confirmTransfer"
          >确 定</el-button
        >
        <el-button v-if="!showAttest" type="primary" @click="confirmCode"
          >提 交</el-button
        >
      </span>
    </el-dialog>

    <el-dialog
      :visible.sync="dialogVisible2"
      :close-on-click-modal="false"
      center
      width="550px"
      title="转让拒绝"
      custom-class="mbi-editDialog"
      @close="cancel"
    >
      <el-form
        ref="form"
        class="mbi-form"
        :model="formModel"
        :rules="formRules"
        label="top"
      >
        <el-form-item label="请输入拒绝原因：" prop="cause">
          <el-input type="textarea" v-model="formModel.cause"></el-input>
        </el-form-item>
      </el-form>

      <el-row slot="footer" class="dialog-footer">
        <zj-button status="primary" @click="save">确定</zj-button>
        <zj-button class="back" @click="dialogVisible2 = false">取消</zj-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showAttest: true,
      code: "",
      dialogVisible: false,
      formModel: {
        cause: "",
      },
      dialogVisible2: false,
      protocolCheck: false,
    };
  },
  methods: {
    reTrun() {
      this.$router.push("/transferCheck");
    },
    confirmTransfer() {
      this.showAttest = false;
    },
    confirmCode() {
      this.dialogVisible = false;
    },
    check() {
      this.showAttest = true;
      this.dialogVisible = true;
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