<template>
  <el-dialog
    title="融资复核拒绝"
    :visible.sync="dialogShow" width="600px"
    :close-on-click-modal="false" left
  >
    <el-form :model="form" ref="form" :rules="rules">
      <el-form-item label="请输入拒绝原因：" prop="refuseReason">
        <el-input type="textarea" v-model="form.refuseReason"></el-input>
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
  name: "submitDialog",
  props: {
    zjControl: Object,
    financingId: String,
  },
  data() {
    return {
      dialogShow:false,
      dialogForm: {},
      form: {
        refuseReason:'',
      },
      rules: {
        refuseReason:[
          {required: true, message:'请输入拒绝原因！', trigger:'blur'}
        ]
      }
    }
  },
  methods: {
    onConfirm() {
      this.$refs.form.validate(boo=>{
        if(!boo){return}
        let params = {
          agreementList: this.dialogForm.phasedAgreements,
          flag: '2',//1-通过 2-拒绝
          id: this.financingId,
          reason: this.form.refuseReason,
        }
        this.zjControl.submitFinancingReview(params).then(res=>{
          this.$message.success(res.msg)
        })
        this.dialogShow = false
      })
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
