<template>
  <zj-content-block>
    <zj-header title="企业其他信息" />
    <el-form ref="form" label-width="160px">
      <zj-content>
        <zj-collapse title="开票信息">
          <el-row>
            <el-col :span="8">
              <el-form-item label="企业名称："><span>{{ detailData.name | value }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="纳税人识别号：">
                <span>{{ detailData.invoiceTaxpayerId | value }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="邮箱：">
                <span>{{ detailData.invoiceEmail | value }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="电话：">
                <span>{{ detailData.invoicePhone | value }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="开户行："><span>{{ detailData.invoiceBankInfo | value }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="银行账号：">
                <span>{{
                  detailData.invoiceBankAccno | value
                }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="地址："><span>{{ detailData.invoiceAddress | value }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </zj-collapse>
      </zj-content>
      <zj-content>
        <zj-collapse title="其他信息">
          <el-row>
            <el-col :span="8">
              <el-form-item label="注册渠道：">
                <span>{{
                  detailData.registerWebsite | value
                }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="买方企业：">
                <span>{{ detailData.myBuyers | value }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </zj-collapse>
      </zj-content>
    </el-form>
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
