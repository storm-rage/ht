<template>
  <zj-content-container>
    <zj-top-header>个人信息维护</zj-top-header>
    <zj-content-block>
      <zj-header title="用户信息"></zj-header>
      <zj-content>
        <el-form ref="form" label-width="160px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="用户姓名：">
                <span>xxxxxxx</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="角色：">
                <el-select
                  v-model="form.a"
                  filterable
                  placeholder="请选择"
                  :popper-append-to-body="false"
                >
                  <el-option :label="经办员" :value="经办员" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="海天业务系统账号：">
                <el-input v-model="form.a" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="证件类型：">
                <el-select
                  v-model="form.a"
                  filterable
                  placeholder="请选择"
                  :popper-append-to-body="false"
                  v-if="isAdd"
                >
                  <el-option :label="身份证号码" :value="身份证号码" />
                </el-select>
                <span v-else>62434343</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="证件号码：">
                <el-input v-model="form.a" v-if="isAdd" />
                <span v-else>xxxxxxx</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="证件有效期：">
                <zj-date-range-picker
                  :startDate.sync="form.certStartDate"
                  :endDate.sync="form.certEndDate"
                  @startChange="certStartChange"
                  @endChange="certEndChange"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="手机号码/用户名：">
                <el-input v-model="form.a" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="邮箱：">
                <el-input v-model="form.a" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="邮箱：">
                <el-input v-model="form.a" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </zj-content>
    </zj-content-block>
    <zj-content-block>
      <zj-header title="身份证"></zj-header>
      <zj-content>
        <zj-table :pager="false">
          <zj-table-column type="seq" width="60" title="序号" />
          <zj-table-column field="field2" title="附件类型" />
          <zj-table-column field="field2" title="附件" />
          <zj-table-column title="操作" fixed="right">
            <template v-slot="{ row, rowIndex }">
              <zj-upload
                class="zj-inline"
                :httpRequest="handleFileUpload"
                :autoUpload="false"
                :onChange="handleFileChange"
              >
                <zj-button slot="trigger" type="text">上传</zj-button>
              </zj-upload>
            </template>
            <template>
              <zj-button v-if="row.fileId" type="text" @click="toDownload(row)"
                >下载</zj-button
              >
            </template>
          </zj-table-column>
        </zj-table>
        <zj-content>
          <zj-content-tip
            text="注：1.请将身份证正、反面完整放在同一页上，并加盖企业公章。请确保身份证在有效期内。"
          ></zj-content-tip>
          <br />
          <zj-content-tip text="2.支持上传的文档格式：PDF。"></zj-content-tip>
          <br />
          <zj-content-tip
            text=" 3.委托授权书请下载，加盖公司公章后上传。"
          ></zj-content-tip>
        </zj-content>
      </zj-content>
    </zj-content-block>
    <zj-content-block>
      <zj-content class="zj-m-l-20">
        <h4 class="zj-m-b-20">
          请将以上已盖章影像资料对应的纸质版邮递至以下地址：
        </h4>
        <el-form ref="form" label-width="100px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="收件人：">
                <span>xxxxxxx</span>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="收件人电话：">
                <span>xxxxxxx</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="收件地址：">
                <span>xxxxxxx</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </zj-content>
    </zj-content-block>
    <zj-content-footer>
      <zj-button type="primary" @click="submit">维护本人信息</zj-button>
      <zj-button type="primary" @click="submit">更换操作人员</zj-button>
      <zj-button class="back" @click="back">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>
<script>
export default {
  components: {},

  data() {
    return {
      form: {},
      fileList: [
        {
          field1: "海天a公司",
          field2: "是",
          field3: "54354343423X4645656456",
          field4: "订单保理",
          field5: "生效",
          field6: "2022.09.09 ～ 2023.09.08",
          field7: "100,000,000.00",
          field8: "生效",
        },
      ],
      pageType: "detail",
    };
  },
  methods: {
    back() {
      this.$router.push("/personalCenter")
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