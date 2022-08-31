<template>
  <el-dialog
    title="贸易背景"
    :visible="visible"
    width="1300px"
    @close="cancel"
    left
  >
    <zj-content-container v-loading="loading">
      <!--    贸易合同    -->
      <zj-content-block>
        <zj-header title="贸易合同信息" />
        <zj-button
          type="primary"
          icon="el-icon-circle-plus-outline"
          @click="handleAdd('contract')"
          >新增</zj-button
        >
        <zj-table
          ref="contractTable"
          :dataList="form.contractList"
          :editRules="rules.contractEditRules"
          :pager="false"
          :edit-config="{
            trigger: 'manual',
            mode: 'row',
            icon: '-',
            autoClear: false,
            showStatus: true
          }"
        >
          <zj-table-column
            field="contractType"
            title="合同类型"
            :formatter="obj => typeMap(dictionary.contractType, obj.cellValue)"
          />
          <zj-table-column
            field="contractNo"
            title="贸易合同编号"
            :edit-render="{
              name: 'input',
              immediate: true
            }"
          />
          <zj-table-column
            field="contractName"
            title="贸易合同名称"
            :edit-render="{
              name: 'input',
              immediate: true
            }"
          />
          <zj-table-column
            field="contractAmt"
            title="合同金额"
            :formatter="money"
          >
            <template v-slot="{ row }">
              <div v-if="$refs.contractTable.isActiveByRow(row)">
                <vxe-input
                  v-model="row.contractAmt"
                  type="float"
                  digits="2"
                  :controls="false"
                  style="width: 100%;"
                ></vxe-input>
              </div>
              <div v-else>{{ money(row.contractAmt) }}</div>
            </template>
          </zj-table-column>
          <zj-table-column
            field="signDate"
            title="合同签订日期"
            :formatter="date"
          >
            <template v-slot="{ row }">
              <div v-if="$refs.contractTable.isActiveByRow(row)">
                <zj-date-picker
                  class="table-date-picker"
                  :date.sync="row.signDate"
                />
              </div>
              <div v-else>{{ date(row.signDate) }}</div>
            </template>
          </zj-table-column>
          <zj-table-column
            field="fileName"
            title="附件"
            :edit-render="{
              name: 'input'
            }"
          />
          <zj-table-column title="操作" width="200" fixed="right">
            <template v-slot="{ row, rowIndex }">
              <template v-if="!$refs.contractTable.isActiveByRow(row)">
                <zj-button type="text" @click="edit('contract', row)"
                  >修改</zj-button
                >
                <zj-button v-if="row.fileId" type="text" @click="downs(row)">下载</zj-button>
              </template>
              <template v-if="$refs.contractTable.isActiveByRow(row)">
                <zj-button type="text" @click="save('contract', row, rowIndex)"
                  >保存</zj-button
                >
                <!-- <zj-button
                  type="text"
                  @click="cancel('contract', row, rowIndex)"
                  >取消</zj-button
                > -->
                <zj-upload
                  class="zj-inline"
                  :httpRequest="params => handleFileUpload('contract', params)"
                  :data="{ row }"
                >
                  <zj-button slot="trigger" type="text">上传</zj-button>
                </zj-upload>
              </template>
              <el-popconfirm
                icon="el-icon-info"
                icon-color="red"
                title="确定删除吗？"
                @confirm="del('contract', row)"
              >
                <zj-button slot="reference" type="text">删除</zj-button>
              </el-popconfirm>
            </template>
          </zj-table-column>
        </zj-table>
        <!--    发票信息    -->
      </zj-content-block>
      <zj-content-block>
        <zj-header title="发票信息" />
        <zj-button
          type="primary"
          icon="el-icon-circle-plus-outline"
          @click="handleAdd('invoice')"
          >新增发票</zj-button
        >
        <zj-table
          ref="invoiceTable"
          :dataList="form.invoices"
          :editRules="rules.invoiceEditRules"
          :pager="false"
          :edit-config="{
            trigger: 'manual',
            mode: 'row',
            icon: '-',
            autoClear: false,
            showStatus: true
          }"
        >
          <zj-table-column
            field="invoiceType"
            title="发票类型"
            :edit-render="{
              name: 'select',
              immediate: true
            }"
          >
            <template v-slot:edit="scope">
              <el-select
                v-model="scope.row.invoiceType"
                @change="$refs.invoiceTable.updateStatus(scope)"
              >
                <el-option
                  v-for="item in dictionary.invoiceType"
                  :key="item.code"
                  :label="item.desc"
                  :value="item.code"
                >
                </el-option>
              </el-select>
            </template>
          </zj-table-column>
          <zj-table-column
            field="invoiceNumber"
            title="发票号码"
            :edit-render="{
              name: 'input',
              immediate: true,
              events: { input: inputChange }
            }"
          />
          <zj-table-column
            field="invoiceCode"
            title="发票代码"
            :edit-render="{
              name: 'input',
              immediate: true
            }"
          >
            <template v-slot:edit="scope">
              <vxe-input
                v-model="scope.row.invoiceCode"
                type="number"
                :controls="false"
                @change="$refs.invoiceTable.updateStatus(scope)"
                style="width: 100%;"
              ></vxe-input>
            </template>
          </zj-table-column>
          <zj-table-column
            field="totalAmtLowcase"
            title="发票金额(含税)"
            :edit-render="{
              name: 'input'
            }"
          >
            <template v-slot:edit="scope">
              <vxe-input
                v-model="scope.row.totalAmtLowcase"
                type="float"
                digits="2"
                :controls="false"
                @change="$refs.invoiceTable.updateStatus(scope)"
                style="width: 100%;"
              ></vxe-input>
            </template>
          </zj-table-column>
          <zj-table-column
            field="sellAmount"
            title="发票金额(不含税)"
            :edit-render="{
              name: 'input'
            }"
          >
            <template v-slot:edit="scope">
              <vxe-input
                v-model="scope.row.sellAmount"
                type="float"
                digits="2"
                :controls="false"
                @change="$refs.invoiceTable.updateStatus(scope)"
                style="width: 100%;"
              ></vxe-input>
            </template>
          </zj-table-column>
          <zj-table-column
            field="seller"
            title="销售方"
            :edit-render="{
              name: 'input',
              immediate: true
            }"
          />
          <zj-table-column
            field="buyer"
            title="购买方"
            :edit-render="{
              name: 'input',
              immediate: true
            }"
          />
          <zj-table-column
            field="invoiceDate"
            title="发票日期"
            :formatter="date"
            :edit-render="{
              name: 'input'
            }"
          >
            <template v-slot:edit="scope">
              <zj-date-picker
                class="table-date-picker"
                :date.sync="scope.row.invoiceDate"
                @change="$refs.invoiceTable.updateStatus(scope)"
              />
            </template>
          </zj-table-column>
          <zj-table-column
            field="verifyCode"
            title="校验码"
            :edit-render="{
              name: 'input',
              immediate: true
            }"
          />
          <zj-table-column
            field="fileName"
            title="附件名称"
            :edit-render="{
              name: 'input'
            }"
          >
            <template v-slot:edit="{ row }">
              {{ row.fileName }}
            </template>
          </zj-table-column>
          <zj-table-column title="操作" width="200" fixed="right">
            <template v-slot="{ row, rowIndex }">
              <template v-if="!$refs.invoiceTable.isActiveByRow(row)">
                <zj-button type="text" @click="edit('invoice', row)"
                  >修改</zj-button
                >
                <zj-button v-if="row.fileId" type="text" @click="downs(row)">下载</zj-button>
              </template>
              <template v-if="$refs.invoiceTable.isActiveByRow(row)">
                <zj-button type="text" @click="save('invoice', row, rowIndex)"
                  >保存</zj-button
                >
                <!-- <zj-button
                  type="text"
                  @click="cancel('invoice', row, rowIndex)"
                  >取消</zj-button
                > -->
                <zj-upload
                  class="zj-inline"
                  :httpRequest="params => handleFileUpload('invoice', params)"
                  :data="{ row }"
                >
                  <zj-button slot="trigger" type="text">上传</zj-button>
                </zj-upload>
              </template>
              <zj-button type="text" @click="del('invoice', row)"
                >删除</zj-button
              >
            </template>
          </zj-table-column>
        </zj-table>
        <el-row> 发票金额（含税）合计：{{ form.totalAmount }}元 </el-row>
      </zj-content-block>
      <!--    其他附件    -->
      <zj-content-block>
        <zj-header title="其他附件" />
        <zj-button
          type="primary"
          icon="el-icon-circle-plus-outline"
          @click="handleAdd('other')"
          >新增</zj-button
        >
        <zj-table
          ref="otherTable"
          :dataList="form.otherAttachs"
          :pager="false"
          :edit-config="{
            trigger: 'manual',
            mode: 'row',
            icon: '-',
            autoClear: false,
            showStatus: true
          }"
        >
          <zj-table-column type="seq" width="60" />
          <zj-table-column
            field="attachTheme"
            title="说明"
            :edit-render="{
              name: 'input',
              immediate: true
            }"
          />
          <zj-table-column
            field="fileName"
            title="附件名称"
            :edit-render="{
              name: 'input'
            }"
          >
            <template v-slot:edit="{ row }">
              {{ row.fileName }}
            </template>
          </zj-table-column>
          <zj-table-column title="操作" width="200" fixed="right">
            <template v-slot="{ row, rowIndex }">
              <template v-if="!$refs.otherTable.isActiveByRow(row)">
                <zj-button type="text" @click="edit('other', row)"
                  >修改</zj-button
                >
                <zj-button v-if="row.fileId" type="text" @click="downs(row)">下载</zj-button>
              </template>
              <template v-if="$refs.otherTable.isActiveByRow(row)">
                <zj-button type="text" @click="save('other', row, rowIndex)"
                  >保存</zj-button
                >
                <!-- <zj-button
                  type="text"
                  @click="cancel('bill', row, rowIndex)"
                  >取消</zj-button
                > -->
                <zj-upload
                  class="zj-inline"
                  :httpRequest="
                    params => handleFileUpload('other', params, row)
                  "
                  :data="{ row }"
                >
                  <zj-button slot="trigger" type="text">上传</zj-button>
                </zj-upload>
              </template>
              <zj-button type="text" @click="del('other', row)">删除</zj-button>
            </template>
          </zj-table-column>
        </zj-table>
      </zj-content-block>

      <!-- <zj-content-footer>
        <zj-button type="primary" @click="maintainSuccess">维护完成</zj-button>
        <zj-button class="submit-button" @click="goParent">返回</zj-button>
      </zj-content-footer> -->
    </zj-content-container>

    <div slot="footer" class="dialog-footer">
      <zj-button type="primary" @click="onConfirm">确认</zj-button>
      <zj-button status="primary" @click="cancel">取消</zj-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'submitDialog',
  props: {
    visible: Boolean,
    rowData: Object // 从外面传进来的数据集合，用于查详情，修改有部分key需要在这里拿
  },
  data () {
    return {
      loading: false,
      zjControl: {
        getTradeBackDictionary: this.$api.billAssignApply
          .getTradeBackDictionary, //获取数据字典
        getEbBillTradeBackground: this.$api.billAssignApply
          .getEbBillTradeBackground, //贸易背景管理-获取详情
        offlineStatementMaintainContract: this.$api.billAssignApply
          .offlineStatementMaintainContract, //贸易背景管理-合同维护
        offlineStatementMaintainInvoice: this.$api.billAssignApply
          .offlineStatementMaintainInvoice, //贸易背景管理-发票维护
        offlineStatementMaintainOther: this.$api.billAssignApply
          .offlineStatementMaintainOther, //贸易背景管理-其它附件维护
        uploadMaintainFile: this.$api.billAssignApply.uploadMaintainFile //贸易背景管理-附件上传
      },
      form: {
        contractList: [],
        invoices: [],
        otherAttachs: []
      },
      rules: {
        contractEditRules: {
          contractNo: [
            { required: true, message: '不能为空', trigger: 'change' }
          ],
          contractName: [
            { required: true, message: '不能为空', trigger: 'change' }
          ],
          contractAmt: [
            { required: true, message: '不能为空', trigger: 'change' }
          ],
          fileName: [
            {
              required: true,
              validator: scope => {
                if (!scope.row.fileId) {
                  return new Error('不能为空')
                }
              },
              trigger: 'change'
            }
          ]
        },
        invoiceEditRules: {
          invoiceType: [
            { required: true, message: '不能为空', trigger: 'change' }
          ],
          invoiceNumber: [{ required: true, message: '不能为空' }],
          invoiceCode: [{ required: true, message: '不能为空' }],
          totalAmtLowcase: [{ required: true, message: '不能为空' }],
          sellAmount: [{ required: true, message: '不能为空' }],
          invoiceDate: [{ required: true, message: '不能为空' }],
          verifyCode: [{ required: true, message: '不能为空' }],
          fileName: [
            {
              required: true,
              validator: scope => {
                if (!scope.row.fileId) {
                  return new Error('不能为空')
                }
              },
              trigger: 'change'
            }
          ]
        }
      },
      contractInfoRow: {},
      invoicesRow: {},
      otherAttachsRow: {},
      dictionary: {}
    }
  },
  created () {
    if (this.rowData.ebillCode) {
      this.getApi()
      this.getDic()
      this.getDetail()
    }
  },
  methods: {
    onConfirm () {},
    cancel () {
      this.$emit('update:visible', false)
    },

    getDic () {
      this.zjControl.getTradeBackDictionary().then(res => {
        this.dictionary = res.data
      })
    },
    getDetail () {
      this.loading = true
      this.zjControl
        .getEbBillTradeBackground({ ebillCode: this.rowData.ebillCode })
        .then(res => {
          this.loading = false
          this.form.contractList = res.data.contractList || []
          this.form.invoices = res.data.invoices || []
          this.form.otherAttachs = res.data.otherAttachs || []
        })
        .catch(() => {
          this.loading = false
        })
    },
    inputChange ({ row }) {
      row.invoiceNumber = row.invoiceNumber.replace(/[^\d]/, '')
      if (row.invoiceNumber.length > 6) {
        row.invoiceNumber = row.invoiceNumber.slice(0, 6)
      }
    },
    saveRow (row) {
      if (!row.contractNo) {
        return this.$messageBox({ type: 'info', content: '请填写合同编号!' })
      }
      if (!row.contractName) {
        return this.$messageBox({ type: 'info', content: '请填写合同名称!' })
      }
      if (!row.contractAmt) {
        return this.$messageBox({ type: 'info', content: '请填写合同金额!' })
      }
      if (!row.signDate) {
        return this.$messageBox({
          type: 'info',
          content: '请填写合同签订日期!'
        })
      }
      if (!row.fileName) {
        return this.$messageBox({ type: 'info', content: '请上传附件!' })
      }
      let params = {
        ...row
      }
      //保存合同信息
      this.zjControl.offlineStatementMaintainContract(params).then(res => {
        //刷新当前贸易关系下的合同附件列表
        for (let i of this.form.contractList) {
          if (i.id === res.data.id) {
          }
        }

        this.$message.success('保存成功！')
        this.$refs.contractTable.clearActived()
      })
    },
    cancleRow (row) {
      this.$refs.contractList.clearActived()
    },
    //上传附件
    handleFileUpload (type, { file, data }, row) {
      let formData = new FormData()
      formData.append('file', file)
      this.$api.baseCommon
        .uploadFile(formData)
        .then(res => {
          data.row.fileId = res.data.fileId
          data.row.fileName = res.data.fileName
          this.$refs[type + 'Table'].validate(row)
          this.$message.success('上传成功!')
        })
        .catch(() => {
          this.$message.error('上传失败!')
        })
    },
    maintainSuccess () {
      this.goParent()
    },
    //检测是否正在编辑     tableRefList需要检测的table数组
    isTableEdit (type) {
      let key = true
      if (
        this.$refs[type + 'Table'] &&
        this.$refs[type + 'Table'].getActiveRecord()
      ) {
        key = false
      }
      if (!key) {
        this.$log.alert('请保存当前正在编辑的数据')
      }
      return key
    },
    handleAdd (type) {
      if (!this.isTableEdit(type)) {
        return
      }
      let defaultData = {
        contract: {
          contractType: this.form.contractList.some(
            item => item.contractType == '0'
          )
            ? '1'
            : '0',
          contractNo: '',
          contractName: '',
          contractAmt: '',
          signDate: '',
          fileName: '',
          fileId: ''
        },
        invoice: {
          invoiceType: '',
          invoiceNumber: '',
          invoiceCode: '',
          totalAmtLowcase: '',
          sellAmount: '',
          seller: '',
          buyer: '',
          invoiceDate: '',
          verifyCode: '',
          fileName: '',
          fileId: ''
        },
        other: {
          attachTheme: '',
          fileName: '',
          fileId: ''
        }
      }
      // this[type + 'Data'].push(defaultData[type])
      this.$refs[type + 'Table'].insertAt(defaultData[type], -1).then(res => {
        let newRow = res.row
        this.$refs[type + 'Table'].setActiveRow(newRow)
      })
    },
    downs (row) {
      let params = {
        fileId: row.fileId,
        fileUrl: row.fileId,
        fileName: row.fileName
      }
      this.$api.baseCommon.downloadFile(params)
    },
    edit (type, row) {
      if (!this.isTableEdit(type)) {
        return
      }
      this[type + 'Row'] = JSON.parse(JSON.stringify(row))
      // this.openBillApplyRow = JSON.parse(JSON.stringify(row))
      this.$refs[type + 'Table'].setActiveRow(row)
    },
    save (type, row) {
      this.$refs[type + 'Table']
        .validate(row)
        .then(() => {
          let saveType = {
            contract: {
              url: this.zjControl.offlineStatementMaintainContract,
              valueProp: 'contractInfo'
            },
            invoice: {
              url: this.zjControl.offlineStatementMaintainInvoice,
              valueProp: 'invoice'
            },
            other: {
              url: this.zjControl.offlineStatementMaintainOther,
              valueProp: 'otherAttach'
            }
          }
          let request = saveType[type].url
          request({
            acctId: this.rowData.id,
            [saveType[type].valueProp]: {
              ...row,
              operateType: row.id ? 'MOD' : 'ADD',
              ebillCode: this.rowData.ebillCode
            },
            ebillCode: this.rowData.ebillCode
          })
            .then(res => {
              this.$refs[type + 'Table'].clearActived()
              !row.id ? (row.id = res.data.id) : ''
              this.$message.success('保存成功!')
            })
            .catch(() => {})
        })
        .catch(err => {})
    },
    del (type, row) {
      let saveType = {
        contract: {
          url: this.zjControl.offlineStatementMaintainContract,
          valueProp: 'contractInfo'
        },
        invoice: {
          url: this.zjControl.offlineStatementMaintainInvoice,
          valueProp: 'invoice'
        },
        other: {
          url: this.zjControl.offlineStatementMaintainOther,
          valueProp: 'otherAttach'
        }
      }
      let request = saveType[type].url
      request({
        acctId: this.rowData.id || '',
        [saveType[type].valueProp]: {
          ...row,
          operateType: 'DEL',
          ebillCode: this.rowData.ebillCode
        },
        ebillCode: this.rowData.ebillCode
      })
        .then(res => {
          this.$refs[type + 'Table'].remove(row)
          this.$message.success('删除成功!')
        })
        .catch(() => {})
    }
  }
}
</script>

<style scoped lang="less">
/deep/.el-dialog__body {
  padding: 0 20px;
}
/deep/ .vxe-header--row .vxe-cell .vxe-cell--title {
  width: auto;
}
.vxe-cell .vxe-input {
  height: 30px;
}
.zj-table {
  .el-select,
  /deep/ .el-input {
    width: 100%;
  }
}
</style>
