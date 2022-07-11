<template>
  <div class="FdOpenAndReceipt-OrderAudit search-page">
    <zj-tabs v-model="tabAtive">
      <el-tab-pane :label="item.label" v-for="(item,index) in tabsList" :key="index" :name="item.name" >
        <component :is="tabAtive" v-if="item.name === tabAtive" :dictionary="dictionary"></component>
      </el-tab-pane>
    </zj-tabs>
  </div>
</template>

<script>
import maintenance from './maintenance'
import myAgreement from './myAgreement'
export default {
  name: "index",
  components:{maintenance, myAgreement},
  data(){
    return{
      tabAtive:'maintenance',
      tabsList: [
        {label:'阶段性协议维护',name:'maintenance'},
        {label:'我的阶段性协议',name:'myAgreement'},
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
.el-tabs__nav-wrap {
  margin-bottom: 20px;
}
</style>
