<template>
  <zj-content-block>
    <zj-content>
      <zj-content-block>
        <div v-if="billTraceTree">
          <trace-tree
            :data="billTraceTree"
            collapsable
            :on-expand="onExpand"
            :on-pdf="viewPdf"
          ></trace-tree>
        </div>
        <div class="zj-center empty" v-if="!billTraceTree">
          暂无轨迹数据记录
        </div>
      </zj-content-block>

    </zj-content>
  </zj-content-block>
</template>

<script>
import traceTree from "@pubComponent/traceTree";
export default {
  name: 'locus',
  props: {
    billTraceTree: Array,
  },
  components: {
    traceTree,
  },
  data() {
    return {
      nodePdf: null,
    };
  },
  created() {},
  methods: {
    onExpand(e,data) {
      if('expand' in data) {
        data.expand = !data.expand
        if(!data.expand && data.children) {
          this.collapse(data.children)
        }
      } else {
        this.$set(data, 'expand', true)
      }
    },
    viewPdf(data) {
      this.isShowFooter = true
      this.isDownLoad = true
      console.log('data-init:', data)
      this.nodePdf = data
      this.previewFile(data)
    }
  },
};
</script>

<style scoped lang="less">
</style>
