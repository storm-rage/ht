<template>
  <zj-content-container>
    <zj-top-header title="贸易关系交易详情"></zj-top-header>
    <!--  贸易关系信息  -->
    <relations-info />
    <!--  操作记录  -->
    <operate-log></operate-log>
    <zj-content-footer>
      <zj-button @click="back">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>
<script>
import relationsInfo from '@modules/ebill/views/tradeBackground/busiessTradeRelations/detilt/info'
import OperateLog from '../components/operateLog';

export default {
  components: {
    relationsInfo,
    OperateLog,
  },
  data () {
    return {}
  },
  methods: {
    back () {}
  }
};
</script>
