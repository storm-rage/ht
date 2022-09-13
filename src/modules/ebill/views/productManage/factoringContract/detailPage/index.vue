<template>
  <zj-content-container>
    <zj-top-header title="供应商保理合同详情"></zj-top-header>
    <el-form  ref="form" label-width="180px">
      <zj-content-block>
        <zj-header title="客户基本信息"></zj-header>
        <zj-content>
          <div>
            <el-row>
              <el-col :span="8">
                <el-form-item label="供应商名称：">
                  <span>{{customerInfo.supplierName}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="是否海天一级供应商：">
                  <span>{{customerInfo.supplierTypeDesc}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="供应商编码：">
                  <span>{{customerInfo.supplierCode}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="供应商统一社会信用代码：">
                  <span>{{customerInfo.bizLicence}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="申请产品：">
                  <span>{{customerInfo.product}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="合同编号：">
                  <span>{{customerInfo.contractNo}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="合同名称：">
                  <span>{{customerInfo.contractName}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="合同有效期间：">
                  <span>{{customerInfo.contractStartDate}} ～ {{customerInfo.contractEndDate}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="合同状态：">
                  <span>{{customerInfo.contractStatusDesc}}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <zj-table :pager="false"
                    :dataList="customerInfo.contractFilesResList">
            <zj-table-column
             type="seq"
             width="60"
              title="序号"/>
            <zj-table-column
              field="contractNo"
              title="合同编号"/>
            <zj-table-column
              field="contractName"
              title="合同名称"/>
            <zj-table-column title="操作" fixed="right">
              <template v-slot="{ row }">
                <zj-button type="text" @click="toDownload(row)">下载</zj-button>
              </template>
            </zj-table-column>
          </zj-table>
        </zj-content>
      </zj-content-block>
      <zj-content-block>
        <zj-header title="供应商额度信息"></zj-header>
        <zj-content>
          <zj-table
            ref="quotaTable"
            :pager="false"
            :dataList="quotaList"
            @radio-change="handleRadioChange"
            :radio-config="{highlight: true}">
            <zj-table-column type="radio" width="50"></zj-table-column>
            <zj-table-column
              type="seq"
              width="60"
              title="序号"/>
            <zj-table-column
              field="buyerName"
              title="核心企业名称"/>
            <zj-table-column
              field="isHtEnterpriseDesc"
              title="核心企业是否海天集团"/>
            <zj-table-column
              field="bizLicence"
              title="核心企业统一社会信用代码"/>
            <zj-table-column
              field="factoringFlagDesc"
              title="保理标识"/>
            <zj-table-column
              field="stateDesc"
              title="贸易关系状态"/>
            <zj-table-column
              field="factoringCreditEndDate"
              title="额度有效期">
              <template v-slot="{row}">
                {{row.factoringCreditStartDate}}～{{row.factoringCreditEndDate}}
              </template>
            </zj-table-column>
            <zj-table-column
              field="totalCreditAmount"
              :formatter="money"
              title="授信额度" />
            <zj-table-column
              field="factoringCreditDesc"
              title="额度状态"/>
          </zj-table>
        </zj-content>
      </zj-content-block>
      <zj-content-block v-if="agreementFileList.length">
        <zj-header title="相关合同/协议附件"></zj-header>
        <zj-content>
          <zj-table :dataList="agreementFileList" :pager="false">
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
              title="生效日期"/>
            <zj-table-column
              field="contractStatus"
              title="合同/协议状态" :formatter="(obj)=>typeMap(dictionary.contractStatus, obj.cellValue)"/>
            <zj-table-column title="操作" fixed="right">
              <template v-slot="{ row }">
                <zj-button type="text" @click="toDownload(row)">下载</zj-button>
              </template>
            </zj-table-column>
          </zj-table>
        </zj-content>
      </zj-content-block>
      <zj-content-block v-if="fileList.length">
        <zj-header title="其他附件"></zj-header>
        <zj-content>
          <zj-table :dataList="fileList"
                    :pager="false">
            <zj-table-column
              type="seq"
              width="60"
              title="序号"/>
            <zj-table-column
              field="bizTypeDesc"
              formatter="formatColumnValue"
              title="附件类型"/>
            <zj-table-column
              field="fileName"
              formatter="formatColumnValue"
              title="附件名称"/>
            <zj-table-column
              field="createDatetime"
              title="上传日期"/>
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
        getEbContractDetail: this.$api.factoringContract.getEbContractDetail,
        downApi: this.$api.baseCommon.downloadFile,
        getEbContractFileByEnterId: this.$api.factoringContract.getEbContractFileByEnterId,
        getDirectory: this.$api.factoringContract.getEbContractYyDirectory,
      },
      // 客户基本信息
      customerInfo: {},
      // 额度信息
      quotaList: [],
      // 相关协议列表
      agreementFileList: [],
      // 其他附件列表
      fileList: [],
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
        this.customerInfo = res.data.enterpriseBasicInfo || {};
        this.quotaList = res.data.supplierCreditInfoList || [];
        if (this.quotaList.length) {
          this.$nextTick(() => {
            this.$refs.quotaTable.setRadioRow(this.quotaList[0]);
            this.handleRadioChange({row: this.quotaList[0]});
          });
        }
        this.fileList = res.data.otherFileList || [];
      });
    },
    toDownload (row) {
      this.zjControl.downApi(row);
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
