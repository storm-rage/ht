<template>
  <zj-content-container>
    <zj-top-header title="应收账款转让通知详情"></zj-top-header>
    <el-form  ref="form" label-width="160px">
      <zj-content-block>
        <zj-header title="基础信息"></zj-header>
        <zj-content>
          <el-row>
            <el-col :span="8">
              <el-form-item label="申请流水号：">
                <span>{{detailInfo.serialNo}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="转出企业：">
                <span>{{detailInfo.fromEntName}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="签收企业/资金方：">
                <span>{{detailInfo.toEntName}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="转让日期：">
                <span>{{detailInfo.tranferDate}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="签署回执时间：">
                <span>{{detailInfo.receiveDate}}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </zj-content>
      </zj-content-block>
      <zj-content-block>
        <zj-header title="协议信息"></zj-header>
        <zj-content>
          <zj-table :dataList="agreementList" :pager="false">
            <zj-table-column
              type="seq"
              width="60"
              title="序号"/>
            <zj-table-column
              field="agreementFileName"
              title="应收账款转让通知函"/>
            <zj-table-column title="操作" fixed="right">
              <template v-slot="{ row }">
                <zj-button type="text" @click="toDownload(row)">下载</zj-button>
              </template>
            </zj-table-column>
          </zj-table>
        </zj-content>
      </zj-content-block>
    </el-form>
    <zj-content-footer>
      <zj-button @click="goParent">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>
<script>
export default {
  data () {
    return {
      zjControl: {
        getNoticerRecordDetail: this.$api.transferNotifyManage.getAssignmentNoticerRecordDetail,
        downApi: this.$api.baseCommon.downloadFile
      },
      detailInfo: {},
      // 协议信息
      agreementList: []
    };
  },
  created() {
    const route = this.$route;
    // 来自回执的详情
    if (route.meta.routeType === 'receipt') {
      this.zjControl.getNoticerRecordDetail = this.$api.transferNotifyManage.getAssignmentNoticeReceiptDetail;
    }
    this.getApi();
    this.getRow();
    this.getDetail();
  },
  methods: {
    getDetail() {
      this.zjControl.getNoticerRecordDetail({serialNo: this.row.serialNo}).then(res => {
        this.detailInfo = res.data;
        if (res.data.zrtzAgreement) {
          this.agreementList.push(res.data.zrtzAgreement);
        }
        if (res.data.zrtzqrAgreement) {
          this.agreementList.push(res.data.zrtzqrAgreement);
        }
      });
    },
    toDownload (row) {
      this.zjControl.downApi(row);
    }
  }
};
</script>
