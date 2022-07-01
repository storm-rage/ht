<template>
  <div>
    <detail-page ref="detailPage" is-edit title="额度变更申请" style="padding-bottom: 0"></detail-page>
    <zj-content style="padding-top: 0">
      <div>
        <el-link type="primary" :underline="false">《额度调整申请书》</el-link>
      </div>
      <div style="margin-top: 35px">
        <zj-content-tip text="注：1.调整后额度=原额度+本次申请增加额度。"></zj-content-tip>
      </div>
    </zj-content>

    <zj-content-footer>
      <zj-button  class="confirm" @click="toApply"
      >提交申请</zj-button>
      <zj-button  class="back" @click="back">返回</zj-button>
    </zj-content-footer>
  </div>
</template>

<script>
import DetailPage from '../../detail/index';
export default {
  components: {DetailPage},
  data() {
    return {
    };
  },
  methods: {
    back() {
      this.$router.push("/quotaChangeApplication");
    },
    toApply() {
      this.$refs.detailPage.getForm().validate((valid) => {
        if (valid) {
          const money = this.money(this.$refs.detailPage.$data.form.field1);
          this.$confirm(`您本次申请调整额度：<b style="font-size: 18px;">${money}</b>元，请确认。`,'额度调整申请确认',{
            dangerouslyUseHTMLString: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(() => {
            // todo:请求
          })
        }
      })

    }
  },
};
</script>
