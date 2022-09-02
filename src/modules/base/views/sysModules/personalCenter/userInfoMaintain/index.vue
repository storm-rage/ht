<template>
  <zj-content-container>
    <zj-top-header>个人信息维护</zj-top-header>
    <zj-content-block>
      <zj-header title="用户信息"></zj-header>
      <zj-content>
        <el-form ref="form" :model="form" :rules="rules" label-width="160px">
          <el-row>
            <el-col :span="24" v-if="pageType !== 2">
              <el-form-item label="角色：">
                <el-select v-model="roleId" filterable placeholder="请选择" :popper-append-to-body="false" @change="getPersonalInfo">
                  <el-option v-for="item in dictionary.roleId" :key="item.code" :label="item.desc" :value="item.code" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="用户姓名：" prop="userName">
                <el-input v-model.trim="form.userName" :disabled="pageType !== 3" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="角色：" v-if="pageType === 2">
                <el-select v-model="roleId" filterable placeholder="请选择" :popper-append-to-body="false" @change="getPersonalInfo" :disabled="pageType === 2">
                  <el-option v-for="item in dictionary.roleId" :key="item.code" :label="item.desc" :value="item.code" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="海天业务系统账号：" prop="htSysCode">
                <el-input v-model.trim="form.htSysCode" :disabled="pageType === 1" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="证件类型：" prop="certType">
                <el-select v-model="form.certType" filterable placeholder="请选择" :popper-append-to-body="false" :disabled="pageType !== 3">
                  <el-option v-for="item in dictionary.legalCertType" :key="item.code" :label="item.desc" :value="item.code" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="证件号码：" prop="certNo">
                <el-input v-model.trim="form.certNo" :disabled="pageType !== 3" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="证件有效期：" prop="certStartDate">
                <zj-date-range-picker :startDate.sync="form.certStartDate" :endDate.sync="form.certEndDate" :disabled="pageType === 1" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="手机号码/用户名：" prop="mobileNo">
                <el-input v-model.trim="form.mobileNo" :disabled="pageType === 1" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="邮箱：" prop="email">
                <el-input v-model.trim="form.email" :disabled="pageType === 1" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="银行卡号：" prop="bankAcctNo">
                <el-input v-model.trim="form.bankAcctNo" :disabled="pageType === 1" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </zj-content>
    </zj-content-block>
    <zj-content-block>
      <zj-header v-show="pageType !== 3">身份证</zj-header>
      <div v-show="pageType === 3">
        <zj-header>附件信息</zj-header>
        <p class="zj-m-l-20">点此下载<zj-button type="text" @click="downloadTemplate">《委托授权书模板》</zj-button>
        </p>
      </div>
      <zj-content>
        <zj-table :pager="false" ref="attach" :dataList="pageType===3?attachInfo:[attachInfo[0]]">
          <zj-table-column type="seq" width="60" title="序号" />
          <zj-table-column field="type" title="附件类型" />
          <zj-table-column field="fileName" title="附件" />
          <zj-table-column title="操作" fixed="right">
            <template v-slot="{ row }">
              <zj-upload :httpRequest="handleFileUpload" :data="{ row }" accept=".pdf" class="zj-inline" v-if="pageType !== 1">
                <zj-button type="text">上传</zj-button>
              </zj-upload>
              <zj-button v-if="row.fileId" type="text" @click="toDownload(row)">下载</zj-button>
            </template>
          </zj-table-column>
        </zj-table>
        <zj-content v-show="pageType !== 1">
          <zj-content-tip text="注：1.请将身份证正、反面完整放在同一页上，并加盖企业公章。请确保身份证在有效期内。"></zj-content-tip>
          <br />
          <zj-content-tip text="2.支持上传的文档格式：PDF。"></zj-content-tip>
          <br />
          <zj-content-tip v-show="pageType === 3" text=" 3.委托授权书请下载，加盖公司公章后上传。"></zj-content-tip>
        </zj-content>
      </zj-content>
    </zj-content-block>
    <zj-content-block v-show="pageType !== 1">
      <zj-content class="zj-m-l-20">
        <h4 class="zj-m-b-20">
          请将以上已盖章影像资料对应的纸质版邮递至以下地址：
        </h4>
        <el-form label-width="100px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="收件人：">
                {{ this.platformFastMail.fastMailName }}
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="收件人电话：">
                <span>{{ this.platformFastMail.fastMailPhone }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="收件地址：">
                <span>{{ this.platformFastMail.fastMailAddress }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </zj-content>
    </zj-content-block>
    <zj-content-footer>
      <zj-button type="primary" @click="changePageType(2)" v-show="pageType === 1">维护本人信息</zj-button>
      <zj-button type="primary" @click="changePageType(3)" v-show="pageType === 1">更换操作人员</zj-button>
      <zj-button type="primary" @click="submit" v-show="pageType === 2 || pageType === 3">确认提交</zj-button>
      <zj-button class="back" @click="back">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>
<script>
import { validateIdCard, newValidateFixedPhone, validateBankAcct } from "@utils/rules";
export default {
  components: {},

  data() {
    return {
      zjControl: {
        downloadFile: this.$api.baseCommon.downloadFile,//文件下载
        ...this.$api.myBasicInformation,
      },
      form: {},
      dictionary: {},
      attachInfo: [
        { fileId: "", type: "身份证影印件", fileName: "" },
        { fileId: "", type: "委托授权书", fileName: "" }
      ],
      platformFastMail: {},
      pageType: 1, // 1详情 2维护本人信息 3更换操作人员
      roleId: "", //  角色
      rules: {
        userName: [
          {
            required: true,
            message: "请输入用户姓名",
            trigger: ["blur"],
          },
        ],
        certType: [
          {
            required: true,
            message: "请输入证件类型",
            trigger: ["blur"],
          },
        ],
        certNo: [
          {
            required: true,
            message: "请输入证件号码",
            trigger: ["blur"],
          },
          { validator: validateIdCard, trigger: ["blur"] },
        ],
        certStartDate: [
          {
            required: true,
            message: "请输入证件有效期",
            trigger: ["blur"],
          },
        ],
        mobileNo: [
          {
            required: true,
            message: "请输入手机号码/用户名",
            trigger: ["blur"],
          },
          { validator: newValidateFixedPhone, trigger: ["blur"] },
        ],
        email: [
          {
            required: true,
            message: "请输入邮箱",
            trigger: ["blur"],
          },
          {
            type: "email",
            message: "请输入正确的邮箱",
            trigger: ["blur"],
          },
        ],
        bankAcctNo: { validator: validateBankAcct, trigger: ["blur"] }
      },
    };
  },
  created() {
    this.getRow()
    this.roleId = this.row.roleIds[0];
    this.getDirectory();
  },
  methods: {
    // 获取字典
    getDirectory() {
      this.zjControl.getDirectory().then((res) => {
        this.dictionary = res.data;
        this.getPersonalInfo();
      });
    },
    // 获取个人信息
    getPersonalInfo() {
      this.form = {};
      let params = { roleId: this.roleId };
      this.zjControl.getPersonalInfo(params).then((res) => {
        this.form = res.data.userInfo;
        this.platformFastMail = res.data.platformFastMail;
        // 身份证附件
        this.attachInfo[0].fileId = this.form.identitycardFileId
        this.attachInfo[0].fileName = this.form.identitycardFileName
        // 委托书附件
        this.attachInfo[1].fileId = this.form.wtsqsFileId
        this.attachInfo[1].fileName = this.form.wtsqsFileName
        // 角色权限
        this.dictionary.roleId = this.dictionary.roleId.filter((item) => {
          return this.form.roleIds.indexOf(item.code) !== -1;
        });
      });
    },
    // 确认提交
    submit() {
      if (this.pageType === 2) {
        this.form.roleId = this.roleId;
        this.updatePersonalInfo();
      }
      if (this.pageType === 3) {
        this.form.roleId = this.roleId;
        this.updateOperator();
      }
    },
    changePageType(val) {
      this.pageType = val
    },
    // 维护本人信息
    updatePersonalInfo() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$messageBox({
            type: "confirm",
            title: `温馨提示`,
            content: `信息维护提交后，需等待平台方审核，审核通过后生效。是否确认提交？`,
            showCancelButton: true,
            messageResolve: () => {
              // 身份证附件
              this.form.identitycardFileId = this.attachInfo[0].fileId;
              this.form.identitycardFileName = this.attachInfo[0].fileName;
              this.zjControl.updatePersonalInfo(this.form).then((res) => {
                this.$message.success(res.msg);
                this.goParent()
              });
            }
          })
        }
      });
    },
    // 更换操作人员
    updateOperator() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$messageBox({
            type: "confirm",
            title: `温馨提示`,
            content: `信息维护提交后，需等待平台方审核，审核通过后生效。是否确认提交？`,
            showCancelButton: true,
            messageResolve: () => {
              // 身份证附件
              this.form.identitycardFileId = this.attachInfo[0].fileId;
              this.form.identitycardFileName = this.attachInfo[0].fileName;
              this.form.wtsqsFileId = this.attachInfo[1].fileId;
              this.form.wtsqsFileName = this.attachInfo[1].fileName;
              this.zjControl.updateOperator(this.form).then((res) => {
                this.getPersonalInfo();
                this.$message.success(res.msg);
              });
            }
          })
        }
      });
    },
    //上传附件
    handleFileUpload({ file, data }) {
      console.log(file)
      let formData = new FormData();
      formData.append("bizType", "user");
      formData.append("file", file);
      this.zjControl.uploadFile(formData).then((res) => {
        data.row.fileId = res.data.fileId;
        data.row.fileName = res.data.fileName;
        this.$message.success("附件上传成功!");
      });
    },
    //下载委托授权书模板
    downloadTemplate() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let params = {
            userInfo: this.form,
            templateType: "YHSQRYBG",
          }
          params.userInfo.roleId = this.roleId
          this.zjControl.downloadTemplate(params)
        }
      })
    },
    //下载附件
    toDownload(row) {
      this.zjControl.downloadFile(row)
    },
    back() {
      if (this.pageType === 1) {
        this.$router.push("/personalCenter");
      } else {
        this.pageType = 1;
        this.$refs.form.clearValidate()
      }
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