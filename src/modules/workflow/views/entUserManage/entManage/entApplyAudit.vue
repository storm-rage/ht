<template>
  <zj-content-container>
    <zj-top-header title="复核企业信息申请"></zj-top-header>
    <!--  交易信息  -->
    <trade-info />
    <!--  企业基础信息 -->
    <ent-base-info />
    <!--  企业操作员  -->
    <!--  企业附件  -->
    <!--  企业开票信息-->
    <!--  其他附件  -->
    <!--  操作记录  -->
    <operate-log></operate-log>
    <!--  审批意见  -->
    <audit-remark></audit-remark>
    <zj-content-footer>
      <zj-button type="primary" @click="back">复核通过</zj-button>
      <zj-button @click="back">驳回上一级</zj-button>
      <zj-button @click="back">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>

<script>
/**
 * 复核企业信息申请页面
 */
import tradeInfo from "../components/tradeInfo";
import entBaseInfo from "../components/entBaseInfo";
import OperateLog from '../../components/operateLog';
import AuditRemark from '../../components/auditRemark';

export default {
  components: {
    tradeInfo,
    entBaseInfo,
    OperateLog,
    AuditRemark
  },
  data() {
    return {};
  },
  methods: {
    back() {},
  },
};
</script>
