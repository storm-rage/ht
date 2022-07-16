<template>
  <div id="productsOpenedApply">
    <div>
      <zj-header title="产品开通申请" tipText="注：开通订单保理将默认开通电子债权凭证产品。"></zj-header>
      <div class="zj-m-b-20">
        <select-items></select-items>
      </div>
    </div>
    <zj-content>
      <zj-collapse title="业务联系人" tipText="注：该联系人为签署商业保理合同业务联系人。">
        <el-row>
          <el-form ref="form" :model="form" :rules="rules" label-position="top">
            <el-form-item label="联系人：" prop="businessPerson">
              <el-input v-model="form.businessPerson" />
            </el-form-item>
            <el-form-item label="联系号码：" prop="businessPhone">
              <el-input v-model="form.businessPhone" />
            </el-form-item>
            <el-form-item label="联系邮箱：" prop="businessEmail">
              <el-input v-model="form.businessEmail" />
            </el-form-item>
            <el-form-item label="联系地址：" prop="businessAddress">
              <el-input v-model="form.businessAddress" />
            </el-form-item>
          </el-form>
        </el-row>
      </zj-collapse>
    </zj-content>
    <zj-content-footer>
      <zj-button type="primary" @click="submit" :api="zjBtn.passBillSignBatch">确认申请</zj-button>
      <zj-button @click="$router.push('/productsOpened')" :api="zjBtn.passBillSignBatch">返回</zj-button>
    </zj-content-footer>
  </div>
</template>
<script>
import SelectItems from './selectItems';
import {newValidateFixedPhone} from "@utils/rules";
export default {
  components: {SelectItems},
  data() {
    return {
      zjControl: {
        getDataDirectory: this.$api.productOpenApply.getDataDirectory,
        openApply: this.$api.productOpenApply.submitProductOpenAplly,
        getDetail: this.$api.productOpenApply.getProductOpenApplyDetail,
      },
      form: {
        // 联系地址
        businessAddress: '',
        // 联系邮箱
        businessEmail: '',
        // 联系人
        businessPerson: '',
        //联系号码
        businessPhone: '',
        //产品
        productModelList: []
      },
      rules:{
        businessPerson:[
          {required: true,message: '请输入联系人',trigger: ['blur','change']}
        ],
        businessPhone: [
          {required: true,message: '请输入联系号码',trigger: ['blur','change']},
          {validator: newValidateFixedPhone,trigger: ['blur','change']}
        ],
        businessEmail: [
          {required: true,message: '请输入联系邮箱',trigger: ['blur','change']},
          {type:'email',message: '请输入正确的联系邮箱',trigger: ['blur','change']}
        ],
        businessAddress:[
          {required: true,message: '请输入联系地址',trigger: ['blur','change']}
        ]
      }
    };
  },
  created() {
    this.getApi();
  },
  methods: {
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$confirm('是否确认提交产品申请？','温馨提示',{
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(() => {
            this.zjControl.openApply(this.form).then(res => {
              //成功，关闭
            })
          })
        }
      })
    }
  },
};
</script>
<style lang="less" scoped>
#productsOpenedApply {
  background: #eff3f6;
  padding: 20px 0;
}
.el-form {
  padding-top: 10px;
  .el-form-item {
    width: 33.333333%;
    display: inline-block;
    margin-bottom: 20px;
  }
}
</style>
