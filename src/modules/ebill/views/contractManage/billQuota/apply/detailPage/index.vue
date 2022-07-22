<template>
  <div>
    <detail-page ref="detailPage"
                 is-edit
                 :fileList="fileList"
                 :detailInfo="detailInfo"
                 :dic="dictionary"
                 title="额度变更申请"
                 style="padding-bottom: 0"></detail-page>
    <zj-content style="padding-top: 0">
      <div>
        <el-link type="primary" :underline="false" @click="toDownload">《额度调整申请书》</el-link>
      </div>
      <div style="margin-top: 35px">
        <zj-content-tip text="注：1.调整后额度=原额度+本次申请增加额度。"></zj-content-tip>
      </div>
    </zj-content>

    <zj-content-footer>
      <zj-button type="primary"
                 :disabled="loading"
                 @click="toApply">提交申请</zj-button>
      <zj-button  @click="goParent">返回</zj-button>
    </zj-content-footer>
  </div>
</template>

<script>
import DetailPage from '../../detail/index';
export default {
  components: {DetailPage},
  data() {
    return {
      zjControl: {
        getDataDirectory: this.$api.billQuotaManage.getDataDirectory,
        getApplyDetail: this.$api.billQuotaManage.getAdjustCreditApplyDetail,
        downloadTemplate: this.$api.billQuotaManage.downloadTemplate,
        submitCheck: this.$api.billQuotaManage.submitCheck,
        submitAdjustCreditApply: this.$api.billQuotaManage.submitAdjustCreditApply
      },
      // 字典
      dictionary: {},
      //详情信息
      detailInfo: {},
      // 附件信息
      fileList:[],
      loading: false
    };
  },
  created() {
    this.getApi();
    this.getDic();
    this.getRow();
    this.getDetail();
  },
  methods: {
    getDic () {
      this.zjControl.getDataDirectory().then(res => {
        this.dictionary = res.data
      })
    },
    getDetail() {
      this.zjControl.getApplyDetail({creditId: this.row.creditId}).then(res => {
        this.detailInfo = res.data;
        if (res.data && res.data.agreementInfoList) {
          this.fileList = res.data.agreementInfoList;
        }
      });
    },
    /**
     * 下载额度调整申请书
     */
    toDownload() {
      this.zjControl.downloadTemplate()
    },
    /**
     * 提交申请
     */
    toApply() {
      this.$refs.detailPage.getForm().validate((valid) => {
        if (valid) {
          const money = this.money(this.$refs.detailPage.$data.form.applyAddCreditAmount);
          this.$confirm(`您本次申请调整额度：<b style="font-size: 18px;">${money}</b>元，请确认。`,'额度调整申请确认',{
            dangerouslyUseHTMLString: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(() => {
            this.loading = true;
            const params = {
              applyAddCreditAmount: this.$refs.detailPage.$data.form.applyAddCreditAmount,
              contractId: this.detailInfo.contractId,
              creditId: this.row.creditId
            }
            this.zjControl.submitCheck(params).then(() => {
              this.zjControl.submitAdjustCreditApply(params).then((ret) => {
                this.loading = false;
                //成功，关闭
                if (ret.success) {
                  this.$message.success(ret.msg);
                  this.goParent();
                }
              }).catch(() => {
                this.loading = false;
              })
            }).catch(() => {
              this.loading = false;
            })
          })
        }
      })
    }
  },
};
</script>
