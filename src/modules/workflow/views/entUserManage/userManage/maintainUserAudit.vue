<template>
  <zj-content-container>
    <zj-top-header title="维护用户信息审核"></zj-top-header>
    <!--  交易信息  -->
    <trade-info />
    <!--  用户信息  -->
    <!--  用户归属企业信息  -->
    <!--  操作记录  -->
    <operate-log></operate-log>
    <!--  审核意见  -->
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
import OperateLog from '../../components/operateLog';
import AuditRemark from '../../components/auditRemark';

export default {
  components: {
    tradeInfo,
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
