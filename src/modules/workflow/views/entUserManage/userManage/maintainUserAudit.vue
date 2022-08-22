<template>
  <zj-content-container>
    <zj-top-header :title="pageType === 'audit' ? '维护用户信息审核' : '维护用户交易详情'"></zj-top-header>
    <!--  交易信息  -->
    <trade-info :detailData="detailData" />
    <!--  用户信息  -->
    <zj-content-block>
      <zj-header title="用户信息"></zj-header>
      <zj-collapse title="身份证">
        <zj-table :pager="false" ref="attach" :dataList="attachInfo">
          <zj-table-column type="seq" width="60" title="序号" />
          <zj-table-column field="type" title="附件类型" />
          <zj-table-column field="fileName" title="附件" />
          <zj-table-column title="操作" fixed="right">
            <template v-slot="{ row }">
              <zj-button v-if="row.fileId" type="text" @click="toDownload(row)">下载</zj-button>
            </template>
          </zj-table-column>
        </zj-table>
      </zj-collapse>
    </zj-content-block>
    <!--  用户归属企业信息  -->
    <zj-content-block>
      <zj-header title="用户归属企业信息"></zj-header>
      <zj-content>
        <zj-table :dataList="detailData.userAndEntInfoList">
          <zj-table-column field="code" title="企业代码" />
          <zj-table-column field="customCode" title="客户业务系统编码" />
          <zj-table-column field="entName" title="企业名称" />
          <zj-table-column field="isHtEnterprise" title="是否海天集团" :formatter="(obj) => typeMap(dictionary.isHtEnterprise, obj.cellValue)" />
          <zj-table-column field="entType" title="平台客户类型" :formatter="(obj) => typeMap(dictionary.entType, obj.cellValue)" />
          <zj-table-column field="createDatetime" title="新增日期" :formatter="date" />
          <zj-table-column field="entState" title="企业状态" :formatter="(obj) => typeMap(dictionary.enterpriseStateList, obj.cellValue)" />
          <zj-table-column field="roleId" title="角色" :formatter="(obj) => typeMap(dictionary.sysRoleList, obj.cellValue)" />
        </zj-table>
      </zj-content>
    </zj-content-block>
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

export default {
  components: {
    tradeInfo,
    OperateLog,
    AuditRemark,
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
    };
  },
  created() {
    this.getEbBusinessParamLog()
  },
  methods: {
    // 获取操作记录
    getEbBusinessParamLog() {
      this.zjControl.getEbBusinessParamLog({ id: this.row.id }).then((res) => {
        this.logList = res.data.sysEntRegLogList;
      });
    },
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
    },
    //下载附件
    toDownload() {
      this.zjControl.downloadFile(this.attachInfo[0]);
    },
  },
};
</script>
