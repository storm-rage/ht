<template>
  <div>
    <el-form :model="form" ref="addFormData" label-width="260px">
      <el-form-item label="支持的清算模式：" prop="clearModel">
        {{transferClearMode(form.clearModel)}}
      </el-form-item>
      <el-form-item label="融单到期前X天停止业务：" prop="earlyStopDays">
        <zj-number-input :precision="0" v-model="form.earlyStopDays">
          <template slot="append">天</template>
        </zj-number-input>
      </el-form-item>
      <el-form-item label="融单到期前N天通知核心企业付款：" prop="earlyNoticeDays">
        <zj-number-input :precision="0" v-model="form.earlyNoticeDays">
          <template slot="append">天</template>
        </zj-number-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    value: Object,
    dics: Object
  },
  watch: {
    value: {
      deep: true,
      handler: function () {
        this.form = this.value;
      }
    }
  },
  data () {
    return {
      form: this.value
    };
  },
  methods: {
    validateExpireForm () {
      let result = false;
      this.$refs.addFormData.validate((valid) => {
        result = valid;
      });
      return result;
    },
    transferClearMode (clearMode) {
      if (clearMode) {
        const clearModes = clearMode.split(',').join('');
        if (clearModes === '111') {
          return '代理清算(付保理公司代理清算账户)，专户清算(付核心企业在银行开立的还款专户)，直接支付(付一级供应商虚拟账户)';
        } else if (clearModes === '110') {
          return '代理清算(付保理公司代理清算账户)，专户清算(付核心企业在银行开立的还款专户)';
        } else if (clearModes === '100') {
          return '代理清算(付保理公司代理清算账户)';
        } else if (clearModes === '001') {
          return '直接支付(付一级供应商虚拟账户)';
        } else if (clearModes === '101') {
          return '代理清算(付保理公司代理清算账户)，直接支付(付一级供应商虚拟账户)';
        } else if (clearModes === '011') {
          return '专户清算(付核心企业在银行开立的还款专户)，直接支付(付一级供应商虚拟账户)';
        }
      }

    },
  }
};
</script>
<style></style>
