<template>
  <!-- 个人中心 -->
  <zj-content-container class="personal-center">
    <zj-content>
      <zj-header>我的账户</zj-header>
      <div style="width: 80%; margin: 0 auto">
        <zj-tabs v-model="tabAtive" tab-position="left">
          <el-tab-pane label="我的基本信息" name="myBasicInformation">
            <zj-content-block>
              <h4 class="zj-m-b-20">我的企业信息</h4>
              <el-form ref="form">
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="企业名称：">
                      {{ userBaseInfo.entInfo.name | value }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="统一社会信用代码：">
                      {{ userBaseInfo.entInfo.bizLicence | value }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="注册地址：">
                      {{ userBaseInfo.entInfo.address | value }}
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </zj-content-block>

            <zj-content-block>
              <h4 class="zj-m-b-20">我的个人信息</h4>
              <el-form ref="form">
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="姓名：" prop="field1">
                      {{ userBaseInfo.userInfo.userName | value }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="绑定手机：" prop="field1">
                      {{ userBaseInfo.userInfo.mobileNo | value }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="角色：" prop="field1">
                      {{ userBaseInfo.userInfo.roleName | value }}
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </zj-content-block>
          </el-tab-pane>
          <el-tab-pane label="我的开票信息" name="myBillingInformation">
            <zj-content-block>
              <h4 class="zj-m-b-20">我的开票信息</h4>
              <el-form
                ref="form"
                :model="invoiceForm"
                :rules="rules"
                label-width="130px"
              >
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="企业名称：" prop="entName">
                      <el-input
                        v-model="invoiceForm.entName"
                        v-if="isEdit"
                        disabled
                      />
                      <span v-else>{{
                        userBaseInfo.invoiceInfo.entName | value
                      }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item
                      label="纳税人识别号："
                      prop="invoiceTaxpayerId"
                    >
                      <el-input
                        v-model="invoiceForm.invoiceTaxpayerId"
                        v-if="isEdit"
                        disabled
                      />
                      <span v-else>{{
                        userBaseInfo.invoiceInfo.invoiceTaxpayerId | value
                      }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="地址：" prop="invoiceAddress">
                      <el-input
                        v-model="invoiceForm.invoiceAddress"
                        v-if="isEdit"
                      />
                      <span v-else>{{
                        userBaseInfo.invoiceInfo.invoiceAddress | value
                      }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="电话：" prop="invoicePhone">
                      <el-input
                        v-model="invoiceForm.invoicePhone"
                        v-if="isEdit"
                      />
                      <span v-else>{{
                        userBaseInfo.invoiceInfo.invoicePhone | value
                      }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="开户行：" prop="invoiceBankInfo">
                      <el-input
                        v-model="invoiceForm.invoiceBankInfo"
                        v-if="isEdit"
                      />
                      <span v-else>{{
                        userBaseInfo.invoiceInfo.invoiceBankInfo | value
                      }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="银行账号：" prop="invoiceBankAccno">
                      <el-input
                        v-model="invoiceForm.invoiceBankAccno"
                        v-if="isEdit"
                      />
                      <span v-else>{{
                        userBaseInfo.invoiceInfo.invoiceBankAccno | value
                      }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="电子邮箱：" prop="invoiceEmail">
                      <el-input
                        v-model="invoiceForm.invoiceEmail"
                        v-if="isEdit"
                      />
                      <span v-else>{{
                        userBaseInfo.invoiceInfo.invoiceEmail | value
                      }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </zj-content-block>
          </el-tab-pane>
        </zj-tabs>
      </div>
    </zj-content>
    <zj-content-footer>
      <template v-if="userBaseInfo.entInfo.isHtEnterprise === '0'">
        <zj-button
          type="primary"
          @click="$router.push(`/entInfoMaintain/${userBaseInfo.entInfo.id}`)"
          v-show="tabAtive === 'myBasicInformation'"
          >维护企业信息</zj-button
        >
        <zj-button
          type="primary"
          @click="
            $router.push(
              `/userInfoMaintain/${userBaseInfo.userInfo.roleIds[0]}`
            )
          "
          v-show="tabAtive === 'myBasicInformation'"
          >维护个人信息</zj-button
        >
      </template>
      <zj-button
        type="primary"
        @click="handleUpdate"
        v-show="tabAtive === 'myBillingInformation' && !isEdit"
        >修改</zj-button
      >
      <zj-button type="primary" @click="updateInvoiceInfo" v-show="isEdit"
        >保存</zj-button
      >
      <zj-button @click="isEdit = false" v-show="isEdit">取消</zj-button>
      <zj-button class="back" @click="back">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>

<script>
import {
  validateInvoiceTaxpayerId,
  validateBankAcct,
  newValidateFixedPhone,
} from "@utils/rules";

export default {
  name: "personalCenter",
  data() {
    return {
      zjControl: {
        ...this.$api.myBasicInformation,
        ...this.$api.myBillingInformation,
      },
      tabAtive: "myBasicInformation",
      isEdit: false, // 开票编辑
      invoiceForm: {}, //开票表单
      userBaseInfo: {
        entInfo: {},
        invoiceInfo: {},
        userInfo: {},
      },
      rules: {
        // invoiceTaxpayerId: [
        //   {
        //     required: true,
        //     message: "请输入纳税人识别号",
        //     trigger: ["blur"],
        //   },
        //   { validator: validateInvoiceTaxpayerId, trigger: "blur" },
        // ],
        invoiceAddress: {
          required: true,
          message: "请输入地址",
          trigger: ["blur"],
        },
        invoicePhone: [
          {
            required: true,
            message: "请输入电话",
            trigger: ["blur"],
          },
          { validator: newValidateFixedPhone, trigger: ["blur"] },
        ],
        invoiceBankInfo: {
          required: true,
          message: "请输入开户行",
          trigger: ["blur"],
        },
        invoiceBankAccno: [
          {
            required: true,
            message: "请输入银行账号",
            trigger: ["blur"],
          },
          { validator: validateBankAcct, trigger: "blur" },
        ],

        invoiceEmail: [
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
      },
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    //获取我的基本信息
    getUserInfo() {
      this.zjControl.getUserInfo().then((res) => {
        this.userBaseInfo = res.data;
      });
    },
    //修改开票信息
    updateInvoiceInfo() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.zjControl.updateInvoiceInfo(this.invoiceForm).then((res) => {
            this.isEdit = false;
            this.getUserInfo();
            this.$message.success("修改成功!");
          });
        }
      });
    },
    handleUpdate() {
      this.invoiceForm = this.userBaseInfo.invoiceInfo;
      this.isEdit = true;
    },
    back() {
      this.$router.push("/home");
    },
  },
};
</script>

<style lang="less">
.personal-center {
  .el-tab-pane {
    margin-left: 40px;
  }
}
</style>
