export default {
  data() {
    return {
      processInstanceId: '',
      zjControl: {
        getProcessInstanceId: this.$api.businessManageWorkflow.getProcessInstanceId
      }
    }
  },
  methods: {
    getProcessInstance () {
      this.zjControl.getProcessInstanceId( {
        id: this.bizId,
        type: this.bizType
      }).then(res => {
        this.processInstanceId = res.data.processInstanceId
      })
    }
  }
};
