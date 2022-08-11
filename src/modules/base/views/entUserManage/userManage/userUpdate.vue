<template>
  <zj-content-container>
    <zj-top-header>修改用户信息申请</zj-top-header>
    <el-form ref="form" label-width="160px">
      <zj-content-block>
        <zj-header title="用户信息"></zj-header>
        <zj-content>
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
                <span>{{ form.certType | value }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="证件号码：">
                <span>{{ form.certNo | value }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="证件有效期：">
                <zj-date-range-picker
                  class="el-form-item__regExpire"
                  :startDate.sync="form.certStartDate"
                  :endDate.sync="form.certEndDate"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="手机号码/用户名：">
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
          <zj-collapse title="身份证">
            <zj-table :pager="false" ref="attach" :dataList="attachInfo">
              <zj-table-column type="seq" width="60" title="序号" />
              <zj-table-column field="type" title="附件类型" />
              <zj-table-column field="fileName" title="附件" />
              <zj-table-column title="操作" fixed="right">
                <template v-slot="{ row }">
                  <zj-upload
                    :httpRequest="handleFileUpload"
                    :data="{ row }"
                    class="zj-inline"
                  >
                    <zj-button type="text">上传</zj-button>
                  </zj-upload>
                  <zj-button
                    v-if="row.fileId"
                    type="text"
                    @click="toDownload(row)"
                    >下载</zj-button
                  >
                </template>
              </zj-table-column>
            </zj-table>
            <zj-content>
              <zj-content-tip
                text="1.上传的身份证影像件请加盖公司公章。2.支持上传的文档格式：PDF。3.将身份证正、反面完整放在同一页上。请确保身份证在有效期内。 "
              ></zj-content-tip>
            </zj-content>
          </zj-collapse>
        </zj-content>
      </zj-content-block>
    </el-form>
    <zj-content-block>
      <zj-header title="用户归属企业信息"></zj-header>
      <zj-content>
        <zj-table :dataList="form.userAndEntInfoList">
          <zj-table-column field="code" title="企业代码" />
          <zj-table-column field="customCode" title="客户业务系统编码" />
          <zj-table-column field="entName" title="企业名称" />
          <zj-table-column field="isHtEnterprise" title="是否海天集团" />
          <zj-table-column field="entType" title="平台客户类型" />
          <zj-table-column field="createDatetime" title="新增日期" />
          <zj-table-column field="entState" title="企业状态" />
          <zj-table-column field="roleId" title="角色" />
          <zj-table-column field="userState" title="状态" />
          <zj-table-column
            field="field3"
            title="支持开立债权凭证的对账单类型"
          />
          <zj-table-column title="操作" fixed="right" width="200px">
            <template>
              <zj-button type="text" @click="&quot;&quot;;"
                >维护对账单类型</zj-button
              >
            </template>
          </zj-table-column>
        </zj-table>
      </zj-content>
    </zj-content-block>
    <zj-content-footer>
      <zj-button type="primary" @click="submit">提交申请</zj-button>
      <zj-button class="back" @click="goParent">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>
<script>
export default {
  components: {},

  data() {
    return {
      zjControl: this.$api.userInfoManage,
      form: {},
      attachInfo: [{ fileId: "", type: "身份证影印件", fileName: "" }],
    };
  },
  created() {
    this.getRow();
    this.getUserInformation();
  },
  methods: {
    // 获取详情
    getUserInformation() {
      this.zjControl.getUserInformation({ id: this.row.id }).then((res) => {
        this.form = res.data;
      });
    },
    //修改用户
    submit() {
      this.form.attachName = this.attachInfo[0].fileName;
      this.form.fileId = this.attachInfo[0].fileName;
      this.form.id = this.attachInfo[0].id;
      this.zjControl.updateUser(this.form).then((res) => {
        this.$message.success("修改用户成功！");
        this.goParent();
      });
    },
    //上传附件
    handleFileUpload({ file, data }) {
      console.log(file, data);
      let formData = new FormData();
      formData.append("fileId", file.uid);
      formData.append("fileName", file.name);
      formData.append("fileSize", file.size);
      formData.append("fileType", file.type);
      this.zjControl.uploadAttach(formData).then((res) => {
        data.row.fileId = res.data.fileId;
        data.row.fileName = res.data.fileName;
        this.$message.success("附件上传成功!");
      });
    },
    //下载附件
    toDownload() {
      this.zjControl.downloadFile(this.attachInfo[0]);
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
</style>