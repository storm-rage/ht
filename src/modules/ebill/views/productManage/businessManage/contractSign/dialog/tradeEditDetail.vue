<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="80%"
    @close="close">
    <el-form :model="form" ref="form" :rules="rules" label-width="180px">
      <zj-content-block>
        <zj-content>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="核心企业名称：" >
                发生发射点犯得上发防守对方的
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="核心企业业是否海天集团：" >
                是
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="核心企业代码：" >
                X6654654654QWEE
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="保理标识：" prop="field1">
                <el-select v-model="form.field1" disabled>
                  <el-option label="订单保理"></el-option>
                </el-select>
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
              <el-form-item label="结算周期：" prop="field1">
                <el-select v-model="form.field1" placeholder="请选择">
                  <el-option></el-option>
                </el-select>
                &nbsp;<zj-text-tip text="注：结算周期从mdm取值仅供参考，最终以平台维护为准。"></zj-text-tip>
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
                <p class="zj-right">{{digitUp(form.field1)}}</p>
              </el-form-item>
            </el-col>
          </el-row>
        </zj-content>
      </zj-content-block>
      <!--  产品业务设置    -->
      <product-biz-setting ref="pbizSetting" title="产品业务设置" is-edit></product-biz-setting>
      <!--  其他附件    -->
      <other-file-setting ref="ofileSetting" is-edit></other-file-setting>
    </el-form>
    <div slot="footer" class="zj-center" style="display: block;width: 100%">
      <el-button size="small" type="primary" @click="submit">提交申请</el-button>
      <el-button size="small" @click="close">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import ProductBizSetting from '../../components/productBizSetting';
import OtherFileSetting from '../../components/otherFileSetting';
export default {
  components: {
    ProductBizSetting,
    OtherFileSetting
  },
  data () {
    return {
      title: '业务设置-供应商名称',
      dialogVisible: false,
      isEdit: false,
      form: {},
      rules: {}
    }
  },
  methods: {
    show(row,isEdit = false) {
      this.isEdit = isEdit;
      this.dialogVisible = true;
    },
    submit () {
     this.$refs.form.validate((valid) => {
       if (valid) {
         this.$refs.pbizSetting.getForm().validate((valid) => {
           if (valid) {
             // todo: 拿到数据，发送请求
           }
         })
       }
     })
    },
    close () {
      this.dialogVisible = false;
    }
  }
};
</script>
