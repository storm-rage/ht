<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="70%"
    @close="close">
    <el-form :model="form" ref="form" label-width="180px">
      <zj-content-block>
        <zj-content>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="结算周期："
                            prop="settlementCycle"
                            :rules="[
                          {required: true,message: '请选择结算周期',trigger: ['change','blur']}
                        ]">
                <el-select v-model="form.settlementCycle" placeholder="请选择">
                  <el-option v-for="(item,index) in dic.settlementCycle"
                             :key="`${index}settlementCycle`"
                             :label="item.desc"
                             :value="item.code"></el-option>
                </el-select>
                &nbsp;<el-tooltip content="注：结算周期从mdm取值仅供参考，最终以平台维护为准。"  effect="dark" placement="top">
                <i class="el-icon-info" style="color:#909399"></i>
              </el-tooltip>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="预计年采购金额："
                            prop="estimatedAnnualProcurementAmount"
                            :rules="[
                          {required: true,message: '请输入预计年采购金额',trigger: ['change','blur']}
                        ]">
                <zj-number-input v-model.trim="form.estimatedAnnualProcurementAmount">
                  <template slot="append">
                    元
                  </template>
                </zj-number-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="供应商总额度："
                            prop="totalCreditAmount"
                            :rules="[
                          {required: true,message: '请输入供应商总额度',trigger: ['change','blur']}
                        ]">
                <zj-number-input v-model.trim="form.totalCreditAmount">
                  <template slot="append">
                    元
                  </template>
                </zj-number-input>
                &nbsp;<zj-text-tip text="注：供应商总额度。若开通订单保理，则为订单保理额度。若开通凭证产品，则为凭证总控额度。"></zj-text-tip>
                <p class="zj-right" style="width: 220px">{{digitUp(form.totalCreditAmount)}}</p>
              </el-form-item>
            </el-col>
          </el-row>
        </zj-content>
      </zj-content-block>
      <!--  产品业务设置    -->
      <order-product-biz-setting ref="productSetting"
                                 :title="subTitle"
                                 :params="form.orderFactoringModel"
                                 :dic="dic"
                                 is-edit></order-product-biz-setting>
    </el-form>
    <div slot="footer" class="zj-center" style="display: block;width: 100%">
      <el-button style="width: 100px" size="small" type="primary" @click="submit">确认</el-button>
      <el-button style="width: 100px" size="small" @click="close">取消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import OrderProductBizSetting from '../../components/orderProductBizSetting';
export default {
  props: {
    // 字典
    dic: Object,
  },
  components: {
    OrderProductBizSetting
  },
  data () {
    return {
      dialogVisible: false,
      // 标题
      title: '额度续签',
      // 副标题
      subTitle: '',
      form: {}
    };
  },
  methods: {
    show (obj,title,subTitle) {
      this.title = title;
      this.subTitle = subTitle;
      this.form = Object.assign({},obj);
      this.dialogVisible = true;
    },
    toAdd () {
      this.form.list.push({
        startDay: '',
        endDay: '',
        discountAmt: '',
        financeRate: ''
      })
    },
    close () {
      this.dialogVisible = false;
    },
    submit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$refs.productSetting.getForm().validate((valid) => {
            if (valid) {
              const obj = {...this.form};
              obj.orderFactoringModel = this.$refs.productSetting.getData();
             this.$emit('done', obj);
              this.close();
            }
          });
        }
      });
    }
  }
};
</script>
