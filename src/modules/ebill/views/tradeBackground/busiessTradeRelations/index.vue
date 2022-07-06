<template>
  <div class="FdOpenAndReceipt-OrderAudit search-page">
    <el-tabs v-model="tabAtive" type="card" class="zj-tabs-card">
      <el-tab-pane :label="item.label" v-for="(item,index) in tabsList" :key="index" :name="item.name" >
        <component :is="tabAtive" v-if="item.name === tabAtive" :dictionary="dictionary"></component>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import myTradeRelations from './myTradeRelations'
import pending from './pending'
import processed from './processed'
export default {
  name: "index",
  components:{myTradeRelations, pending, processed},
  data(){
    return{
      tabAtive:'myTradeRelations',
      tabsList: [
        {label:'我的贸易关系',name:'myTradeRelations'},
        {label:'待办',name:'pending'},
        {label:'已完结',name:'processed'},
      ],
      dictionary:{}
    }
  },
  methods:{
   
  },
  created() {
  
  }
}
</script>

<style lang="less">










</style>
