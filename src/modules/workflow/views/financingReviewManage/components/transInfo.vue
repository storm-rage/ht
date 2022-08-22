<template>
  <div>
    <zj-content-block>
      <zj-header title="交易信息"/>
      <el-row>
        <el-col :span="8">
          <el-form-item label="融资流水号：">{{form.serialNo}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="融资产品：">{{typeMap(dictionary.financeProductTypes,form.financingProductType)}}</el-form-item>
        </el-col>
        <el-col :span="8" v-if="form.financingProductType ==='0'">
          <el-form-item label="申请时间：">{{form.applyDatetime}}</el-form-item>
        </el-col>
        <el-col :span="8" v-if="form.financingProductType !=='0'">
          <el-form-item label="接收时间：">{{form.createDatetime}}</el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="业务状态：">{{form.workflowState}}</el-form-item>
      </el-row>
    </zj-content-block>
  </div>
</template>

<script>
export default {
  name: "transinfo",
  props: {
    form: Object,
    dictionary: Object,
  },
  data() {
    return {

    }
  },
  methods: {

  },
}
</script>

<style scoped>

</style>
