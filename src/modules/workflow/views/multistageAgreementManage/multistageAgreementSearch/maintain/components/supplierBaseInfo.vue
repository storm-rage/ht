<template>
  <el-form :model="form" ref="form" :rules="rules" label-width="160px">
    <zj-content-block>
      <zj-header :title="title"></zj-header>
      <zj-content>
        <zj-table :dataList="customList">
          <zj-table-column
            field="field1"
            title="供应商名称"/>
          <zj-table-column
            field="field3"
            title="供应商编码"/>
          <zj-table-column
            field="field4"
            title="供应商统一社会信用代码"/>
        </zj-table>
      </zj-content>
    </zj-content-block>
  </el-form>
</template>
<script>
export default {
  props: {
    title:String,
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: {},
      rules: {},
      customList: []
    };
  },
  methods: {
    getForm () {
      return this.$refs.form;
    },
    getData () {
      return this.form;
    }
  }
};
</script>
