<template>
<div>
  <!-- 基础信息   -->
  <base-payment-info :is-bill="false" :bank-capital-flow="detailInfo.bankCapitalFlow"></base-payment-info>
   <!-- 贸易关系 -->
  <el-form ref="form" :model="form" label-width="180px">
    <zj-content-block>
      <zj-header title="贸易关系信息"></zj-header>
      <zj-content>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="供应商编码：">
              {{form.sellerEntCode}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="供应商名称：">
              {{form.sellerEntName}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="核心企业编码：">
              {{form.buyerEntCode}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="核心企业名称：">
              {{form.buyerEntName}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="核心企业是否海天集团：">
              {{typeMap(dictionary.buyerIsHtEnterprise, form.buyerIsHtEnterprise)}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="保理标识：">
              {{typeMap(dictionary.cactoringLogo, form.cactoringLogo)}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="贸易关系状态：">
              {{typeMap(dictionary.state, form.state)}}
            </el-form-item>
          </el-col>
        </el-row>
        <zj-collapse title="收款信息" class="zj-m-t-10">
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="确认凭证金额：" prop="confirmRepaymentTotalAmt" :rules="[
                {required: true,message: '请输入确认凭证金额',trigger: ['blur','change']}
              ]">
                <zj-number-input :disabled="!isEdit" v-model="form.confirmRepaymentTotalAmt">
                </zj-number-input>
                <p class="zj-right" style="width: 220px">{{digitUp(form.confirmRepaymentTotalAmt)}}</p>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="确认收款日期：" prop="confirmRepaymentDate" :rules="[
                {required: true,message: '请选择确认收款日期',trigger: ['blur','change']}
              ]">
                <el-date-picker disabled v-model="form.confirmRepaymentDate"></el-date-picker>
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
    detailInfo: {
      type: Object,
      required: true
    },
    // 是否可以编辑收款信息
    isEdit: {
      type: Boolean,
      default: false
    },
    dictionary: {
      type: Object,
      required: true
    }
  },
  watch: {
    detailInfo: {
      deep: true,
      handler() {
        this.form = {
          confirmRepaymentDate: this.detailInfo.confirmRepaymentDate,
          confirmRepaymentTotalAmt: this.detailInfo.confirmRepaymentTotalAmt,
          ...this.detailInfo.tradeRelationModel
        }
      },
    }
  },
  data () {
    return {
      form: {
        //确认收款日期
        confirmRepaymentDate: '',
        // 确认收款总金额
        confirmRepaymentTotalAmt: '',
      }
    };
  },
  methods: {
    getForm () {
      return this.$refs.form
    },
    getData() {
      return this.form;
    },
  }
}
</script>
