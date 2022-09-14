<template>
  <zj-content-container>
    <zj-top-header :title="pageType === 'audit' || pageType === 'edit' || pageType === 'add' ? '复核企业信息申请' : '企业信息申请交易详情'"></zj-top-header>

    <!--  交易信息  -->
    <trade-info :detailData="detailData" :dictionary="dictionary" />

    <!--  平台方企业基础信息 -->
    <ent-info-edit ref="entInfoeEdit" :form="detailData" @formPass="formPass" v-if="type === 'PT'" />

    <!--  客户方企业基础信息 -->
    <ent-info-kh ref="entInfoKH" :detailData="detailData" :dictionary="dictionary" :isEdit="false" v-if="type === 'KH'" />

    <!--  审批意见  -->
    <audit-remark ref="auditRemark" v-if="pageType === 'audit' || pageType === 'edit' || pageType === 'add'"></audit-remark>

    <zj-content-footer>
      <template v-if="pageType === 'audit' || pageType === 'edit' || pageType === 'add'">
        <zj-button type="primary" @click="toPass">复核通过</zj-button>
        <zj-button @click="toReject" v-if="row.workflowState === 'E002'">驳回上一级</zj-button>
        <zj-button @click="toReject" v-else-if="row.workflowState === 'E005'">作废</zj-button>
        <zj-button @click="toReject" v-else>拒绝</zj-button>
      </template>
      <zj-button @click="goParent">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>

<script>
/**
 * 复核企业信息申请页面
 */
import tradeInfo from "../components/tradeInfo";
import entInfoEdit from '@modules/base/views/entUserManage/entManage/workflow/entInfoEdit';
import entInfoKh from "@modules/base/views/sysModules/personalCenter/entInfoMaintain/workflow/entForm"
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
      pageType: this.$route.meta.pageType,
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
    this.getDictionary()
    this.getTodoBusinessParamLog()
  },
  methods: {
    getDictionary() {
      this.zjControl.queryEntDictionary().then(res => {
        this.dictionary = res.data
        this.getDetail()
      })
    },
    // 获取操作记录
    getTodoBusinessParamLog() {
      let params = {
        serialNo: this.row.serialNo
      }
      this.zjControl.getTodoBusinessParamLog(params).then((res) => {
        this.$nextTick(() => {
          this.$refs.entInfoeEdit.$data.logList = res.data.sysEntRegLogList;
        })
      });
    },
    //获取详情
    getDetail() {
      this.type = this.row.startObject
      let autoApi = this.zjControl.getTodoEnterprise // 平台方详情接口
      if (this.type === 'KH') {
        autoApi = this.zjControl.getTodoEnterpriseKhInfo // 客户方详情接口
      }
      autoApi({ serialNo: this.row.serialNo }).then(res => {
        this.detailData = res.data
        if (this.type === 'KH') {
          this.detailData.form = res.data
          this.detailData.entBankInfo = [{ // 银行账户信息
            bankAccname: res.data.bankAccname,
            bankAccno: res.data.bankAccno,
            bankName: res.data.bankName,
            bankNo: res.data.bankNo,
            bankType: res.data.bankType,
          }]
          this.detailData.attachInfo = { // 附件
            qyyzAttachId: res.data.qyyzAttachId,
            qyyzAttachName: res.data.qyyzAttachName,
            qyfrzjAttachId: res.data.qyfrzjAttachId,
            qyfrzjAttachName: res.data.qyfrzjAttachName
          }
          // console.log(this.detailData)
        }
      })
    },
    // 通过
    toPass() {
      this.state = 'pass'
      if (this.type === 'PT') {
        this.$refs.entInfoeEdit.handleForm()
      }
      if (this.type === 'KH') {
        this.formPass({ serialNo: this.row.serialNo })
      }
    },
    // 拒绝
    toReject() {
      this.state = 'reject'
      if (this.type === 'PT') {
        this.$refs.entInfoeEdit.handleForm()
      }
      if (this.type === 'KH') {
        this.formPass({ serialNo: this.row.serialNo })
      }
    },
    formPass(params) {
      if (this.row.workflowState !== 'E005') {
        params = { serialNo: params.serialNo }
      }
      this.$refs.auditRemark.getForm().clearValidate();
      if (this.state === 'pass') {
        const { notes } = this.$refs.auditRemark.getData()
        this.passLoading = true;
        this.zjControl.todoEnterpriseSubmit({
          flag: '1',
          ...params,
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
          this.$refs.auditRemark.getForm().clearValidate();
        })
      }
      else {
        this.$refs.auditRemark.getForm().validate((valid) => {
          if (valid) {
            const { notes } = this.$refs.auditRemark.getData()
            this.rejectLoading = true;
            this.zjControl.todoEnterpriseSubmit({
              flag: '2',
              ...params,
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
          } else {
            this.$message.warning('请选输入审核意见!')
            this.$refs.auditRemark.getForm().clearValidate();
          }
        })
      }
    },
  },
};
</script>
