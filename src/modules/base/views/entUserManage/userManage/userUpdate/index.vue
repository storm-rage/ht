<template>
  <zj-content-container>
    <zj-top-header>修改用户信息申请</zj-top-header>

    <user-update ref="userUpdate" :form="detailData" :dictionary="dictionary" @formPass="formPass" />

    <zj-content-footer>
      <zj-button type="primary" @click="submit">提交申请</zj-button>
      <zj-button class="back" @click="goParent">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>
<script>
import userUpdate from './userUpdate'
export default {
  components: { userUpdate },
  data() {
    return {
      zjControl: this.$api.userInfoManage,
      form: {},
      detailData: {},
      dictionary: {}
    };
  },
  created() {
    this.getRow();
    this.getUserInformation();
  },
  methods: {
    //获取字典
    getDictionary() {
      this.zjControl.getUserDictionary().then((res) => {
        this.dictionary = res.data;
      });
    },
    // 获取详情
    getUserInformation() {
      this.zjControl.getUserInformation({ id: this.row.id }).then((res) => {
        this.detailData = res.data;
      });
    },
    submit() {
      this.$refs.userUpdate.handleForm()
    },
    //修改用户
    formPass(params) {
      this.zjControl.updateUser(params).then((res) => {
        this.$message.success("修改用户成功！");
        this.goParent();
      });
    }
  },
};
</script>

<style lang="less" scoped>
</style>