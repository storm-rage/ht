<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    append-to-body
    width="88%"
    @close="close">
    <el-form :model="form" ref="form" label-width="180px">
      <el-row :gutter="10" class="zj-m-b-15">
        <el-col :span="24">
          <el-form-item label="开单宽限天数："
                        prop="openGraceDays"
                        :rules="[
                          {required: true,message: '请输入开单宽限天数',trigger: ['change','blur']}
                        ]">
            <zj-number-input v-model.trim="form.openGraceDays" :precision="0">
              <template slot="append">天</template>
            </zj-number-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-for="(item,index) in form.billFactoringModelList" :key="`${index}bill`">
        <el-col :span="8">
          <el-form-item label="电子债权凭证期限区间：" required>
            <el-row :gutter="2" class="multi-form-item">
              <el-col :span="10">
                <el-form-item :prop="`billFactoringModelList[${index}].rdDateStart`"
                              :rules="[
                                {required: true,message: '请输入开始区间',trigger: ['change','blur']},
                                { validator: validateRdDateStart, trigger: 'blur', rdDateEnd: item.rdDateEnd}
                              ]">
                  <zj-number-input  v-model.trim="item.rdDateStart" :max="maxRdDateDay" :precision="0">
                  </zj-number-input>
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <span>～</span>
              </el-col>
              <el-col :span="11">
                <el-form-item :prop="`billFactoringModelList[${index}].rdDateEnd`"
                              :rules="[
                                {required: true,message: '请输入结束区间',trigger: ['change','blur']},
                                {validator: validateRdDateEnd, trigger: 'blur', rdDateStart: item.rdDateStart}
                              ]">
                  <zj-number-input style="width: 82%" v-model.trim="item.rdDateEnd" :max="maxRdDateDay" :precision="0">
                  </zj-number-input>&nbsp;天
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="凭证可用折扣："
                        :prop="`billFactoringModelList[${index}].availableDiscountsRate`"
                        :rules="[
                                {required: true,message: '请输入凭证可用折扣',trigger: ['change','blur']}
                              ]">
            <zj-number-input v-model.trim="item.availableDiscountsRate" :max="100" :precision="2">
              <template slot="append">%</template>
            </zj-number-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="凭证融资月利率："
                        :prop="`billFactoringModelList[${index}].rdFinancingMonthRate`"
                        :rules="[
                                {required: true,message: '请输入凭证融资月利率',trigger: ['change','blur']}
                              ]">
            <zj-number-input v-model.trim="item.rdFinancingMonthRate" :max="100" :precision="4">
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
import BillInfoTextTip from '../billInfoTextTip';
export default {
  components: {
    BillInfoTextTip
  },
  data () {
    return {
      dialogVisible: false,
      title: '业务设置',
      maxRdDateDay: 365,
      form: {
        billFactoringModelList: [],
        openGraceDays: ''
      }
    };
  },
  methods: {
    show (obj,title) {
      this.form = Object.assign({},obj);
      this.title = title;
      this.dialogVisible = true;
    },
    toAdd () {
      const row = {
        rdDateStart: 0,
        rdDateEnd: 365,
        availableDiscountsRate: '',
        rdFinancingMonthRate: ''
      }
      const len = this.form.billFactoringModelList.length;
      let rdDateEnd = 0;
      if (len > 0) {
        const lastRow = this.form.billFactoringModelList[len - 1];
        rdDateEnd = lastRow.rdDateEnd;
        //  开始天数=上一个结束天数+1
        row.rdDateStart = Number(lastRow.rdDateEnd) + 1;
      }
      if (rdDateEnd>=this.maxRdDateDay) {
        this.$message.error(`区间最大为${this.maxRdDateDay}天,无法再新增`);
      }else {
        this.form.billFactoringModelList.push(row);
      }
    },
    validateRdDateStart(rule, value, callback) {
      const rdDateEnd = rule.rdDateEnd
      if(rdDateEnd&&value && value>rdDateEnd) {
        callback(new Error('开始区间不能大于结束区间'));
      }else if(value && value>this.maxRdDateDay) {
        callback(new Error(`区间最大为${this.maxRdDateDay}天`));
      }else {
        callback();
      }
    },
    validateRdDateEnd(rule, value, callback) {
      const rdDateStart = rule.rdDateStart
      if(rdDateStart&&value && value<rdDateStart) {
        callback(new Error('结束区间不能小于开始区间'));
      }else if(value && value>this.maxRdDateDay) {
        callback(new Error(`区间最大为${this.maxRdDateDay}天`));
      }else {
        callback();
      }
    },
    toDelItem (index) {
      this.$delete(this.form.billFactoringModelList,index);
    },
    close () {
      this.dialogVisible = false;
    },
    submit () {
      if (this.form.billFactoringModelList.length) {
        const len = this.form.billFactoringModelList.length;
        const row = this.form.billFactoringModelList[len-1];
        if (row && Number(row.rdDateEnd)!==this.maxRdDateDay) {
          return this.$messageBox({
            type:'warning',
            content: `最后结束区间只能为${this.maxRdDateDay}天`
          })
        }
      }
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
