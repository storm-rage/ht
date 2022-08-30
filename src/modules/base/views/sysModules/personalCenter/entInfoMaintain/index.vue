<template>
  <zj-content-container>
    <zj-top-header title="企业信息维护" />
    <!-- 企业基础信息 -->
    <ent-form ref="entForm" :detailData="detailData" :dictionary="dictionary" @formPass="formPass" />

    <zj-content-footer>
      <el-checkbox v-model="agreeCheck" v-if="isAgreeCheck">
        <span>我已阅读并同意</span>
        <zj-button type="text" @click="downloadTemplate">《银行账户变更通知》</zj-button>
      </el-checkbox>
      <zj-button type="primary" @click="updateUserInfo">确认提交</zj-button>
      <zj-button class="back" @click="back">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>

<script>
import entForm from './entForm'
export default {
  components: {
    entForm
  },
  data() {
    return {
      isDetail: this.$route.meta.pageType,
      entInfo: {},
      zjControl: {
        ...this.$api.myBasicInformation,
      },
      dictionary: {},
      detailData: {},
      agreeCheck: false,
      isAgreeCheck: false, //是否需要勾选协议

    };
  },
  created() {
    this.getRow()
    this.getDirectory();
    this.getEntInfo();
  },
  methods: {
    // 获取字典
    getDirectory() {
      this.zjControl.getDirectory().then((res) => {
        this.dictionary = res.data;
      });
    },
    // 获取企业信息
    getEntInfo() {
      let params = { entId: this.row.id };
      this.zjControl.getEntInfo(params).then((res) => {
        this.detailData = res.data
        let basicEntInfo = res.data.basicEntInfo;
        this.detailData.form = {
          ...basicEntInfo.entInfo,
          ...basicEntInfo.fastMailInfo,
          ...basicEntInfo.legalPersonInfo,
          entBankInfo: [basicEntInfo.entBankInfo]//银行账户信息
        };
      });
    },
    updateUserInfo() {
      this.$refs.entForm.handleForm()
    },
    //修改用户
    formPass(params) {
      params = {
        ...params,
        ...params.entBankInfo[0]
      }
      if (this.agreeCheck || !this.isAgreeCheck) {
        this.zjControl.updateUserInfo(params).then((res) => {
          this.$message.success(res.msg);
          this.goParent()
        });
      } else {
        this.$alert("请阅读并同意《银行账户变更通知》", "提示", {
          type: "warning",
        });
      }
    },
    downloadTemplate() {
      let params = {
        entBankInfo: this.$refs.entForm.$data.form.entBankInfo[0],
        templateType: "YHZHBGTZ"
      }
      this.zjControl.downloadTemplate(params)
    },
    back() {
      this.$router.push("/personalCenter");
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .zj-date-range-picker {
  width: 100px;
  .el-input__inner {
    padding-left: 3px;
  }
  & ~ span {
    display: inline-block;
    width: 20px;
    text-align: center;
  }
}
</style>
