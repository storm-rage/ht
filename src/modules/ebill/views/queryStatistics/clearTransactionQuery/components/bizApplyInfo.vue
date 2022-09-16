<template>
  <zj-content-block>
    <zj-header title="交易信息"></zj-header>
    <zj-content>
      <el-form ref="form" label-width="160px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="申请流水号：" prop="serialNo">
              {{bizInfo.serialNo}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申请时间：" prop="applyDatetime">
              {{bizInfo.applyDatetime}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申请状态：" prop="applyStatus">
              {{bizInfo.applyStatus}}
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </zj-content>
  </zj-content-block>
</template>
<script>
// 业务申请信息
export default {
  props: {
    bizInfo: {
      type: Object,
      required: true
    }
  }
};
</script>
