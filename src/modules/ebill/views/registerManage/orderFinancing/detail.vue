<template>
  <zj-content-container>
    <zj-top-header title="订单保理合同详情"></zj-top-header>
    <el-form  ref="form" label-width="180px">
      <zj-content-block>
        <zj-header title="客户基本信息"></zj-header>
        <zj-content>
          <div>
            <el-row>
              <el-col :span="8">
                <el-form-item label="供应商名称：">
                  <span>{{baseInfo.sellerName}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="是否海天一级供应商：">
                  <span>{{baseInfo.isHtEnterprise}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="供应商统一社会信用代码">
                  <span>{{baseInfo.bizLicence}}</span>
                </el-form-item>
              </el-col>

            </el-row>
          </div>
        </zj-content>
      </zj-content-block>
      <zj-content-block>
        <zj-header title="供应商额度信息"></zj-header>
        <zj-content>
          <zj-table
            ref="quotaTable"
            :pager="false"
            :dataList="creditInfo">
            <zj-table-column
              type="seq"
              width="60"
              title="序号"/>
            <zj-table-column
              field="buyerName"
              title="核心企业名称"/>
            <zj-table-column
              field="isHtEnterprise"
              title="核心企业是否海天集团" :formatter="
            (obj) => typeMap(dictionary.isHtEnterprise, obj.cellValue)
          "/>
            <zj-table-column
              field="bizLicence"
              title="核心企业统一社会信用代码"/>
            <zj-table-column
              field="cactoringLogo"
              title="保理标识"  :formatter="
            (obj) => typeMap(dictionary.cactoringLogo, obj.cellValue)
          "/>
            <zj-table-column
              field="state"
              title="贸易关系状态"  :formatter="
            (obj) => typeMap(dictionary.state, obj.cellValue)
          "/>
            <zj-table-column
              field="factoringCreditEndDate"
              title="额度有效期">
              <template v-slot="{row}">
                {{date(row.factoringCreditStartDate)}}～{{date(row.factoringCreditEndDate)}}
              </template>
            </zj-table-column>
            <zj-table-column
              field="factoringCreditAmount"
              :formatter="money"
              title="授信额度" />
            <zj-table-column
              field="factoringCreditStatus"
              title="额度状态"/>
          </zj-table>
        </zj-content>
      </zj-content-block>
      <zj-content-block >
        <zj-header title="相关合同/协议附件"></zj-header>
        <zj-content>
          <zj-table :dataList="contractAgreementAttachList" :pager="false">
            <zj-table-column
              type="seq"
              width="60"
              title="序号"/>
            <zj-table-column
              field="contractNo"
              title="合同/协议编号"/>
            <zj-table-column
              field="contractName"
              title="合同/协议名称"/>
            <zj-table-column
              field="signDate"
              title="生效日期"
              :formatter="date"/>
            <!-- <zj-table-column
              field="status"
              title="合同/协议状态" :formatter="(obj)=>typeMap(dictionary.contractStatus, obj.cellValue)"/> -->
              <zj-table-column
              field="status"
              title="合同/协议状态"/>
            <zj-table-column title="操作" fixed="right">
              <template v-slot="{ row }">
                <zj-button type="text" @click="toDownload(row)">下载</zj-button>
              </template>
            </zj-table-column>
          </zj-table>
        </zj-content>
      </zj-content-block>
      <zj-content-block >
        <zj-header title="中登附件"></zj-header>
        <zj-content>
          <zj-table :dataList="zdAttachList"
                    :pager="false">
            <zj-table-column
              type="seq"
              width="60"
              title="序号"/>
            <zj-table-column
              field="busType"
              title="附件类型" :formatter="
            (obj) => typeMap(dictionary.busType, obj.cellValue)
          "/>
            <zj-table-column
              field="fileName"
              title="附件名称"/>
            <zj-table-column
              field="createDatetime"
              title="上传日期" :formatter="date"/>
            <zj-table-column title="操作" fixed="right">
              <template v-slot="{ row }">
                <zj-button type="text" @click="toDownload(row)">下载</zj-button>
              </template>
            </zj-table-column>
          </zj-table>
        </zj-content>
      </zj-content-block>
    </el-form>
    <zj-content-footer>
      <zj-button @click="goParent">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>
<script>
// todo:默认选中
export default {
  data () {
    return {
      zjControl: {
        getEbContractDetail: this.$api.zhongdengManage.detailsbl,
        downApi: this.$api.baseCommon.downloadFile,
        getEbContractFileByEnterId: this.$api.factoringContract.getEbContractFileByEnterId,
        getDirectory: this.$api.zhongdengManage.getDictionary,
      },
      // 客户基本信息
      baseInfo: {},
      //供应商额度信息
      creditInfo:[],

      // 相关协议列表
      contractAgreementAttachList: [],
      // 其他附件列表
      zdAttachList: [],
      // 当前选中的行
      currentRow: {},
      // 字典
      dictionary: {}
    };
  },
  created() {
    this.getApi();
    this.getDic();
    this.getRow();
    this.getDetail();
  },
  methods: {
    getDic() {
      this.zjControl.getDirectory().then((res) => {
        this.dictionary = res.data
      });
    },
    getDetail() {
      this.zjControl.getEbContractDetail({id: this.row.id}).then(res => {
        // this.zjControl.getEbContractDetail({id: 1}).then(res => {
          this.baseInfo=res.data.baseInfo
          this.creditInfo.push(res.data.creditInfo)
          this.contractAgreementAttachList=res.data.contractAgreementAttachList
          this.zdAttachList=res.data.zdAttachList
      });
    },
   
    toDownload(row) {
      console.log(row);
      let params = {
        fileId:row.fileId,
        fileName:row.fileName
      }
      this.$api.baseCommon.downloadFile(params).then((res) => {
      });
    },
    handleRadioChange ({row}) {
      this.currentRow = row;
      this.zjControl.getEbContractFileByEnterId({id: this.row.id,enterId: row.enterId}).then(res => {
        this.agreementFileList = res.data.contractAgreementList||[];
      });
    }
  }
}
</script>
