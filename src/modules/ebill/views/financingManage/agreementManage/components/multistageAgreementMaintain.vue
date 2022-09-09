<template>
  <zj-content-container>
    <!--  阶段性协议维护  -->
    <zj-content-block>
      <zj-header title="贸易关系"/>
      <zj-content>
      <zj-table ref="tradeRelationTable" :pager="false"
                :api="zjControl.getTradeRelationList"
                @after-load="handleDataChange"
                @radio-change="handleRadioChange"
                :radio-config="{highlight: true}"
      >
        <zj-table-column type="radio" width="60"/>
        <zj-table-column field="buyerName" title="买方企业名称"/>
        <zj-table-column field="isFactoringCredit" title="是否已有订单保理额度" />
        <zj-table-column field="totalCreditAmount" title="额度总额" :formatter="money"/>
        <zj-table-column field="availableCreditAmount" title="可用额度" :formatter="money"/>
      </zj-table>
      <div class="explain-text zj-m-l-10 zj-m-t-10">
        <div>注：</div>
        <ol class="explain-content">
          <li class="explain-item">以上额度信息仅供参考，实际以融资时额度为准。</li>
          <li class="explain-item">是否已有订单保理额度，不影响维护阶段性协议。</li>
        </ol>
      </div>
      </zj-content>
    </zj-content-block>
    <zj-content-block>
      <zj-header title="阶段性协议信息"/>
      <zj-content>
      <zj-table ref="searchTable" :dataList="agreementList" >
        <zj-table-column field="coreCompanyName" title="买方企业名称"/>
        <zj-table-column field="agreementNo" title="阶段性协议编号"/>
        <zj-table-column field="agreementName" title="阶段性协议名称"/>
        <zj-table-column field="agreementType" title="协议类型"/>
        <zj-table-column field="agreementStartDate" title="协议签订日期" :formatter="date"/>
        <zj-table-column field="agreementEstimateEndDate" title="协议预计到期日" :formatter="date"/>
        <zj-table-column field="agreementStatus" title="状态"/>
      </zj-table>
      </zj-content>
    </zj-content-block>
    <zj-content-block>
      <zj-header title="请上传贸易合同附件"/>
      <zj-content>
      <div class="explain-text">
        <div>注：</div>
        <ol class="explain-content">
          <li class="explain-item">支持的上传的文件格式：PDF、图片、压缩包！</li>
          <li class="explain-item">直接上传合同附件即可，保理公司会根据上传的合同维护对应的阶段性协议。保理公司维护后，您可使用阶段性协议发起融资。</li>
        </ol>
      </div>
      <zj-table ref="attaTable" :pager="false"
                :dataList="contractInfoList" keep-source
                :edit-config="{trigger: 'manual', mode: 'row', icon:'-', autoClear: false, showStatus: true}"
                v-if="attaTableShow"
      >
        <zj-table-column type="seq" title="序号" width="60"/>
        <zj-table-column field="fileName" title="合同附件" />
        <zj-table-column field="fileRemark" title="附件说明" :edit-render="{name: '$input'}"/>
        <zj-table-column title="操作">
          <template v-slot="{row,rowIndex}">
            <template v-if="$refs.attaTable.isActiveByRow(row)">
              <zj-upload class="zj-inline" :httpRequest="handleFileUpload" :data="{ row }">
                <zj-button slot="trigger" type="text" :api="zjBtn.uploadFile">上传</zj-button>
              </zj-upload>
              <zj-button type="text" @click="saveRow(row)" :api="zjBtn.delContract">保存</zj-button>
              <zj-button type="text" @click="cancel(row,rowIndex)">取消</zj-button>
            </template>
            <template v-if="!$refs.attaTable.isActiveByRow(row)">
              <zj-button type="text" @click="attaDownload(row)" :api="zjBtn.downloadFile">下载</zj-button>
              <zj-button type="text" @click="attaDelete(row)" :api="zjBtn.delContract">删除</zj-button>
            </template>
          </template>
        </zj-table-column>
      </zj-table>
      <el-row class="button-row zj-center zj-m-t-10">
        <zj-button type="primary" icon="el-icon-circle-plus-outline" @click="addAtta">新增</zj-button>
      </el-row>
      </zj-content>
    </zj-content-block>
  </zj-content-container>
</template>
<script>
import {OperateFlag} from '@modules/constant.js';
export default {
  name:'multistageAgreementMaintain',
  components: {},
  props: {
    zjControl: Object,
    dictionary: Object,
    mBtn: Object,
  },
  data() {
    return {
      searchForm: {
        supplierName: '',
        supplierCode: '',
        lastTimeDateStart:'',
        lastTimeDateEnd:'',
        entName: '',
      },
      agreementParams: {},//阶段性协议信息查询的参数
      businessApplyInfo: {},//申请信息
      agreementList: [],//协议列表
      contractInfoList: [],//合同附件列表
      attaTableShow: true,
    };
  },
  methods: {
    handleDataChange(rows) {
      //默认勾选第一个贸易关系
      if (rows&& rows.length) {
        this.$refs.tradeRelationTable.setRadioRow(rows[0])
        this.handleRadioChange({row: rows[0]})
      }
    },
    handleRadioChange({row}) {
      this.agreementParams = row
      this.agreementParams.coreCompanyName = row.buyerName || row.coreCompanyName
      console.log(`凭证参数~~~~`+JSON.stringify(this.agreementParams))
      let params = {
        busTradeId : row.busTradeId,
        coreCompanyName : row.buyerName || row.coreCompanyName,
        tradeId : row.tradeId,
      }
      //获取阶段性协议列表和贸易合同附件列表
      this.zjControl.queryPhasedAgreePage(params).then(res=>{
        this.businessApplyInfo = res.data.businessApplyInfo
        this.agreementList = res.data.phasedAgreeInfoList
        this.contractInfoList = res.data.contractInfoList || []
        let params = {
          recordId : res.data.businessApplyInfo ? res.data.businessApplyInfo.recordId || '' : '',
          contractInfoList : this.contractInfoList,
          ...this.agreementParams,
        }
        // console.log(params)
        this.$emit('update',params)
      })
    },
    //下载合同附件
    attaDownload(row) {
      this.zjControl.downloadFile({
        fileUrl:row.fileId,
        fileId:row.fileId,
        fileName:row.fileName,
      })
    },
    //删除合同附件
    attaDelete(row) {
      //D000-保理公司审核通过 D001-保理公司审核拒绝 D002-待保理公司初审
      if(this.businessApplyInfo && this.businessApplyInfo.applyStatus === 'D002') {
        return this.$message.error('提交审核中，不能删除合同附件！')
      }
      this.$messageBox({
        type:'confirm',
        title:'删除确认',
        content: `是否确认删除?`,
        showCancelButton:true,
        messageResolve:()=>{
          let params = {
            attachId : row.attachId,
            fileId : row.fileId,
            fileName : row.fileName,
            fileRemark : row.fileRemark,
            phasedOperateFlag : OperateFlag.DEL,
            recordId : row.recordId || '',
            tradeId : this.agreementParams.tradeId || '',
          }
          this.zjControl.delContract(params).then(res => {
            //刷新当前贸易关系下的合同附件列表
            this.zjControl.queryPhasedAgreePage(this.agreementParams).then(res=>{
              this.agreementList = res.data.phasedAgreeInfoList
              this.attaTableShow = false
              this.contractInfoList = res.data.contractInfoList || []
              this.$nextTick(()=>{
                this.attaTableShow = true
              })
              let params = {
                recordId : res.data.businessApplyInfo ? res.data.businessApplyInfo.recordId || '' : '',
                contractInfoList : this.contractInfoList,
                ...this.agreementParams,
              }
              console.log(params)
              this.$emit('update',params)
              this.$message.success('删除附件成功！')
              this.$refs.attaTable.clearActived()
            })
          })
        },
        messageReject: ()=>{

        }
      })
    },
    //新增合同附件
    addAtta() {
      //D000-保理公司审核通过 D001-保理公司审核拒绝 D002-待保理公司初审
      if(this.businessApplyInfo && this.businessApplyInfo.applyStatus === 'D002') {
        return this.$message.error('提交审核中，不能新增合同附件！')
      }
      if(!this.tableEditReport(["attaTable"])){return}
      let item = {attachId:'', fileId:'', fileName:'', fileRemark:'',recordId: this.businessApplyInfo?this.businessApplyInfo.recordId : '',}
      this.contractInfoList.push(item)
      this.$refs.attaTable.setActiveRow(item)
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
    saveRow(row) {
      if(!row.fileName){ return this.$messageBox({type:'info',content:'请上传附件!'}) }
      if(!row.fileRemark){ return this.$messageBox({type:'info',content:'请输入附件说明!'}) }
      //合同附件信息
      let flag = row.fileId ? OperateFlag.UPDATE : OperateFlag.ADD
      let params = {
        attachId : '',
        fileId : row.fileId,
        fileName : row.fileName,
        fileRemark : row.fileRemark,
        phasedOperateFlag : flag,
        recordId : row.recordId || '',
        tradeId : this.agreementParams.tradeId || '',
      }
      return this.zjControl.delContract(params).then(res => {
        //刷新当前贸易关系下的合同附件列表
        this.zjControl.queryPhasedAgreePage(this.agreementParams).then(res=>{
          this.agreementList = res.data.phasedAgreeInfoList
          if(res.data.contractInfoList) {
            this.contractInfoList = res.data.contractInfoList
          }
          let params = {
            recordId : res.data.businessApplyInfo ? res.data.businessApplyInfo.recordId || '' : '',
            contractInfoList : this.contractInfoList,
            ...this.agreementParams,
          }
          this.$emit('update',params)
          this.$message.success('保存成功！')
          this.$refs.attaTable.clearActived()
        })
        return Promise.resolve(res)
      })
    },
    cancel(row,rowIndex) {
      this.contractInfoList.splice(rowIndex,1)
      this.$refs.attaTable.clearActived()
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
  created() {},
};
</script>
<style lang="less" scoped>

</style>
