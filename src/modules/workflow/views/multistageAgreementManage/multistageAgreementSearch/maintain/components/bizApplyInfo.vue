<template>
  <zj-content-block>
    <zj-header title="业务申请信息"></zj-header>
    <zj-content>
      <el-form ref="form" label-width="160px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="申请流水号：" prop="field1">
              546565465
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申请类型：" prop="field1">
              业务申请
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申请状态：" prop="field1">
              状态
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申请时间：" prop="field1">
              2022-09-08 11:18:19
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
  components: {},

  data () {
    return {};
  }
};
</script>
