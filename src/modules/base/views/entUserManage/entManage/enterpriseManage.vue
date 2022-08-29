<template>
  <zj-content-container>
    <zj-top-header :title="pageType === 'add' ? '新增企业申请' : '修改企业申请'" />
    <!-- 表单 -->
    <ent-info-edit ref="entInfoInit" :form="detailData" @formPass="formPass" />

    <zj-content-footer>
      <zj-button type="primary" @click="submitForm()" v-if="pageType !== 'detail'">提交申请</zj-button>
      <zj-button type="primary" @click="saveEnterprise" v-if="pageType === 'add'">暂存</zj-button>
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
      zjControl: this.$api.entInfoManage,
      pageType: this.$route.meta.pageType,
      detailData: {},
      dictionary: {},
    };
  },
  created() {
    this.getRow()
    if (this.pageType !== 'add') {
      this.getEnterprise()
    }
  },
  methods: {
    formPass(params) {
      if (this.pageType === 'add') {
        this.$messageBox({
          title: '新增确认',
          type: 'confirm',
          content: '确认后将新增企业！',
          messageResolve: () => {
            this.zjControl.addEnterprise(params).then(() => {
              this.$message.success('企业新增成功！')
              this.goParent()
            })
          }
        })
      }
      if (this.pageType === 'edit') {
        this.$messageBox({
          title: '修改确认',
          type: 'confirm',
          content: '确认后将更新企业信息！',
          messageResolve: () => {
            this.zjControl.updateEnterprise(params).then(() => {
              this.$message.success('企业信息修改成功！')
              this.goParent()
            })
          }
        })
      }
    },
    getEnterprise() {
      this.zjControl.getEnterprise({ id: this.row.id }).then(res => {
        this.detailData = res.data
      })
    },
    submitForm() {
      this.$refs.entInfoInit.handleForm();
    },
    saveEnterprise() {
      this.$refs.entInfoInit.saveEnterprise();
    }
  },
};
</script>

<style scoped lang="less">
</style>
