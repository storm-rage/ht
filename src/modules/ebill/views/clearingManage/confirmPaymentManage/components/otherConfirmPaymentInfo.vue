<template>
<div>
  <!-- 基础信息   -->
  <base-payment-info :is-bill="false"></base-payment-info>
   <!-- 贸易关系 -->
  <el-form ref="form" :model="form" label-width="180px">
    <zj-content-block>
      <zj-header title="贸易关系"></zj-header>
      <zj-content>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="供应商编码：">
              0001
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="供应商名称：">
              上海电气股份有限公司
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="核心企业编码：">
              5656546546
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="核心企业名称：">
              广州材料工程有限公司
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="核心企业是否海天集团：">
              是
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="保理标识：">
              订单保理
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="贸易关系状态：">
              生效
            </el-form-item>
          </el-col>
        </el-row>
        <zj-collapse title="收款信息" class="zj-m-t-10">
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="确认凭证金额：" prop="field1" :rules="[
                {required: true,message: '请输入确认凭证金额',trigger: ['blur','change']}
              ]">
                <zj-number-input :disabled="!isEdit" v-model="form.field1">
                </zj-number-input>
                <p class="zj-right" style="width: 220px">{{digitUp(form.field1)}}</p>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="确认收款日期：" prop="field1" :rules="[
                {required: true,message: '请选择确认收款日期',trigger: ['blur','change']}
              ]">
                <el-date-picker :disabled="!isEdit" v-model="form.field1"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </zj-collapse>
      </zj-content>
    </zj-content-block>
  </el-form>
</div>
</template>

<script>
/**
 * 非凭证收款信息
 */
import BasePaymentInfo from './basePaymentInfo';
export default {
  name: 'OtherConfirmPaymentInfo',
  components: {
    BasePaymentInfo
  },
  props: {
    // 是否可以编辑收款信息
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: {}
    };
  }
}
</script>
