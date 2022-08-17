<template>
  <el-form  ref="form" label-width="160px">
    <zj-content-block>
      <zj-header title="合同信息"></zj-header>
      <zj-content>
        <div>
          <el-row>
            <el-col :span="8">
              <el-form-item label="合同编号：">
                <span>{{contractInfo.contractNo}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="合同生成时间：">
                <span>{{contractInfo.contractGenerateDate}}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <zj-table :dataList="contractInfo.supplierCreditFlowInfoList" :pager="false">
          <zj-table-column
            type="seq"
            width="60"
            title="序号"/>
          <zj-table-column
            field="supplierName"
            title="供应商名称"/>
          <zj-table-column
            field="buyerName"
            title="核心企业名称"/>
          <zj-table-column
            field="isHtEnterpriseDesc"
            title="核心企业是否海天集团"/>
          <zj-table-column
            field="factoringCreditEndDate"
            title="应收账款转让期限">
            <template v-slot="{row}">
              {{row.accountTransferStartDate}}～{{row.accountTransferEndDate}}
            </template>
          </zj-table-column>
          <zj-table-column
            field="totalCreditAmount"
            title="授信额度" :formatter="money"/>
          <zj-table-column
            field="factoringCreditEndDate"
            title="额度期限">
            <template v-slot="{row}">
              {{row.accountTransferStartDate}}～{{row.factoringCreditEndDate}}
            </template>
          </zj-table-column>
        </zj-table>
      </zj-content>
    </zj-content-block>
    <zj-content-block>
      <zj-header :title="contractFileTitle"></zj-header>
      <zj-content>
        <zj-table :params="{serialNo: serialNo}" :api="zjControl.queryEbContractFlowFilePage">
          <zj-table-column
            type="seq"
            width="60"
            title="序号"/>
          <zj-table-column
            field="contractNo"
            title="合同/协议编号"/>
          <zj-table-column
            field="buyerName"
            title="核心企业名称"/>
          <zj-table-column
            field="contractName"
            title="合同/协议名称"/>
          <zj-table-column
            field="signer"
            title="签署方"/>
          <zj-table-column title="操作" fixed="right">
            <template v-slot="{ row }">
              <zj-button type="text" @click="toDownload(row)">下载</zj-button>
            </template>
          </zj-table-column>
        </zj-table>
      </zj-content>
    </zj-content-block>
  </el-form>
</template>
<script>
export default {
  props: {
    // 合同信息
    contractInfo: {
      type: Object,
      required: true
    },
    // 申请流水号
    serialNo: {
      type: String,
      required: true
    },
    // 合同附件title,除了和详情不一样
    contractFileTitle: {
      type: String,
      default: '待确认合同/协议'
    }
  },
  data () {
    return {
      zjControl: {
        queryEbContractFlowFilePage: this.$api.factoringContractWorkflow.queryEbContractFlowFilePage,
        downApi: this.$api.baseCommon.downloadFile,
      }
    };
  },
  methods: {
    toDownload (row) {
      this.zjControl.downApi(row);
    }
  }
};
</script>
