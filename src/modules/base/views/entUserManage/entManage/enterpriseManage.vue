<template>
  <zj-content-container>
    <zj-top-header :title="pageType === 'add' ? '新增企业申请' : '修改企业申请'" />
    <!-- 表单 -->
    <ent-info-edit ref="entInfoInit" :form.sync="detailData" @formPass="formPass" />

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
      detailData: {
        isDoublePost: '0'
      },
      dictionary: {},
    };
  },
  created() {
    this.getRow()
    if (this.pageType !== 'add') {
      this.getEnterprise()
      // 查询操作记录
      this.getEbBusinessParamLog()
    }
  },
  methods: {
    // 获取操作记录
    getEbBusinessParamLog() {
      let params = {
        id: this.row.id,
      }
      this.zjControl.getEbBusinessParamLog(params).then((res) => {
        this.$refs.entInfoInit.$data.logList = res.data.sysEntRegLogList;
      });
    },
    formPass(params) {
      if (this.pageType === 'add') {
        this.$messageBox({
          title: '新增确认',
          type: 'confirm',
          content: '确认后将新增企业！',
          messageResolve: () => {
            this.zjControl.addEnterprise(params).then((res) => {
              this.$message.success(res.msg)
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
            this.zjControl.updateEnterprise(params).then((res) => {
              this.$message.success(res.msg)
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
