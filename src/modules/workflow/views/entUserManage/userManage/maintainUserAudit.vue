<template>
  <zj-content-container>
    <zj-top-header
      :title="pageType === 'audit' ? '维护用户信息审核' : '维护用户交易详情'"
    ></zj-top-header>
    <!--  交易信息  -->
    <trade-info />
    <!--  用户信息  -->
    <zj-content-block>
      <zj-header title="用户信息"></zj-header>
      <zj-content>
        <zj-collapse title="身份证">
          <zj-table :pager="false">
            <zj-table-column type="seq" width="60" title="序号" />
            <zj-table-column field="field2" title="附件类型" />
            <zj-table-column field="field2" title="附件" />
            <zj-table-column title="操作" fixed="right">
              <template v-slot="{ row }">
                <zj-button type="text" @click="toDownload(row)">下载</zj-button>
              </template>
            </zj-table-column>
          </zj-table>
        </zj-collapse>
      </zj-content>
    </zj-content-block>
    <!--  用户归属企业信息  -->
    <user-belongto-ent></user-belongto-ent>
    <!--  操作记录  -->
    <operate-log></operate-log>
    <!--  审核意见  -->
    <audit-remark></audit-remark>
    <zj-content-footer>
      <template v-if="pageType === 'audit'">
        <zj-button type="primary" @click="back">复核通过</zj-button>
        <zj-button @click="back">驳回上一级</zj-button>
      </template>
      <zj-button @click="back">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>

<script>
/**
 * 复核企业信息申请页面
 */
import tradeInfo from "../components/tradeInfo";
import OperateLog from "../../components/operateLog";
import userBelongtoEnt from "../components/userBelongtoEnt";
import AuditRemark from "../../components/auditRemark";

export default {
  components: {
    tradeInfo,
    userBelongtoEnt,
    OperateLog,
    AuditRemark,
  },
  data() {
    return {
      pageType: this.$route.meta.pageType,
    };
  },
  methods: {
    back() {},
    toDownload() {},
  },
};
</script>
