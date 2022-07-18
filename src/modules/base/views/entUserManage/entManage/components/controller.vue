<template>
  <zj-content-block>
    <zj-collapse title="控制人信息">
      <el-form ref="form" label-width="160px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="控制人姓名：" prop="field1">
              546565465
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="控制人身份证号：" prop="field1">
              4234
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="控制人身份证有效期：" prop="field1">
              4324
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </zj-collapse>
  </zj-content-block>
</template>
<script>
// 业务申请信息
export default {
  components: {},

  data() {
    return {
      detailData: {},
    };
  },
};
</script>
