<template>
  <el-dialog
    title="签收拒绝"
    :visible.sync="dialogShow" width="600px"
    :close-on-click-modal="false" left
  >
    <el-form :model="dialogForm" ref="dialogForm" :rules="rules">
      <el-form-item label="请输入拒签原因：" prop="notes">
        <el-input type="textarea" v-model="dialogForm.notes"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <zj-button type="primary" @click="onConfirm">确认</zj-button>
      <zj-button status="primary" @click="cancel">取消</zj-button>
    </div>

  </el-dialog>
</template>

<script>
export default {
  name: "rejectDialog",
  props: {
    zjControl: Object,
    id: String,
    state: String,
  },
  data() {
    return {
      dialogShow:false,
      dialogForm: {
        notes: '',
      },
      rules: {
        notes:[
          {required: true, message:'请输入拒绝原因！', trigger:'blur'}
        ]
      }
    }
  },
  methods: {
    onConfirm() {
      this.$refs.dialogForm.validate(boo=>{
        if(!boo){return}
        let params = {
          id: this.id,
          notes: this.dialogForm.notes,
          state: this.state,
        }
        this.zjControl.rejectBillSign(params).then(res=>{
          this.$message.success(res.msg)
          this.dialogShow = false
          this.search()
        })
      })
    },
    cancel() {
      this.dialogShow = false
    },
    open(form,Boolean) {
      this.dialogShow = Boolean
      this.dialogForm = form
    },
  },
  created() {
  }
}
</script>

<style scoped lang="less">

</style>
