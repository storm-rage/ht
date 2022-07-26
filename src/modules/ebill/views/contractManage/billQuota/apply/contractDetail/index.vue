<template>
  <zj-content-container>
    <zj-top-header title="国内商业保理合同详情"></zj-top-header>
    <zj-content-block>
      <zj-header title="合同信息"></zj-header>
      <zj-content>
        <el-form label-width="120px" ref="form" size="mini">
          <el-row>
            <el-col :span="8">
              <el-form-item label="合同类型：">
                <span>{{detailInfo.contractName}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="合同编号：">
                <span>{{detailInfo.contractNo}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="合同有效期间：">
                <span>{{detailInfo.contractStartDate}} 至 2023.09.08</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="合同状态：">
              <span>{{typeMap(dictionary.contractStatus, detailInfo.contractStatus)}}</span>
            </el-form-item>
          </el-row>
        </el-form>
        <zj-table :dataList="contractList" :pager="false">
          <zj-table-column type="seq" title="序号" width="60"/>
          <zj-table-column
            field="contractName"
            title="合同/协议编号"/>
          <zj-table-column
            field="contractNo"
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
      <zj-header title="额度信息"></zj-header>
      <zj-content>
        <zj-table :dataList="quotaList"
                  ref="quotaTable"
                  :pager="false"
                  @radio-change="handleRadioChange"
                  :radio-config="{highlight: true}">
          <zj-table-column type="radio"  width="50"/>
          <zj-table-column type="seq" title="序号" width="50"/>
          <zj-table-column
            field="buyerName"
            title="买方企业名称"
          />
          <zj-table-column
            field="accountTransferStartDate"
            title="应收账款转让期限">
            <template v-slot="{row}">
              {{row.accountTransferStartDate}}～{{row.accountTransferEndDate}}
            </template>
          </zj-table-column>
          <zj-table-column field="totalCreditAmount" title="授信额度" :formatter="money"/>
          <zj-table-column field="factoringCreditEndDate" title="额度期限" >
            <template v-slot="{row}">
              {{row.accountTransferStartDate}}～{{row.factoringCreditEndDate}}
            </template>
          </zj-table-column>
        </zj-table>
      </zj-content>
    </zj-content-block>
    <zj-content-block v-if="currentRow.id">
      <zj-header title="相关协议"></zj-header>
      <zj-content>
        <zj-table :dataList="fileList" :pager="false">
          <zj-table-column type="seq" title="序号" />
          <zj-table-column
            field="contractNo"
            title="协议编号"
          />
          <zj-table-column
            field="entCoreName"
            title="买方企业名称"
          />
          <zj-table-column field="contractName" title="合同/协议名称" />
          <zj-table-column
            field="contractStartDate"
            title="生效日期"
            :formatter="date"
          />
          <zj-table-column field="status"
                           title="合同/协议状态"
                           :formatter="(obj) => typeMap(dictionary.contractStatus, obj.cellValue)"/>
          <zj-table-column title="操作" fixed="right">
            <template v-slot="{ row }">
              <zj-button type="text" @click="toDownload(row)">下载</zj-button>
            </template>
          </zj-table-column>
        </zj-table>
      </zj-content>
    </zj-content-block>
    <zj-content-footer>
      <zj-button @click="goParent">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>

<script>
export default {
  data() {
    return {
      zjControl: {
        getDataDirectory: this.$api.billQuotaManage.getDataDirectory,
        getContractDetail: this.$api.billQuotaManage.getContractDetail,
        getContractAgreementList: this.$api.billQuotaManage.getContractAgreementList,
        downApi: this.$api.baseCommon.downloadFile
      },
      // 字典
      dictionary: {},
      // 合同信息列表
      contractList: [],
      // 额度信息
      quotaList: [],
      // 协议信息列表
      fileList: [],
      // 合同详情信息
      detailInfo:{},
      // 当前选中的行
      currentRow: {}
    };
  },
  created() {
    this.getApi();
    this.getDic();
    this.getRow();
    this.getDetail();
  },
  methods: {
    getDetail() {
      this.zjControl.getContractDetail({contractId: this.row.contractId}).then(res => {
        this.detailInfo = res.data;
        this.contractList = [this.detailInfo];
        if (res.data && res.data.creditInfoList) {
          this.quotaList = res.data.creditInfoList;
          this.$refs.quotaTable.setRadioRow(this.quotaList[0]);
        }
      });
    },
    getDic () {
      this.zjControl.getDataDirectory().then(res => {
        this.dictionary = res.data
      })
    },
    toDownload(row) {
      this.zjControl.downApi(row);
    },
    handleRadioChange({row}){
      this.currentRow = row;
      this.zjControl.getContractAgreementList({
        buyerId: row.buyerId,
        contractId: this.row.contractId,
        creditId: row.id
      }).then(res => {
        this.fileList = res.data.agreementInfoList||[];
      });
    }
  },
};
</script>
