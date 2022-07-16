<template>
  <zj-content-container>
    <zj-top-header title="复核企业信息申请"></zj-top-header>
    <!--  交易信息  -->
    <trade-info />
    <!--  企业基础信息 -->
    <ent-info-edit />

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
import entInfoEdit from '@modules/base/views/entUserManage/entManage/entInfoEdit';
import AuditRemark from '../../components/auditRemark';

export default {
  components: {
    tradeInfo,
    entInfoEdit,
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
