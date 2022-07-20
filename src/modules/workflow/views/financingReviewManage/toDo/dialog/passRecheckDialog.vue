<template>
  <el-dialog
    title="温馨提示"
    :visible.sync="dialogShow" width="600px"
    :close-on-click-modal="false" left
  >
    <div>
      <p style="line-height: 60px">是否确认{{titleInfo}}？</p>
      <p>触发风险预警，将进入风控流程，如有需要，请联系风控人员处理！</p>
      <p>业务完成，进入盖章环节，请及时联系印章保管员处理！</p>
    </div>
    <div slot="footer" class="dialog-footer">
      <zj-button type="primary" @click="onConfirm">确认</zj-button>
      <zj-button status="primary" @click="cancel">取消</zj-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "passRecheckDialog",
  props: {
    show: { type: Boolean, default: false},
    form: {},

  },
  data() {
    return {
      dialogShow:false,
      dialogForm: {},
      titleInfo: '',
    }
  },
  methods: {
    onConfirm() {
      // this.zjControl.xxx(this.form)
      this.dialogShow = false
      this.goParent()

    },
    cancel() {
      this.dialogShow = false
    },
    open(flag,Boolean) {
      this.dialogShow = true
      this.titleInfo = flag
      console.log(form)
    },
  },
}
</script>

<style scoped lang="less">

</style>
