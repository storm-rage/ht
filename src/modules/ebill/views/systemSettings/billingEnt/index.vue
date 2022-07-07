<template>
<div id="billingEnt">
  <div class="zj-search-condition">
    <el-row class="button-row">
      <vxe-button class="append" icon="el-icon-circle-plus-outline" @click="goChild('ebBuyerSettingAdd')" :api="zjBtn.add">新增</vxe-button>
      <vxe-button class="reset" icon="el-icon-refresh" @click="resetSearch">重置</vxe-button>
      <vxe-button class="search" icon="el-icon-search" @click="search">查询</vxe-button>
    </el-row>
    <el-form ref="searchForm" :model="searchForm">
      <el-form-item label="开单业务方：">
        <el-input v-model="searchForm.entName" @keyup.enter.native="enterSearch"/>
      </el-form-item>
      <el-form-item label="维护状态：">
        <el-select v-model="searchForm.state" filterable :popper-append-to-body="false">
          <el-option v-for="item in dictionary.stateList" :key="item.code" :label="item.desc" :value="item.code"/>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
  <div class="zj-search-response">
    <zj-table ref="searchTable" :api="zjControl.tableApi" :params="searchForm">
      <zj-table-column field="entCode" title="企业代码"/>
      <zj-table-column field="entName" title="开单业务方"/>
      <zj-table-column field="state" title="维护状态" :formatter="(obj) => typeMap(dictionary.stateList,obj.cellValue)"/>
      <zj-table-column field="modifyDatetime" title="最近更新日期" :formatter="date"/>
      <zj-table-column  title="操作" fixed="right" v-if="zjBtn.views || zjBtn.update">
        <template v-slot="{row}">
          <zj-button type="text" @click="goChild('ebBuyerSettingDeploy',row)" :api="zjBtn.update">维护</zj-button>
          <zj-button type="text" @click="goChild('ebBuyerSettingDetail',row)" :api="zjBtn.views">查看</zj-button>
        </template>
      </zj-table-column>
    </zj-table>
  </div>
</div>
</template>

<script>
    export default {
        data(){
          return {
            searchForm:{
              entName:'',
              state:''
            },
            zjControl:{
              getDictionary:this.$api.billingEnt.getDictionary,//获取字典
              tableApi:this.$api.billingEnt.queryEbBuyerParamPage,//列表查询
              views:this.$api.billingEnt.queryEbBuyerParamByOne,//详情
              update:this.$api.billingEnt.updateEbBuyerParamsByOne,//修改
              add:this.$api.billingEnt.addEbBuyerParam,//新增
            },
            dictionary:{}
          }
        },
        created(){
          this.getDictionary()
          this.getApi()
        },
        methods:{
          getDictionary(){
            this.zjControl.getDictionary().then(res => {
              this.dictionary = res.data
            })
          },
        }
    }
</script>

<style lang="less">
#billingEnt{

}
</style>
