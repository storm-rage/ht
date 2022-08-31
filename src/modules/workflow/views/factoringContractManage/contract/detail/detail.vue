<template>
  <zj-content-container>
    <zj-top-header title="国内商业保理合同确认交易详情"></zj-top-header>
    <!--  业务申请信息  -->
    <biz-apply-info :biz-info="tranInfo"></biz-apply-info>
    <!--  具体业务信息  -->
    <contract-detail :contract-info="bizInfo" :serial-no="row.serialNo"></contract-detail>
    <!--  操作记录  -->
    <operate-log :log-list="operateRecordList"></operate-log>
    <zj-content-footer>
      <zj-button @click="goParent">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>
<script>
import BizApplyInfo from '../../../components/bizApplyInfo';
import OperateLog from '../../../components/operateLog';
import ContractDetail from '@modules/ebill/views/productManage/factoringContract/workflow/factoringContractDetail.vue';
export default {
  components: {
    BizApplyInfo,
    OperateLog,
    ContractDetail
  },
  data () {
    return {
      zjControl: {
        getEbContractFlowDetail: this.$api.factoringContractWorkflow.getEbContractFlowDetail
      },
      // 交易信息(工作流业务申请信息)
      tranInfo:{},
      // 业务信息
      bizInfo:{},
      // 操作记录
      operateRecordList: []
    };
  },
  created() {
    this.getApi();
    this.getRow();
    this.getDetail();
  },
  methods: {
    getDetail() {
      this.zjControl.getEbContractFlowDetail({
        serialNo: this.row.serialNo
      }).then(res => {
        this.tranInfo = res.data.basicInfo;
        this.bizInfo = res.data.contractInfo;
        this.operateRecordList = res.data.ebContractOperateRecordList||[];
      })
    }
  }
}
</script>
