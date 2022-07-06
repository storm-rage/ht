<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="88%"
    @close="close">
    <el-form :model="form" ref="form" :rules="rules" label-width="180px">
      <el-row :gutter="10" class="zj-m-b-15">
        <el-col :span="24">
          <el-form-item label="开单宽限天数："
                        prop="openBillMaxDay"
                        :rules="[
                          {required: true,message: '请输入开单宽限天数',trigger: ['change','blur']}
                        ]">
            <zj-number-input v-model.trim="form.openBillMaxDay" :max="180" :precision="0">
              <template slot="append">天</template>
            </zj-number-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-for="(item,index) in form.list" :key="`${index}bill`">
        <el-col :span="8">
          <el-form-item label="电子债权凭证期限区间：" required>
            <el-row :gutter="2" class="multi-form-item">
              <el-col :span="10">
                <el-form-item :prop="`list[${index}].startDay`"
                              :rules="[
                                {required: true,message: '请输入开始区间',trigger: ['change','blur']}
                              ]">
                  <zj-number-input v-model.trim="item.startDay" :max="180" :precision="0">
                  </zj-number-input>
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <span>～</span>
              </el-col>
              <el-col :span="11">
                <el-form-item :prop="`list[${index}].endDay`"
                              :rules="[
                                {required: true,message: '请输入结束区间',trigger: ['change','blur']}
                              ]">
                  <zj-number-input style="width: 82%" v-model.trim="item.endDay" :max="180" :precision="0">
                  </zj-number-input>&nbsp;天
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="凭证可用折扣："
                        :prop="`list[${index}].discountAmt`"
                        :rules="[
                                {required: true,message: '请输入凭证可用折扣',trigger: ['change','blur']}
                              ]">
            <zj-number-input v-model.trim="item.discountAmt">
              <template slot="append">%</template>
            </zj-number-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="凭证融资月利率："
                        :prop="`list[${index}].financeRate`"
                        :rules="[
                                {required: true,message: '请输入凭证融资月利率',trigger: ['change','blur']}
                              ]">
            <zj-number-input v-model.trim="item.financeRate">
              <template slot="append">%</template>
            </zj-number-input>
          </el-form-item>
        </el-col>
        <div class="del-btn" @click="toDelItem(index)">
          <i class="el-icon-delete"></i>
        </div>
      </el-row>
    </el-form>
    <div class="zj-center">
      <el-button @click="toAdd" style="width: 100px" size="small" type="primary">新增</el-button>
    </div>
    <bill-info-text-tip></bill-info-text-tip>
    <div slot="footer" class="zj-center" style="display: block;width: 100%">
      <el-button style="width: 100px" size="small" type="primary" @click="submit">确认</el-button>
      <el-button style="width: 100px" size="small" @click="close">取消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import BillInfoTextTip from '../../components/billInfoTextTip';
export default {
  components: {
    BillInfoTextTip
  },
  data () {
    return {
      dialogVisible: false,
      title: '业务设置',
      form: {}
    };
  },
  methods: {
    show (obj,title) {
      this.form = Object.assign({},obj);
      this.title = title;
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
    toDelItem (index) {
      this.$delete(this.form.list,index);
    },
    close () {
      this.dialogVisible = false;
    },
    submit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('done', this.form);
          this.close();
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.del-btn {
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 2px;
  color: red;
  font-size: 18px;
}
</style>
<style lang="less">
.multi-form-item {
  .el-input {
    width: 100%;
  }
}
</style>
