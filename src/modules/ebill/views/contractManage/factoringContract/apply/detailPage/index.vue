<template>
  <div>
    <detail-page ref="detailPage"
                 :stepList="stepList"
                 :detail-info="detailInfo"
                 :dictionary="dictionary"
                 title="合同签约申请"></detail-page>
    <zj-content-footer>
      <zj-button  type="primary"
                  :api="zjBtn.submitEbContractApply"
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
        getDirectory: this.$api.factoringContract.getEbContractApplyDirectory,
        queryEbContractEnterSignDetail: this.$api.factoringContract.queryEbContractEnterSignApplyDetail,
        submitEbContractApply: this.$api.factoringContract.submitEbContractApply
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
      ],
      loading: false
    };
  },
  created() {
    this.getApi();
    this.getRow();
    this.getDetail();
  },
  methods: {
    getDic() {
      this.zjControl.getDirectory().then((res) => {
        this.dictionary = res.data
      });
    },
    getDetail() {
      this.zjControl.queryEbContractEnterSignDetail({contractId: this.row.contractId}).then(res => {
        this.detailInfo = res.data;
      });
    },
    toApply() {
      this.$confirm('是否确认提交申请？','温馨提示',{
        type: 'warning',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.loading = true;
        this.zjControl.submitEbContractApply({
          contractNo: this.row.contractNo,
          contractId: this.row.contractId
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
      })
    }
  },
};
</script>
