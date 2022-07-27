<template>
  <div>
    <detail-page ref="detailPage"
                 :fileList="fileList"
                 :detailInfo="detailInfo"
                 :dic="dictionary"
                 title="额度变更复核" style="padding-bottom: 0"></detail-page>
    <zj-content style="padding-top: 0">
      <zj-content-tip text="注：1.调整后额度=原额度+本次申请增加额度。"></zj-content-tip>
    </zj-content>

    <zj-content-footer>
      <span style="display: inline-block;margin-right: 10px">
        <el-checkbox v-model="agreeCheck">我已阅读并同意</el-checkbox>&nbsp;
        <el-link :underline="false" type="primary" @click="toDownload">《额度调整申请书》</el-link>
      </span>
      <zj-button type="primary"
                 :disabled="rejectLoading"
                 :loading="passLoading"
                 :api="zjBtn.submitAdjustCreditReview"
                 @click="toReview">复核通过</zj-button>
      <zj-button  type="primary"
                  :disabled="passLoading"
                  :loading="rejectLoading"
                  :api="zjBtn.submitAdjustCreditReview"
                  @click="toReject">拒绝</zj-button>
      <zj-button  @click="goParent">返回</zj-button>
    </zj-content-footer>
    <!--  拒绝弹框  -->
    <zj-reject-dialog ref="rejectDialog"
                      @reject="reviewReject"
                      title="额度调整复核拒绝"
                      label="拒绝原因"
                      message="请输入拒绝原因"
                      :max="100"></zj-reject-dialog>
  </div>
</template>
<script>
import DetailPage from '../../detail/index';
import {TemplateType} from "@modules/constant";
export default {
  components: {DetailPage},
  data() {
    return {
      zjControl: {
        getDataDirectory: this.$api.billQuotaManage.getDataDirectory,
        downloadTemplate: this.$api.billQuotaManage.downloadTemplate,
        getAdjustCreditReviewDetail: this.$api.billQuotaManage.getAdjustCreditReviewDetail,
        submitCheck: this.$api.billQuotaManage.submitCheck,
        submitAdjustCreditReview: this.$api.billQuotaManage.submitAdjustCreditReview
      },
      // 是否阅读协议
      agreeCheck: false,
      // 字典
      dictionary: {},
      //详情信息
      detailInfo: {},
      // 附件信息
      fileList:[],
      passLoading: false,
      rejectLoading: false
    }
  },
  created() {
    this.getApi();
    this.getDic();
    this.getRow();
    this.getDetail();
  },
  methods: {
    getDic () {
      this.zjControl.getDataDirectory().then(res => {
        this.dictionary = res.data
      })
    },
    getDetail() {
      this.zjControl.getAdjustCreditReviewDetail({id: this.row.id}).then(res => {
        this.detailInfo = res.data;
        if (res.data && res.data.agreementInfoList) {
          this.fileList = res.data.agreementInfoList;
        }
      });
    },
    /**
     * 下载额度调整申请书
     */
    toDownload() {
      this.zjControl.downloadTemplate({
        templateType:  TemplateType.EDTZSQS,
        applyAddCreditAmount: this.detailInfo.applyAddCreditAmount,
        contractId: this.detailInfo.contractId,
        creditId: this.detailInfo.creditId
      })
    },
    toReview() {
      if (this.agreeCheck) {
        const money = this.money(this.detailInfo.applyAddCreditAmount);
        this.$confirm(`您本次申请调整额度：<b style="font-size: 18px;">${money}</b>元，请确认。`,'额度调整复核确认',{
          type: 'warning',
          dangerouslyUseHTMLString: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          this.passLoading = true;
          this.zjControl.submitCheck({
            applyAddCreditAmount: this.detailInfo.applyAddCreditAmount,
            contractId: this.detailInfo.contractId,
            creditId: this.detailInfo.creditId
          }).then(() => {
            this.zjControl.submitAdjustCreditReview({
              id: this.row.id,
              submitAuditFlag: '1'
            }).then((ret) => {
              this.passLoading = false;
              //成功，关闭
              if (ret.success) {
                this.$message.success(ret.msg);
                this.goParent();
              }
            }).catch(() => {
              this.passLoading = false;
            })
          }).catch(() => {
            this.passLoading = false;
          })
        })
      }else {
        this.$alert('请阅读并同意《额度调整申请书》','提示', {
          type: 'warning'
        })
      }
    },
    toReject() {
      this.$refs.rejectDialog.open();
    },
    reviewReject(text) {
      this.rejectLoading = false;
      this.zjControl.submitAdjustCreditReview({
        id: this.row.id,
        rejectReason: text,
        submitAuditFlag: '2'
      }).then((ret) => {
        this.rejectLoading = false;
        this.$refs.rejectDialog.close();
        //成功，关闭
        if (ret.success) {
          this.$message.success(ret.msg);
          this.goParent();
        }
      }).catch(() => {
        this.rejectLoading = false;
      })
    }
  }
}
</script>
