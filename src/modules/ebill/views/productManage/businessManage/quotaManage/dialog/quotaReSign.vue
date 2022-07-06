<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="70%"
    @close="close">
    <el-form :model="form" ref="form" :rules="rules" label-width="180px">
      <zj-content-block>
        <zj-content>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="结算周期：" prop="field1">
                <el-select v-model="form.field1" placeholder="请选择">
                  <el-option></el-option>
                </el-select>
                &nbsp;<zj-text-tip text="注：结算周期从mdm取值仅供参考，最终以平台维护为准。"></zj-text-tip>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="预计年采购金额："  prop="field1">
                <zj-number-input v-model="form.field1">
                  <template slot="append">
                    元
                  </template>
                </zj-number-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="供应商总额度：" prop="field1">
                <zj-number-input v-model="form.field1">
                  <template slot="append">
                    元
                  </template>
                </zj-number-input>
                &nbsp;<zj-text-tip text="注：供应商总额度。若开通订单保理，则为订单保理额度。若开通凭证产品，则为凭证总控额度。"></zj-text-tip>
                <p class="zj-right" style="width: 220px">{{digitUp(form.field1)}}</p>
              </el-form-item>
            </el-col>
          </el-row>
        </zj-content>
      </zj-content-block>
      <!--  产品业务设置    -->
      <product-biz-setting ref="productSetting" title="产品业务设置" is-edit></product-biz-setting>
    </el-form>
    <div slot="footer" class="zj-center" style="display: block;width: 100%">
      <el-button style="width: 100px" size="small" type="primary" @click="submit">确认</el-button>
      <el-button style="width: 100px" size="small" @click="close">取消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import ProductBizSetting from '../../components/productBizSetting';
export default {
  components: {
    ProductBizSetting
  },
  data () {
    return {
      dialogVisible: false,
      // todo:????
      title: '额度续签-供应商名称',
      form: {}
    };
  },
  methods: {
    show (obj,title) {
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
              // todo:?
            }
          });
        }
      });
    }
  }
};
</script>
