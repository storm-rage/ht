<template>
  <zj-content-container>
    <zj-top-header title="国内商业保理合同确认交易详情"></zj-top-header>
    <!--  业务申请信息  -->
    <biz-apply-info></biz-apply-info>
    <!--  具体业务信息  -->
    <contract-detail></contract-detail>
    <!--  操作记录  -->
    <operate-log></operate-log>
    <zj-content-footer>
      <zj-button @click="back">返回</zj-button>
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
    return {};
  },
  methods: {
    back () {}
  }
}
</script>
