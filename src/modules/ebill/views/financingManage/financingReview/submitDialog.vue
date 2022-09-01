<template>
  <div>
    <el-dialog
      title="温馨提示"
      :visible.sync="dialogShow" width="600px"
      :close-on-click-modal="false" left
    >
      <div>
        <p>请您在融资开始日下午3:00之间发起融资申请，谢谢！是否确认复核通过？</p>
      </div>
      <div slot="footer" class="dialog-footer">
        <zj-button status="primary" @click="onConfirm">确认</zj-button>
        <zj-button status="primary" @click="cancel">取消</zj-button>
      </div>

    </el-dialog>

    <!-- 云证书签章 -->
    <zj-certuficate ref="certuficate" @confirm="handleCertuficateDone"/>
  </div>

</template>

<script>
export default {
  name: "submitDialog",
  props: {
    zjControl: Object,
    financingId: String,
  },
  data() {
    return {
      dialogShow:false,
      dialogForm: {},
    }
  },
  methods: {
    //云证书返回
    onConfirm() {
      // 调用云证书
      this.$refs.certuficate.open()
    },
    cancel() {
      this.dialogShow = false
    },
    open(form) {
      this.dialogShow = true
      this.dialogForm = form
      console.log(form)
    },
    handleCertuficateDone(){
      let params = {
        agreementList: this.dialogForm.phasedAgreements,
        flag: '1',//1-通过 2-拒绝
        id: this.financingId,
        reason: '',
      }
      this.zjControl.submitFinancingReview(params).then(res=>{
        this.$message.success(res.msg)
      })
      this.dialogShow = false
      this.goParent()
    }
  },
}
</script>

<style scoped lang="less">

</style>
