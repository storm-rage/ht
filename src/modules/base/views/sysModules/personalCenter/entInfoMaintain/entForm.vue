<template>
  <zj-content-container>
    <!-- 企业基础信息 -->
    <el-form ref="form" :model="form" :rules="rules" label-width="200px">
      <zj-content-block>
        <zj-header title="企业基础信息" />
        <h4 class="bl zj-m-l-20 mb-10">企业信息</h4>
        <el-row>
          <el-col :span="8">
            <el-form-item label="企业名称：" prop="name">
              <el-input v-model.trim="form.name" :disabled="!isEdit || supplierType === '01'" />
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
              <el-input v-model.trim="form.shortName" :disabled="!isEdit || supplierType === '01'" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="曾用名：" prop="beforeName">
              <el-input v-model.trim="form.beforeName" :disabled="!isEdit" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="客户业务系统编码：" prop="customCode">
              <el-input v-model.trim="form.customCode" :disabled="!isEdit" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="统一社会信用代码：" prop="bizLicence" class="bizLicence">
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
            <el-form-item label="注册资本：" prop="registerCapital">
              <el-input v-model.trim="form.registerCapital" :disabled="!isEdit || supplierType === '01'" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="企业工商有效期：" prop="registerEndDate">
              <zj-date-picker :date.sync="form.registerEndDate" :disabled="!isEdit || supplierType === '01'" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="企业规模：" prop="scale">
              <el-select v-model="form.scale" :popper-append-to-body="false" :disabled="!isEdit">
                <el-option v-for="(item, index) in dictionary.scale" :key="index" :value="item.code" :label="item.desc"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="企业经营类型：" prop="custType">
              <el-select v-model="form.custType" :popper-append-to-body="false" :disabled="!isEdit">
                <el-option v-for="(item, index) in dictionary.custType" :key="index" :value="item.code" :label="item.desc"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="营业执照注册地址：" prop="address">
              <el-input v-model.trim="form.address" :disabled="!isEdit" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <h4 class="bl zj-m-l-20 mb-10">企业联系人</h4>
          <el-col :span="8">
            <el-form-item label="企业联系人姓名：" prop="fastMailName">
              <el-input v-model.trim="form.fastMailName" :disabled="!isEdit || supplierType === '01'" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="企业联系人手机号：" prop="fastMailPhone">
              <el-input v-model.trim="form.fastMailPhone" :disabled="!isEdit || supplierType === '01'" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="企业联系地址：" prop="fastMailAddress">
            <el-input v-model.trim="form.fastMailAddress" :disabled="!isEdit" />
          </el-form-item>
        </el-row>
        <h4 class="bl zj-m-l-20 mb-10">法人信息</h4>
        <el-row>
          <el-col :span="8">
            <el-form-item label="法定代表人姓名：" prop="legalPersonName">
              <el-input v-model.trim="form.legalPersonName" :disabled="!isEdit" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="法定代表人手机号码：" prop="registerPhone">
              <el-input v-model.trim="form.registerPhone" :disabled="!isEdit" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="法定代表人证件类型：" prop="legalCertType">
              {{ typeMap(dictionary.legalCertType, this.form.legalCertType) }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="法定代表人身份证号：" prop="legalCertNo">
              <el-input v-model.trim="form.legalCertNo" :disabled="!isEdit" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="法人身份证有效期：" prop="legalCertRegDate" class="col-right">
              <zj-date-range-picker :clearable="false" :startDate.sync="form.legalCertRegDate" @startChange="valueChange('legalCertRegDate')" :endDate.sync="form.legalCertExpireDate" @endChange="valueChange('legalCertExpireDate')" :disabled="!isEdit" />
            </el-form-item>
          </el-col>
        </el-row>
      </zj-content-block>
      <!-- 银行账户信息 -->
      <zj-content-block>
        <h4 class="bl zj-m-l-20 mb-10">银行账户信息</h4>
        <zj-content>
          <zj-button class="append zj-m-b-10 zj-m-l-10" type="primary" v-if="form.supplierType === '01' && isEdit" @click="openBankDialog(detailData.entBankInfos)">更换银行账户</zj-button>
          <zj-table ref="bank" :dataList="form.entBankInfo" :pager="false" keep-source auto-resize :edit-config="{
              trigger: 'manual',
              mode: 'row',
              icon: '-',
              autoClear: false,
              showStatus: true,
            }">
            <zj-table-column field="bankAccname" title="银行账户名称" :edit-render="{ name: '$input' }" />
            <zj-table-column field="bankAccno" title="银行账号" :edit-render="{ name: '$input' }" />
            <zj-table-column field="bankName" title="银行账户开户行" :edit-render="{ name: '$input' }" />
            <zj-table-column field="bankNo" title="银行联行号" :edit-render="{ name: '$input' }" />
            <zj-table-column title="操作" v-if="form.supplierType !== '01'">
              <template v-slot="{ row, rowIndex }">
                <template v-if="!$refs.bank.isActiveByRow(row)">
                  <zj-button type="text" @click="bankEdit(row)" v-if="form.supplierType !== '01'">{{form.supplierType}}修改</zj-button>
                </template>
                <template v-if="$refs.bank.isActiveByRow(row)">
                  <zj-button type="text" @click="bankSave(row, rowIndex)">保存</zj-button>
                  <zj-button type="text" @click="bankCancel(row, rowIndex)">取消</zj-button>
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
          <zj-table ref="attach" :dataList="detailData.attachInfo" :pager="false" auto-resize>
            <zj-table-column type="seq" title="序号" width="50" />
            <zj-table-column field="type" title="附件类型" />
            <zj-table-column field="fileName" title="附件名称" />
            <zj-table-column title="操作">
              <template v-slot="{ row }">
                <zj-upload :httpRequest="handleFileUpload" :data="{ row }" accept=".pdf" class="zj-inline" v-if="!!isEdit">
                  <zj-button type="text" v-if="isEdit">上传</zj-button>
                </zj-upload>
                <zj-button v-if="row.fileId" type="text" @click="toDownload(row)">下载</zj-button>
              </template>
            </zj-table-column>
          </zj-table>
          <zj-content v-if="isEdit">
            <zj-content-tip text="注：1.以上上传的影像件请全部加盖公司公章。"></zj-content-tip>
            <br />
            <zj-content-tip text="2.支持上传的文档格式：PDF。"></zj-content-tip>
            <br />
            <zj-content-tip text="3.若上传身份证，请将身份证正、反面完整放在同一页上。请确保身份证在有效期内。 "></zj-content-tip>
            <br />
            <zj-content-tip text=" 4.若上传营业执照，请确保营业执照为最新版本。 "></zj-content-tip>
          </zj-content>
        </zj-content>
      </zj-content-block>
    </el-form>
    <bank-account ref="bankDialog" @getEntBankInfo="getEntBankInfo" />
  </zj-content-container>
</template>

<script>
import bankAccount from "./dialog/bankAccount";
import { newValidateFixedPhone, validateIdCard } from "@utils/rules";

export default {
  components: {
    bankAccount,
  },
  props: {
    dictionary: {
      type: Object,
      default: () => { }
    },
    detailData: {
      type: Object,
      default: () => { }
    },
    isEdit: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    detailData(data) {
      console.log(data)
      if (this.isEdit) {
        this.supplierType = data.basicEntInfo.entInfo.supplierType
      }
      this.form = data.form
      this.attachInfo[0].qyyzAttachId = data.attachInfo.qyyzAttachId; // 营业执照
      this.attachInfo[0].fileId = data.attachInfo.qyyzFileId;
      this.attachInfo[0].fileName = data.attachInfo.qyyzAttachName;
      this.attachInfo[1].qyfrzjAttachId = data.attachInfo.qyfrzjAttachId; // 法定代表人证件
      this.attachInfo[1].fileId = data.attachInfo.qyfrzjFileId;
      this.attachInfo[1].fileName = data.attachInfo.qyfrzjAttachName;
      this.detailData.attachInfo = this.attachInfo
      console.log(this.form)
    }
  },
  data() {
    return {
      zjControl: {
        downloadFile: this.$api.baseCommon.downloadFile,//文件下载
        ...this.$api.myBasicInformation,
      },
      form: {},
      agreeCheck: false,
      attachInfo: [
        { fileId: "", type: "营业执照", fileName: "" },
        { fileId: "", type: "法定代表人身份证", fileName: "" },
      ],
      supplierType: '',
      rules: {
        name: [
          {
            required: true,
            message: "请输入企业名称",
            trigger: ["blur"],
          },
        ],
        shortName: [
          {
            required: true,
            message: "请输入企业简称",
            trigger: ["blur"],
          },
        ],
        registerCapital: [
          {
            required: true,
            message: "请输入注册资本",
            trigger: ["blur"],
          },
        ],
        registerEndDate: [
          {
            required: true,
            message: "请输入企业工商有效期",
            trigger: ["blur"],
          },
        ],
        address: [
          {
            required: true,
            message: "请输入营业执照注册地址",
            trigger: ["blur"],
          },
        ],
        fastMailName: [
          {
            required: true,
            message: "请输入企业联系人",
            trigger: ["blur"],
          },
        ],
        fastMailPhone: [
          {
            required: true,
            message: "请输入企业联系人手机号",
            trigger: ["blur"],
          },
          { validator: newValidateFixedPhone, trigger: ["blur"] },
        ],
        legalCertNo: [
          { validator: validateIdCard, trigger: ["blur"] },
        ],
        registerPhone: [
          { validator: newValidateFixedPhone, trigger: ["blur"] },
        ],
        fastMailAddress: [
          {
            required: true,
            message: "请输入企业联系地址",
            trigger: ["blur"],
          },
        ],
      },
    };
  },
  methods: {
    handleForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 营业执照
          this.form.qyyzAttachId = this.attachInfo[0].qyyzAttachId;
          this.form.qyyzFileId = this.attachInfo[0].fileId;
          this.form.qyyzAttachName = this.attachInfo[0].fileName;
          // 法定代表人证件
          this.form.qyfrzjAttachId = this.attachInfo[1].qyfrzjAttachId;
          this.form.qyfrzjFileId = this.attachInfo[1].fileId;
          this.form.qyfrzjAttachName = this.attachInfo[1].fileName;
          this.$emit('formPass', this.form)
        }
      });
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
      this.$refs.bank.setActiveRow(row);
    },
    //保存企业操作员
    bankSave(row, rowIndex) {
      this.form = { ...this.form, ...row };
      this.$refs.bank.clearActived();
    },
    //取消银行账户编辑
    bankCancel(row, rowIndex) {
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
    //下载附件
    toDownload(row) {
      this.zjControl.downloadFile(row)
    },
    // 获取更换后的银行账户
    getEntBankInfo(data) {
      if (this.detailData.signContract === true) {
        this.$parent.$parent.$data.isAgreeCheck = true; // 更换银行账号需要勾选协议
      }
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
