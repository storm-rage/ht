/**
 * 公共的请求方法
 */
export default {
  data() {
    return {
      zjControl: {
        getOperateList: this.$api.businessManageWorkflow.getOperateList
      },
      // 业务申请信息
      applyModel: {},
      // 操作记录
      operateLogList: []
    }
  },
  created() {
    this.getWorkflowDetail();
  },
  methods: {
    getWorkflowDetail() {
      this.zjControl.getOperateList({id: this.row.id}).then(res => {
        this.applyModel = res.data.applyModel;
        this.operateLogList = res.data.operateLogList;
      });
    },
  }
};
