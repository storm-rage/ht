<template>
  <zj-content-container>
    <zj-top-header>凭证转让申请</zj-top-header>
    <zj-content-block>
      <zj-header>电子债权凭证信息</zj-header>
      <zj-content>
        <zj-table :pager="false" :dataList="dataList">
          <zj-table-column field="ebillCode" title="原始凭证编号">
          </zj-table-column>
          <zj-table-column field="issueEntName" title="凭证编号" />
          <zj-table-column field="ebillAmt" title="签发人" :formatter="money" />
          <zj-table-column field="transferAmt" title="原始持有人" :formatter="money" />
          <zj-table-column field="splusAmt" title="凭证签发日" :formatter="money" />
          <zj-table-column field="issueDate" title="凭证到期日" :formatter="date" />
          <zj-table-column field="receiveDate" title="转让企业" :formatter="date" />
          <zj-table-column field="ebillAmt" title="凭证金额" :formatter="money" />
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
      <el-form ref="form" :model="form" :rules="rules" label-width="150px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="被转让人名称：" prop="holderName">
              <el-select v-model="form.holderName">
                <el-option v-for="(item,index) in entityList" :key="item.code" :label="item.sellerEntName" :value="index" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="转让金额：" prop="ebillAmt">
              <el-input disabled v-model="form.ebillAmt" @keyup.enter.native="enterSearch" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收款账号：" prop="bankAccount">
              <el-input v-model="form.bankAccount" @keyup.enter.native="enterSearch" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收款账户户名：" prop="bankAccname">
              <el-input v-model="form.bankAccname" @keyup.enter.native="enterSearch" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收款银行联行号：" prop="bankNo">
              <el-input v-model="form.bankNo" @keyup.enter.native="enterSearch" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收款账户开户行：" prop="bankName">
              <el-input v-model="form.bankName" @keyup.enter.native="enterSearch" />
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="备注：" prop="remark">
              <el-input type="textarea" rows="3" placeholder="请输入内容" v-model="form.remark">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </zj-content-block>

    <p>
      <el-link :underline="false" type="primary">《xxx协议》</el-link>
    </p>

    <zj-content-footer>
      <zj-button type="primary" @click="toApply">提交申请</zj-button>
      <zj-button @click="goParent">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>

<script>
import { validateBankAcct } from "@utils/rules";

export default {
  data() {
    return {
      zjControl: this.$api.billAssignApply,
      form: {
        ebillAmt: 0,
      },
      detailData: {},
      dataList: [],
      ids: [],
      dictionary: {},
      entityList: [],
      rules: {
        holderName: [
          { required: true, message: "请输入被转让人名称", trigger: "blur" },
        ],
        bankAccname: [
          { required: true, message: "请输入收款账户户名", trigger: "blur" },
        ],
        bankAccount: [
          {
            required: true,
            message: "请输入收款账号",
            trigger: "blur",
            max: 50,
          },
          { validator: validateBankAcct, trigger: "blur" },
        ],
        bankNo: [
          {
            required: true,
            message: "请输入收款银行联行号",
            trigger: "blur",
            max: 50,
          },
          { validator: validateBankAcct, trigger: "blur" },
        ],
        bankName: [
          { required: true, message: "请输入收款账户开户行", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getRow();
    this.dataList = this.row.paramsDataList;
    this.dataList.forEach((item) => {
      this.ids.push(item.ebillCode);
    });
    this.getTradeRalation()
  },
  methods: {
    // 获取当前企业贸易关系
    getTradeRalation() {
      this.zjControl.getTradeRalation({ ids: [...this.ids] }).then(res => {
        this.entityList = res.data.entityList
      })
    },
    // 提交申请
    toApply() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$confirm(
            `您本次申请转让<b style="font-size: 18px;">${this.dataList.length}</b>笔电子债权凭证，共计：<br/>
        <b style="font-size: 18px;">${this.form.ebillAmt}</b>元请确认<br>`,
            "转让申请确认",
            {
              dangerouslyUseHTMLString: true,
              confirmButtonText: "确定",
              cancelButtonText: "取消",
            }
          ).then(() => {
            let params = {
              ids: this.ids,
              billInfoList: [this.form],
            };
            this.zjControl.submitEbBillOneToMany(params).then((res) => {
              this.$message.success("申请成功!");
              this.goParent();
            });
          });
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
</style>