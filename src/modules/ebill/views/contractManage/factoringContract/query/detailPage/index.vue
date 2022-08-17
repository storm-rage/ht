<template>
  <div>
    <detail-page ref="detailPage"
                 :detail-info="detailInfo"
                 :dictionary="dictionary"
                 title="合同签约申请"></detail-page>
    <zj-content-footer>
      <zj-button @click="goParent">返回</zj-button>
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
        getEbContractDirectory: this.$api.factoringContract.getEbContractDirectory,
        queryMyEbContractDetail: this.$api.factoringContract.queryMyEbContractDetail
      },
      // 详情信息
      detailInfo: {},
      // 字典
      dictionary: {},
      stepList: []
    };
  },
  created() {
    this.getApi();
    // this.getDic();
    this.getRow();
    this.getDetail();
  },
  methods: {
    getDic() {
      this.zjControl.getEbContractDirectory().then((res) => {
        this.dictionary = res.data
      });
    },
    getDetail() {
      this.zjControl.queryMyEbContractDetail({serialNo: this.row.serialNo}).then(res => {
        this.detailInfo = res.data;
      });
    }
  },
};
</script>
