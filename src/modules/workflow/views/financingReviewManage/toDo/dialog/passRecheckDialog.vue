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
      <zj-button type="primary" @click="onConfirm(titleInfo === '复核通过'? '1':'2')" :api="zjBtn.submitFirstAudit">确认</zj-button>
      <zj-button type="primary" @click="reviewConfirm(titleInfo === '复核通过'? '3':'4')" :api="zjBtn.submitReviewAudit">复核确认</zj-button>
      <zj-button status="primary" @click="cancel">取消</zj-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "passRecheckDialog",
  props: {
    zjControl: Object,
  },
  data() {
    return {
      dialogShow:false,
      dialogForm: {},
      titleInfo: '',
    }
  },
  methods: {
    //初审
    onConfirm(flag) {
      let params = {
        attachList: this.dialogForm.attachList,
        creditId: this.dialogForm.creditId,
        id: this.dialogForm.id,
        isRiskFlag: this.dialogForm.isRiskFlag,
        operateFlag: flag,//融资审核操作标志：1-保理公司初审通过 2-保理公司初审驳回 3-保理公司复审通过 4-保理公司复审驳回上一级
        remark: this.dialogForm.remark,
        voucherId: this.dialogForm.voucherId,
      }
      this.zjControl.submitFirstAudit(params).then(res=>{
        this.$message.success(res.msg)
        this.dialogShow = false
      })
    },
    //复审
    reviewConfirm(flag) {
      let params = {
        attachList: this.dialogForm.attachList,
        creditId: this.dialogForm.creditId,
        id: this.dialogForm.id,
        isRiskFlag: this.dialogForm.isRiskFlag,
        operateFlag: flag,//融资审核操作标志：1-保理公司初审通过 2-保理公司初审驳回 3-保理公司复审通过 4-保理公司复审驳回上一级
        remark: this.dialogForm.remark,
        voucherId: this.dialogForm.voucherId,
      }
      this.zjControl.submitReviewAudit(params).then(res=>{
        this.$message.success(res.msg)
        this.dialogShow = false
      })
    },
    cancel() {
      this.dialogShow = false
    },
    open(flag,form) {
      this.dialogShow = true
      this.titleInfo = flag
      this.dialogForm = form
      console.log(this.dialogForm)
    },
  },
}
</script>

<style scoped lang="less">

</style>
