<template>
  <div>
    <detail-page ref="detailPage" title="额度变更交易详情"></detail-page>
    <zj-content-footer>
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
    };
  },
  methods: {
    back() {
      this.$router.push({name: 'quotaChangeQuery'});
    }
  },
};
</script>
