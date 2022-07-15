<template>
  <zj-content-container>
    <zj-top-header title="产品开通申请审核"></zj-top-header>
    <!--  业务申请信息  -->
    <biz-apply-info></biz-apply-info>
    <!--  供应商基本信息  -->
    <supplier-base-info title="供应商基本信息"></supplier-base-info>
     <!--  贸易关系  -->
    <trade-detail></trade-detail>
    <!--  操作记录  -->
    <operate-log></operate-log>
    <!--  审批意见  -->
    <audit-remark></audit-remark>
    <zj-content-footer>
      <zj-button type="primary" @click="back">审核通过</zj-button>
      <zj-button type="primary" @click="back">拒绝</zj-button>
      <zj-button @click="back">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>
<script>
import BizApplyInfo from "../components/bizApplyInfo";
import SupplierBaseInfo from '@modules/ebill/views//productManage/businessManage/components/supplierBaseInfo';
import TradeDetail from '@modules/ebill/views/productManage/businessManage/contractSign/tradeList';
import OperateLog from "../components/operateLog";
import AuditRemark from "../components/auditRemark";

export default {
  components: {
    BizApplyInfo,
    SupplierBaseInfo,
    TradeDetail,
    OperateLog,
    AuditRemark,
  },
  data() {
    return {};
  },
  methods: {
    back() {},
  },
};
</script>
