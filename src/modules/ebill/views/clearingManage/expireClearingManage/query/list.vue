<template>
  <div>
    <zj-tabs v-model="activeComp">
      <el-tab-pane :label="item.label" v-for="(item,index) in tabsList" :key="`${index}b`" :name="item.name" >
        <component :is="activeComp" v-if="item.name === activeComp"></component>
      </el-tab-pane>
    </zj-tabs>
  </div>
</template>
<script>
import billFactoringClearingTab from './tabs/billFactoringClearingTab';
import orderFactoringClearingTab from './tabs/orderFactoringClearingTab.vue';
export default {
  components: {
    'billFactoringClearing': billFactoringClearingTab,
    'orderFactoringClearing': orderFactoringClearingTab
  },
  data () {
    return {
      tabsList: [
        {
          label: '凭证保理清算',
          name: 'billFactoringClearing'
        },
        {
          label: '订单保理清算',
          name: 'orderFactoringClearing'
        }
      ],
      activeComp: 'billFactoringClearing'
    }
  }
};
</script>
