<template>
  <div>
    <detail-page ref="detailPage" :stepList="stepList" title="合同签约申请"></detail-page>

    <zj-content-footer>
      <zj-button  type="primary" @click="toApply"
      >提交申请</zj-button>
      <zj-button  @click="back">返回</zj-button>
    </zj-content-footer>
  </div>
</template>

<script>
import DetailPage from '../../detail/index';
export default {
  components: {DetailPage},
  data() {
    return {
      stepList: [
        {
          title: '签约申请',
          desc: ''
        },
        {
          title: '签约复核',
          desc: ''
        },
        {
          title: '买方签署转让回执',
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
    toApply() {
      this.$confirm('是否确认提交申请？','温馨提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        // todo:请求
      })

    }
  },
};
</script>
