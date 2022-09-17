<template>
  <zj-content-block>
    <el-form ref="form" :model="form" :rules="rules" label-width="160px">
      <zj-content-block>
        <zj-header title="企业信息"></zj-header>
        <zj-content>
          <el-row>
            <el-col :span="24">
              <el-form-item label="企业名称：">
                <el-input v-model="detailData.name" style="width: 200px" :disabled="!isEdit" />
                <zj-button class="zj-m-l-20" type="primary" @click="getEnterpriseConfirm" v-if="isEdit">确认</zj-button>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="平台客户类型：">
                <span>{{
                  typeMap(dictionary.entType, detailData.entType)
                }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="客户业务系统编码：">
                <span>{{ detailData.customCode | value }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否海天集团：">
                <span>{{
                  typeMap(dictionary.isHtEnterprise, detailData.isHtEnterprise)
                }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </zj-content>
      </zj-content-block>
      <zj-content-block>
        <zj-header title="用户信息"></zj-header>
        <zj-content>
          <el-row>
            <el-col :span="24">
              <el-form-item label="海天业务系统账号：" prop="htSysCode">
                <el-input v-model="form.htSysCode" :disabled="!isEdit || state < 1" />
                <zj-button class="zj-m-l-20" type="primary" @click="getEmployeeInfo" v-if="isEdit" :disabled="state < 1">确认</zj-button>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="用户姓名：" prop="userName">
                <el-input v-model="form.userName" :disabled="!isEdit || state < 2" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="证件类型：" prop="certType">
                <el-select v-model="form.certType" filterable placeholder="请选择" :popper-append-to-body="false" :disabled="!isEdit || state < 2">
                  <el-option v-for="item in dictionary.certType" :key="item.code" :label="item.desc" :value="item.code">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="证件号码：" prop="certNo">
                <el-input v-model="form.certNo" :disabled="!isEdit || state < 2" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="证件有效期：">
                <zj-date-range-picker class="el-form-item__regExpire" :startDate.sync="form.certStartDate" :endDate.sync="form.certEndDate" :disabled="!isEdit || state < 2" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="手机号码/用户名：" prop="mobileNo">
                <el-input v-model="form.mobileNo" :disabled="!isEdit || state < 2" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="邮箱：">
                <el-input v-model="form.email" :disabled="!isEdit || state < 2" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="用户角色：">
                <el-select class="rolesSelect" v-model="roleIds" filterable placeholder="请选择" :popper-append-to-body="false" multiple :disabled="!isEdit || state < 2">
                  <el-option v-for="item in dictionary.autoRoleList" :key="item.code" :label="item.desc" :value="item.code" :disabled="item.disabled">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="请选择开凭证对账单类型权限：" label-width="280px" v-if="detailData.entType === 'B'">
                <el-select v-model="statementAccountTypeArr" filterable placeholder="请选择" :popper-append-to-body="false" multiple :disabled="!isEdit || state < 2">
                  <el-option v-for="item in dictionary.statementAccountTypeList" :key="item.code" :label="item.desc" :value="item.code">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <zj-collapse title="身份证" style="margin-top: 80px">
            <zj-table :pager="false" ref="attach" :dataList="attachInfo">
              <zj-table-column type="seq" width="60" title="序号" />
              <zj-table-column field="type" title="附件类型" />
              <zj-table-column field="fileName" title="附件" />
              <zj-table-column title="操作" fixed="right" v-if="isEdit">
                <template v-slot="{ row }">
                  <zj-upload :httpRequest="handleFileUpload" :data="{ row }" class="zj-inline">
                    <zj-button type="text">上传</zj-button>
                  </zj-upload>
                </template>
              </zj-table-column>
            </zj-table>
            <zj-content>
              <zj-content-tip text="1.上传的身份证影像件请加盖公司公章。2.支持上传的文档格式：PDF。3.将身份证正、反面完整放在同一页上。请确保身份证在有效期内。 "></zj-content-tip>
            </zj-content>
          </zj-collapse>
        </zj-content>
      </zj-content-block>
    </el-form>
  </zj-content-block>
</template>
<script>
import { validateIdCard, newValidateFixedPhone, validateBankAcct } from "@utils/rules";

export default {
  components: {},
  props: {
    form: {
      type: Object,
      default: () => { }
    },
    isEdit: {
      type: Boolean,
      default: true
    },
    dictionary: {
      type: Object,
      default: () => { }
    },
  },
  watch: {
    form(data) {
      if (this.isEdit) {
        this.form.certType = '01'
      }
      this.$nextTick(() => {
        this.roleIds = data.roleIds
        if (typeof data.statementAccountType === 'string') {
          this.statementAccountTypeArr = data.statementAccountType.split(',')
        }
      })
    },
    'form.userName'(val) {
      this.state = 2
    }
  },
  data() {
    return {
      zjControl: {
        ...this.$api.userInfoManage,
        getEmployeeInfo: this.$api.entInfoManage.getEmployeeInfo
      },
      roleIds: [],
      statementAccountTypeArr: [],
      detailData: {},
      attachInfo: [{ fileId: "", type: "身份证影印件", fileName: "" }],
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
        htSysCode: [
          {
            required: true,
            message: "海天业务系统账号",
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
            type: "email",
            message: "请输入正确的邮箱",
            trigger: ["blur"],
          },
        ],
      },
      rolesActive: [],
      state: 0,
    };
  },
  created() {
    this.getRow();
  },
  methods: {
    //获取企业信息-确认
    getEnterpriseConfirm() {
      this.zjControl
        .getEnterpriseConfirm({ name: this.detailData.name }).then((res) => {
          this.state = 1
          this.detailData = res.data;
          // 核心企业可选角色
          if (this.detailData.entType === "B") {
            this.dictionary.autoRoleList = this.dictionary.hxqySysRoleList
          }
          // 供应商可选角色
          if (this.detailData.entType === "S") {
            this.dictionary.autoRoleList = this.dictionary.gysSysRoleList
          }
          // 平台运营可选角色
          if (this.detailData.entType === "O") {
            this.dictionary.autoRoleList = this.dictionary.ptfSysRoleList
          }
          // 保理公司可选角色
          if (this.detailData.entType === "BL") {
            this.dictionary.autoRoleList = this.dictionary.blSysRoleList
          }
          console.log(this.dictionary)
        });
    },
    // 获取海天员工信息
    getEmployeeInfo() {
      this.zjControl.getEmployeeInfo({ htSysCode: this.form.htSysCode, customCode: this.detailData.customCode }).then((res) => {
        if (res.data.realName) {
          this.state = 2
          let sysUserItem = {
            userName: res.data.realName,//用户名
            certNo: res.data.idcardNo,//证件号码
            mobileNo: res.data.tel,//手机号码
            email: res.data.email,//电子邮箱
            roleIds: res.data.roleIds,//操作员角色
            // statementAccountType: [], //对账单类型
          }
          this.roleIds = res.data.roleIds
          if (res.data.statementAccountType.split(',')) {
            let statementAccountTypeArr = res.data.statementAccountType.split(',')
            statementAccountTypeArr.forEach((item, index) => {
              this.$set(this.statementAccountTypeArr, index, item)
            })
            // this.statementAccountTypeArr = res.data.statementAccountType
          }
          // 返回的数据不能修改
          if (!!sysUserItem.htSysCode) sysUserItem.isHtSysCodeDis = true //是否禁用
          if (!!sysUserItem.userName) sysUserItem.isUserNameDis = true //是否禁用
          if (!!sysUserItem.certNo) sysUserItem.isCertNoDis = true //是否禁用
          if (!!sysUserItem.mobileNo) sysUserItem.isMobileNoNameDis = true //是否禁用
          if (!!sysUserItem.email) sysUserItem.isEmailDis = true //是否禁用
          this.$emit('update:form', Object.assign(sysUserItem, this.form))
          console.log(this.form)

          this.$message.success('查询成功！')
        } else {
          this.$message.error('娅米账号/业务系统账号不存在！')
        }
      })
    },
    //上传附件
    handleFileUpload(data) {
      let formData = new FormData();
      formData.append("file", data.file);
      this.$api.baseCommon.uploadFile(formData).then((res) => {
        data.data.row.fileId = res.data.fileId;
        data.data.row.fileName = res.data.fileName;
        data.data.row.fileSize = res.data.fileSize;
      });
    },
    // 新增用户
    handleForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let roleArr = this.roleIds
          if (roleArr) {
            if (roleArr.includes('5') && roleArr.includes('6') || roleArr.includes('8') && roleArr.includes('9') || roleArr.includes('11') && roleArr.includes('12') || roleArr.includes('14') && roleArr.includes('15')) {
              this.$message.error('不能同时选经办员和复核员！')
              return
            }
          }
          let params = Object.assign(this.form, this.detailData);
          params.roleIds = this.roleIds
          if (this.statementAccountTypeArr) {
            params.statementAccountType = this.statementAccountTypeArr.join(',')
          }
          if (this.attachInfo[0].fileId) {
            params.idCardAttach = this.attachInfo // 身份证附件
          } else {
            params.idCardAttach = []
          }
          this.$emit('formPass', this.form)
        }
      })
    },
  },
};
</script>

<style lang="less" scoped>
//证件有效期
/deep/.el-form-item__regExpire {
  .zj-date-range-picker {
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
  .el-form-item {
    margin-bottom: 0;
    .el-form-item__error {
      top: 14px;
    }
  }
}

.rolesSelect {
  width: 400px;
  /deep/.el-input {
    width: 400px;
  }
}
</style>