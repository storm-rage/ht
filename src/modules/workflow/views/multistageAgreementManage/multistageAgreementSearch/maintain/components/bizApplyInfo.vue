<template>
  <zj-content-block>
    <zj-header title="业务申请信息"></zj-header>
    <zj-content>
      <el-form ref="formDate" :model="formData" label-width="160px" v-if="formData">
        <el-row>
          <el-col :span="8">
            <el-form-item label="申请流水号：">
              {{ formData.serialNo }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申请类型：">
              {{ formData.applyType }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申请状态：">
              {{ formData.applyStatus }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申请时间：">
              {{ formData.receiveDatetime }}
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
  name: 'businessApplyInfo',
  props: {
    formData: Object,
    dictionary: Object,
  },
  data () {
    return {};
  }
};
</script>
