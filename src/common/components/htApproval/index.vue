<template>
  <!-- 海天流程组件 -->
  <ht-approval
    class="zj-ht-approval-component"
    ref="childrenRef"
    :before-cancel-submit="beforeCancelSubmit"
    :custom="params"
    :process-instance-id="processInstanceId"
    :show-upload-btn="showUploadBtn"
    :options="options"
    :snapshot-configs="snapshotConfigs"
    @submit="submitAction"
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
    beforeCancelSubmit: Function,
    /**
     * 是否显示附件上传按钮
     */
    showUploadBtn: {
      type: Boolean,
      default: false
    },
    /**
     * 表单快照配置
     */
    snapshotConfigs: {
      type: Array,
      default:() => {
        return []
      }
    }
  },
  data () {
    return {
      options: {
        request: {
          baseUrl: process.env.VUE_APP_BASE_URL,
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
      this.$emit('back-action', res);
    },
    /**
     * 用户点击提交后成功返回后的处理
     * @param res
     */
    submitAction(res) {
      this.$emit('after-submit',res);
    }
  }
};
</script>
<style lang="less">
.zj-ht-approval-component {
  #process-container {
    width: 98%;
    .config-btn {
      .el-input {
        width: 100%;
      }
    }
  }
}
</style>
