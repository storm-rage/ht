<template>
<div class="EnterPrises">
  <div class="zj-search-condition">
    <el-row class="quick-row">
      <zj-quick-query ref="quickQuery" @search="search" :api="zjBtn.updateEnterprise ? true : false"
                      :start.sync="searchForm.applyDateStart"
                      :end.sync="searchForm.applyDateEnd"
      />
    </el-row>
    <el-row class="checkbox-row">
      <zj-checkbox
                   :list="dictionary.entTypeCheckList" :value.sync="entTypeList"
                   @handleCheckedChange="handleCheckedChange"
      />
    </el-row>
    <el-row class="button-row">
      <zj-button class="append" icon="el-icon-circle-plus-outline" @click="goChild('entManageAdd')" :api="zjBtn.addEnterprise">新增</zj-button>
      <zj-button class="export" icon="iconfont icon-daochu" @click="exportList" :api="zjBtn.exportEnterpriseList">导出数据</zj-button>
      <zj-button class="trend" icon="iconfont icon-huiyuanfazhanqushi"  @click="goChild('entManageTen')" :api="zjBtn.getEnterpriseRegister">新增趋势</zj-button>

      <zj-button class="reset" icon="el-icon-refresh" @click="resetSearch">重置</zj-button>
      <zj-button class="search" icon="el-icon-search" @click="search">查询</zj-button>
    </el-row>
    <el-form ref="searchForm" :model="searchForm">
      <el-form-item label="企业代码：">
        <el-input v-model="searchForm.code" @keyup.enter.native="enterSearch"/>
      </el-form-item>
      <el-form-item label="企业名称：" class="col-center">
        <el-input v-model="searchForm.nameLike" @keyup.enter.native="enterSearch"/>
      </el-form-item>
      <el-form-item label="新增日期：" class="col-right">
        <zj-date-range-picker
          @startChange="$refs.quickQuery.queryIndex = 0"
          @endChange="$refs.quickQuery.queryIndex = 0"
          :startDate.sync="searchForm.applyDateStart"
          :endDate.sync="searchForm.applyDateEnd"
        />
      </el-form-item>
      <el-form-item label="所属项目：">
        <el-select v-model="searchForm.projectId" :popper-append-to-body="false">
          <el-option
            v-for="(item, index) in dictionary.projectInfoList"
            :key="index"
            :value="item.code"
            :label="item.desc"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
  <div class="zj-search-response">
    <zj-table ref="searchTable" :params="searchForm" :api="zjControl.tableApi" v-if="searchListFlag">
      <zj-table-column field="code" title="企业代码"/>
      <zj-table-column field="customCode" title="客户编码"/>
      <zj-table-column field="name" title="企业名称"/>
      <zj-table-column field="entType" title="平台客户类型" :formatter="(obj) => typeMap(dictionary.entTypeList, obj.cellValue)"/>
      <zj-table-column field="supplierType" title="供应商类型" :formatter="(obj) => typeMap(dictionary.supplierTypeList, obj.cellValue)"/>
      <zj-table-column field="applyDate" title="新增日期" :formatter="date"/>
      <zj-table-column field="state" title="企业状态" :formatter="(obj) => typeMap(dictionary.enterpriseStateList, obj.cellValue)"/>
      <zj-table-column field="projectName" title="所属项目"/>
      <zj-table-column title="操作" fixed="right">
        <template v-slot="{row}">
          <zj-button type="text" @click="goChild('entManageDetail',row)" :api="zjBtn.getEnterprise">详情</zj-button>
          <zj-button type="text" @click="goChild('entManageEdit',row)" :api="zjBtn.updateEnterprise">修改</zj-button>
        </template>
      </zj-table-column>
    </zj-table>
  </div>
</div>
</template>

<script>
  export default {
    name: "EnterPrises",
    data(){
      return {
        zjControl:{
          tableApi: this.$api.entInfoManage.queryEnterprise, //数据列表
          exportEnterpriseList:this.$api.entInfoManage.exportEnterpriseList,//列表导出
          addEnterprise: this.$api.entInfoManage.addEnterprise, // 新增企业
          getEnterpriseRegister:this.$api.entInfoManage.getEnterpriseRegister, // 新增趋势
          getEnterprise:this.$api.entInfoManage.getEnterprise, // 详情
          updateEnterprise:this.$api.entInfoManage.updateEnterprise, //修改
          dictionary:this.$api.entInfoManage.queryEntDictionary //数据字典
        },
        dictionary:{},
        searchListFlag:false,
        searchForm: {
          code: '', //企业代码
          nameLike: '', //企业名称
          applyDateStart:'', // 开始日期
          applyDateEnd:'',//结束日期
          entTypeList:'',// 客户类型
          projectId:''
        },
        // 传给子组件的数据
        detailsInfo:{},
        editInfo:{},
        // 快捷查询
        oldOne:true,
        oldDateArr:[],
        //平台客户类型,必须要有一个绑定值（即过渡值）
        entTypeList:[],
      }
    },
    methods:{
      //查询之前
      beforeSearch(){
        if(this.$refs.quickQuery){
          this.$refs.quickQuery.editDate()
        }
      },
      //重置之前
      beforeResetSearch(){
        this.entTypeList = [] //清空平台客户类型
        this.$refs.quickQuery.editDate()
      },
      //客户类型改变
      handleCheckedChange(data){
        this.searchForm.entTypeList = data.string
      },
      // 获取字典并进行处理
      queryDictionary(){
        this.zjControl.dictionary().then(res => {

          let tableDic = {
            entTypeCheckList:JSON.parse(
              JSON.stringify(res.data.entTypeList)
                .replace(/code/g,'key')
                .replace(/desc/g,'label')
            ),
            legalCertTypeTableList:JSON.parse(
              JSON.stringify(res.data.legalCertTypeList)
                .replace(/code/g,'value')
                .replace(/desc/g,'label')
            ),
            bankAcctTypeTableList:JSON.parse(
              JSON.stringify(res.data.bankAcctTypeList)
                .replace(/code/g,'value')
                .replace(/desc/g,'label')
            ),
            sysRoleTableList:JSON.parse(
              JSON.stringify(res.data.sysRoleList)
                .replace(/code/g,'value')
                .replace(/desc/g,'label')
            ),
          }
          this.dictionary = Object.assign(tableDic,res.data)
          this.searchListFlag = true
        })
      },
      // 导出列表
      exportList(){
        this.zjControl.exportEnterpriseList(this.searchForm)
      },
    },
    created() {
      this.queryDictionary()
      this.getApi()
    }
  }
</script>

<style lang="less" scoped>
  .EnterPrises{
    width: calc(100% - 20px);
  }
</style>
