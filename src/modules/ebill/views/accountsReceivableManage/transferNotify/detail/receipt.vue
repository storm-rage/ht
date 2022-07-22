<template>
  <zj-content-container>
    <zj-top-header title="应收账款转让通知回执"></zj-top-header>
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
          </el-row>
        </zj-content>
      </zj-content-block>
<!--      <zj-content-block>-->
<!--        <zj-header title="协议信息"></zj-header>-->
<!--        <zj-content>-->
<!--          <zj-table :pager="false">-->
<!--            <zj-table-column-->
<!--              type="seq"-->
<!--              width="60"-->
<!--              title="序号"/>-->
<!--            <zj-table-column-->
<!--              field="field2"-->
<!--              title="协议附件"/>-->
<!--            <zj-table-column title="操作" fixed="right">-->
<!--              <template v-slot="{ row }">-->
<!--                <zj-button type="text" @click="toDownload(row)">下载</zj-button>-->
<!--              </template>-->
<!--            </zj-table-column>-->
<!--          </zj-table>-->
<!--        </zj-content>-->
<!--      </zj-content-block>-->
    </el-form>
    <zj-content-footer>
      <span style="display: inline-block;margin-right: 10px">
        <el-checkbox v-model="agreeCheck">已阅读并同意</el-checkbox>&nbsp;
        <el-link :underline="false" type="primary" @click="toDownloadTemplate">《应收账款转让通知确认函》</el-link>
      </span>
      <zj-button type="primary"
                 :disabled="loading"
                 :api="zjBtn.confirmAssignmentNoticeReceipt"
                 @click="toReceipt">回执确认</zj-button>
      <zj-button @click="goParent">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>
<script>
export default {
  data () {
    return {
      zjControl: {
        getNoticerRecordDetail: this.$api.transferNotifyManage.getAssignmentNoticeReceiptDetail,
        confirmAssignmentNoticeReceipt: this.$api.transferNotifyManage.confirmAssignmentNoticeReceipt,
        downloadTemplate: this.$api.transferNotifyManage.downloadTemplate,
        downApi: this.$api.baseCommon.downloadFile
      },
      //详情信息
      detailInfo: {},
      loading: false,
      agreeCheck: false
    };
  },
  created() {
    this.getApi();
    this.getRow();
    this.getDetail();
  },
  methods: {
    getDetail() {
      this.zjControl.getNoticerRecordDetail({serialNo: this.row.serialNo}).then(res => {
        this.detailInfo = res.data;
      });
    },
    toDownload (row) {
      this.zjControl.downApi(row);
    },
    toDownloadTemplate() {
      this.zjControl.downloadTemplate(this.detailInfo);
    },
    toReceipt() {
      if (this.agreeCheck) {
        this.$confirm('是否确认签署？', '温馨提示', {
          dangerouslyUseHTMLString: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          this.loading = true;
          this.zjControl.confirmAssignmentNoticeReceipt({
            serialNo: this.row.serialNo
          }).then(res => {
            this.loading = false;
            //成功，关闭
            if (res.success) {
              this.$message.success(res.msg);
              this.goParent();
            }
          }).catch(() => {
            this.loading = false;
          });
        });
      }else {
        this.$alert('请阅读并同意《应收账款转让通知确认函》','提示', {
          type: 'warning'
        })
      }
    },
  }
};
</script>
