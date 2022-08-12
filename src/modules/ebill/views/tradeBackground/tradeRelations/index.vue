<template>
  <div class="FdOpenAndReceipt-OrderAudit search-page">
    <zj-tabs v-model="tabAtive">
      <el-tab-pane :label="item.label" v-for="(item, index) in tabsList" :key="index" :name="item.name">
        <component :is="tabAtive" v-if="item.name === tabAtive" ></component>
      </el-tab-pane>
    </zj-tabs>
  </div>
</template>

<script>
import myTradeRelations from './myTradeRelations'
import tradingRecord from './tradingRecord'
export default {
  name: "index",
  components: { myTradeRelations, tradingRecord },
  data() {
    return {
      tabAtive: 'myTradeRelations',
      tabsList: [
        { label: '我的贸易关系', name: 'myTradeRelations' },
        { label: '交易记录', name: 'tradingRecord' },
      ],
      // zjControl: {
      //   getDirectory: this.$api.tradeRelations.getDirectory, //字典
      // },
      // dictionary: {}
    }
  },
  methods: {
  
  },
  created() {
    // this.getDirectory();
  }
}
</script>

<style lang="less">
</style>
