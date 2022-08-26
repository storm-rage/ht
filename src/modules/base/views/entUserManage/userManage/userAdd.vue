<template>
  <zj-content-container>
    <zj-top-header>新增用户申请</zj-top-header>
    <el-form ref="form" :model="form" :rules="rules" label-width="160px">
      <zj-content-block>
        <zj-header title="企业信息"></zj-header>
        <zj-content>
          <el-row>
            <el-col :span="24">
              <el-form-item label="企业名称：">
                <el-input v-model="detailData.name" style="width: 200px" />
                <zj-button class="zj-m-l-20" type="primary" @click="getEnterpriseConfirm">确认</zj-button>
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
            <el-col :span="8">
              <el-form-item label="用户姓名：" prop="userName">
                <el-input v-model="form.userName" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="证件类型：" prop="certType">
                <el-select v-model="form.certType" filterable placeholder="请选择" :popper-append-to-body="false">
                  <el-option v-for="item in dictionary.certType" :key="item.code" :label="item.desc" :value="item.code">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="证件号码：" prop="certNo">
                <el-input v-model="form.certNo" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="证件有效期：">
                <zj-date-range-picker class="el-form-item__regExpire" :startDate.sync="form.certStartDate" :endDate.sync="form.certEndDate" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="手机号码/用户名：" prop="mobileNo">
                <el-input v-model="form.mobileNo" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="邮箱：">
                <el-input v-model="form.email" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="海天业务系统账号：">
                <el-input v-model="form.htSysCode" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-for="(item, index) in form.roles" :key="item.key">
            <zj-content>
              <el-col>
                <el-form-item label="用户角色：">
                  <el-select v-model="form.roles[index].roleId" filterable placeholder="请选择" :popper-append-to-body="false" multipl @change="roleChange">
                    <el-option v-for="item in dictionary.autoRoleList" :key="item.code" :label="item.desc" :value="item.code" :disabled="item.disabled">
                    </el-option>
                  </el-select>
                  <el-button @click="addDomRole" class="zj-m-l-20" v-if="form.roles.length < 2">新增</el-button>
                  <el-button @click="deleteDomRole(index)" class="zj-m-l-20" v-if="index>0">删除</el-button>
                </el-form-item>
                <el-form-item label="请选择开凭证对账单类型权限：" label-width="280px" v-if="showStatementAccountType(form.roles[index].roleId)">
                  <el-select v-model="form.roles[index].statementAccountTypeArr" filterable placeholder="请选择" :popper-append-to-body="false" multiple>
                    <el-option v-for="item in dictionary.statementAccountTypeList" :key="item.code" :label="item.desc" :value="item.code">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </zj-content>

          </el-row>
          <zj-collapse title="身份证">
            <zj-table :pager="false" ref="attach" :dataList="attachInfo">
              <zj-table-column type="seq" width="60" title="序号" />
              <zj-table-column field="type" title="附件类型" />
              <zj-table-column field="fileName" title="附件" />
              <zj-table-column title="操作" fixed="right">
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
    <zj-content-footer>
      <zj-button type="primary" @click="submit">提交申请</zj-button>
      <zj-button class="back" @click="goParent">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>
<script>
import { validateIdCard, newValidateFixedPhone, validateBankAcct } from "@utils/rules";

export default {
  components: {},
  data() {
    return {
      zjControl: this.$api.userInfoManage,
      form: {
        roles: [
          {
            roleId: '',
            statementAccountType: '',
            key: Date.now()
          }
        ],
      },
      detailData: {},
      dictionary: {},
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
    };
  },
  created() {
    this.getRow();
    this.getDictionary();
  },
  methods: {
    // 选择经办显示对账单类型
    showStatementAccountType(code) {
      let codeArr = ["5", "8", "11", "14"]
      if (codeArr.includes(code)) {
        return true
      } else {
        return false
      }
    },
    roleChange(val) {
      this.dictionary.autoRoleList.forEach(item => {
        if (item.code === val) {
          item.disabled = true
        }
      });
      console.log(this.dictionary.autoRoleList)
    },
    //获取字典
    getDictionary() {
      this.zjControl.getUserDictionary().then((res) => {
        this.dictionary = res.data;
      });
    },
    //获取企业信息-确认
    getEnterpriseConfirm() {
      this.zjControl
        .getEnterpriseConfirm({ name: this.detailData.name }).then((res) => {
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
    submit() {
      let params = Object.assign(this.form, this.detailData);
      params.roles.forEach(item => {
        item.statementAccountType = item.statementAccountTypeArr.join(',')
        delete item.statementAccountTypeArr
      })
      params.idCardAttach = this.attachInfo // 身份证附件
      this.zjControl.addUser(params).then((res) => {
        this.$message.success("新增用户成功！");
        this.goParent();
      });
    },
    // 新增角色
    addDomRole() {
      this.form.roles.push({
        roleId: '',
        statementAccountType: '',
        key: Date.now()
      });
    },
    // 删除新增角色
    deleteDomRole(index) {
      this.form.roles.splice(index, 1)
    }
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
</style>