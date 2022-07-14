<template>
  <el-dialog
    title="温馨提示"
    :visible.sync="dialogShow" width="600px"
    :close-on-click-modal="false" center
  >
    <div>
      <p>请提示复核人员在融资开始日下午3:00前完成审批，谢谢！是否确认提交复核？</p>
    </div>
    <div slot="footer" class="dialog-footer">
      <zj-button status="primary" @click="onConfirm">确认</zj-button>
      <zj-button status="primary" @click="cancel">取消</zj-button>
    </div>

  </el-dialog>
</template>

<script>
export default {
  name: "submitDialog",
  props: {
    show: { type: Boolean, default: false},
    form: {},

  },
  data() {
    return {
      dialogShow:false,
      dialogForm: {},

    }
  },
  methods: {
    onConfirm() {
      // this.zjControl.xxx(this.form)
      // this.goParent()
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
