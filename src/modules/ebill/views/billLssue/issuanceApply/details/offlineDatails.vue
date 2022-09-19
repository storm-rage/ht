<template>
  <div id="transactionQueryDetails">
    <ZjTopHeader>电子债权凭证签发申请</ZjTopHeader>
    <!-- 折叠面板 -->
    <el-collapse
      ref="elCollapse"
      v-model="collActive"
      v-loading="loading"
      class="zjcoll-noSelect"
    >
      <!-- 对账单信息 -->
      <el-collapse-item name="orderInfo" :disabled="true">
        <ZjHeader>签发债权凭证信息</ZjHeader>

        <el-row class="infoItem">
          <el-col :span="8">
            <label>签发人： </label>
            <span>{{ detailData.companyName }}</span>
          </el-col>
          <el-col :span="8">
            <label>签收企业： </label>
            <span>{{ detailData.supplierName }}</span>
          </el-col>
          <el-col :span="8">
            <label>对账单编号：</label>
            <span>{{ detailData.acctBillCode || '-' }}</span>
          </el-col>

          <el-col :span="8">
            <label>海诺单金额： </label>
            <span>{{ money(detailData.ebillAmt) }}</span>
          </el-col>
          <el-col :span="8">
            <label>海诺单到期日： </label>
            <span>{{ date(detailData.dueBillDate) || '-' }}</span>
          </el-col>
          <el-col :span="8">
            <label>备注：</label>
            <span>{{ detailData.voucherRemark || '-' }}</span>
          </el-col>
        </el-row>

        <h3 class="myTitles">收款银行账户</h3>
        <zj-table :dataList="bankAccountData" :pager="false">
          <zj-table-column field="bankAccname" title="收款账户户名" />
          <zj-table-column field="bankAccount" title="收款账号" />
          <zj-table-column field="bankNo" title="收款银行联行号" />
          <zj-table-column field="bankName" title="收款账户开户行" />
        </zj-table>
      </el-collapse-item>

      <el-collapse-item name="orderInfo" :disabled="true">
        <ZjHeader>贸易合同 </ZjHeader>
        <div>
          <el-button
            class="addBtns"
            type="primary"
            size="small"
            @click="handleAdd('contract')"
            >新增</el-button
          >
        </div>

        <zj-table
          ref="contractTable"
          :dataList="contractData"
          :pager="false"
          :editRules="contractEditRules"
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
            :edit-render="{
              name: 'select',
              immediate: true,
              autoselect: false,
              options: dictionary.contractType,
              optionProps: { value: 'code', label: 'desc' }
            }"
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
            :edit-render="{
              name: 'input',
              immediate: true
            }"
          >
            <template v-slot:edit="scope">
                <vxe-input
                  v-model="scope.row.contractAmt"
                  type="float"
                  digits="2"
                  :controls="false"
                  @change="$refs.contractTable.updateStatus(scope)"
                  style="width: 100%;"
                ></vxe-input>
            </template>
          </zj-table-column>
          <zj-table-column
            field="signDate"
            title="合同签订日期"
            :formatter="date"
            :edit-render="{
              name: 'input',
              immediate: true
            }"
          >
            <template v-slot:edit="scope">
                <zj-date-picker
                  class="table-date-picker"
                  :date.sync="scope.row.signDate"
                  @change="$refs.contractTable.updateStatus(scope)"
                />
            </template>
          </zj-table-column>
          <zj-table-column field="fileName" title="附件" />
          <zj-table-column title="操作" width="200" fixed="right">
            <template v-slot="{ row, rowIndex }">
              <template v-if="!$refs.contractTable.isActiveByRow(row)">
                <zj-button type="text" @click="edit('contract', row)"
                  >修改</zj-button
                >
                <zj-button type="text" @click="downs(row)">下载</zj-button>
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
      </el-collapse-item>

      <el-collapse-item name="orderInfo" :disabled="true">
        <ZjHeader>发票信息 </ZjHeader>
        <div>
          <el-button
            class="addBtns"
            type="primary"
            size="small"
            @click="handleAdd('bill')"
            >新增</el-button
          >
        </div>
        <zj-table
          ref="billTable"
          :dataList="billData"
          :editRules="billEditRules"
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
                @change="$refs.billTable.updateStatus(scope)"
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
                @change="$refs.billTable.updateStatus(scope)"
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
                @change="$refs.billTable.updateStatus(scope)"
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
                @change="$refs.billTable.updateStatus(scope)"
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
                @change="$refs.billTable.updateStatus(scope)"
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
              <template v-if="!$refs.billTable.isActiveByRow(row)">
                <zj-button type="text" @click="edit('bill', row)"
                  >修改</zj-button
                >
                <zj-button type="text" @click="downs(row)">下载</zj-button>
              </template>
              <template v-if="$refs.billTable.isActiveByRow(row)">
                <zj-button type="text" @click="save('bill', row, rowIndex)"
                  >保存</zj-button
                >
                <!-- <zj-button
                  type="text"
                  @click="cancel('bill', row, rowIndex)"
                  >取消</zj-button
                > -->
                <zj-upload
                  class="zj-inline"
                  :httpRequest="params => handleFileUpload('bill', params)"
                  :data="{ row }"
                >
                  <zj-button slot="trigger" type="text">上传</zj-button>
                </zj-upload>
              </template>
              <zj-button type="text" @click="del('bill', row)">删除</zj-button>
            </template>
          </zj-table-column>
        </zj-table>
      </el-collapse-item>

      <!-- 对账单明细 -->
      <el-collapse-item name="orderInfo" :disabled="true">
        <ZjHeader>其他附件 </ZjHeader>
        <div>
          <el-button
            class="addBtns"
            type="primary"
            size="small"
            @click="handleAdd('other')"
            >新增</el-button
          >
        </div>
        <zj-table
          ref="otherTable"
          :dataList="otherData"
          :pager="false"
          :editRules="{attachTheme: [{ required: true, message: '不能为空', trigger: 'change' }]}"
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
                <zj-button type="text" @click="downs(row)">下载</zj-button>
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
      </el-collapse-item>
    </el-collapse>
    <ZjContentFooter>
      <zj-button type="primary" @click="onConfirm">保存</zj-button>
      <zj-button class="back" @click="handleBack" :api="zjBtn.passBillSignBatch"
        >返回</zj-button
      ></ZjContentFooter
    >
  </div>
</template>
<script>
export default {
  data () {
    return {
      loading: false,
      zjControl: {
        getOpenBillDictionary: this.$api.openBillApply.getOpenBillDictionary, // 字典
        accountOfflineAttach: this.$api.openBillApply.accountOfflineAttach, //线上对账单-详情
        maintainContract: this.$api.openBillApply.maintainContract, // 贸易合同新增、编辑、删除
        maintainInvoice: this.$api.openBillApply.maintainInvoice, // 发票信息新增、编辑、删除
        maintainOther: this.$api.openBillApply.maintainOther // 其他附件新增、编辑、删除
      },
      collActive: ['orderInfo'],
      checked: false,
      detailData: {},
      bankAccountData: [], // 银行账户表格数据
      contractData: [], // 合同表格数据
      contractRow: {}, // 当前编辑的合同表格行
      billData: [], // 发票表格数据
      billRow: {},
      contractEditRules: {
        contractNo: [{ required: true, message: '不能为空', trigger: 'change' }],
        contractName: [{ required: true, message: '不能为空', trigger: 'change' }],
        contractAmt: [{ required: true, message: '不能为空', trigger: 'change' }],
        signDate: [{ required: true, message: '不能为空', trigger: 'change' }]
      },
      billEditRules: {
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
      },
      otherData: [], // 其他表格数据
      otherRow: {},
      dictionary: {
        contractType: [
          { desc: '', code: '' },
          { desc: '主合同', code: '0' },
          { desc: '补充合同', code: '1' }
        ],
        invoiceType: []
      }
    }
  },
  created () {
    this.getDictionary()
  },
  activated () {
    this.getDetail()
  },
  methods: {
    getDictionary () {
      this.zjControl.getOpenBillDictionary().then(res => {
        this.dictionary = Object.assign({}, this.dictionary, res.data)
      })
    },
    handleBack () {
      this.$store.commit('tab/tabDel', this.$route)
      this.$router.push('/openBillApply')
    },
    handleAdd (type) {
      let defaultData = {
        contract: {
          contractType: this.contractData.some(
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
        bill: {
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
    edit (type, row) {
      if (!this.isTableEdit(type)) {
        return
      }
      this[type + 'Row'] = JSON.parse(JSON.stringify(row))
      // this.openBillApplyRow = JSON.parse(JSON.stringify(row))
      this.$refs[type + 'Table'].setActiveRow(row)
    },
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
    save (type, row) {
      this.$refs[type + 'Table']
        .validate(row)
        .then(() => {
          let saveType = {
            contract: {
              url: this.zjControl.maintainContract,
              valueProp: 'contractInfo'
            },
            bill: {
              url: this.zjControl.maintainInvoice,
              valueProp: 'invoice'
            },
            other: {
              url: this.zjControl.maintainOther,
              valueProp: 'otherAttach'
            }
          }
          let request = saveType[type].url
          request({
            acctId: this.row.id,
            [saveType[type].valueProp]: {
              ...row,
              operateType: row.id ? 'MOD' : 'ADD',
              ebillCode: this.detailData.ebillCode
            }
          })
            .then(res => {
              this.$refs[type + 'Table'].clearActived()
              !row.id ? (row.id = res.data.id) : ''
              this.$message.success('保存成功!')
              return Promise.resolve(res)
            })
            .catch(() => {
              return Promise.reject(err)
            })
        })
        .catch(err => {
          return Promise.reject(err)
        })
    },
    cancel (type, row) {
      row = JSON.parse(JSON.stringify(this[type + 'Row']))
    },
    del (type, row) {
      if(!row.id) return this.$refs[type + 'Table'].remove(row)
      let saveType = {
        contract: {
          url: this.zjControl.maintainContract,
          valueProp: 'contractInfo'
        },
        bill: {
          url: this.zjControl.maintainInvoice,
          valueProp: 'invoice'
        },
        other: {
          url: this.zjControl.maintainOther,
          valueProp: 'otherAttach'
        }
      }
      let request = saveType[type].url
      request({
        acctId: this.row.id,
        [saveType[type].valueProp]: {
          ...row,
          operateType: 'DEL',
          ebillCode: this.detailData.ebillCode
        }
      })
        .then(res => {
          this.$refs[type + 'Table'].remove(row)
          this.$message.success('删除成功!')
        })
        .catch(() => {})
    },
    getDetail () {
      this.getRow() // 获取rouer的params传值
      this.loading = true
      this.zjControl
        .accountOfflineAttach({ id: this.row.id })
        .then(res => {
          if (res.code === 200) {
            this.detailData = res.data || {}
            this.bankAccountData = [
              {
                bankAccname: this.detailData.bankAccname,
                bankAccount: this.detailData.bankAccount,
                bankNo: this.detailData.bankNo,
                bankName: this.detailData.bankName
              }
            ]
            this.contractData = res.data.contractInfoList || []
            this.billData = res.data.invoiceInfoList || []
            this.otherData = res.data.otherAttachInfoList || []
            this.loading = false
          }
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
    onConfirm() {
      let types = ['contract','bill','other']
      let prosimeAll =  types.map((type,index)=>{
        return new Promise((resolve,reject)=>{
          let tableActiveRow = this.$refs[type+'Table'] && this.$refs[type+'Table'].getActiveRecord()
          if(tableActiveRow) {
            // 有未保存的数据，未保存的数据是否必填完
            this.$refs[type + 'Table']
              .validate(tableActiveRow.row)
              .then(()=>{
                // this.save(type, tableActiveRow.row).then(res=>{
                //   resolve(res)
                // })
                resolve({type, row: tableActiveRow.row})
              })
              .catch(()=>{
                reject()
              })
          } else {
            resolve()
          }
        })
      })
      Promise.all(prosimeAll).then((res)=>{
        // window.console.log('res', res);
        res.map(item=>item&&this.save(item.type, item.row))
        // this.cancel()
      }).catch((err)=>{
        // window.console.log('err',err);
      })
    }
  }
}
</script>
<style lang="less" scoped>
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
.zj-table /deep/ .vxe-input {
  line-height: 2.5;
}
#transactionQueryDetails {
  padding: 20px 0;

  h3.myTitles {
    padding: 0 10px;
  }
  .infoItem {
    padding: 0 10px;
  }
  .addBtns {
    margin: 0 20px 10px;
    width: 110px;
    background: #169bd5;
    border-color: #169bd5;
    i {
      color: #165dff;
      font-size: 14px;
    }
    span {
      color: #165dff;
      font-size: 14px;
      margin-left: 4px;
    }
  }
}

/deep/#ZjWorkflow {
  .workflow-top {
    .el-row {
      padding: 5px 0 0;
      text-align: center;
    }
  }
  .workflow-bottom {
    .right {
      width: 100%;
      text-align: center;
    }
  }
}
</style>
