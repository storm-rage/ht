<template>
  <el-dialog
    title="确认收款维护"
    :visible.sync="dialogVisible"
    width="600px"
    @close="close">
    <el-form :model="form" ref="form"  label-width="180px">
      <zj-content-block>
        <zj-content>
          <el-row :gutter="10">
            <el-col>
              <el-form-item :label="`${productName}编号：`" prop="ebillCode">
                {{form.ebillCode}}
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="签发日期："  prop="payableIssuanceDate">
                {{date(form.payableIssuanceDate)}}
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="签发人：" prop="payEntName">
                {{form.payEntName}}
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="原始持有人："  prop="receiptEntName">
                {{form.receiptEntName}}
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item :label="`${productName}金额：`"  prop="payableAmt">
                {{money(form.payableAmt)}}
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item :label="`${productName}到期日：`"  prop="payableExpireDate">
                {{date(form.payableExpireDate)}}
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="备注："  prop="remark">
               {{form.remark}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="zj-m-t-5">
            <el-col>
              <el-form-item label="凭证实际到期日：" prop="actualExpireDate" :rules="[
                {required: true,message: '请选择凭证实际到期日',trigger: ['blur','change']}
              ]">
               <el-date-picker value-format="yyyyMMdd" format="yyyy-MM-dd" disabled v-model="form.actualExpireDate"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item :label="`确认${productName}金额：`" prop="billConfirmAmt" :rules="[
                {required: true,message: '请输入确认凭证金额',trigger: ['blur','change']}
              ]">
                <zj-number-input v-model="form.billConfirmAmt" :max="Number(form.payableAmt)">
                </zj-number-input>
                <p class="zj-right" style="width: 220px">{{digitUp(form.billConfirmAmt)}}</p>
              </el-form-item>
            </el-col>
          </el-row>
        </zj-content>
      </zj-content-block>
    </el-form>
    <div slot="footer" class="zj-center" style="display: block;width: 100%">
      <el-button style="width: 100px" size="small"
                 :disabled="loading"
                 :loading="loading" type="primary" @click="submit">确定</el-button>
      <el-button style="width: 100px" size="small" @click="close">取消</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    bizId: {
      type: String,
      required: true
    },
    // 凭证实际到期日，确认收款维护需要
    actualExpireDate: {
      type:String,
      required: true,
      default: ''
    }
  },
  computed: {
    productName () {
      return this.$store.getters['user/productName']
    }
  },
  data () {
    return {
      zjControl: {
        billConfirmReceipt: this.$api.confirmPaymentManage.billConfirmReceipt,
      },
      dialogVisible: false,
      form: {},
      loading: false
    };
  },
  methods: {
    show (obj) {
      this.form = Object.assign({},obj);
      //默认为收款日期
      if (!this.form.actualExpireDate) {
        this.form.actualExpireDate = this.actualExpireDate;
      }
      //默认为凭证金额
      if (!this.form.billConfirmAmt) {
        this.form.billConfirmAmt = obj.payableAmt;
      }
      this.dialogVisible = true;
    },
    close () {
      this.loading = false;
      this.dialogVisible = false;
    },
    submit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.zjControl.billConfirmReceipt({
            // 凭证ID
            accountId: this.form.id,
            // 凭证实际到期日
            actualExpireDate: this.form.actualExpireDate,
            // 确认凭证金额
            billConfirmAmt: this.form.billConfirmAmt,
            // 资金流水ID
            id: this.bizId
          }).then((res) => {
            this.loading = false;
            //成功，关闭
            if (res.success) {
              this.$message.success(res.msg);
              this.$emit('done')
            }
          }).catch(() => {
            this.loading = false
          });
        }
      });
    }
  }
};
</script>
