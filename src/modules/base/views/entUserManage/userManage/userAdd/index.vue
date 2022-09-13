<template>
  <zj-content-container>
    <zj-top-header>新增用户申请</zj-top-header>

    <user-add ref="userAdd" :form.sync="detailData" :dictionary="dictionary" @formPass="formPass" />

    <zj-content-footer>
      <zj-button type="primary" @click="submit">提交申请</zj-button>
      <zj-button class="back" @click="goParent">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>
<script>
import userAdd from '../workflow/userAdd'
export default {
  components: { userAdd },
  data() {
    return {
      zjControl: this.$api.userInfoManage,
      form: {},
      detailData: {

      },
      dictionary: {}
    };
  },
  created() {
    this.getRow();
    this.getDictionary()
  },
  methods: {
    //获取字典
    getDictionary() {
      this.zjControl.getUserDictionary().then((res) => {
        this.dictionary = res.data;
      });
    },
    submit() {
      this.$refs.userAdd.handleForm()
    },
    //修改用户
    formPass(params) {
      this.zjControl.addUser(params).then((res) => {
        this.$message.success("新增用户成功！");
        this.goParent();
      });
    }
  },
};
</script>

<style lang="less" scoped>
</style>