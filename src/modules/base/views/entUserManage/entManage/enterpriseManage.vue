<template>
  <zj-content-container>
    <zj-top-header
      :title="pageType === 'add' ? '新增企业申请' : '修改企业申请'"
    />
    <!-- 表单 -->
    <ent-info-edit ref="entInfoInit" />

    <zj-content-footer>
      <zj-button type="primary" @click="submit" v-if="pageType !== 'detail'"
        >提交申请</zj-button
      >
      <zj-button class="back" @click="back">返回</zj-button>
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
      pageType: this.$route.meta.pageType,
      zjControl: {
        queryEntDictionary: this.$api.entInfoManage.queryEntDictionary,
        addEnterprise: this.$api.entInfoManage.addEnterprise,
        updateEnterprise: this.$api.entInfoManage.updateEnterprise
      },
    };
  },
  created() {
     this.queryEntDictionary()
  },
  mounted: {
     // 获取字典
    queryEntDictionary() {
      this.zjControl.queryEntDictionary().then((res) => {
        this.dictionary = res.data;
      });
    },
    // 新增
    addEnterprise() {
      this.zjControl.addEnterprise({id: this.row.id}).then(res => {
     
      })
    },
    // 修改
    updateEnterprise() {
      this.zjControl.updateEnterprise({id: this.row.id}).then(res => {
   
      })
    },
  }
};
</script>

<style scoped lang="less">
</style>
