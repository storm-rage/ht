<template>
  <zj-content-block>
    <zj-collapse title="法人信息">
      <el-form ref="form" label-width="160px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="企业法人姓名：">
              <span>{{ detailData.legalPersonName | value }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="法人身份证号码：">
              <span>{{ detailData.legalCertNo | value }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="法人手机手机号：">
              <span>{{ detailData.registerPhone | value }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </zj-collapse>
  </zj-content-block>
</template>
<script>

export default {
  props: ['detailData'],
  data() {
    return {
    };
  },
};
</script>
