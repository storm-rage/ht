<template>
  <zj-content-container>
    <zj-top-header :title="pageType === 'audit' ? '维护用户信息审核' : '维护用户交易详情'"></zj-top-header>
    <!--  交易信息  -->
    <trade-info :detailData="detailData" @getDictionary="getDictionary" />
    <!--  用户信息  -->
    <user-update ref="userUpdate" :form="detailData" :isEdit="isEdit" @formPass="formPass" />
    <!--  操作记录  -->
    <operate-log ref="operateLog" :logList="logList"></operate-log>
    <!--  审核意见  -->
    <audit-remark ref="auditRemark" v-if="pageType === 'audit'"></audit-remark>
    <zj-content-footer>
      <template v-if="pageType === 'audit'">
        <zj-button type="primary" @click="toPass">复核通过</zj-button>
        <zj-button @click="toReject">驳回上一级</zj-button>
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
import OperateLog from "../../components/operateLog";
import AuditRemark from "../../components/auditRemark";
import userUpdate from '@modules/base/views/entUserManage/userManage/userUpdate/userUpdate.vue'
export default {
  components: {
    tradeInfo,
    OperateLog,
    AuditRemark,
    userUpdate
  },
  data() {
    return {
      pageType: this.$route.meta.pageType,
      zjControl: this.$api.entUserManage,
      detailData: {},
      dictionary: {},
      passLoading: {},
      rejectLoading: {},
      attachInfo: [{ fileId: "", type: "身份证影印件", fileName: "" }],
      logList: [],
      state: 'pass',
      isEdit: false
    };
  },
  created() {
    this.getRow()
    this.getDetail()
    // 驳回待处理可修改
    if (this.row.workflowState === 'E005') {
      this.isEdit = true
    }
  },
  methods: {
    //获取字典
    getDictionary(data) {
      this.dictionary = data
    },
    //详情
    getDetail() {
      this.zjControl.getUserInformationDetail({ serialNo: this.row.serialNo }).then(res => {
        this.detailData = res.data
        if (this.detailData.idCardAttach) {
          this.attachInfo = this.detailData.idCardAttach
          this.attachInfo[0].type = '身份证影印件'
        }
      })
    },
    // 操作记录
    getBusinessParamLog() {
      this.zjControl.getBusinessParamLog({ serialNo: this.row.serialNo }).then(res => {
        this.logList = res.data
      })
    },
    //
    formPass(params) {
      if (this.state === 'pass') {
        this.$refs.auditRemark.getForm().clearValidate();
        const { notes } = this.$refs.auditRemark.getData()
        this.passLoading = true;
        this.zjControl.todoUserSubmit({
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
        })
      } else {
        this.$refs.auditRemark.getForm().validate((valid) => {
          if (valid) {
            const { notes } = this.$refs.auditRemark.getData()
            this.rejectLoading = true;
            this.zjControl.todoUserSubmit({
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
          }
        })
      }

    },
    // 通过
    toPass() {
      this.$refs.userUpdate.handleForm()
      this.state = 'pass'
    },
    // 拒绝
    toReject() {
      this.$refs.userUpdate.handleForm()
      this.state = 'reject'
    },
    //下载附件
    toDownload() {
      this.zjControl.downloadFile(this.attachInfo[0]);
    },
  },
};
</script>
