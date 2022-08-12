<template>
  <el-dialog
    title="凭证作废确认"
    :visible.sync="dialogShow"
    width="600px"
    :close-on-click-modal="false"
    left
  >
    <p>您确定将所选中的凭证作废吗？</p>
    <el-form :model="dialogForm" ref="dialogForm" :rules="rules">
      <el-form-item label="请输入作废原因：" prop="rejectReason">
       <el-input type="textarea" v-model="dialogForm.rejectReason"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <zj-button type="primary" @click="onConfirm">确认</zj-button>
      <zj-button @click="cancel">取消</zj-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    show: { type: Boolean, default: false },
    form: {},
  },
  data() {
    return {
      zjControl: {
        invalidApply: this.$api.myOpenBill.invalidApply,
      },
      dialogShow: false,
      dialogForm: {},
      rules: {
        rejectReason: [
          { required: true, message: "请输入作废原因！", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    onConfirm() {
      this.$refs.dialogForm.validate((valid) => {
        if (valid) {
          this.zjControl.invalidApply(this.dialogForm).then((res) => {
            this.$message.success("已作废");
            this.$parent.search()
          });
          this.dialogShow = false;
        }
      });
    },
    cancel() {
      this.dialogShow = false;
    },
    open(form, Boolean) {
      this.dialogShow = true;
      this.dialogForm = form;
      console.log(form);
    },
  },
};
</script>

<style scoped lang="less">
</style>
