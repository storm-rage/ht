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
              <el-form-item label="凭证编号：" prop="field1">
                1234566
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="签发日期："  prop="field1">
                2021-09-09
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="签发人：" prop="field1">
                广州材料工程有限公司1
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="原始持有人："  prop="field1">
                广州材料工程有限公司
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="凭证金额："  prop="field1">
                {{money('100000')}}
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="凭证到期日："  prop="field1">
                {{date('2022-09-01')}}
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="备注："  prop="field1">
               方式方法士大夫撒发射点发射点发生十分士大夫士大夫十分士大夫士大夫是否是否收到十分十分大师傅撒发射点发射点十分士大夫的
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="zj-m-t-5">
            <el-col>
              <el-form-item label="凭证实际到期日：" prop="field1" :rules="[
                {required: true,message: '请选择凭证实际到期日',trigger: ['blur','change']}
              ]">
               <el-date-picker disabled v-model="form.field1"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="确认凭证金额：" prop="field1" :rules="[
                {required: true,message: '请输入确认凭证金额',trigger: ['blur','change']}
              ]">
                <zj-number-input v-model="form.field1">
                </zj-number-input>
                <p class="zj-right" style="width: 220px">{{digitUp(form.field1)}}</p>
              </el-form-item>
            </el-col>
          </el-row>
        </zj-content>
      </zj-content-block>
    </el-form>
    <div slot="footer" class="zj-center" style="display: block;width: 100%">
      <el-button style="width: 100px" size="small" type="primary" @click="submit">确定</el-button>
      <el-button style="width: 100px" size="small" @click="close">取消</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  data () {
    return {
      dialogVisible: false,
      form: {}
    };
  },
  methods: {
    show (obj) {
      this.form = Object.assign({},obj);
      this.dialogVisible = true;
    },
    close () {
      this.dialogVisible = false;
    },
    submit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
        }
      });
    }
  }
};
</script>
