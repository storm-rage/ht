<template>
  <zj-content-block>
    <zj-header title="审核意见"></zj-header>
    <zj-content>
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="审核意见：" prop="remark">
          <el-input type="textarea" v-model="form.remark" style="width: 100%"></el-input>
        </el-form-item>
      </el-form>
    </zj-content>
  </zj-content-block>
</template>
<script>
export default {
  data () {
    return {
      form: {
        remark: ''
      }
    }
  },
  methods: {
    getForm () {
      return this.$refs.form
    },
    getData () {
      return this.form;
    }
  }
};
</script>
