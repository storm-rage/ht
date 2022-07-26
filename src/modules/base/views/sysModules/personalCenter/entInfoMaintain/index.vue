<template>
  <zj-content-container>
    <zj-top-header title="企业信息维护" />
    <!-- 企业基础信息 -->
    <el-form ref="form" :model="form" :rules="rules" label-width="200px">
      <zj-content-block>
        <zj-header title="企业基础信息" />
        <h4 class="bl zj-m-l-20 mb-10">企业信息</h4>
        <el-row>
          <el-col :span="8">
            <el-form-item label="企业名称：" prop="name">
              <el-input v-model="form.name" />
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="平台客户类型：" prop="entType">
              <span>{{ typeMap(dictionary.entType, this.form.entType) }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="企业简称：" prop="shortName">
              <el-input v-model="form.shortName" :disabled="isDetail" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="曾用名：" prop="beforeName">
              <el-input v-model="form.beforeName" :disabled="isDetail" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="客户业务系统编码：" prop="customCode">
              <el-input v-model="form.customCode" :disabled="isDetail" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="统一社会信用代码："
              prop="bizLicence"
              class="bizLicence"
            >
              {{ form.bizLicence | value }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="纳税人识别号：" prop="invoiceTaxpayerId">
              {{ this.form.invoiceTaxpayerId | value }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="成立日期：" prop="registerStartDate">
              {{ this.form.registerStartDate | value }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="注册资本：" prop="invoiceTaxpayerId">
              <el-input v-model="form.registerCapital" :disabled="isDetail" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="企业工商有效期：" prop="invoiceTaxpayerId">
              <el-input v-model="form.registerEndDate" :disabled="isDetail" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="企业规模：" prop="invoiceTaxpayerId">
              <el-input v-model="form.scale" :disabled="isDetail" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="企业经营类型：" prop="invoiceTaxpayerId">
              <el-input v-model="form.custType" :disabled="isDetail" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="营业执照注册地址：" prop="invoiceTaxpayerId">
              <el-input v-model="form.address" :disabled="isDetail" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <h4 class="bl zj-m-l-20 mb-10">企业联系人</h4>
          <el-col :span="8">
            <el-form-item label="企业联系人姓名：" prop="fastMailName">
              <el-input v-model="form.fastMailName" :disabled="isDetail" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="企业联系人手机号：" prop="fastMailPhone">
              <el-input v-model="form.fastMailPhone" :disabled="isDetail" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="企业联系地址：" prop="fastMailAddress">
            <el-input v-model="form.fastMailAddress" :disabled="isDetail" />
          </el-form-item>
        </el-row>
        <h4 class="bl zj-m-l-20 mb-10">法人信息</h4>
        <el-row>
          <el-col :span="8">
            <el-form-item label="法定代表人姓名：" prop="legalPersonName">
              <el-input v-model="form.legalPersonName" :disabled="isDetail" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="法定代表人手机号码：" prop="legalPersonName">
              <el-input v-model="form.registerPhone" :disabled="isDetail" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="法定代表人证件类型：" prop="legalPersonName">
              <span>{{ this.form.legalCertType | value }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="法定代表人身份证号：" prop="legalCertNo">
              <el-input v-model="form.legalCertNo" :disabled="isDetail" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="法人身份证有效期："
              prop="legalCertRegDate"
              class="col-right"
            >
              <zj-date-range-picker
                :clearable="false"
                :startDate.sync="form.legalCertRegDate"
                @startChange="valueChange('legalCertRegDate')"
                :endDate.sync="form.legalCertExpireDate"
                @endChange="valueChange('legalCertExpireDate')"
                :disabled="isDetail"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </zj-content-block>
      <!-- 银行账户信息 -->
      <zj-content-block>
        <h4 class="bl zj-m-l-20 mb-10">银行账户信息</h4>
        <zj-content>
          <zj-button
            class="append zj-m-b-10 zj-m-l-10"
            type="primary"
            @click="openBankDialog(entData.entBankInfos)"
            >更换银行账户</zj-button
          >
          <zj-table
            ref="bank"
            :dataList="form.entBankInfo"
            :pager="false"
            keep-source
            auto-resize
            :edit-config="{
              trigger: 'manual',
              mode: 'row',
              icon: '-',
              autoClear: false,
              showStatus: true,
            }"
          >
            <zj-table-column
              field="bankAccname"
              title="银行账户名称"
              :edit-render="{ name: '$input' }"
            />
            <zj-table-column
              field="bankAccno"
              title="银行账号"
              :edit-render="{ name: '$input' }"
            />
            <zj-table-column
              field="bankName"
              title="银行账户开户行"
              :edit-render="{ name: '$input' }"
            />
            <zj-table-column
              field="bankNo"
              title="银行联行号"
              :edit-render="{ name: '$input' }"
            />
            <zj-table-column title="操作">
              <template v-slot="{ row, rowIndex }">
                <template v-if="!$refs.bank.isActiveByRow(row)">
                  <zj-button type="text" @click="bankEdit(row)">修改</zj-button>
                </template>
                <template v-if="$refs.bank.isActiveByRow(row)">
                  <zj-button type="text" @click="bankSave(row, rowIndex)"
                    >保存</zj-button
                  >
                  <zj-button type="text" @click="bankCancel(row, rowIndex)"
                    >取消</zj-button
                  >
                </template>
              </template>
            </zj-table-column>
          </zj-table>
        </zj-content>
      </zj-content-block>
      <!-- 企业附件 -->
      <zj-content-block>
        <zj-header title="企业附件" />
        <zj-content>
          <zj-table
            ref="attach"
            :dataList="attachInfo"
            :pager="false"
            auto-resize
          >
            <zj-table-column type="seq" title="序号" width="50" />
            <zj-table-column field="type" title="附件类型" />
            <zj-table-column field="fileName" title="附件名称" />
            <zj-table-column title="操作">
              <template v-slot="{ row }">
  
                <zj-upload
                  :httpRequest="handleFileUpload"
                  :data="{ row }"
                  class="zj-inline"
                  v-if="!isDetail"
                >
                  <zj-button type="text">上传</zj-button>
                </zj-upload>
              </template>
            </zj-table-column>
          </zj-table>
          <zj-content>
            <zj-content-tip
              text="注：1.以上上传的影像件请全部加盖公司公章。"
            ></zj-content-tip>
            <br />
            <zj-content-tip text="2.支持上传的文档格式：PDF。"></zj-content-tip>
            <br />
            <zj-content-tip
              text="3.若上传身份证，请将身份证正、反面完整放在同一页上。请确保身份证在有效期内。 "
            ></zj-content-tip>
            <br />
            <zj-content-tip
              text=" 4.若上传营业执照，请确保营业执照为最新版本。 "
            ></zj-content-tip>
          </zj-content>
        </zj-content>
      </zj-content-block>
    </el-form>

    <zj-content-footer>
      <el-checkbox v-model="agreeCheck" v-if="isAgreeCheck"
        >我已阅读并同意
        <zj-button type="text">《银行账户变更通知》</zj-button>
      </el-checkbox>
      <zj-button type="primary" @click="updateUserInfo">确认提交</zj-button>
      <zj-button class="back" @click="back">返回</zj-button>
    </zj-content-footer>

    <bank-account ref="bankDialog" @getEntBankInfo="getEntBankInfo" />
  </zj-content-container>
</template>

<script>
import bankAccount from "./dialog/bankAccount";
export default {
  components: {
    bankAccount,
  },
  data() {
    return {
      isDetail: this.$route.meta.pageType,
      entData: {},
      zjControl: {
        ...this.$api.myBasicInformation,
      },
      form: {},
      rules: {},
      dictionary: {},
      agreeCheck: false,
      isAgreeCheck: false, //是否需要勾选协议
      attachInfo: [
        { fileId: "", type: "营业执照", fileName: "" },
        { fileId: "", type: "法定代表人身份证", fileName: "" },
      ],
      oldRow: {},
    };
  },
  created() {
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
      let params = { entId: this.$route.params.id };
      this.zjControl.getEntInfo(params).then((res) => {
        this.entData = res.data;
        let basicEntInfo = res.data.basicEntInfo;
        this.form = {
          ...basicEntInfo.entInfo,
          ...basicEntInfo.fastMailInfo,
          ...basicEntInfo.legalPersonInfo,
        };
        this.form.entBankInfo = [basicEntInfo.entBankInfo]; //银行账户信息
        this.attachInfo[0].fileName = res.data.attachInfo.qyyzAttachName; // 营业执照
        this.attachInfo[1].fileName = res.data.attachInfo.qyfrzjAttachName; // 法定代表人证件
      });
    },
    updateUserInfo() {
      // 营业执照
      this.form.qyyzFileId = this.attachInfo[0].fileId;
      this.form.qyyzAttachName = this.attachInfo[0].fileName;
      // 法定代表人证件
      this.form.qyfrzjFileId = this.attachInfo[1].fileId;
      this.form.qyfrzjAttachName = this.attachInfo[1].fileName;
      this.zjControl.updateUserInfo(this.form).then((res) => {
        this.getEntInfo();
        this.$message.success("修改成功!");
      });
      // if (this.agreeCheck) {
      // } else {
      //   this.$alert("请阅读并同意《银行账户变更通知》", "提示", {
      //     type: "warning",
      //   });
      // };
    },
    //企业操作员编辑检测
    bankIng() {
      let key = this.$refs.bank.getActiveRecord() ? true : false;
      if (key) {
        this.$messageBox({
          content: "请您先保存正在编辑的数据",
          type: "info",
        });
      }
      return key;
    },
    //修改银行账户
    bankEdit(row) {
      this.oldRow = JSON.parse(JSON.stringify(row));
      this.$refs.bank.setActiveRow(row);
    },
    //保存企业操作员
    bankSave(row, rowIndex) {
      this.form = { ...this.form, ...row };
      this.$refs.bank.clearActived();
    },
    //删除银行账户
    sysUserDel(rowIndex) {
      if (this.bankIng()) {
        return;
      }
      this.form.entBankInfo.splice(rowIndex, 1);
    },
    //取消银行账户编辑
    bankCancel(row, rowIndex) {
      // if (!row.save) {
      //   this.form.entBankInfo.splice(rowIndex, 1);
      // } else {
      //   this.form.entBankInfo.splice(
      //     rowIndex,
      //     1,
      //     JSON.parse(JSON.stringify(this.oldRow))
      //   );
      // }
      this.$refs.bank.clearActived();
    },
    //上传附件
    handleFileUpload({ file, data }) {
      let formData = new FormData();
      formData.append("bizType", "ent");
      formData.append("file", file);
      this.zjControl.uploadFile(formData).then((res) => {
        data.row.fileId = res.data.fileId;
        data.row.fileName = res.data.fileName;
        this.$message.success("附件上传成功!");
      });
    },
    // 获取更换后的银行账户
    getEntBankInfo(data) {
      this.isAgreeCheck = true;
      this.form = { ...this.form, ...data };
      this.form.entBankInfo = [data];
    },
    openBankDialog(data) {
      this.$refs.bankDialog.show(data);
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
