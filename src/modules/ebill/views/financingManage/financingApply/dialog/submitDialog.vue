<template>
  <el-dialog
    title="温馨提示"
    :visible.sync="dialogShow" width="600px"
    :close-on-click-modal="false" left
  >
    <div class="zj-m-b-20">
      <p>请提示复核人员在融资开始日下午3:00前完成审批，谢谢！是否确认提交复核？</p>
    </div>
    <div slot="footer" class="dialog-footer">
      <zj-button type="primary" @click="onConfirm">确认</zj-button>
      <zj-button status="primary" @click="cancel">取消</zj-button>
    </div>

  </el-dialog>
</template>

<script>
export default {
  name: "submitDialog",
  props: {
    form: Object,
    zjControl: Object,
  },
  data() {
    return {
      dialogShow:false,
    }
  },
  methods: {
    onConfirm() {
      console.log(this.zjControl)
      //订单融资提交
      if(this.zjControl.submitFinancingOrderApply) {
        console.log('订单融资')
        this.zjControl.submitFinancingOrderApply(this.form)
      }
      //入库/凭证融资提交
      if(this.zjControl.submitFinancingBillApply) {
        console.log('入库/凭证融资提交')
        this.zjControl.submitFinancingBillApply(this.form)
      }
      this.dialogShow = false
      this.goParent()
    },
    cancel() {
      this.dialogShow = false
    },
    open(form,Boolean) {
      this.dialogShow = true
      console.log(form)
    },
  },
}
</script>

<style scoped lang="less">

</style>
