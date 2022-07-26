<template>
  <zj-content-block>
    <zj-collapse title="企业联系人">
       <el-form ref="form" label-width="160px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="企业联系人姓名：">
            <span>{{ detailData.fastMailName | value }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="企业联系人手机号：">
           <span>{{ detailData.fastMailPhone | value }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="企业联系地址：">
            <span>{{ detailData.fastMailAddress | value }}</span>
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
      detailData: {}
    };
  },
};
</script>
