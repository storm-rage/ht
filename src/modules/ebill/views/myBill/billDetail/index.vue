<template>
  <zj-content-container>
    <!-- 凭证详情 -->
    <detail v-show="workflow === 'detail'" />

    <!-- 贸易背景 -->
    <trade-background v-show="workflow === 'tradeBackground'" />

    <!-- 融单轨迹 -->
    <locus v-show="workflow === 'locus'" />

    <zj-workflow v-model="workflow" :list="workflowList">
      <el-row slot="right">
        <zj-button @click="&quot;&quot;;" class="back">返回</zj-button>
      </el-row>
    </zj-workflow>
  </zj-content-container>
</template>

<script>
import detail from "./detail";
import tradeBackground from "./tradeBackground";
import locus from "./locus";
export default {
  components: {
    detail,
    tradeBackground,
    locus,
  },
  data() {
    return {
      zjControl: {},
      detailData: {},
      workflow: "detail",
      workflowList: [
        { label: "凭证详情", value: "detail" },
        { label: "贸易背景", value: "tradeBackground" },
        { label: "流转轨迹", value: "locus" },
      ],
    };
  },
  created() {
  },
  methods: {},
};
</script>

<style scoped lang="less">
/deep/#ZjWorkflow {
  .workflow-top {
    .el-row {
      padding: 5px 0 0;
      text-align: center;
    }
  }
  .workflow-bottom {
    .right {
      width: calc(50% - 100px);
      text-align: center;
    }
  }
}
</style>
