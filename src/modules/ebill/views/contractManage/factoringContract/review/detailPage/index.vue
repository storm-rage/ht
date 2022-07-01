<template>
  <div>
    <detail-page ref="detailPage" :stepList="stepList" :stepActive="1" title="合同签约复核"></detail-page>
    <zj-content-footer>
      <span style="display: inline-block;margin-right: 5px">
        <el-checkbox v-model="agreeCheck">我已阅读并同意上述协议</el-checkbox>&nbsp;
      </span>
      <zj-button  class="confirm" @click="toReview"
      >复核通过</zj-button>
      <zj-button  class="reject" @click="toReject">拒绝</zj-button>
      <zj-button  class="back" @click="back">返回</zj-button>
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
      agreeCheck: false,
      stepList: [
        {
          title: '签约申请',
          time: '2022.02.02 11:11:12',
          user: '小山'
        },
        {
          title: '签约复核',
          desc: ''
        },
        {
          title: '核心企业签署转让回执',
          desc: ''
        },
        {
          title: '保理公司签约',
          desc: ''
        },
        {
          title: '保理合同签约完成',
          desc: ''
        }
      ]
    };
  },
  methods: {
    back() {
      this.$router.push("/quotaChangeApplication");
    },
    toReview() {
      this.$confirm('是否确认复核通过？','温馨提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        // todo:请求
      })
    },
    toReject() {
      this.$refs.rejectDialog.open();
    },
    reviewReject(text) {
      this.$refs.rejectDialog.close();
    }
  },
};
</script>
