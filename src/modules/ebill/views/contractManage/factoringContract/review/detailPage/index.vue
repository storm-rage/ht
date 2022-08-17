<template>
  <div>
    <detail-page ref="detailPage"
                 :detail-info="detailInfo"
                 :dictionary="dictionary"
                 title="合同签约复核"></detail-page>
    <zj-content-footer>
      <span style="display: inline-block;margin-right: 5px">
        <el-checkbox v-model="agreeCheck">我已阅读并同意上述协议</el-checkbox>&nbsp;
      </span>
      <zj-button type="primary"
                 :disabled="rejectLoading"
                 :loading="passLoading"
                 :api="zjBtn.submitEbContractApplyReview"
                 @click="toReview">复核通过</zj-button>
      <zj-button type="primary"
                 :disabled="passLoading"
                 :loading="rejectLoading"
                 :api="zjBtn.submitEbContractApplyReview"
                 @click="toReject">拒绝</zj-button>
      <zj-button @click="goParent">返回</zj-button>
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
import {OperResult} from "@modules/constant";
export default {
  components: {DetailPage},
  data() {
    return {
      zjControl: {
        getDirectory: this.$api.factoringContract.getEbContractReviewDirectory,
        queryEbContractReviewSignDetail: this.$api.factoringContract.queryEbContractReviewSignDetail,
        submitEbContractApplyReview: this.$api.factoringContract.submitEbContractApplyReview
      },
      agreeCheck: false,
      // 详情信息
      detailInfo: {},
      // 字典
      dictionary: {},
      stepList: [],
      passLoading: false,
      rejectLoading: false
    };
  },
  created() {
    this.getApi();
    this.getRow();
    this.getDetail();
  },
  methods: {
    getDic() {
      this.zjControl.getDirectory().then((res) => {
        this.dictionary = res.data
      });
    },
    getDetail() {
      this.zjControl.queryEbContractReviewSignDetail({serialNo: this.row.serialNo}).then(res => {
        this.detailInfo = res.data;
      });
    },
    toReview() {
      if (this.agreeCheck) {
        this.$confirm('是否确认复核通过？','温馨提示',{
          type: 'warning',
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          this.passLoading = true;
          this.zjControl.submitEbContractApplyReview({
            serialNo: this.row.serialNo,
            operResult: OperResult.PASS
          }).then(res => {
            this.passLoading = false;
            //成功，关闭
            if (res.success) {
              this.$message.success(res.msg);
              this.goParent();
            }
          }).catch(() => {
            this.passLoading = false;
          })
        })
      }else {
        this.$alert('请阅读并同意上述协议','提示', {
          type: 'warning'
        })
      }
    },
    toReject() {
      this.$refs.rejectDialog.open();
    },
    reviewReject(text) {
      this.rejectLoading = false;
      this.zjControl.submitEbContractApplyReview({
        auditOpinion: text,
        serialNo: this.row.serialNo,
        operResult: OperResult.REJECT
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
  },
};
</script>
