<template>
  <zj-content-container>
    <!--  融资企业与签发企业/转让企业的贸易背景  -->
    <zj-content>
      <zj-top-header title="融资企业与签发企业/转让企业的贸易背景"/>
      <zj-content-block>
        <zj-header title="凭证信息"/>
        <zj-table ref="ebBillTable"
                  :dataList="ebBillModelList"
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
          <zj-table-column field="contractType" title="合同类型" :formatter="obj=>typeMap(dictionary.contractType,obj.cellValue)"/>
          <zj-table-column field="contractNo" title="贸易合同编号" :edit-render="{name: '$input'}"/>
          <zj-table-column field="contractName" title="贸易合同名称" :edit-render="{name: '$input'}"/>
          <zj-table-column field="contractAmt" title="合同金额" :formatter="money" :edit-render="{name: '$input'}"/>
          <zj-table-column field="signDate" title="合同签订日期" :formatter="date" :edit-render="{name: '$input', props: {type:'date',editable:false}}">
            <template v-slot="{row}">
              <span>{{date(row.signDate)}}</span>
            </template>
          </zj-table-column>
          <zj-table-column field="fileName" title="附件"/>
          <zj-table-column title="操作" fixed="right" width="280">
            <template v-slot="{row,rowIndex}">
              <template v-if="$refs.contractTable.isActiveByRow(row)">
                <zj-upload class="zj-inline" :httpRequest="handleFileUpload" :data="{ row, bizType:'contract' }">
                  <zj-button slot="trigger" type="text" >上传</zj-button>
                </zj-upload>
                <zj-button type="text" @click="saveContract(row,rowIndex)">保存</zj-button>
                <zj-button type="text" @click="cancelContract(row,rowIndex)">取消</zj-button>
              </template>
              <template v-else>
                <zj-button type="text" @click="modifyContract('contractTable',row)">修改</zj-button>
                <zj-button type="text" @click="downloadFile(row)">下载</zj-button>
                <zj-button type="text" @click="deleteContract(row)">删除</zj-button>
              </template>
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
          <zj-table-column field="invoiceType" title="发票类型" :edit-render="{name: '$select', options: dictionary.invoiceType, props: {}}"/>
          <zj-table-column field="invoiceNumber" title="发票号码" :edit-render="{name: '$input'}"/>
          <zj-table-column field="invoiceCode" title="发票代码" :edit-render="{name: '$input'}"/>
          <zj-table-column field="totalAmtLowcase" title="发票金额（含税）" :edit-render="{name: '$input'}" :formatter="money"/>
          <zj-table-column field="sellAmount" title="发票金额（不含税）" :edit-render="{name: '$input'}" :formatter="money"/>
          <zj-table-column field="seller" title="销售方" :edit-render="{name: '$input'}"/>
          <zj-table-column field="buyer" title="购买方" :edit-render="{name: '$input'}"/>
          <zj-table-column field="invoiceDate" title="发票日期" :edit-render="{name: '$input'}" :formatter="date"/>
          <zj-table-column field="verifyCode" title="校验码（后6位）" :edit-render="{name: '$input'}"/>
          <zj-table-column field="fileName" title="附件名称" :edit-render="{name: '$input'}"/>
          <zj-table-column title="操作" fixed="right" width="280">
            <template v-slot="{row,rowIndex}">
              <template v-if="$refs.invoiceTable.isActiveByRow(row)">
                <zj-upload class="zj-inline" :httpRequest="handleFileUpload" :data="{ row, bizType:'invoice' }">
                  <zj-button slot="trigger" type="text" :api="zjBtn.uploadMaintainFile">上传</zj-button>
                </zj-upload>
                <zj-button type="text" @click="saveInvoice(row,rowIndex)">保存</zj-button>
                <zj-button type="text" @click="cancleInvoice(row,rowIndex)">取消</zj-button>
              </template>
              <template v-if="!$refs.invoiceTable.isActiveByRow(row)">
                <zj-button type="text" @click="modifyInvoice('invoiceTable',row)">修改</zj-button>
                <zj-button type="text" @click="downloadFile(row)">下载</zj-button>
                <zj-button type="text" @click="deleteInvoice(row)">删除</zj-button>
              </template>
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
        <zj-button type="primary" icon="el-icon-circle-plus-outline" @click="addAttach">新增</zj-button>
        <zj-table ref="otherAttachTable"
                  :dataList="form.otherAttachList"
                  keep-source
                  :edit-config="{trigger: 'manual', mode: 'row', icon:'-', autoClear: false,showStatus: true}"
                  :pager="false"
        >
          <zj-table-column type="seq" title="序号"/>
          <zj-table-column field="attachTheme" title="说明" :edit-render="{name: '$input'}"/>
          <zj-table-column field="fileName" title="附件名称"/>
          <zj-table-column title="操作" fixed="right" width="280">
            <template v-slot="{row}">
              <zj-button type="text" @click="downloadFile(row)">下载</zj-button>

              <template v-if="$refs.otherAttachTable.isActiveByRow(row)">
                <zj-button type="text" @click="saveAttach(row)">保存</zj-button>
                <zj-button type="text" @click="cancleAttach(row)">取消</zj-button>
              </template>
              <template v-if="!$refs.otherAttachTable.isActiveByRow(row)">
                <zj-button type="text" @click="modifyContract('otherAttachTable')">修改</zj-button>
              </template>
              <zj-button type="text" @click="deleteAttach(row)">删除</zj-button>
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
import tableMixins from "@common/mixins/tableMixins";
export default {
  name: 'tradeBackgroundMaintain',
  mixins: [tableMixins],
  components: {},
  data() {
    return {
      zjControl: {
        getTradeBackDictionary:this.$api.financingApply.getTradeBackDictionary,//获取数据字典
        getTradeBackgroundInfo:this.$api.financingApply.getTradeBackgroundInfo,//贸易背景管理-获取详情
        maintainContract:this.$api.financingApply.maintainContract,//贸易背景管理-合同维护
        maintainInvoice:this.$api.financingApply.maintainInvoice,//贸易背景管理-发票维护
        maintainOtherAttach:this.$api.financingApply.maintainOtherAttach,//贸易背景管理-其它附件维护
        uploadMaintainFile:this.$api.financingApply.uploadMaintainFile,//贸易背景管理-附件上传
        downloadFile:this.$api.baseCommon.downloadFile,
      },
      form: {
        contractList: [],
        invoiceList: [],
        otherAttachList: [],
      },
      ebBillModelList:[],
      dictionary: {},
      tradeList: [],
      oldRowInfo: {},
    };
  },
  methods: {
    getDic() {
      this.zjControl.getTradeBackDictionary().then(res=>{
        //合同类型字段转换
        // res.data.contractType = JSON.parse(
        //   JSON.stringify(res.data.contractType).replace(/code/g,'status').replace(/desc/g,'label')
        // )
        //发票类型字段转换
        // res.data.invoiceType = JSON.parse(
        //   JSON.stringify(res.data.invoiceType).replace(/code/g,'status').replace(/desc/g,'label')
        // )
        this.dictionary = res.data
      })
    },
    handleDataChange(rows) {
      //默认勾选第一个凭证信息
      if (rows&& rows.length) {
        this.$refs.ebBillTable.setRadioRow(rows[0])
        this.handleRadioChange({row: rows[0]})
      }
    },
    handleRadioChange({row}) {
      this.billTraceId = row.billTraceId//存放到本地
      let params = {
        id : row.billTraceId,//融单轨迹主键ID
      }
      //获取合同列表，发票列表，附件列表
      this.zjControl.getTradeBackgroundInfo(params).then(res=>{
        this.form = res.data
      })
    },
    /**
     * 合同维护
     */
    addContract() {
      if(!this.tableEditReport(["contractTable","invoiceTable","otherAttachTable"])){return}
      console.log('addContract...')
      //检测是否存在主合同
      let flag = this.form.contractList.some(item=>{item.contractType === '0'})
      let item = {contractType:flag ? '1' : '0', contractNo:'', contractName:'', contractAmt:'', signDate:'', fileName:''}
      this.form.contractList.push(item)
      this.$refs.contractTable.setActiveRow(item)
    },
    //上传附件
    handleFileUpload({file,data}){
      let formData = new FormData()
      if(data.row.id) {
        formData.append('bizId',data.row.id)//业务类型对应的主键id（未保存前上传文件不需要）：发票id、合同id、其他附件id
      }
      formData.append('bizType',data.bizType)//业务类型：invoice-发票文件 contract-合同文件 attach-其他附件文件
      formData.append('fileOB',file)
      console.log(formData)
      this.zjControl.uploadMaintainFile(formData).then(res => {
        data.row.fileId = res.data.fileId
        data.row.fileName = res.data.fileName
        this.$message.success('附件上传成功!')
      })
    },
    saveContract(row,rowIndex) {
      //合同信息校验
      //************
      let key1 = this.tableLengthVali(row, 'contractNo',100,'合同编号',true)
      if(!key1){return}
      let key2 = this.tableLengthVali(row, 'contractName',100,'合同名称',true)
      if(!key2){return}
      // if(!row.contractNo){ return this.$messageBox({type:'info',content:'请填写合同编号!'}) }
      // if(!row.contractName){ return this.$messageBox({type:'info',content:'请填写合同名称!'}) }
      let key3 = this.tableMoneyVali(row.contractAmt, '合同金额',true)
      if(!key3){return}
      // if(!row.contractAmt){ return this.$messageBox({type:'info',content:'请填写合同金额!'}) }
      if(!row.signDate){ return this.$messageBox({type:'info',content:'请填写合同签订日期!'}) }
      if(!row.fileName){ return this.$messageBox({type:'info',content:'请上传附件!'}) }
      let params = {
        contract: {
          ...row,
          operateType: row.id ? 'MOD' : 'ADD',//ADD-新增 MOD-修改 DEL-删除 UP-上传
          busType: '',//合同业务类型：GC-工程、LW-劳务、SD-水电、ZS-装饰、ZL-租赁、QT-其他
          ebillCode: '',//融单编号
          id: row.id,
        },
        id: this.billTraceId,//业务ID：应付账款id/资料维护id/融单轨迹id
      }
      //保存合同信息
      this.zjControl.maintainContract(params).then(res => {
        let index = this.tableFindIndex('form','contractList',row)
        if(typeof(res.data) === 'object' && res.data !== null && res.data.contract !== null) {
          this.form.contractAmtTemp = res.data.contractAmt
          this.form.contractList.splice(index,1,res.data)
        } else {
          //刷新当前凭证信息下的合同、发票、附件列表
          this.handleRadioChange({...res.data})
        }
        this.$refs.contractTable.clearActived()
        this.$message.success('保存成功！')

      })
    },
    //修改合同信息
    modifyContract(table,row) {
      if(!this.tableEditReport(["contractTable","invoiceTable","otherAttachTable"])){return}
      console.log('modify...')
      this.oldRowInfo = Object.assign({},row)
      this.$refs[table].setActiveRow()
    },
    //取消合同信息修改保存
    cancelContract(row,rowIndex) {
      if(row.fileId) {
        this.form.contractList.splice(rowIndex,1,this.oldRowInfo)
      }else {
        this.form.contractList.splice(rowIndex,1)
      }
      this.$refs.contractTable.clearActived()
    },
    //删除合同信息
    deleteContract(row) {
      if(!this.tableEditReport(["contractTable","invoiceTable","otherAttachTable"])){return}
      this.$messageBox({
        type:'confirm',
        title:'删除确认',
        content:row.contractNo ?
          `您确认删除 合同编号为${row.contractNo}的${this.typeMap(this.dictionary.contractType,row.contractType)}吗?` :
          `您确认删除该${this.typeMap(this.dictionary.contractType,row.contractType)}吗?`,
        showCancelButton:true,
        messageResolve:()=>{
          //更新合同列表
          let params = {
            contract: {
              ...row,
              operateType: 'DEL',//ADD-新增 MOD-修改 DEL-删除 UP-上传
              busType: '',//合同业务类型：GC-工程、LW-劳务、SD-水电、ZS-装饰、ZL-租赁、QT-其他
              ebillCode: '',//融单编号
              id: row.id,
            },
            id: '',//业务ID：应付账款id/资料维护id/融单轨迹id
          }
          this.zjControl.maintainContract(params).then(res=>{
            this.form.contractList.splice(row.index,1)//删除当前行的合同信息

            this.handleRadioChange({...res.data})
            this.$message.success('删除合同信息成功！')
          })
        }
      })
    },
    //下载附件
    downloadFile(row) {
      this.zjControl.downloadFile({
        fileUrl:row.fileId,
        fileName:row.fileName,
      })
    },
    /**
     * 发票维护
     */
    //新增发票信息
    addInvoice() {
      if(!this.tableEditReport(["contractTable","invoiceTable","otherAttachTable"])){return}
      console.log('addInvoice...')
      //新增一条发票信息
      let item = {invoiceType:'', invoiceNumber:'', invoiceCode:'', totalAmtLowcase:'',sellAmount:'',seller:'',buyer:'',invoiceDate:'',verifyCode:'',fileName:''}
      this.form.invoiceList.push(item)
      this.$refs.invoiceTable.setActiveRow(item)
    },
    //保存发票信息
    saveInvoice(row) {
      if(!row.invoiceType){ return this.$messageBox({type:'info',content:'请选择发票类型!'}) }
      if(!row.invoiceNumber){ return this.$messageBox({type:'info',content:'请填写发票号码!'}) }
      if(!row.invoiceCode){ return this.$messageBox({type:'info',content:'请填写发票代码!'}) }
      if(!row.totalAmtLowcase){ return this.$messageBox({type:'info',content:'请填写发票金额（含税）!'}) }
      if(!row.sellAmount){ return this.$messageBox({type:'info',content:'请填写发票金额（不含税）!'}) }
      if(!row.invoiceDate){ return this.$messageBox({type:'info',content:'请填写发票日期!'}) }
      if(!row.verifyCode){ return this.$messageBox({type:'info',content:'请填写校验码!'}) }
      let params = {
        invoice: {
          ...row,
          operateType: row.id ? 'MOD' : 'ADD',//ADD-新增 MOD-修改 DEL-删除 UP-上传
          busType: '',//合同业务类型：GC-工程、LW-劳务、SD-水电、ZS-装饰、ZL-租赁、QT-其他
          ebillCode: '',//融单编号
          id: row.id,
        },
        id: this.billTraceId,//业务ID：资料维护id/融单轨迹id
      }
      //保存合同信息
      this.zjControl.maintainInvoice(params).then(res => {
        //let index = this.tableFindIndex('form','invoiceList',row)
        // if(typeof(res.data) === 'object' && res.data !== null && res.data.contract !== null) {
        //   this.form.contractAmtTemp = res.data.contractAmt
        //   this.form.invoiceList.splice(index,1,res.data)
        // } else {
          //刷新当前凭证信息下的合同、发票、附件列表
          this.handleRadioChange({...res.data})
        // }
        this.$refs.invoiceTable.clearActived()
        this.$refs.invoiceTable.refreshScroll()
        this.$message.success('保存成功！')
      })
    },
    modifyInvoice(table) {
      if(!this.tableEditReport(["contractTable","invoiceTable","otherAttachTable"])){return}
      console.log('modify')
      this.$refs[table].setActiveRow()
    },
    //取消发票保存
    cancleInvoice(row) {
      this.form.invoiceList.splice(row.index,1)
      this.$refs.invoiceTable.clearActived()
    },
    //删除发票信息
    deleteInvoice(row) {
      this.form.invoiceList.splice(row.index,1)//删除当前行的发票信息
      //更新发票列表
      let params = {
        invoice: {
          ...row,
          operateType: 'DEL',//ADD-新增 MOD-修改 DEL-删除 UP-上传
          busType: '',//合同业务类型：GC-工程、LW-劳务、SD-水电、ZS-装饰、ZL-租赁、QT-其他
          ebillCode: '',//融单编号
          id: row.id,
        },
        id: '',//业务ID：资料维护id/融单轨迹id
      }
      this.zjControl.maintainInvoice(params).then(res=>{
        this.handleRadioChange({...res.data})
        this.$message.success('删除发票信息成功！')
      })
    },
    /**
     * 附件维护
     */
    //新增附件
    addAttach() {
      if(!this.tableEditReport(["contractTable","invoiceTable","otherAttachTable"])){return}
      console.log('saveAttach...')
      //新增一条发票信息
      let item = {attachTheme:'', fileName:'',fileId: '',type:'ADD'}
      this.form.otherAttachList.push(item)
      this.$refs.otherAttachTable.setActiveRow(item)
    },
    //保存附件
    saveAttach(row) {
      if(!row.attachTheme){ return this.$messageBox({type:'info',content:'请填写附件说明!'}) }
      if(!row.fileId){ return this.$messageBox({type:'info',content:'请上传附件!'}) }
      let params = {
        ...row,
        operateType: row.id ? 'MOD' : 'ADD',//ADD-新增 MOD-修改 DEL-删除 UP-上传
      }
      //保存合同信息
      this.zjControl.maintainOtherAttach(params).then(res => {
        //刷新当前凭证信息下的合同、发票、附件列表
        this.handleRadioChange({...res.data})
        this.$message.success('保存成功！')
        this.$refs.otherAttachTable.clearActived()
      })
    },
    //取消附件保存
    cancleAttach(row) {
      this.form.otherAttachList.splice(row.index,1)
      this.$refs.otherAttachTable.clearActived()
    },
    //删除附件
    deleteAttach(row) {
      this.form.otherAttachList.splice(row.index,1)//删除当前行的发票信息
      //更新附件列表
      let params = {
        ...row,
        operateType: 'DEL',//ADD-新增 MOD-修改 DEL-删除 UP-上传
      }
      this.zjControl.maintainOtherAttach(params).then(res=>{
        this.handleRadioChange({...res.data})
        this.$message.success('删除附件成功！')
      })
    },
    download(){},
    maintainSuccess() {
      this.$message.success('维护完成！')
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
    this.ebBillModelList = this.$route.params.rowData.ebBillModelList//获取凭证信息列表
    console.log(this.$route.params.rowData.ebBillModelList)
  }
};
</script>
<style lang="less" scoped>

</style>
