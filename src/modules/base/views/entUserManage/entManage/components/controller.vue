<template>
  <zj-content-block>
    <zj-collapse title="控制人信息">
      <el-form ref="form" label-width="160px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="控制人姓名：" prop="field1">
                <span>{{ detailData.legalPersonName | value }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="控制人身份证号：" prop="field1">
               <span>{{ detailData.legalCertNo | value }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="控制人身份证有效期：" prop="field1">
               <span>{{ detailData.legalCertRegDate | value }} 至 {{ detailData.legalCertExpireDate | value }}</span>
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
    props: ['detailData'],
  data() {
    return {
    };
  },
};
</script>
