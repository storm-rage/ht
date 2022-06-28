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
import onLine from './onLine'
import offline from './offline'
export default {
  name: "index",
  components:{onLine, offline},
  data(){
    return{
      tabAtive:'onLine',
      tabsList: [
        {label:'线上对账单',name:'onLine'},
        {label:'线下对账单',name:'offline'},
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
