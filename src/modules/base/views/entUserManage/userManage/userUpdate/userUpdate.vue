<template>
  <zj-content-block>
    <zj-content-block>
      <zj-header title="用户信息"></zj-header>
      <zj-content>
        <el-form ref="userForm" :model="form" :rules="rules" label-width="160px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="用户编码：">
                <span>{{ form.userCode | value }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="用户姓名：">
                <span>{{ form.userName | value }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="证件类型：">
                {{
                    typeMap(this.dictionary.certType, form.certType)
                  }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="证件号码：">
                <span>{{ form.certNo | value }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="证件有效期：" prop="certStartDate">
                <zj-date-range-picker class="el-form-item__regExpire" :startDate.sync="form.certStartDate" :endDate.sync="form.certEndDate" :disabled="!isEdit" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="手机号码/用户名：" prop="mobileNo">
                <el-input v-model="form.mobileNo" :disabled="!isEdit" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="海天业务系统账号：">
                <el-input v-model="form.htSysCode" :disabled="!isEdit" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

        <zj-collapse title="身份证">
          <zj-table :pager="false" ref="attach" :dataList="attachInfo">
            <zj-table-column type="seq" width="60" title="序号" />
            <zj-table-column field="type" title="附件类型" />
            <zj-table-column field="fileName" title="附件" />
            <zj-table-column title="操作" fixed="right">
              <template v-slot="{ row }">
                <zj-upload :httpRequest="handleFileUpload" :data="{ row }" class="zj-inline" v-if="isEdit">
                  <zj-button type="text">上传</zj-button>
                </zj-upload>
                <zj-button v-if="row.fileId" type="text" @click="downloadFile(row)">下载</zj-button>
              </template>
            </zj-table-column>
          </zj-table>
          <zj-content v-if="isEdit">
            <zj-content-tip text="1.上传的身份证影像件请加盖公司公章。2.支持上传的文档格式：PDF。3.将身份证正、反面完整放在同一页上。请确保身份证在有效期内。 "></zj-content-tip>
          </zj-content>
        </zj-collapse>
      </zj-content>
    </zj-content-block>
    <zj-content-block>
      <zj-header title="用户归属企业信息"></zj-header>
      <zj-content>
        <zj-table ref="xTable" :dataList="form.userAndEntInfoList" :edit-config="{
              trigger: 'manual',
              mode: 'row',
              icon: '-',
              autoClear: false,
              showStatus: true,
            }">
          <zj-table-column field="code" title="企业代码" />
          <zj-table-column field="customCode" title="客户业务系统编码" />
          <zj-table-column field="name" title="企业名称" />
          <zj-table-column field="isHtEnterprise" title="是否海天集团" :formatter="(obj) => typeMap(dictionary.isHtEnterprise, obj.cellValue)" />
          <zj-table-column field="entType" title="平台客户类型" :formatter="(obj) => typeMap(dictionary.entType, obj.cellValue)" />
          <zj-table-column field="createDatetime" title="新增日期" :formatter="date" />
          <zj-table-column field="entState" title="企业状态" :formatter="(obj) => typeMap(dictionary.enterpriseStateList, obj.cellValue)" />
          <zj-table-column field="roleId" title="角色" :formatter="(obj) => typeMap(dictionary.sysRoleList, obj.cellValue)" />
          <zj-table-column field="email" title="邮箱" :edit-render="{}">
            <template #edit="{ row }">
              <vxe-input v-model="row.email" type="text"></vxe-input>
            </template>
          </zj-table-column>
          <zj-table-column field="userState" title="状态" :formatter="(obj) => typeMap(dictionary.userState, obj.cellValue)" />
          <zj-table-column field="statementAccountType" title="支持开立债权凭证的对账单类型" :edit-render="{}">
            <template #default="{ row }">
              <!-- {{row.statementAccountType}} -->
              {{handleStatementAccountType(row.statementAccountType)}}
            </template>
            <template #edit="{ row }">
              <vxe-select v-model="row.statementAccountType" multiple transfer>
                <vxe-option v-for="item in dictionary.statementAccountTypeList" :key="item.code" :label="item.desc" :value="item.code">
                </vxe-option>
              </vxe-select>
            </template>
          </zj-table-column>
          <zj-table-column title="操作" fixed="right" width="160px" v-if="isEdit">
            <!-- <template v-slot="{ row,rowIndex }">
              <zj-button type="text" @click="updateTypeDialog(row,rowIndex)">维护对账单类型</zj-button>
            </template> -->
            <template #default="{ row }">
              <template v-if="$refs.xTable.isActiveByRow(row)">
                <zj-button type="text" @click="saveRowEvent(row)">保存</zj-button>
                <zj-button type="text" @click="cancelRowEvent(row)">取消</zj-button>
              </template>
              <template v-else>
                <zj-button type="text" @click="editRowEvent(row)">编辑</zj-button>
              </template>
            </template>
          </zj-table-column>
        </zj-table>
      </zj-content>
    </zj-content-block>
    <!-- <el-dialog title="维护对账单类型" :visible.sync="dialogVisible" width="30%" v-if="dialogVisible">
      <span>请选择开凭证对账单类型权限:&nbsp;</span>
      <el-select v-model="statementAccountType" filterable placeholder="请选择" multiple>
        <el-option v-for="item in dictionary.statementAccountTypeList" :key="item.code" :label="item.desc" :value="item.code">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateStatementAccountType">确 定</el-button>
      </span>
    </el-dialog> -->
  </zj-content-block>
</template>
<script>
import { newValidateFixedPhone } from "@utils/rules";

export default {
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
      if (!!data.idCardAttach) {
        this.$nextTick(() => {
          this.attachInfo[0] = Object.assign(this.attachInfo[0], data.idCardAttach[0])
        })
      }
    },
  },
  data() {
    return {
      zjControl: this.$api.userInfoManage,
      attachInfo: [{ fileId: "", type: "身份证影印件", fileName: "" }],
      dialogVisible: false,
      statementAccountType: [],
      updateTypeIndex: 0,
      rules: {
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
  },
  methods: {
    handleForm() {
      this.$refs.userForm.validate(boo => {
        if (!this.isEdit) { //详情状态不校验表单
          this.$refs.userForm.clearValidate()
          boo = true
        }
        if (boo) {
          this.form.idCardAttach = this.attachInfo
          this.$emit('formPass', this.form)
        }
      })
    },
    updateTypeDialog(row, index) {
      this.dialogVisible = true
      this.updateTypeIndex = index
    },
    // 选择对账单类型
    updateStatementAccountType() {
      if (this.form.userAndEntInfoList[this.updateTypeIndex]) {
        this.form.userAndEntInfoList[this.updateTypeIndex].statementAccountType = this.statementAccountType.join(',')
      }
      this.dialogVisible = false
      console.log('选中对账单类型：', this.form.userAndEntInfoList[this.updateTypeIndex].statementAccountType)
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
    //下载附件
    downloadFile(fileId, fileName) {
      this.zjControl.downloadFile({ fileId, fileName })
    },
    //对账单类型转码
    handleStatementAccountType(data) {
      if (!!data) {
        let arr = data.split(',')
        if (Array.isArray(arr) && data.length) {
          arr.forEach((item, i) => {
            console.log(this.typeMap(this.dictionary.statementAccountTypeList, item))
            arr[i] = this.typeMap(this.dictionary.statementAccountTypeList, item)
          })
          return arr.join(',')
        }
      }
    },
    editRowEvent(row) {
      const $table = this.$refs.xTable
      $table.setActiveRow(row)
    },
    saveRowEvent() {
      const $table = this.$refs.xTable
      $table.clearActived()
    },
    cancelRowEvent(row) {
      const $table = this.$refs.xTable
      $table.clearActived().then(() => {
        // 还原行数据
        $table.revertData(row)
      })
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