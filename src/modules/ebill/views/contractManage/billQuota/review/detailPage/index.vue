<template>
  <div>
    <detail-page ref="detailPage" title="额度变更复核" style="padding-bottom: 0"></detail-page>
    <zj-content style="padding-top: 0">
      <zj-content-tip text="注：1.调整后额度=原额度+本次申请增加额度。"></zj-content-tip>
    </zj-content>

    <zj-content-footer>
      <span style="display: inline-block;margin-right: 10px">
        <el-checkbox v-model="agreeCheck">我已阅读并同意</el-checkbox>&nbsp;
        <el-link :underline="false" type="primary">《额度调整申请书》</el-link>
      </span>
      <zj-button type="primary" @click="toReview"
      >复核通过</zj-button>
      <zj-button  type="primary"  @click="toReject">拒绝</zj-button>
      <zj-button  @click="back">返回</zj-button>
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
export default {
  components: {DetailPage},
  data() {
    return {
      // 是否阅读协议
      agreeCheck: false
    }
  },
  methods: {
    toReview() {
      if (this.agreeCheck) {
        const money = this.money(this.$refs.detailPage.$data.form.field1);
        this.$confirm(`您本次申请调整额度：<b style="font-size: 18px;">${money}</b>元，请确认。`,'额度调整复核确认',{
          dangerouslyUseHTMLString: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          // todo:请求
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
      this.$refs.rejectDialog.close();
    },
    back() {}
  }
}
</script>
