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
      <zj-button type="primary" @click="onConfirm(titleInfo === '复核通过'? '1':'2')"
                 :api="zjBtn.submitFirstAudit"
                 v-if="dialogForm.transInfo.workflowState === 'F003'"
      >
        确认
      </zj-button>
      <zj-button type="primary" @click="reviewConfirm(titleInfo === '复核通过'? '3':'4')"
                 :api="zjBtn.submitReviewAudit"
                 v-if="dialogForm.transInfo.workflowState === 'F004'"
      >
        确认
      </zj-button>
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
      dialogForm: {
        transInfo: {},
        financingApplyInfo: {},
      },
      titleInfo: '',
      bizId: '',
    }
  },
  methods: {
    onConfirm(flag) {
      let loanDate = this.dialogForm.financingApplyInfo.loanDate//融资开始日
      let loanDateStart = new Date(loanDate.substr(0,4)+'/'+loanDate.substr(4,2)+'/'+loanDate.substr(6,2))
      let timeNow = new Date()
      let submitTime = timeNow.getHours()
      let blSetTime = this.dialogForm.blSetTime.slice(0,2)
      // if(loanDateStart.getTime() < timeNow.getTime()
      // ) {
      //   this.$message.error('客户融资开始日早于当天，不允许提交！')
      //   return
      // }
      // if(loanDateStart.getDate() === timeNow.getDate() && submitTime > blSetTime.toNumber() && this.dialogForm.blSetTime) {
      //   this.$messageBox({
      //     type:'warning',
      //     content:'已超过保理公司设置工作时间，是否继续提交？',
      //     showCancelButton: true,
      //     messageResolve:()=>{
      //       let params = {
      //         attachList: this.dialogForm.otherAttachList,
      //         creditId: this.dialogForm.blContractInfo.creditId,
      //         isRiskFlag: this.dialogForm.isRiskFlag,
      //         operateFlag: flag,//融资审核操作标志：1-保理公司初审通过 2-保理公司初审驳回 3-保理公司复审通过 4-保理公司复审驳回上一级
      //         remark: this.dialogForm.rejectReason,
      //         voucherId: this.dialogForm.voucherCreditInfo?this.dialogForm.voucherCreditInfo.voucherId:'',
      //         bizId: this.bizId,
      //       }
      //
      //     },
      //     messageReject:()=>{
      //       this.dialogShow = false
      //     }
      //   })
      //
      // }
      let params = {
                  attachList: this.dialogForm.otherAttachList?this.dialogForm.otherAttachList:[],
                  creditId: this.dialogForm.blContractInfo?this.dialogForm.blContractInfo.creditId:'',
                  isRiskFlag: this.dialogForm.isRiskFlag,
                  operateFlag: flag,//融资审核操作标志：1-保理公司初审通过 2-保理公司初审驳回 3-保理公司复审通过 4-保理公司复审驳回上一级
                  remark: this.dialogForm.rejectReason,
                  voucherId: this.dialogForm.voucherCreditInfo?this.dialogForm.voucherCreditInfo.voucherId:'',
                  bizId: this.bizId,
                }
      //初审
      this.zjControl.submitFirstAudit(params).then(res=>{
        this.$message.success(res.msg)
        this.dialogShow = false
        this.goParent()
      })
    },
    reviewConfirm(flag) {
      let params = {
        attachList: this.dialogForm.otherAttachList?this.dialogForm.otherAttachList:[],
        creditId: this.dialogForm.blContractInfo?this.dialogForm.blContractInfo.creditId:'',
        isRiskFlag: this.dialogForm.isRiskFlag,
        operateFlag: flag,//融资审核操作标志：1-保理公司初审通过 2-保理公司初审驳回 3-保理公司复审通过 4-保理公司复审驳回上一级
        remark: this.dialogForm.rejectReason,
        voucherId: this.dialogForm.voucherCreditInfo?this.dialogForm.voucherCreditInfo.voucherId:'',
        bizId: this.bizId,
      }
      //复审
      this.zjControl.submitReviewAudit(params).then(res=>{
        this.$message.success(res.msg)
        this.dialogShow = false
        this.goParent()
      })
    },
    cancel() {
      this.dialogShow = false
    },
    open(flag,form,bizId) {
      this.dialogShow = true
      this.titleInfo = flag
      this.bizId = bizId
      this.dialogForm = form
      console.log(this.dialogForm)
    },
  },
}
</script>

<style scoped lang="less">

</style>
