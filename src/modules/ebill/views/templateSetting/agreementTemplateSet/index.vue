<template>
  <div id="bankSup">
    <div class="zj-search-condition">
      <el-row class="button-row">
<!--        <zj-button class="append" icon="el-icon-circle-plus-outline" @click="goChild('bankFundingSellerAdd')" :api="zjBtn.addSup">新增</zj-button>-->
        <vxe-button class="reset" icon="el-icon-refresh" @click="resetSearch">重置</vxe-button>
        <vxe-button class="search" icon="el-icon-search" @click="search">查询</vxe-button>
      </el-row>
      <el-form ref="searchForm" :model="searchForm">
        <el-form-item label="协议类型：">
          <el-input v-model="searchForm.agreementType" @keyup.enter.native="enterSearch"/>
        </el-form-item>
        <el-form-item label="类别：">
<!--          <el-input v-model="searchForm.category" @keyup.enter.native="enterSearch"/>-->
          <el-select v-model="searchForm.category" filterable :popper-append-to-body="false">
            <el-option v-for="item in dictionary.categoryType" :key="item.code" :label="item.desc" :value="item.code"/>
          </el-select>
        </el-form-item>
        <el-form-item label="模板名称：">
          <el-input v-model="searchForm.agreementName" @keyup.enter.native="enterSearch"/>
        </el-form-item>
        <el-form-item label="说明：">
          <el-input v-model="searchForm.remark" @keyup.enter.native="enterSearch"/>
        </el-form-item>
        <el-form-item label="项目名称：">
          <el-input v-model="searchForm.projectName" @keyup.enter.native="enterSearch"/>
        </el-form-item>
        <el-form-item label="企业名称：">
          <el-input v-model="searchForm.entName" @keyup.enter.native="enterSearch"/>
        </el-form-item>
      </el-form>
    </div>
    <div class="zj-search-response">
      <zj-table ref="searchTable" :api="zjControl.queryAgreementPage" :params="searchForm">
        <zj-table-column field="agreementType" title="协议类型"/>
        <zj-table-column field="agreementVersion" title="版本号"/>
        <zj-table-column field="category" title="类别"/>
        <zj-table-column field="projectName" title="项目名称" />
        <zj-table-column field="entName" title="企业名称" />
        <zj-table-column field="agreementName" title="模板名称" />
        <zj-table-column field="remark" title="说明"/>
        <zj-table-column  title="操作" fixed="right">
          <template v-slot="{row}">
            <zj-button type="text" @click="downTemplate(row)" :api="zjBtn.downloadTemplate">下载</zj-button>
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
        projectNameLike: '',
        agreementType: '',
        category: '',
        agreementName: '',
        remark: '',
        projectName: '',
        entName: '',
        templateId: ''
      },
      zjControl:{
        getDictionary:this.$api.templateSettings.getDictionary,//获取数据字典
        queryAgreementPage:this.$api.templateSettings.queryAgreementPage,//模板设置-协议模板设置-列表查询
        downloadTemplate:this.$api.templateSettings.downloadTemplate,//模板设置-协议模板设置-下载
      },
      dictionary:{}
    }
  },
  created() {
    this.getApi()
    this.getDic()
  },
  methods:{
    getDic(){
      this.zjControl.getDictionary().then(res => {
        this.dictionary = res.data
      })
    },
    downTemplate(row){
      this.zjControl.downloadTemplate(
        {
          "agreementName": row.agreementName,
          "templateId": row.id
        }
      ).then(res => {

      })
    },
  }
}
</script>

<style scoped>

</style>
