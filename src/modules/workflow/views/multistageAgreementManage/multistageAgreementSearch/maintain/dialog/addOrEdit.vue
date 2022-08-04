<template>
  <el-dialog
    :title="`阶段性协议${title}`"
    :visible.sync="dialogVisible"
    width="1300px"
    @close="close">
    <zj-table ref="searchContractTable" :dataList="rows" :pager="false">
      <zj-table-column field="isAgreementOnline" title="供应商名称"/>
      <zj-table-column field="coreCompanyName" title="核心企业名称"/>
      <zj-table-column field="field1" title="保理标识"/>
      <zj-table-column field="field1" title="贸易关系状态"/>
      <zj-table-column field="isAgreementOnline" title="协议数据来源"/>
    </zj-table>
    <el-form :model="form" ref="form" :rules="rules" label-width="180px">
      <zj-content-block>
        <zj-content>
          <el-row >
            <el-col :span="8">
              <el-form-item label="SRM阶段性协议编号：" prop="srmAgreementNo">
                <el-input v-model="form.srmAgreementNo"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="阶段性协议类型："  prop="agreementType">
                <el-select v-model="form.agreementType"
                           placeholder="请选择"
                           clearable
                           :popper-append-to-body="false">
                  <el-option label="时间型" value=""></el-option>
<!--                  <el-option label="数量型" value=""></el-option>-->
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="阶段性协议编号：" prop="agreementNo">
                <el-input v-model="form.agreementNo"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="阶段性协议名称："  prop="agreementName">
                <el-input v-model="form.agreementName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="阶段性协议开始日：" prop="agreementStartDate">
                <zj-date-picker :date.sync="form.agreementStartDate"  :format="'yyyy年MM月dd日'"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="阶段性协议预计到期日：" prop="agreementEstimateEndDate">
                <zj-date-picker :date.sync="form.agreementEstimateEndDate"  :format="'yyyy年MM月dd日'"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="协议数量：">
                <el-input v-model="form.agreementNumber">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="单位：">
                <el-input v-model="form.unit">
<!--                  <template slot="append">元</template>-->
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="单价：">
                <el-input v-model="form.price">
<!--                  <template slot="append">元</template>-->
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="计价单位：">
                <el-input v-model="form.price">
<!--                  <template slot="append">元</template>-->
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="协议预估总价：">
                <zj-number-input :precision="0"
                                 v-model="form.agreementEstimatedPrice"
                                 placeholder="请输入协议预估总价"
                />
                <div>{{digitUp(form.agreementEstimatedPrice)}}</div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="状态：" prop="agreementStatus">
                <el-select v-model="form.agreementStatus"
                           placeholder="请选择"
                           clearable
                           :popper-append-to-body="false">
                  <el-option label="待维护" value=""></el-option>
                  <el-option label="可融资" value=""></el-option>
                  <el-option label="已冻结" value=""></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="请上传合同附件：" prop="atta">
                <zj-upload class="zj-inline" ref="upload" :httpRequest="attaUpload" :data="form.atta">
                  <zj-button slot="trigger">选择文件</zj-button>
                </zj-upload>
                <span class="zj-m-l-10">{{ form.atta }}</span>
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
      <el-button style="width: 100px" size="small" type="primary" @click="submit" :api="zjControl.savePhasedAgree || zjControl.getAddDetail">确认</el-button>
      <el-button style="width: 100px" size="small" @click="cancel">取消</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'addOrEdit',
  props: {
    zjControl: Object,
  },
  data () {
    return {
      dialogVisible: false,
      title: '',
      form: {
        srmAgreementNo: '',
        agreementType: '',
        agreementNo: '',
        agreementName: '',
        agreementStartDate: '',
        agreementEstimateEndDate: '',
        agreementNumber: '',
        executeNumber: '',
        unit: '',
        price: '',
        agreementEstimatedPrice: '',
        agreementStatus: '',
        atta: '',
      },
      rules: {
        srmAgreementNo: [
          { required: true, message: '请输入SRM阶段性协议编号', trigger: 'blur'},
        ],
        agreementType: [
          { required: true, message: '请选择协议类型', trigger: 'blur'},
        ],
        agreementNo: [
          { required: true, message: '请输入阶段性协议编号', trigger: 'blur'},
        ],
        agreementName: [
          { required: true, message: '请输入阶段性协议名称', trigger: 'blur'},
        ],
        agreementStartDate: [
          { required: true, message: '请选择阶段性协议开始日', trigger: 'blur'},
        ],
        agreementEstimateEndDate: [
          { required: true, message: '请选择阶段性协议到期日', trigger: 'blur'},
        ],
        state: [
          { required: true, message: '请选择状态', trigger: 'blur'},
        ],
        atta: [
          { required: true, message: '请上传合同附件', trigger: 'blur'},
        ],
      },
      rows: [],
    };
  },
  methods: {
    show(row, title) {
      if(row) {
        this.rows = [{...row}]
        this.form = {...row}
      }
      this.dialogVisible = true
      this.title = title
    },
    clearForm() {
      this.form = {}
    },
    cancel() {
      this.clearForm()
      this.dialogVisible = false
    },
    attaUpload({file}) {
      let formData = new FormData()
      formData.append('file',file)
      this.zjControl.uploadFile(formData).then(res => {
        this.form.atta = res.data.fileName
        this.$message.success('附件上传成功!')
      })
    },
    //新增或维护协议
    submit() {
      console.log(this.title)
      this.$refs.form.validate((valid) => {
        if (valid) {
          let params = {
            phasedId: this.row.phasedId,
            ...this.form,
          }
          //新增保存
          if(this.title === '新增') {
            this.zjControl.getAddDetail(params).then(res=>{
              //...
              this.$message.success(res.msg)
              this.clearForm()
              this.dialogVisible = false
            })
          }
          //维护保存
          if(this.title === '维护') {
            this.zjControl.savePhasedAgree(params).then(res=>{
              //...
              this.$message.success(res.msg)
              this.clearForm()
              this.dialogVisible = false
            })
          }
        }
      });
    }
  },
  created() {
  }
};
</script>
