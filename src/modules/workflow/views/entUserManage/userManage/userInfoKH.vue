<template>
  <zj-content-container>
    <zj-content-block>
      <zj-header title="用户信息"></zj-header>
      <zj-content>
        <el-form ref="form" :model="form" label-width="160px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="用户姓名：" prop="userName">
                <el-input v-model.trim="form.userName" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="角色：">
                <el-select v-model="roleId" filterable placeholder="请选择" :popper-append-to-body="false" disabled>
                  <el-option v-for="item in dictionary.roleId" :key="item.code" :label="item.desc" :value="item.code" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="海天业务系统账号：" prop="htSysCode">
                <el-input v-model.trim="form.htSysCode" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="证件类型：" prop="certType">
                <el-select v-model="form.certType" filterable placeholder="请选择" :popper-append-to-body="false" disabled>
                  <el-option v-for="item in dictionary.legalCertType" :key="item.code" :label="item.desc" :value="item.code" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="证件号码：" prop="certNo">
                <el-input v-model.trim="form.certNo" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="证件有效期：" prop="certStartDate">
                <zj-date-range-picker :startDate.sync="form.certStartDate" :endDate.sync="form.certEndDate" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="手机号码/用户名：" prop="mobileNo">
                <el-input v-model.trim="form.mobileNo" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="邮箱：" prop="email">
                <el-input v-model.trim="form.email" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="银行卡号：" prop="bankAcctNo">
                <el-input v-model.trim="form.bankAcctNo" disabled />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </zj-content>
    </zj-content-block>
    <zj-content-block>
      <zj-header>身份证</zj-header>
      <zj-content>
        <zj-table :pager="false" ref="attach" :dataList="attachInfo">
          <zj-table-column type="seq" width="60" title="序号" />
          <zj-table-column field="type" title="附件类型" />
          <zj-table-column field="fileName" title="附件" />
          <zj-table-column title="操作" fixed="right">
            <template v-slot="{ row }">
              <zj-button v-if="row.fileId" type="text" @click="toDownload(row)">下载</zj-button>
            </template>
          </zj-table-column>
        </zj-table>
      </zj-content>
    </zj-content-block>
  </zj-content-container>
</template>
<script>
export default {
  components: {},
  props: {
    form: {
      type: Object,
      default: () => { }
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
    }
  },
  data() {
    return {
      roleId: '',
      attachInfo: [{ fileId: "", type: "身份证影印件", fileName: "" }],
    };
  },
  created() {

  },
  methods: {

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