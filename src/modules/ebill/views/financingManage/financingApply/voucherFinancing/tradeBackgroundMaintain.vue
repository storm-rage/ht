<template>
  <zj-content-container>
    <!--  融资企业与签发企业/转让企业的贸易背景  -->
    <zj-content>
      <zj-top-header title="融资企业与签发企业/转让企业的贸易背景"/>
      <zj-content-block>
        <zj-header title="凭证信息"/>
        <zj-table ref="ebBillTable"
                  :dataList="form.ebBillModelList"
                  @radio-change="handleRadioChange"
                  :radio-config="{highlight: true}"
                  :pager="false"
        >
          <zj-table-column type="radio" width="40"/>
          <zj-table-column field="rootCode" title="原始海e单编号"/>
          <zj-table-column field="ebillCode" title="海e单编号"/>
          <zj-table-column field="writerName" title="凭证签发人"/>
          <zj-table-column field="transferName" title="转让企业"/>
          <zj-table-column field="ebillAmt" title="海e单金额" :formatter="money"/>
          <zj-table-column field="holderDate" title="凭证持有日期" :formatter="date"/>
          <zj-table-column field="expireDate" title="海e单到期日" :formatter="date"/>
        </zj-table>
      </zj-content-block>
      <!--    贸易合同    -->
      <zj-content-block>
        <zj-header title="贸易合同信息"/>
        <zj-button type="primary" icon="el-icon-circle-plus-outline" @click="addContract">新增</zj-button>
        <zj-table ref="contractTable"
                  :dataList="form.contractList"
                  keep-source
                  :edit-config="{trigger: 'manual', mode: 'row', icon:'-', autoClear: false,showStatus: true}"
                  :pager="false"
        >
          <zj-table-column field="contractType" title="合同类型" :formatter="obj=>typeMap(dictionary.contractTypeList,obj.cellValue)"/>
          <zj-table-column field="contractNo" title="贸易合同编号" :edit-render="{name: '$input'}"/>
          <zj-table-column field="contractName" title="贸易合同名称" :edit-render="{name: '$input'}"/>
          <zj-table-column field="contractAmt" title="合同金额" :formatter="money" :edit-render="{name: '$input'}"/>
          <zj-table-column field="signDate" title="合同签订日期" :formatter="date" :edit-render="{name: '$input'}"/>
          <zj-table-column field="fileName" title="附件"  :edit-render="{name: '$input'}"/>
          <zj-table-column title="操作" fixed="right" width="280">
            <template v-slot="{row}">
              <template v-if="$refs.contractTable.isActiveByRow(row)">
                <zj-upload class="zj-inline" :httpRequest="uploadContractAtta" :data="{ row }">
                  <zj-button slot="trigger" type="text" :api="zjBtn.uploadFile">上传</zj-button>
                </zj-upload>
                <zj-button type="text" @click="saveRow(row)">保存</zj-button>
                <zj-button type="text" @click="cancleRow(row)">取消</zj-button>
              </template>
              <template v-if="!$refs.contractTable.isActiveByRow(row)">
                <zj-button type="text" @click="modifyContract(row)">修改</zj-button>
              </template>

              <zj-button type="text" @click="downloadContract(row)">下载</zj-button>
              <zj-button type="text" @click="deleteContract(row)">删除</zj-button>
            </template>
          </zj-table-column>
        </zj-table>
        <!--    发票信息    -->
      </zj-content-block>
      <zj-content-block>
        <zj-header title="发票信息"/>
        <zj-button type="primary" icon="el-icon-circle-plus-outline" @click="addInvoice">新增发票</zj-button>
        <zj-table ref="invoiceTable"
                  :dataList="form.invoiceList"
                  keep-source
                  :edit-config="{trigger: 'manual', mode: 'row', icon:'-', autoClear: false,showStatus: true}"
                  :pager="false"
        >
          <zj-table-column field="invoiceType" title="发票类型" :edit-render="{name: '$input'}"/>
          <zj-table-column field="invoiceNumber" title="发票号码" :edit-render="{name: '$input'}"/>
          <zj-table-column field="invoiceCode" title="发票代码" :edit-render="{name: '$input'}"/>
          <zj-table-column field="field5" title="发票金额（含税）" :edit-render="{name: '$input'}" :formatter="money"/>
          <zj-table-column field="field5" title="发票金额（不含税）" :edit-render="{name: '$input'}" :formatter="money"/>
          <zj-table-column field="field5" title="销售方" :edit-render="{name: '$input'}"/>
          <zj-table-column field="field5" title="购买方" :edit-render="{name: '$input'}"/>
          <zj-table-column field="invoiceDate" title="发票日期" :edit-render="{name: '$input'}" :formatter="date"/>
          <zj-table-column field="verifyCode" title="校验码（后6位）" :edit-render="{name: '$input'}"/>
          <zj-table-column field="fileName" title="附件名称" :edit-render="{name: '$input'}"/>
          <zj-table-column title="操作" fixed="right" width="200">
            <template v-slot="{row}">
              <template v-if="$refs.invoiceTable.isActiveByRow(row)">
                <zj-upload class="zj-inline" :httpRequest="uploadContractAtta" :data="{ row }">
                  <zj-button slot="trigger" type="text" :api="zjBtn.uploadFile">上传</zj-button>
                </zj-upload>
                <zj-button type="text" @click="saveContract(row)">保存</zj-button>
                <zj-button type="text" @click="cancel(row)">取消</zj-button>
              </template>
              <template v-if="!$refs.invoiceTable.isActiveByRow(row)">
                <zj-button type="text" @click="modifyContract(row)">修改</zj-button>
              </template>
              <zj-button type="text" @click="downloadContract(row)">下载</zj-button>
              <zj-button type="text" @click="deleteContract(row)">删除</zj-button>
            </template>
          </zj-table-column>
        </zj-table>
        <el-row>
          发票金额（含税）合计：{{ form.totalAmount }}元
        </el-row>
      </zj-content-block>
      <!--    其他附件    -->
      <zj-content-block>
        <zj-header title="其他附件"/>
        <zj-button type="primary" icon="el-icon-circle-plus-outline" @click="addAtta">新增</zj-button>
        <zj-table ref="otherAttachTable"
                  :dataList="form.otherAttachList"
                  keep-source
                  :edit-config="{trigger: 'manual', mode: 'row', icon:'-', autoClear: false,showStatus: true}"
                  :pager="false"
        >
          <zj-table-column type="seq" title="序号"/>
          <zj-table-column field="field2" title="说明"/>
          <zj-table-column field="field3" title="附件名称"/>
          <zj-table-column title="操作" fixed="right">
            <template v-slot="{row}">
              <zj-button type="text" @click="downloadContract(row)">下载</zj-button>

              <template v-if="$refs.otherAttachTable.isActiveByRow(row)">
                <zj-button type="text" @click="saveContract(row)">保存</zj-button>
                <zj-button type="text" @click="cancel(row)">取消</zj-button>
              </template>
              <template v-if="!$refs.otherAttachTable.isActiveByRow(row)">
                <zj-button type="text" @click="modifyContract(row)">修改</zj-button>
              </template>
              <zj-button type="text" @click="deleteContract(row)">删除</zj-button>
            </template>
          </zj-table-column>
        </zj-table>
      </zj-content-block>

    </zj-content>
    <zj-content-footer>
      <zj-button type="primary" @click="maintainSuccess">维护完成</zj-button>
      <zj-button class="submit-button" @click="goParent">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      zjControl: {
        getDictionary:this.$api.financingApply.getDictionary,//获取数据字典
        getTradeBackgroundInfo:this.$api.financingApply.getTradeBackgroundInfo,//贸易背景管理-获取详情
        maintainContract:this.$api.financingApply.maintainContract,//贸易背景管理-合同维护
        maintainInvoice:this.$api.financingApply.maintainInvoice,//贸易背景管理-发票维护
        maintainOtherAttach:this.$api.financingApply.maintainOtherAttach,//贸易背景管理-其它附件维护
        uploadMaintainFile:this.$api.financingApply.uploadMaintainFile,//贸易背景管理-附件上传

      },
      form: {
        contractList: [],
        invoiceList: [],
        otherAttachList: [],
      },
      dictionary: {},
      list: [
        {
          field1: 'scm00001',
          field2: '某某产品一号',
          field3: '上游',
          field4: '订单保理',
          field5: '2022.09.08',
          state: '生效',
          fileName: '是'
        }
      ],
      tradeList: []
    };
  },
  methods: {
    getDic() {
      this.zjControl.getDictionary().then(res=>{
        this.dictionary = res.data
      })
    },
    getDetail() {

    },
    handleDataChange(rows) {
      //默认勾选第一个凭证信息
      if (rows&& rows.length) {
        this.$refs.ebBillTable.setRadioRow(rows[0])
        this.handleRadioChange({row: rows[0]})
      }
    },
    handleRadioChange({row}) {
      let params = {
        id : row.billTraceId,//融单轨迹主键ID
      }
      //获取合同列表，发票列表，附件列表
      this.zjControl.getTradeBackgroundInfo(params).then(res=>{
        this.form = res.data
      })
    },
    addContract() {
      if(!this.tableEditReport(["contractTable"])){return}
      console.log('addContract...')
      //检测是否存在主合同
      let flag = this.form.contractList.some(item=>{item.contractType === '0'})
      let item = {contractType:flag ? '1' : '0', contractNo:'', contractName:'', contractAmt:'', signDate:'', fileName:''}
      this.form.contractList.push(item)
      this.$refs.contractTable.setActiveRow(item)

    },
    saveRow(row) {
      if(!row.contractNo){ return this.$messageBox({type:'info',content:'请填写合同编号!'}) }
      if(!row.contractName){ return this.$messageBox({type:'info',content:'请填写合同名称!'}) }
      if(!row.contractAmt){ return this.$messageBox({type:'info',content:'请填写合同金额!'}) }
      if(!row.signDate){ return this.$messageBox({type:'info',content:'请填写合同签订日期!'}) }
      if(!row.fileName){ return this.$messageBox({type:'info',content:'请上传附件!'}) }
      let params = {
        ...row
      }
      //保存合同信息
      this.zjControl.maintainContract(params).then(res => {
        //刷新当前贸易关系下的合同附件列表
        this.handleRadioChange(res.data)
        for(let i of this.form.contractList) {
          if(i.id === res.data.id) {

          }
        }

        this.$message.success('保存成功！')
        this.$refs.contractTable.clearActived()
      })
    },
    cancleRow(row) {
      this.contractInfoList.splice(row.index,1)
      this.$refs.contractList.clearActived()
    },
    addInvoice() {
      if(!this.tableEditReport(["invoiceTable"])){return}
      console.log('addInvoice...')
      //新增一条发票信息
      let item = {attachId:'', fileId:'', fileName:'', fileRemark:'',}
      this.form.invoiceList.push(item)
      this.$refs.invoiceTable.setActiveRow(item)

    },
    //上传附件
    handleFileUpload({file,data}){
      let formData = new FormData()
      formData.append('file',file)
      this.zjControl.uploadFile(formData).then(res => {
        data.row.fileId = res.data.fileId
        data.row.fileName = res.data.fileName
        this.$message.success('附件上传成功!')
      })
    },
    addAtta() {

    },
    download(){},
    maintainSuccess() {
      this.goParent()
    },
    //检测是否正在编辑     tableRefList需要检测的table数组
    tableEditReport(tableRefList){
      let key = true
      tableRefList.forEach(item => {
        if(this.$refs[item] && this.$refs[item].getActiveRecord()){
          key = false
        }
      })
      if(!key){
        this.$log.alert('请保存当前正在编辑的数据')
        return false
      }else{
        return true
      }
    },
  },
  created() {
    this.getApi()
    this.getDic()
    this.form.ebBillModelList = this.$route.params.rowData.ebBillModelList//获取凭证信息列表
    console.log(this.$route.params.rowData.ebBillModelList)
  }
};
</script>
<style lang="less" scoped>

</style>
