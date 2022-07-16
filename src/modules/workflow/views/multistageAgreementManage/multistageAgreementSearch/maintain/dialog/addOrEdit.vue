<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="70%"
    @close="close">
    <zj-table ref="searchContractTable"  :dataList="tradeList">
      <zj-table-column field="field1" title="供应商名称"/>
      <zj-table-column field="field1" title="核心企业名称"/>
      <zj-table-column field="field1" title="保理标识"/>
      <zj-table-column field="field1" title="贸易关系状态"/>
      <zj-table-column field="field1" title="协议数据来源"/>
    </zj-table>
    <el-form :model="form" ref="form" :rules="rules" label-width="180px">
      <zj-content-block>
        <zj-content>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="阶段性协议编号：" prop="field1">
                <el-input v-model="form.agreementCode"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="阶段性协议名称："  prop="field1">
                <el-input v-model="form.agreementName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="阶段性协议类型："  prop="field1">
                <el-select v-model="form.agreementType"
                           placeholder="请选择"
                           clearable
                           :popper-append-to-body="false">
                  <el-option label="时间型"></el-option>
                  <el-option label="数量型"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="阶段性协议开始日：">
                <zj-date-picker v-model="form.dateStart"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="阶段性协议预计到期日：">
                <zj-date-picker v-model="form.dateStart"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否已开始执行：">
                <el-select v-model="form.agreementType"
                           placeholder="请选择"
                           clearable
                           :popper-append-to-body="false">
                  <el-option label="是"></el-option>
                  <el-option label="否"></el-option>
                </el-select>              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="已执行数量：">
                <el-input v-model="form.agreementName">
                  <template slot="append">单位</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="协议数量：">
                <el-input v-model="form.agreementName">
                  <template slot="append">单位</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="单价：">
                <el-input v-model="form.agreementName">
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="协议预估总价：">
                <el-input v-model="form.agreementName"></el-input>
                <div>{{digitUp(1000)}}</div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="状态：">
                <el-select v-model="form.agreementType"
                           placeholder="请选择"
                           clearable
                           :popper-append-to-body="false">
                  <el-option label="待维护"></el-option>
                  <el-option label="可融资"></el-option>
                  <el-option label="已冻结"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="请上传合同附件：">
                <zj-upload class="zj-inline" ref="upload" :httpRequest="dayUpload">
                  <zj-button slot="trigger">选择文件</zj-button>
                </zj-upload>
                <div>
                  <zj-content-tip text="支持的上传的文件格式：PDF、图片、压缩包！"></zj-content-tip>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </zj-content>
      </zj-content-block>
      <!--  产品业务设置    -->
    </el-form>
    <div slot="footer" class="zj-center" style="display: block;width: 100%">
      <el-button style="width: 100px" size="small" type="primary" @click="submit">确认</el-button>
      <el-button style="width: 100px" size="small" @click="close">取消</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  components: {
  },
  data () {
    return {
      dialogVisible: false,
      // todo:????
      title: '',
      form: {},
      tradeList: [
        {
          field1: '海天高明公司',
          field2: '是',
          field3: '655555333544',
          field4: '非保理',
          field5: '12',
          field6: '100000',
          field7: '20000',
          field8: '正常'
        }
      ]
    };
  },
  methods: {
    show (obj,title) {
      this.form = Object.assign({},obj);
      this.dialogVisible = true;
      this.title = `阶段性协议${title}`;
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
