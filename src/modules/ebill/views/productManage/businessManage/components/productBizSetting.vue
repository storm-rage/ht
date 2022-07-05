<template>
  <el-form :model="form" ref="form" :rules="rules" label-width="180px">
    <zj-content-block>
      <zj-header :title="title"></zj-header>
      <zj-content>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="保理追索方式：" >
              <el-select v-model="form.field1" disabled>
                <el-option></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="保理融资形式：">
              <el-select v-model="form.field1" disabled>
                <el-option></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="订单保理额度期限：" prop="field3">
              <zj-number-input :precision="0" :disabled="!isEdit" v-model="form.field3">
                <template slot="append">月</template>
              </zj-number-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="受让应收账款开始日：" prop="field3">
              <el-date-picker v-model="form.field1" :disabled="!isEdit"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="受让应收账款结束日：" prop="field3">
              <el-date-picker v-model="form.field1" :disabled="!isEdit"></el-date-picker>&nbsp;共x天
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="订单融资月利率：" prop="field3">
              <zj-number-input :disabled="!isEdit" v-model="form.field3">
                <template slot="append">%</template>
              </zj-number-input>&nbsp;<zj-text-tip text="注：订单融资日利率=订单融资月利率/30"></zj-text-tip>
            </el-form-item>
          </el-col>
        </el-row>
      </zj-content>
    </zj-content-block>
  </el-form>

</template>
<script>
// todo:控制开始日期和结束日期
export default {
  props: {
    // 是否可以编辑表单
    isEdit: {
      type: Boolean,
      default: false
    },
    title:String
  },
  data () {
    return {
      form: {},
      rules: {}
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
}
</script>
