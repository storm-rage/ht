<template>
  <!-- 海天流程组件 -->
  <ht-approval
    ref="childrenRef"
    :before-cancel-submit="beforeCancelSubmit"
    :custom="params"
    :process-instance-id="processInstanceId"
    :options="options"
    @back="backAction"
  ></ht-approval>
</template>
<script>
/**
 * 海天流程引擎封装
 */
import HtApproval from 'ht-approval';
export default {
  name: 'ZjHtApproval',
  components: {
    HtApproval
  },
  props: {
    /**
     * 流程实例ID（流程全局ID）
     */
    processInstanceId: {
      type: String,
      required: true
    },
    /**
     * 审批携带的参数
     */
    params:Object,
    /**
     * 撤销前置动作
     */
    beforeCancelSubmit: Function
  },
  data () {
    return {
      options: {
        request: {
          baseUrl: '/',
          timeOut: 120000,
          interceptors: (config) => {
            return config
          }
        }
      }
    }
  },
  methods: {
    backAction (res) {
      this.$message({
        message: '退回成功',
        type: 'success'
      })
    }
  }
};
</script>
