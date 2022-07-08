<template>
  <div>
    <el-tabs v-model="tabActive" type="card" class="zj-tabs-card">
      <el-tab-pane :label="item.label" v-for="(item,index) in tabsList" :key="`${index}b`" :name="item.name" >
        <component :is="tabActive" v-if="item.name === tabActive"></component>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import billFactoringClearingList from './tabs/billFactoringClearingList';
export default {
  components: {
    'billFactoringClearing': billFactoringClearingList
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
      tabActive: 'billFactoringClearing'
    }
  }
};
</script>
