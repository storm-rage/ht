<template>
  <zj-content-block>
    <zj-header title="审核意见"></zj-header>
    <zj-content>
      <el-form ref="form" :model="form" label-width="100px" hide-required-asterisk>
        <el-form-item label="审核意见：" prop="notes" :rules="[{required: true,message: '请选输入审核意见'}]">
          <el-input type="textarea" v-model="form.notes" style="width: 100%"></el-input>
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
        notes: ''
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
