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
        <zj-table :dataList="quotaList" :pager="false"  @radio-change="handleRadioChange" :radio-config="{highlight: true}">
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
    <zj-content-block>
      <zj-header title="相关协议"></zj-header>
      <zj-content>
        <zj-table :dataList="fileList">
          <zj-table-column type="seq" title="序号" />
          <zj-table-column
            field="field1"
            title="协议编号"
          />
          <zj-table-column
            field="field2"
            title="买方企业名称"
          />
          <zj-table-column field="field3" title="合同/协议名称" />
          <zj-table-column
            field="field4"
            title="生效日期"
            :formatter="date"
          />
          <zj-table-column field="field5" title="合同/协议状态" />
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
// todo：缺少接口，下载协议参数
export default {
  data() {
    return {
      zjControl: {
        getDataDirectory: this.$api.billQuotaManage.getDataDirectory,
        getContractDetail: this.$api.billQuotaManage.getContractDetail,
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
      detailInfo:{}
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
      if (row.field1 === '1') {
        this.fileList = [{
          field1: '123455',
          field2: '海天b公司',
          field3: '《应收账款保理业务申请书》',
          field4: '2022.09.09',
          field5: '生效'
        }]
      }else {
        this.fileList = [{
          field1: '645645645',
          field2: '海天A公司',
          field3: '《应收账款保理业务申请书》',
          field4: '2022.09.09',
          field5: '生效'
        }]
      }
    }
  },
};
</script>
