<template>
  <div id="productsOpenedApply">
    <!-- 折叠面板 -->
    <div>
      <zj-header title="产品开通申请" tipText="注：开通订单保理将默认开通电子债权凭证产品。"></zj-header>
      <div class="zj-m-b-20">
        <select-items></select-items>
      </div>
    </div>
    <zj-content-block>
      <zj-header title="业务联系人" tipText="注：该联系人为签署商业保理合同业务联系人。"></zj-header>
      <el-row>
        <el-form ref="form" :model="form" :rules="rules" label-position="top">
          <el-form-item label="联系人：" prop="issueEntName">
            <el-input v-model="form.issueEntName" />
          </el-form-item>
          <el-form-item label="联系号码：" prop="issueEntPhone">
            <el-input v-model="form.issueEntPhone" />
          </el-form-item>
          <el-form-item label="联系邮箱：" prop="issueEntEmail">
            <el-input v-model="form.issueEntEmail" />
          </el-form-item>
          <el-form-item label="联系地址：" prop="issueEntDetail">
            <el-input v-model="form.issueEntDetail" />
          </el-form-item>
        </el-form>
      </el-row>
    </zj-content-block>
    <zj-content-footer>
      <zj-button type="primary" @click="submit" :api="zjBtn.passBillSignBatch">确认申请</zj-button>
      <zj-button class="back" @click="$router.push('/productsOpened')" :api="zjBtn.passBillSignBatch">返回</zj-button>
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
      form: {

      },
      collActive: ["orderInfo"],
      checked: false,
      rules:{
        issueEntName:[
          {required: true,message: '请输入联系人',trigger: ['blur','change']}
        ],
        issueEntPhone: [
          {required: true,message: '请输入联系号码',trigger: ['blur','change']},
          {validator: newValidateFixedPhone,trigger: ['blur','change']}
        ],
        issueEntEmail: [
          {required: true,message: '请输入联系邮箱',trigger: ['blur','change']},
          {type:'email',message: '请输入正确的联系邮箱',trigger: ['blur','change']}
        ],
        issueEntDetail:[
          {required: true,message: '请输入联系地址',trigger: ['blur','change']}
        ]
      }
    };
  },
  created() {},
  methods: {
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          //todo:request
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
