export default {
  data () {
    return {
      zjControl: {
        getDetail: this.$api.expireClearingManage.getClearDetails,
        submitClearApply: this.$api.expireClearingManage.submitClearApply,
        getFinanceDetails: this.$api.expireClearingManage.getFinanceDetails
      },
      //基础信息
      basicInfo:{},
      // 待清算凭证/订单列表
      billList: [],
      // 附件信息
      attachList: [],
      loading: false
    };
  },
  created() {
    this.getApi();
    this.getRow();
    this.getDetail();
  },
  methods: {
    /**
     * 到期清算转换附件成通用的附件列表
     * @param list
     * @returns {*}
     */
    transferListToCommon(list) {
      return list;
    },
    /**
     * 通用的附件列表转换成到期清算转换附件列表
     * @param list
     */
    transferCommonToExpireList(list) {
      return list;
    },
    getDetail() {
      this.zjControl.getDetail({
        clearId: this.row.clearId,
        clearType: this.row.clearType
      }).then(res => {
        this.basicInfo = res.data.basicInfo;
        this.billList = res.data.waitClearInfoList;
        if (this.billList)
          this.attachList = this.transferListToCommon(res.data.attachInfoList || []);
      });
    },
    toApply () {
      this.$confirm('是否确认提交？','提示',{
        type: 'warning',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        const fileData = this.$refs.fileInfo.getNormalData();
        this.loading = true;
        this.zjControl.submitClearApply({
          attachInfoList: this.transferCommonToExpireList(fileData.list),
          bizDesc: fileData.busDesc,
          clearIds: this.row.clearId,
          clearType: this.row.clearType
        }).then(res => {
          this.loading = false;
          if (res.success) {
            this.$message.success(res.msg);
            this.goParent();
          }
        }).catch(() => {
          this.loading = false;
        });
      })
    },
    back () {
      this.$confirm('返回上一页平台将不保存当前操作，请确认是否返回上一页？','提示',{
        type: 'warning',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.goParent();
      })
    }
  }
};
