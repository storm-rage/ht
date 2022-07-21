<template>
  <el-dialog
    title="签收拒绝"
    :visible.sync="dialogShow" width="600px"
    :close-on-click-modal="false" left
  >
    <el-form :model="dialogForm" ref="dialogForm" :rules="rules">
      <el-form-item label="请输入拒签原因：" prop="refuseReason">
        <el-input type="textarea"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <zj-button status="primary" @click="onConfirm">确认</zj-button>
      <zj-button status="primary" @click="cancel">取消</zj-button>
    </div>

  </el-dialog>
</template>

<script>
export default {
  name: "rejectDialog",
  props: {
    show: { type: Boolean, default: false},
    form: {},

  },
  data() {
    return {
      dialogShow:false,
      dialogForm: {},
      rules: {
        refuseReason:[
          {required: true, message:'请输入拒绝原因！', trigger:'blur'}
        ]
      }
    }
  },
  methods: {
    onConfirm() {
      // this.zjControl.xxx(this.form)
      this.goParent()
      this.dialogShow = false
    },
    cancel() {
      this.dialogShow = false
    },
    open(form,Boolean) {
      this.dialogShow = true
      this.dialogForm = form
      console.log(form)
    },
  },
}
</script>

<style scoped lang="less">

</style>
