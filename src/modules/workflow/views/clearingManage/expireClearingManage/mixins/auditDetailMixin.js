import {OperResult} from "@modules/constant";
export default {
  data () {
    return {
      zjControl: {
        getDetail: this.$api.expireClearingManageWorkflow.getReviewDetails,
        clearReview: this.$api.expireClearingManageWorkflow.clearReview,
        clearAbort: this.$api.expireClearingManageWorkflow.clearAbort,
        submitClearApply: this.$api.expireClearingManageWorkflow.submitClearApply
      },
      // 复核和驳回用到
      rejectLoading: false,
      // 复核和驳回用到
      passLoading: false,
      // 交易信息(工作流业务申请信息)
      tranInfo:{},
      // 操作记录
      operateRecordList: [],
      // 业务信息
      bizInfo:{
        attachInfoList:[],
        basicInfo: {},
        financeInfo: {},
        waitClearInfoList: []
      }
    }
  },
  created() {
    this.getApi();
    this.getRow();
    this.getDetail();
  },
  methods: {
    getDetail() {
      this.zjControl.getDetail({serialNo: this.row.serialNo}).then(res => {
        this.tranInfo = res.data.tranInfo;
        this.operateRecordList = res.data.operateRecordList;
        this.bizInfo = {
          attachInfoList: res.data.attachInfoList,
          basicInfo: res.data.basicInfo,
          financeInfo: res.data.financeInfo,
          waitClearInfoList: res.data.waitClearInfoList,
        }
      });
    },
    // 复核通过
    toReviewPass() {
      this.$refs.auditRemark.getForm().clearValidate();
      this.$confirm('是否确认复核通过？','温馨提示',{
        type: 'warning',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        const {notes} = this.$refs.auditRemark.getData()
        const clearIds = this.bizInfo.waitClearInfoList.map((item) => {
          return item.id
        });
        this.passLoading = true;
        this.zjControl.clearReview({
          operateFlag: OperResult.PASS,
          reviewOpinion: notes,
          serialNo: this.row.serialNo,
          remark: this.bizInfo.basicInfo.remark,
          clearIds
        }).then(res => {
          this.passLoading = false;
          //成功，关闭
          if (res.success) {
            this.$message.success(res.msg);
            this.goParent();
          }
        }).catch(() => {
          this.passLoading = false;
        });
      })
    },
    // 复核驳回上一步
    toReviewBack() {
      this.$refs.auditRemark.getForm().validate((valid) => {
        if (valid) {
          this.$confirm('是否确认驳回上一级？','温馨提示',{
            type: 'warning',
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(() => {
            const {notes} = this.$refs.auditRemark.getData();
            const clearIds = this.bizInfo.waitClearInfoList.map((item) => {
              return item.id
            });
            this.rejectLoading = true;
            this.zjControl.clearReview({
              operateFlag: OperResult.BACK,
              reviewOpinion: notes,
              serialNo: this.row.serialNo,
              remark: this.bizInfo.basicInfo.remark,
              clearIds
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
          });

        }
      });
    },
    // 驳回申请通过
    toPass() {
      this.$refs.auditRemark.getForm().clearValidate();
      this.$confirm('是否确认审核通过？','温馨提示',{
        type: 'warning',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        const {notes} = this.$refs.auditRemark.getData()
        const bizData = this.$refs.bizInfo.getData();
        const clearIds = this.bizInfo.waitClearInfoList.map((item) => {
          return item.id
        });
        this.passLoading = true;
        this.zjControl.submitClearApply({
          operateFlag: OperResult.PASS,
          opinion: notes,
          serialNo: this.row.serialNo,
          clearIds,
          attachInfoList: bizData.list,
          bizDesc: bizData.busDesc
        }).then(res => {
          this.passLoading = false;
          //成功，关闭
          if (res.success) {
            this.$message.success(res.msg);
            this.goParent();
          }
        }).catch(() => {
          this.passLoading = false;
        });
      })
    },
    // 驳回申请拒绝
    toReject() {
      this.$refs.auditRemark.getForm().validate((valid) => {
        if (valid) {
          this.$confirm('是否确认拒绝？','温馨提示',{
            type: 'warning',
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(() => {
            const {notes} = this.$refs.auditRemark.getData();
            this.rejectLoading = true;
            this.zjControl.clearAbort({
              reviewOpinion: notes,
              serialNo: this.row.serialNo
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
          });
        }
      });
    },
  }
};
