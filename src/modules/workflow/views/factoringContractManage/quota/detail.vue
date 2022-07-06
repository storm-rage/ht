<template>
  <zj-content-container>
    <zj-top-header title="额度变更审核详情"></zj-top-header>
    <!--  业务申请信息  -->
    <biz-apply-info></biz-apply-info>
    <!--  具体业务信息  -->
    <quota-detail></quota-detail>
    <!--  操作记录  -->
    <operate-log></operate-log>
    <zj-content-footer>
      <zj-button class="back" @click="back">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>
<script>
import BizApplyInfo from '../../components/bizApplyInfo';
import OperateLog from '../../components/operateLog';
import QuotaDetail from '@modules/ebill/views/productManage/factoringContract/workflow/factoringQuotaChangeDetail.vue';
export default {
  components: {
    BizApplyInfo,
    OperateLog,
    QuotaDetail
  },
  data () {
    return {
    };
  },
  methods: {
    back () {}
  }
}
</script>
