<template>
  <el-form :model="form" ref="form" label-width="180px">
    <zj-content-block>
      <zj-header :title="title"></zj-header>
      <zj-content>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="保理追索方式："
                          prop="factoringRecourse"
                          :rules="[
                          {required: true,message: '请选择保理追索方式',trigger: ['change','blur']}
                        ]">
              <el-select v-model="form.factoringRecourse" disabled>
                <el-option v-for="(item,index) in dic.factoringRecourse"
                           :key="`${index}factoringRecourse`"
                           :label="item.desc"
                           :value="item.code"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="保理融资形式："
                          prop="factoringFinancingForm"
                          :rules="[
                          {required: true,message: '请选择保理融资形式',trigger: ['change','blur']}
                        ]">
              <el-select v-model="form.factoringFinancingForm" disabled>
                <el-option v-for="(item,index) in dic.factoringFinancingForm"
                           :key="`${index}factoringFinancingForm`"
                           :label="item.desc"
                           :value="item.code"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="订单保理额度开始日："
                          prop="factoringCreditStartDate"
                          :rules="[
                          {required: true,message: '请选择订单保理额度开始日',trigger: ['change','blur']}
                        ]">
              <zj-date-picker :date.sync="form.factoringCreditStartDate"
                              :pickerOptions="factoringCreditStartDateConfig"
                              :disabled="!isEdit"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="订单保理额度到期日："
                          prop="factoringCreditEndDate"
                          :rules="[
                          {required: true,message: '请选择订单保理额度到期日',trigger: ['change','blur']}
                        ]">
              <zj-date-picker :date.sync="form.factoringCreditEndDate"
                              :pickerOptions="factoringCreditEndDateConfig"
                              :disabled="!isEdit"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="受让应收账款开始日："
                          prop="accountStartDate"
                          :rules="[
                          {required: true,message: '请选择受让应收账款开始日',trigger: ['change','blur']}
                        ]">
              <zj-date-picker :date.sync="form.accountStartDate"
                              :pickerOptions="accountStartDateConfig"
                              :disabled="!isEdit"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="受让应收账款结束日："
                          prop="accountEndDate"
                          :rules="[
                          {required: true,message: '请选择受让应收账款结束日',trigger: ['change','blur']}
                        ]">
              <zj-date-picker :date.sync="form.accountEndDate"
                              :pickerOptions="accountEndDateConfig"
                              :disabled="!isEdit"/>&nbsp;共{{cacluateAccountDays}}天
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="订单融资月利率："
                          prop="factoringFinancingMonthRate"
                          :rules="[
                          {required: true,message: '请输入订单融资月利率',trigger: ['change','blur']}
                        ]">
              <zj-number-input :disabled="!isEdit" v-model="form.factoringFinancingMonthRate">
                <template slot="append">%</template>
              </zj-number-input>&nbsp;<zj-text-tip text="注：订单融资日利率=订单融资月利率/30"></zj-text-tip>
            </el-form-item>
          </el-col>
        </el-row>
      </zj-content>
    </zj-content-block>
  </el-form>

</template>
<script>
export default {
  props: {
    // 参数
    params: {
      type: Object,
      default: () => {
        return {};
      }
    },
    // 是否可以编辑表单
    isEdit: {
      type: Boolean,
      default: false
    },
    title:String,
    // 字典
    dic: Object
  },
  computed: {
    cacluateAccountDays () {
      if (!this.form.accountStartDate||!this.form.accountEndDate) {
        return 0;
      }
      return this.$moment(this.form.accountEndDate).diff(this.form.accountStartDate, 'days');
    }
  },
  watch: {
    params: {
      deep: true,
      handler () {
        this.form = this.params||{};
      }
    }
  },
  mounted() {
    this.form = this.params||{}
  },
  data () {
    return {
      form: {
        factoringRecourse: '',
        factoringFinancingForm: '',
        factoringCreditStartDate: '',
        factoringCreditEndDate: '',
        accountStartDate: '',
        accountEndDate: ''
      },
      accountStartDateConfig: {
        disabledDate:(time)=>{
          if (this.form.accountEndDate) {
            return time.getTime() > this.$moment(this.form.accountEndDate)
          }
        }
      },
      accountEndDateConfig: {
        disabledDate:(time)=>{
          if (this.form.accountStartDate) {
            return time.getTime() < this.$moment(this.form.accountStartDate)
          }
        }
      },
      factoringCreditStartDateConfig: {
        disabledDate:(time)=> {
          if (this.form.factoringCreditEndDate) {
            return time.getTime() > this.$moment(this.form.factoringCreditEndDate)
          }
        }
      },
      factoringCreditEndDateConfig: {
        disabledDate:(time)=> {
          if (this.form.factoringCreditStartDate) {
            return time.getTime() < this.$moment(this.form.factoringCreditStartDate)
          }
        }
      }
    };
  },
  methods: {
    getForm () {
      return this.$refs.form;
    },
    getData () {
      return this.form;
    }
  }
}
</script>
