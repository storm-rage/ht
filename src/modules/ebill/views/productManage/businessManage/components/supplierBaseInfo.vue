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
            field="field2"
            title="是否海天一级供应商"/>
          <zj-table-column
            field="field3"
            title="供应商业务系统编码"/>
          <zj-table-column
            field="field4"
            title="供应商统一社会信用代码"/>
          <zj-table-column
            field="field5"
            title="申请产品"/>
        </zj-table>
        <div>
          <zj-collapse title="供应商业务联系人"  class="zj-m-t-10">
            <el-row>
              <el-col :span="8">
                <el-form-item label="联系人：" prop="field1">
                  <el-input :disabled="!isEdit" v-model="form.field1"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联系号码：" prop="field2">
                  <el-input :disabled="!isEdit" v-model="form.field2"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联系邮箱：" prop="field3">
                  <el-input :disabled="!isEdit" v-model="form.field3"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联系地址：" prop="field4">
                  <el-input :disabled="!isEdit" v-model="form.field4"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </zj-collapse>
          <zj-collapse title="供应商收款账户" class="zj-m-t-10">
            <el-row>
              <el-col :span="8">
                <el-form-item label="银行账户名称：" >
                  <el-input :disabled="!isEdit" v-model="form.field5"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="开户银行：">
                  <el-input :disabled="!isEdit" v-model="form.field6"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="银行账号：">
                  <el-input :disabled="!isEdit" v-model="form.field7"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </zj-collapse>
        </div>
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
