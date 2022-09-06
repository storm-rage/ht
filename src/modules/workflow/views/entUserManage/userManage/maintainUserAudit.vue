<template>
  <zj-content-container>
    <zj-top-header :title="pageType === 'audit' ? '维护用户信息审核' : '维护用户交易详情'"></zj-top-header>

    <!--  交易信息  -->
    <trade-info :detailData="detailData" :dictionary="dictionary" />

    <!-- 平台方 用户信息  -->
    <user-update ref="userUpdate" :form="detailData" :dictionary="dictionary" :isEdit="isEdit" @formPass="formPass" v-if="type === 'PT'" />

    <!-- 客户方 用户信息  -->
    <user-info-kh ref="userInfoKH" :form="detailData" :dictionary="dictionary" v-if="type === 'KH'" />

    <!--  操作记录  -->
    <operate-log ref="operateLog" :logList="logList"></operate-log>

    <!--  审核意见  -->
    <audit-remark ref="auditRemark" v-if="$route.name === 'entApplyReject' || pageType === 'edit'"></audit-remark>

    <zj-content-footer>
      <template v-if="pageType !== 'agendaDetail'">
        <zj-button type="primary" @click="toPass">复核通过</zj-button>
        <zj-button @click="toReject" v-if="row.workflowState === 'U002'">驳回上一级</zj-button>
        <zj-button @click="toReject" v-else-if="row.workflowState === 'U006'">作废</zj-button>
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
import OperateLog from "../../components/operateLog";
import AuditRemark from "../../components/auditRemark";
import userUpdate from '@modules/base/views/entUserManage/userManage/userUpdate/userUpdate.vue'
import userInfoKh from './userInfoKH.vue'
export default {
  components: {
    tradeInfo,
    OperateLog,
    AuditRemark,
    userUpdate,
    userInfoKh
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
      isEdit: this.$route.meta.pageType === 'edit',
      type: ""
    };
  },
  created() {
    this.getRow()
    this.getDictionary()
    this.getDetail()
  },
  methods: {
    //获取字典
    getDictionary() {
      this.zjControl.getUserDictionary().then((res) => {
        this.dictionary = res.data;
      });
    },
    //详情
    getDetail() {
      this.type = this.row.startObject
      let autoApi = this.zjControl.getUserInformationDetail // 平台方详情接口
      if (this.type === 'KH') {
        autoApi = this.zjControl.getUserInformationKhDetail // 客户方详情接口
      }
      autoApi({ serialNo: this.row.serialNo }).then(res => {
        this.detailData = res.data
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
      if (this.row.workflowState !== 'U006') {
        params = { serialNo: params.serialNo }
      }
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
      }
      if (this.state = 'reject') {
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
          } else {
            this.$message.warning('请选输入审核意见!')
          }
        })
      }

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
    //下载附件
    toDownload() {
      this.zjControl.downloadFile(this.attachInfo[0]);
    },
  },
};
</script>
