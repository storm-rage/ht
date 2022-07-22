<template>
  <el-dialog
    title="更换银行账户"
    :visible.sync="dialogVisible"
    width="900px"
    @close="close"
  >
    <el-form :model="form" ref="form" label-width="180px">
      <zj-content-block>
        <zj-table
          ref="bank"
          :dataList="form.entBankInfo"
          :pager="false"
          auto-resize
          @radio-change="handleRadioChange"
        >
          <zj-table-column type="radio" width="50" />
          <zj-table-column field="bankAccname" title="银行账户名称" />
          <zj-table-column field="bankAccno" title="银行账号" />
          <zj-table-column field="bankName" title="银行账户开户行" />
          <zj-table-column field="bankNo" title="银行联行号" />
          <zj-table-column field="bankType" title="银行类型" />
        </zj-table>
      </zj-content-block>
    </el-form>
    <div slot="footer" class="zj-center" style="display: block; width: 100%">
      <el-button
        style="width: 100px"
        size="small"
        type="primary"
        @click="submit"
        >确定</el-button
      >
      <el-button style="width: 100px" size="small" @click="close"
        >取消</el-button
      >
    </div>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      form: {},
    };
  },
  methods: {
    show(obj) {
      this.form = Object.assign({}, obj);
      this.dialogVisible = true;
    },
    close() {
      this.dialogVisible = false;
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
        }
      });
    },
    handleRadioChange({ row }) {
      this.form = row;
    },
  },
};
</script>
