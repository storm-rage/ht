<template>
  <zj-content-container>
    <zj-top-header :title="$route.name === 'entApplyAudit' ? '复核企业信息申请' : '企业信息申请交易详情'"></zj-top-header>
    <!--  交易信息  -->
    <trade-info :detailData="detailData" />
    <!--  企业基础信息 -->
    <ent-info-edit ref="entInfoedit" />

    <!--  审批意见  -->
    <audit-remark ref="auditRemark" v-if="$route.name === 'entApplyAudit'"></audit-remark>
    <zj-content-footer>
      <zj-button type="primary" @click="toPass">复核通过</zj-button>
      <zj-button @click="toReject">驳回上一级</zj-button>
      <zj-button @click="goParent">返回</zj-button>
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
    return {
      zjControl: this.$api.entUserManage,
      detailData: {},
      dictionary: {},
      passLoading: {},
      rejectLoading: {}
    };
  },
  mounted() {
    setTimeout(() => {
      try {
        let data = this.$refs.entInfoEdit.$data // 获取组件data
        this.detailData = data.form // 详情
        this.dictionary = data.dictionary // 字典
        console.log(this.$refs.entInfoedit)
      } catch (err) {
        console.error(err)
      }
    }, 1000)
  },
  methods: {
    toPass() {
      this.$refs.auditRemark.getForm().clearValidate();
      const { notes } = this.$refs.auditRemark.getData()
      this.passLoading = true;
      this.zjControl.recheckContractRenewal({
        id: this.row.id,
        notes,
      }).then(res => {
        this.passLoading = false;
        //成功，关闭
        if (res.success) {
          this.$message.success(res.msg);
          this.goParent();
        }
      }).catch(() => {
        this.passLoading = false;
      })
    },
    toReject() {
      this.$refs.auditRemark.getForm().validate((valid) => {
        if (valid) {
          const { notes } = this.$refs.auditRemark.getData()
          this.rejectLoading = true;
          this.zjControl.recheckContractRenewal({
            id: this.row.id,
            notes,
          }).then(res => {
            this.rejectLoading = false;
            //成功，关闭
            if (res.success) {
              this.$message.success(res.msg);
              this.goParent();
            }
          }).catch(() => {
            this.rejectLoading = false;
          })
        }
      })
    }
  },
};
</script>
