<template>
<div id="bankSup">
  <div class="zj-search-condition">
    <el-row class="button-row">
      <vxe-button class="append" icon="el-icon-circle-plus-outline" @click="goChild('bankFundingSellerAdd')" :api="zjBtn.addSup">新增</vxe-button>
      <vxe-button class="reset" icon="el-icon-refresh" @click="resetSearch">重置</vxe-button>
      <vxe-button class="search" icon="el-icon-search" @click="search">查询</vxe-button>
    </el-row>
    <el-form ref="searchForm" :model="searchForm">
      <el-form-item label="资金方企业名称：">
        <el-input v-model="searchForm.fundingEntNameLike" @keyup.enter.native="enterSearch"/>
      </el-form-item>
      <el-form-item label="供应商企业名称：">
        <el-input v-model="searchForm.entNameLike" @keyup.enter.native="enterSearch"/>
      </el-form-item>
      <el-form-item label="是否准入：">
        <el-select v-model="searchForm.isAllow" filterable :popper-append-to-body="false">
          <el-option v-for="item in dictionary.isAllow" :key="item.code" :label="item.desc" :value="item.code"/>
        </el-select>
      </el-form-item>
      <el-form-item label="同步状态：">
        <el-select v-model="searchForm.synState" filterable :popper-append-to-body="false">
          <el-option v-for="item in dictionary.synState" :key="item.code" :label="item.desc" :value="item.code"/>
        </el-select>
      </el-form-item>
      <el-form-item label="平台项目名称：">
        <el-select v-model="searchForm.projectNameLike" filterable :popper-append-to-body="false">
          <el-option v-for="item in dictionary.entProjectLists" :key="item.desc" :label="item.desc" :value="item.desc"/>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
  <div class="zj-search-response">
    <zj-table ref="searchTable" :api="zjControl.tableApi" :params="searchForm">
      <zj-table-column field="fundingEntName" title="资金方企业名称"/>
      <zj-table-column field="projectName" title="平台项目名称"/>
      <zj-table-column field="entName" title="供应商企业名称"/>
      <zj-table-column field="isAllow" title="是否准入" :formatter="(obj) => typeMap(dictionary.isAllow,obj.cellValue)"/>
      <zj-table-column field="allowDate" title="准入日期" :formatter="date"/>
      <zj-table-column field="synState" title="同步状态" :formatter="(obj) => typeMap(dictionary.synState,obj.cellValue)"/>
      <zj-table-column field="synNotes" title="备注"/>
      <zj-table-column  title="操作" fixed="right">
        <template v-slot="{row}">
          <zj-button type="text" @click="send(row)" v-if="row.synState === '0' || row.synState === '2'" :api="zjBtn.sendSup">重新发送</zj-button>
          <zj-button type="text" @click="goChild('bankFundingSellerEdit',row)" :api="zjBtn.updateSup">修改</zj-button>
          <zj-button type="text" @click="goChild('bankFundingSellerDetail',row)" :api="zjBtn.viewSup">查看</zj-button>
        </template>
      </zj-table-column>
    </zj-table>
  </div>
</div>
</template>

<script>
    export default {
        name: "index",
        data(){
          return {
            searchForm:{
              fundingEntNameLike:'',
              entNameLike:'',
              isAllow:'',
              synState:'',
              projectNameLike: ''
            },
            zjControl:{
              getDictionary:this.$api.bankSup.getDictionary,//字典
              getFundingList:this.$api.bankSup.getFundingList,//获取资金端信息列表
              tableApi:this.$api.bankSup.queryFundingSellerParamPage,//列表查询
              addSup:this.$api.bankSup.saveFundingSellerParam,//新增
              sendSup:this.$api.bankSup.resendFundingSellerParam,//重新发送
              updateSup:this.$api.bankSup.updateFundingSellerParam,//修改
              viewSup:this.$api.bankSup.getSignBillInfoDetail, //查看
            },
            dictionary:{}
          }
        },
        created() {
          this.getApi()
          this.getDictionary()
          this.getFundingList()
        },
        methods:{
          getDictionary(){
            this.zjControl.getDictionary().then(res => {
              this.dictionary = res.data;
            })
          },
          getFundingList(){
            /*this.zjControl.getFundingList({projectId: '0'}).then(res => {
              this.dictionary = Object.assign(this.dictionary,res.data)
            })*/
          },
          send(row){
            this.$messageBox({
              type:'info',
              title:'是否重新发送？',
              content:`确认后系统将重新同步 ${row.fundingEntName} 与 ${row.entName} 的状态与信息。`,
              showCancelButton:true,
              messageResolve:()=>{
                let params = {
                  id:row.id
                }
                this.zjControl.sendSup(params).then(res => {
                  if(res.success){
                    this.$Message.success(res.msg ? res.msg :'重新发送成功！')
                  }else{
                    this.$Message.error(res.msg ? res.msg :'重新发送失败！')
                  }
                  // console.error(res)

                  this.search()
                })
              }
            })
          },
        }
    }
</script>

<style lang="less">
#bankSup{

}
</style>
