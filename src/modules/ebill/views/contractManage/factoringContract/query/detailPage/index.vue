<template>
  <div>
    <detail-page ref="detailPage"
                 :stepList="stepList"
                 :stepActive="4"
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
      stepList: [
        {
          title: '签约申请',
          desc: ''
        },
        {
          title: '签约复核',
          desc: ''
        },
        {
          title: '买方签署转让回执',
          desc: ''
        },
        {
          title: '保理公司签约',
          desc: ''
        },
        {
          title: '保理合同签约完成',
          desc: ''
        }
      ]
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
      this.zjControl.queryMyEbContractDetail({contractId: this.row.contractId}).then(res => {
        this.detailInfo = res.data;
      });
    }
  },
};
</script>
