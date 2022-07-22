<template>
  <div>
    <detail-page ref="detailPage"
                 :fileList="fileList"
                 :detailInfo="detailInfo"
                 :dic="dictionary"
                 title="额度变更交易详情"></detail-page>
    <zj-content-footer>
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
        getCreditQueryDic: this.$api.billQuotaManage.getCreditQueryDic,
        queryDetail: this.$api.billQuotaManage.getCreditQueryDetail,
        getAgreement: this.$api.billQuotaManage.getAgreement
      },
      //字典
      dictionary: {},
      //详情信息
      detailInfo: {},
      // 附件信息
      fileList:[]
    };
  },
  created() {
    this.getApi();
    this.getDic();
    this.getRow();
    this.getDetail();
    this.getFileList();
  },
  methods: {
    getDetail() {
      this.zjControl.queryDetail({contractId: this.row.contractId,factoringCreditId: this.row.factoringCreditId}).then(res => {
        this.detailInfo = res.data;
      });
    },
    getFileList() {
      this.zjControl.getAgreement({contractId: this.row.contractId}).then(res => {
        this.fileList = res.data;
      });
    },
    getDic () {
      this.zjControl.getCreditQueryDic().then(res => {
        this.dictionary = res.data
      })
    },
  },
};
</script>
