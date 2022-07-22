<template>
  <zj-content-container>
    <zj-top-header title="供应商业务申请交易详情"></zj-top-header>
    <!--  业务申请信息  -->
    <biz-apply-info></biz-apply-info>
    <!--  具体业务信息  -->
    <business-detail biz-id="1"></business-detail>
    <!--  操作记录  -->
    <operate-log></operate-log>
    <zj-content-footer>
      <zj-button @click="goParent">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>
<script>
import BizApplyInfo from '../components/bizApplyInfo';
import OperateLog from '../components/operateLog';
import AuditRemark from '../components/auditRemark';
import BusinessDetail from '@modules/ebill/views/productManage/businessManage/workflow/businessDetail.vue';

/**
 * 点击流水号详情
 */
export default {
  components: {
    BizApplyInfo,
    OperateLog,
    AuditRemark,
    BusinessDetail
  },
  data () {
    return {}
  },
  methods: {
  }
};
</script>
