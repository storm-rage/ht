<template>
  <zj-content-container>
    <zj-top-header :title="title"></zj-top-header>
    <zj-content-block>
      <zj-content>
        <el-steps :active="stepActive" process-status="finish" align-center>
          <el-step v-for="(step,index) in stepList" :key="`${index}stp`">
            <div slot="title">{{step.typeDesc}}</div>
            <div slot="description" style="width: 220px">
              <p v-if="step.date">时间：{{step.date}}</p>
              <!--              <p v-if="step.user">提交人：{{step.user}}</p>-->
              <!--              <p v-if="step.desc">{{step.desc}}</p>-->
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
                <span>{{contractInfo.contractName}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="合同编号：">
                <span>{{contractInfo.contractNo}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="合同生成时间：">
                <span>{{contractInfo.contractStartDate}}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <zj-table :dataList="creditInfoList" :pager="false">
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
        <zj-table :dataList="contractAgreementList" :pager="false">
          <zj-table-column type="seq" title="序号" width="60"/>
          <zj-table-column
            field="contractNo"
            title="合同/协议编号"/>
          <zj-table-column
            field="buyerName"
            formatter="formatColumnValue"
            title="买方企业名称"/>
          <zj-table-column
            field="contractName"
            title="合同/协议名称"/>
          <zj-table-column
            field="signTypeDesc"
            formatter="formatColumnValue"
            title="签署类型"/>
          <zj-table-column
            field="agreementPerson"
            formatter="formatColumnValue"
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
/**
 * 通用详情页面（查询，申请，复核）
 */
export default {
  props: {
    title: String,
    detailInfo: {
      type: Object,
      required: true
    },
    dictionary: Object
  },
  watch: {
    detailInfo: {
      handler() {
        if (this.detailInfo.contractInfo) {
          this.contractInfo = this.detailInfo.contractInfo;
        }
        if (this.detailInfo.contractInfo.creditInfoList) {
          this.creditInfoList = this.detailInfo.contractInfo.creditInfoList;
        }
        if (this.detailInfo.contractAgreementList) {
          this.contractAgreementList = this.detailInfo.contractAgreementList;
        }
        if (this.detailInfo.nodeInfoList) {
          this.stepList = this.detailInfo.nodeInfoList;
        }
      },
      deep: true,
    }
  },
  computed: {
    stepActive () {
      if (this.stepList&& this.stepList.length) {
        return this.stepList.filter((node) => node.bool).length-1
      }
      return 0;
    }
  },
  data() {
    return {
      zjControl: {
        downApi: this.$api.baseCommon.downloadFile
      },
      // 合同信息
      contractInfo: {},
      // 额度信息
      creditInfoList: [],
      // 协议信息
      contractAgreementList: [],
      // 节点信息
      stepList: []
    };
  },
  methods: {
    toDownload(row) {
      this.zjControl.downApi({...row, fileUrl: row.fileId});
    },
  }
};
</script>
