<template>
  <div>
    <el-form :model="form"  label-width="200px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="贸易合同编号：">{{form.tradeContractNo}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="买方：">{{form.tradeContractNo}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="卖方：">{{form.tradeContractNo}}</el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="合同期限（月）：">{{form.tradeContractNo}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同金额：">{{form.tradeContractNo}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="签订日期：">{{form.tradeContractNo}}</el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="货物名称：">{{form.tradeContractNo}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同附件：">{{form.tradeContractNo}}</el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="阶段性协议编号：">{{form.tradeContractNo}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="阶段性协议名称：">{{form.tradeContractNo}}</el-form-item>
        </el-col>
      </el-row>
    </el-form>

  </div>
</template>

<script>
export default {
  name: "tradeContract",
  data() {
    return {
      form: {
        tradeContractNo:'131313131'
      },
    }
  }
}
</script>

<style scoped>

</style>
