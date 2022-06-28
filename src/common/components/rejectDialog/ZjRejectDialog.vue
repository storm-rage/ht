<template>
<el-dialog
  class="zj-reject-dialog"
  custom-class="header-shadow"
  :title="title"
  :visible.sync="show"
  width="40%"
  :close-on-click-modal="false"
  @close="close">
    <el-form :model="rejectionForm" ref="rejectionForm" :rules="rejectionRules">
        <el-form-item :label="label" prop="rejectReason" label-width="100px">
            <el-input
                    type="textarea"
                    placeholder="请输入内容"
                    v-model="rejectionForm.rejectReason"
                    style="width: 85%"
                    :rows="rows"
                    :show-word-limit="true"
                    :maxlength="max"
            >
            </el-input>
        </el-form-item>
    </el-form>
    <div slot="footer" style="text-center:center">
        <el-button size="medium" type="primary" @click="reject">确 定</el-button>
        <el-button size="medium" @click="close">取 消</el-button>
    </div>
</el-dialog>
</template>

<script>
    export default {
        name: "ZjRejectDialog",
        props:{
          title:{type:String,default:'驳回原因'},
          label:{type:String,default:'备注'},
          message:{type:String,default:'请输入驳回原因'},
          beforeReject:{type:Function},
          max:{type:Number,default:1000},
          width:{
            type:String,
            default:''
          },
          rows:{
            type:Number,
            default:4
          }
        },
        data(){
            return {
                show:false,
                rejectionForm: {
                    rejectReason: ''
                },
                rejectionRules: {
                    rejectReason: [{ required: true, message: this.message, trigger: 'blur' }],
                },

                row:{}
            }
        },
        methods:{
            //打开
            open(row = {}){
                this.row  = row
                if(this.beforeReject && typeof(this.beforeReject) === 'function'){
                    this.show = this.beforeReject()
                }else{
                    this.show = true
                }
            },
            //关闭
            close(){
                if (this.$refs.rejectionForm) {
                  this.$refs.rejectionForm.resetFields()
                }
                this.rejectionForm.rejectReason = ''
                this.show = false
            },
            //驳回确认
            reject(){
                this.$refs.rejectionForm.validate(boo => {
                    if(!boo) return false // 此处不要弹出信息，产品要求
                    let row = JSON.parse(JSON.stringify(this.row))
                    //text row
                    this.$emit('reject',this.rejectionForm.rejectReason,row)
                    this.row = {}
                })
            }
        }
    }
</script>

<style lang="less">
.zj-reject-dialog{
  .el-dialog__header,.el-dialog__footer{
    text-align: center!important;
  }
  .el-dialog__body{
    padding: 15px 20px 0!important;
    /*padding-bottom: 0!important;*/
  }
}
.header-shadow{
  min-width: 350px;
  textarea{
    resize: none!important;
  }
}
</style>
