<template>
  <zj-content-container>
    <zj-top-header :title="$route.name === 'entApplyAudit' ? '复核企业信息申请' : '企业信息申请交易详情'"></zj-top-header>

    <!--  交易信息  -->
    <trade-info :detailData="detailData" :dictionary="dictionary" />

    <!--  平台方企业基础信息 -->
    <ent-info-edit ref="entInfoedit" :form="detailData" @getDictionary="getDictionary" @formPass="formPass" v-if="type === 'PT'" />

    <!--  客户方企业基础信息 -->
    <ent-info-kh ref="entInfoKH" :detailData="detailData" :dictionary="dictionary" :isEdit="false" v-if="type === 'KH'" />

    <!--  审批意见  -->
    <audit-remark ref="auditRemark" v-if="$route.name === 'entApplyAudit'"></audit-remark>

    <zj-content-footer>
      <zj-button type="primary" @click="toPass">复核通过</zj-button>
      <zj-button @click="toReject" v-if="row.workflowState === 'E005' || type==='KH'">拒绝</zj-button>
      <zj-button @click="toReject" v-else>驳回上一级</zj-button>
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
import entInfoKh from "@modules/base/views/sysModules/personalCenter/entInfoMaintain/entForm"
import AuditRemark from '../../components/auditRemark';

export default {
  components: {
    tradeInfo,
    entInfoEdit,
    AuditRemark,
    entInfoKh
  },
  data() {
    return {
      zjControl: this.$api.entUserManage,
      detailData: {},
      dictionary: {},
      passLoading: {},
      rejectLoading: {},
      state: 'pass',
      type: ""
    };
  },
  created() {
    this.getRow()
    this.getDetail()
    // 驳回待处理可修改
    if (this.row.workflowState === 'E005') {
      this.$route.meta.pageType = 'edit'
    }
    this.type = this.row.startObject
  },
  methods: {
    getDictionary(data) {
      this.dictionary = data
    },
    //获取详情
    getDetail() {
      let autoApi = this.zjControl.getTodoEnterprise // 平台方详情接口
      if (this.type === 'KH') {
        autoApi = this.zjControl.getTodoEnterpriseKhInfo // 客户方详情接口
      }
      autoApi({ serialNo: this.row.serialNo }).then(res => {
        this.detailData = res.data
      })
    },
    // 通过
    toPass() {
      this.state = 'pass'
      if (this.type === 'PT') {
        this.$refs.userUpdate.handleForm()
      }
      if (this.type === 'KH') {
        this.formPass({ serialNo: this.row.serialNo })
      }
    },
    // 拒绝
    toReject() {
      this.state = 'reject'
      if (this.type === 'PT') {
        this.$refs.userUpdate.handleForm()
      }
      if (this.type === 'KH') {
        this.formPass({ serialNo: this.row.serialNo })
      }
    },
    formPass(params) {
      if (this.state === 'pass') {
        this.$refs.auditRemark.getForm().clearValidate();
        const { notes } = this.$refs.auditRemark.getData()
        
        this.passLoading = true;
        this.zjControl.todoEnterpriseSubmit({
          flag: '1',
          params,
          ...entFrom,
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
      }
      else {
        this.$refs.auditRemark.getForm().validate((valid) => {
          if (valid) {
            const { notes } = this.$refs.auditRemark.getData()
            this.rejectLoading = true;
            this.zjControl.todoEnterpriseSubmit({
              flag: '2',
              params,
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
  },
};
</script>
