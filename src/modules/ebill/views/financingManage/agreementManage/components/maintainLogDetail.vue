<template>
  <zj-content-block>
    <zj-top-header title="阶段性协议维护详情"></zj-top-header>
    <el-form :model="form" ref="form" label-width="160px">
      <zj-content-block>
        <zj-header title="交易详情"></zj-header>
        <el-row>
          <el-col :span="8">
            <el-form-item label="申请流水号：">{{form.serialNo}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申请时间：">{{form.receiveDatetime}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申请状态：">{{typeMap(dictionary.agreementStateList,form.applyStatus)}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="拒绝原因：">{{form.rejectReason}}</el-form-item>
          </el-col>
        </el-row>
      </zj-content-block>
      <zj-content-block>
        <zj-header title="阶段性协议信息"></zj-header>
        <zj-table ref="logTable"
                  :dataList="form.phasedAgreementList"
        >
          <zj-table-column field="coreCompanyName" title="买方企业名称"/>
          <zj-table-column field="agreementNo" title="阶段性协议编号"/>
          <zj-table-column field="agreementName" title="阶段性协议名称"/>
          <zj-table-column field="agreementType" title="协议类型"/>
          <zj-table-column field="agreementStartDate" title="协议签订日期" :formatter="date"/>
          <zj-table-column field="agreementEstimateEndDate" title="协议预计到期日" :formatter="date"/>
        </zj-table>
      </zj-content-block>
      <zj-content-block>
        <zj-header title="贸易合同附件"></zj-header>
        <zj-table ref="logTable"
                  :dataList="form.contractInfoList"
        >
          <zj-table-column type="seq" title="序号"/>
          <zj-table-column field="fileName" title="合同附件"/>
          <zj-table-column field="fileRemark" title="附件说明"/>
          <zj-table-column title="操作">
            <template v-slot="{row}">
              <zj-button type="text" @click="attaDownload(row.fileId)">下载</zj-button>
            </template>
          </zj-table-column>
        </zj-table>
      </zj-content-block>
    </el-form>
    <zj-content-footer>
      <zj-button type="back" @click="goParent">返回</zj-button>
    </zj-content-footer>
  </zj-content-block>
</template>
<script>
// 维护记录详情
export default {
  name: 'maintainLogDetail',
  data () {
    return {
      zjControl:{
        getPhasedAgreeDirectory:this.$api.agreementManage.getPhasedAgreeDirectory,//企业端-阶段性协议管理-数据字典
        getTradeRelationRecordDetail:this.$api.agreementManage.getTradeRelationRecordDetail,//企业端-我的阶段性协议-贸易关系-维护记录列表查询
        downloadFile:this.$api.baseCommon.downloadFile,//文件下载
      },
      form: {},
      dictionary:{},
    };
  },
  methods: {
    getTradeRelationRecordDetail() {
      let params = {
        applyId : this.row.id,
        buyerId : this.row.buyerId,
        buyerName : this.row.buyerName,
        serialNo  : this.row.serialNo,
      }
      this.zjControl.getTradeRelationRecordDetail(params).then(res => {
        this.form = res.data
      })
    },
    attaDownload(row) {
      this.zjControl.downloadFile(row)
    },
    getPhasedAgreeDirectory() {
      this.zjControl.getPhasedAgreeDirectory().then(res=>{
        this.dictionary = Object.assign({},res.data)
      })
    },
  },
  created() {
    this.getApi()
    this.getRow()
    this.getPhasedAgreeDirectory()
    this.getTradeRelationRecordDetail()
  }
}
</script>
