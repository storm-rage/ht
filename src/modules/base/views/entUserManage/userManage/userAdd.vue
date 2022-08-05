<template>
  <zj-content-container>
    <zj-top-header>新增用户申请</zj-top-header>
    <el-form ref="form" label-width="160px">
      <zj-content-block>
        <zj-header title="企业信息"></zj-header>
        <zj-content>
          <el-row>
            <el-col :span="24">
              <el-form-item label="企业名称：">
                <el-input v-model="detailData.name" style="width: 200px" />
                <zj-button
                  class="zj-m-l-20"
                  type="primary"
                  @click="getEnterpriseConfirm"
                  >确认</zj-button
                >
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="平台客户类型：">
                <span>{{ detailData.entType | value }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="客户业务系统编码：">
                <span>{{ detailData.customCode | value }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否海天集团：">
                <span>{{ detailData.isHtEnterprise | value }}</span>
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
              <el-form-item label="用户姓名：">
                <el-input v-model="form.userName" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="证件类型：">
                <el-select
                  v-model="form.certType"
                  filterable
                  placeholder="请选择"
                  :popper-append-to-body="false"
                >
                  <!-- <el-option
              v-for="item in dictionary.isGenerateVouchers"
              :key="item.code"
              :label="item.desc"
              :value="item.code"
            >
            </el-option> -->
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="证件号码：">
                <el-input v-model="form.certNo" />
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
                <el-input v-model="form.a" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="用户角色：">
                <el-select
                  v-model="form.roleId"
                  filterable
                  placeholder="请选择"
                  :popper-append-to-body="false"
                >
                  <!-- <el-option
              v-for="item in dictionary.isGenerateVouchers"
              :key="item.code"
              :label="item.desc"
              :value="item.code"
            >
            </el-option> -->
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="请选择开凭证对账单类型权限："
                label-width="280px"
              >
                <el-select
                  v-model="form.a"
                  filterable
                  placeholder="请选择"
                  :popper-append-to-body="false"
                >
                  <!-- <el-option
              v-for="item in dictionary.isGenerateVouchers"
              :key="item.code"
              :label="item.desc"
              :value="item.code"
            >
            </el-option> -->
                </el-select>
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
      detailData: {},
      attachInfo: [{ fileId: "", type: "身份证影印件", fileName: "" }],
    };
  },
  created() {
    this.getRow();
    this.getUserInformation();
  },
  methods: {
    //获取企业信息-确认
    getEnterpriseConfirm() {
      this.zjControl
        .getEnterpriseConfirm({ name: this.detailData.name })
        .then((res) => {
          this.detailData = res.data;
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
    // 新增用户
    submit() {
      this.form.attachName = this.attachInfo[0].fileName
      this.form.fileId = this.attachInfo[0].fileName
      this.form.id = this.attachInfo[0].id
      this.zjControl.addUser(this.form).then((res) => {
        this.$message.success("新增用户成功！");
        this.goParent();
      });
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