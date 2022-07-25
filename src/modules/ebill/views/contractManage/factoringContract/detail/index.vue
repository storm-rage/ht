<template>
  <zj-content-container>
    <zj-top-header :title="title"></zj-top-header>
    <zj-content-block>
      <zj-content>
        <el-steps :active="stepActive" process-status="finish" align-center>
          <el-step v-for="(step,index) in stepList" :key="`${index}stp`">
            <div slot="title">{{step.type}}</div>
            <div slot="description" style="text-align: left;width: 220px">
              <p v-if="step.date">提交时间：{{step.date}}</p>
              <p v-if="step.user">提交人：{{step.user}}</p>
              <p v-if="step.desc">{{step.desc}}</p>
            </div>
          </el-step>
        </el-steps>
      </zj-content>
    </zj-content-block>
    <!--  合同信息  -->
    <zj-content-block>
      <zj-header title="合同信息"></zj-header>
      <zj-content>
        <el-form label-width="140px" ref="form" size="mini">
          <el-row>
            <el-col :span="8">
              <el-form-item label="待签署合同类型：">
                <span>{{detailInfo.contractInfo.contractName}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="合同编号：">
                <span>{{detailInfo.contractInfo.contractNo}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="合同生成时间：">
                <span>{{detailInfo.contractInfo.contractStartDate}}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <zj-table :dataList="detailInfo.contractInfo.supplierCreditInfoList" :pager="false">
          <zj-table-column type="seq" title="序号" width="60"/>
          <zj-table-column
            field="buyerName"
            title="买方企业名称"/>
          <zj-table-column
            field="accountTransferStartDate"
            title="应收账款转让期限">
            <template v-slot="{row}">
              {{row.accountTransferStartDate}}～{{row.accountTransferEndDate}}
            </template>
          </zj-table-column>
          <zj-table-column
            field="totalCreditAmount"
            title="授信额度" :formatter="money"></zj-table-column>
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
    <!--  协议信息  -->
    <zj-content-block>
      <zj-header title="本次待签约合同/协议"></zj-header>
      <zj-content>
        <zj-table :dataList="detailInfo.contractAgreementList" :pager="false">
          <zj-table-column type="seq" title="序号" width="60"/>
          <zj-table-column
            field="field1"
            title="合同/协议编号"/>
          <zj-table-column
            field="field3"
            title="买方企业名称"/>
          <zj-table-column
            field="field2"
            title="合同/协议名称"/>
          <zj-table-column
            field="field4"
            title="签署类型"/>
          <zj-table-column
            field="field5"
            title="协议相关方"/>
          <zj-table-column title="操作" fixed="right">
            <template v-slot="{ row }">
              <zj-button type="text" @click="toDownload(row)">下载</zj-button>
            </template>
          </zj-table-column>
        </zj-table>
      </zj-content>
    </zj-content-block>
  </zj-content-container>
</template>
<script>
export default {
  props: {
    title: String,
    detailInfo: {
      type: Object,
      required: true
    },
    stepActive: {
      type: Number,
      default: 0
    },
    stepList: {
      type: Array,
      require: true,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      zjControl: {
        downApi: this.$api.baseCommon.downloadFile
      },
      quotaList: [
        {
          field1: '海天a公司',
          field2: '2022-09-09 ～ 2023-09-08',
          field3: '100,000,000.00',
          field4: '4',
        }
      ],
      fileList: [
        {
          field1: '123455',
          field2: '《国内商业保理合同》',
          field3: '海天a公司',
          field4: '双签',
          field5: '海天保理公司'
        }
      ]
    }
  },
  methods: {
    toDownload(row) {
      this.zjControl.downApi(row);
    },
  }
};
</script>
