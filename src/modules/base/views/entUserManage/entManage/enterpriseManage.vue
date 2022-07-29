<template>
  <zj-content-container>
    <zj-top-header
      :title="pageType === 'add' ? '新增企业申请' : '修改企业申请'"
    />
    <!-- 表单 -->
    <ent-info-edit ref="entInfoInit"/>

    <zj-content-footer>
      <zj-button type="primary" @click="submitForm()" v-if="pageType !== 'detail'"
        >提交申请</zj-button
      >
      <zj-button class="back" @click="goChild('sysEnterprise')">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>

<script>
import entInfoEdit from "./entInfoEdit";
export default {
  components: {
    entInfoEdit,
  },
  data() {
    return {
      pageType: this.$route.meta.pageType
    };
  },
  created() {
  },
  methods: {
    submitForm() {
      this.$refs.entInfoInit.save()
    },
  },
};
</script>

<style scoped lang="less">
</style>
