<template>
  <div>
    <detail-page ref="detailPage" :stepList="stepList" :stepActive="4" title="合同签约申请"></detail-page>

    <zj-content-footer>
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
    }
  },
};
</script>
