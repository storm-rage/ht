<template>
  <el-dialog
    :title="`阶段性协议${title}`"
    :visible.sync="dialogVisible"
    width="1300px"
    @close="close">
    <zj-table ref="searchContractTable" :dataList="rows" :pager="false">
      <zj-table-column field="sellerName" title="供应商名称"/>
      <zj-table-column field="buyerName" title="核心企业名称"/>
      <zj-table-column field="cactoringLogo" title="保理标识"/>
      <zj-table-column field="tradeState" title="贸易关系状态"/>
      <zj-table-column field="isAgreementOnline" title="协议数据来源"/>
    </zj-table>
    <el-form :model="form" ref="form" :rules="rules" label-width="180px">
      <zj-content-block>
        <zj-content>
          <el-row >
            <el-col :span="8">
              <el-form-item label="SRM阶段性协议编号：" prop="srmAgreementNo">
                <el-input v-model="form.srmAgreementNo" :disabled="row.isAgreementOnline === '0'"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="阶段性协议类型："  prop="agreementType">
                <el-select v-model="form.agreementType"
                           placeholder="请选择"
                           clearable
                           :disabled="row.isAgreementOnline === '0'"
                           :popper-append-to-body="false">
                  <el-option
                    v-for="item in dictionary.agreementTypeList"
                    :label="item.desc"
                    :value="item.code"
                    :key="item.code"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="阶段性协议编号：" prop="agreementNo">
                <el-input v-model="form.agreementNo" :disabled="row.isAgreementOnline === '0'"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="阶段性协议名称："  prop="agreementName">
                <el-input v-model="form.agreementName" :disabled="row.isAgreementOnline === '0'"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="阶段性协议开始日：" prop="agreementStartDate">
                <zj-date-picker :date.sync="form.agreementStartDate" :format="'yyyy年MM月dd日'" :disabled="row.isAgreementOnline === '0'"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="阶段性协议预计到期日：" prop="agreementEstimateEndDate">
                <zj-date-picker :date.sync="form.agreementEstimateEndDate" :format="'yyyy年MM月dd日'" :overNow="true"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="协议数量："  prop="agreementNumber">
                <zj-number-input
                  :precision="0"
                  v-model="form.agreementNumber"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="单位："  prop="unit">
                <el-input v-model="form.unit" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="单价："  prop="price">
                <zj-number-input
                  :precision="2"
                  v-model="form.price"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="计价单位："  prop="priceUnits">
                <el-input v-model="form.priceUnits"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="协议预估总价：">
                <zj-number-input :precision="0"
                                 v-model="form.agreementEstimatedPrice"
                                 placeholder="请输入协议预估总价"
                />
                <div>{{form.agreementEstimatedPrice?digitUp(form.agreementEstimatedPrice):''}}</div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="状态：" prop="agreementStatus">
                <el-select v-model="form.agreementStatus"
                           placeholder="请选择"
                           clearable
                           :popper-append-to-body="false"
                >
                  <el-option
                    v-for="item in dictionary.agreementStateList"
                    :label="item.desc"
                    :value="item.code"
                    :key="item.code"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="请上传合同附件：" prop="fileName">
                <zj-upload class="zj-inline" ref="upload" :httpRequest="attaUpload">
                  <zj-button slot="trigger">选择文件</zj-button>
                </zj-upload>
                <span class="zj-m-l-10">{{ form.fileName?form.fileName:'未选择任何文件' }}</span>
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
    rowData: Object,
    dictionary: {
      type: Object,
      default: ()=>{
        return {}
      }
    },
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
        priceUnits: '',
        agreementEstimatedPrice: '',
        agreementStatus: '0',
        fileId: '',
        fileName: '',
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
          // { message: '请选择阶段性协议到期日', trigger: 'blur'},
          { validator:(rule, value, callback)=>{
              // 协议类型为时间型则必填,0-时间型，1-数量型
              rule.required = this.form.agreementType == '0'? true:false
              if (!value && rule.required) {
                callback(new Error('请选择阶段性协议到期日'))
              } else {
                callback()
              }
            },
            trigger: ['blur']},
        ],
        agreementNumber: [
          { validator:(rule, value, callback)=>{
              // 若为数量型，则必填，若为时间型，则选填,0-时间型，1-数量型
              rule.required = this.form.agreementType == '1'? true:false
              if (!value && rule.required) {
                callback(new Error('请输入阶段性协议数量'))
              } else {
                callback()
              }
            },
            trigger: ['blur']},
        ],
        unit: [
          { validator:(rule, value, callback)=>{
              // 若为数量型，则必填，若为时间型，则选填,0-时间型，1-数量型
              rule.required = this.form.agreementType == '1'? true:false
              if (!value && rule.required) {
                callback(new Error('请输入单位'))
              } else {
                callback()
              }
            },
            trigger: ['blur']},
        ],
        price: [
          // { message: '请输入价格', trigger: 'blur'},
          { validator:(rule, value, callback)=>{
              // 若为数量型，则必填，若为时间型，则选填,0-时间型，1-数量型
              rule.required = this.form.agreementType == '1'? true:false
              if (!value && rule.required) {
                callback(new Error('请输入价格'))
              } else {
                callback()
              }
            },
            trigger: ['blur']},
        ],
        priceUnits: [
          // { message: '请输入计价单位', trigger: 'blur'},
          { validator:(rule, value, callback)=>{
              // 若为数量型，则必填，若为时间型，则选填,0-时间型，1-数量型
              rule.required = this.form.agreementType == '1'? true:false
              if (!value && rule.required) {
                callback(new Error('请输入计价单位'))
              } else {
                callback()
              }
            },
            trigger: ['blur']},
        ],
        agreementStatus: [
          { required: true, message: '请选择状态', trigger: 'blur'},
        ],
        fileName: [
          { required: true, message: '请上传合同附件', trigger: 'blur'},
        ],
      },
      rows: [],
      row: {},
    };
  },
  methods: {
    show(row, title, tradeRelationList) {
      this.rows = [...tradeRelationList]
      if(row) {
        this.row = row
        this.form = {...row}
        console.log(this.row)
        console.log(this.rows)
      }
      this.dialogVisible = true
      this.title = title
    },
    clearForm() {
      this.rows = []
      this.form = {}
    },
    cancel() {
      this.clearForm()
      this.dialogVisible = false
    },
    close() {
      this.clearForm()
      this.dialogVisible = false
    },
    attaUpload({file}) {
      let formData = new FormData()
      formData.append('file',file)
      this.zjControl.uploadFile(formData).then(res => {
        this.form.fileId = res.data.fileId
        this.form.fileName = res.data.fileName
        this.$message.success('附件上传成功!')
      })
    },
    //新增或维护协议
    submit() {
      // console.log(this.title)
      this.$refs.form.validate((valid) => {
        if (valid) {
          let params = {
            ...this.form,
            phasedId: this.row.phasedId,
            attachId: this.form.attachId,
            buyerId: this.rows[0].buyerId,
            supplierId: this.rows[0].sellerId,
          }
          let requestUrl = this.rowData.maintainType=='1'?this.zjControl.savePhasedAgree:this.zjControl.saveWaitPhasedAgree
          //新增保存
          if(this.title === '新增') {
            // console.log(params)
            requestUrl(params).then(res=>{
              //...
              this.$emit('agreementUpdate', params)
              this.$message.success(res.msg)
              this.clearForm()
              this.dialogVisible = false
            })
          }
          //维护保存
          if(this.title === '维护') {
            requestUrl(params).then(res=>{
              //...
              this.$emit('agreementUpdate', params)
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
