<template>
  <zj-content-block>
    <zj-header title="交易信息"></zj-header>
    <zj-content>
      <el-form ref="form" label-width="160px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="申请流水号：">{{detailData.serialNo}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="维护类型：">{{typeMap(dictionary.applyTypeList,detailData.applyType) }}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申请时间：">{{detailData.applyDatetime}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发起方："> {{typeMap(dictionary.startObjectList,detailData.startObject)}} </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申请状态：">{{typeMap(dictionary.applyStatusList,detailData.applyStatus)}}</el-form-item>
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
    detailData: {
      type: Object,
      default: () => { }
    },
    dictionary: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {};
  },
};
</script>
