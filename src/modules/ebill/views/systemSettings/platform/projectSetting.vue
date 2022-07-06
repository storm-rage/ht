<template>
  <div>
    <div class="zj-search-condition">
      <el-row class="button-row">
        <vxe-button class="append" icon="el-icon-circle-plus-outline" @click="toAddProject" :api="zjBtn.addPubProject" v-if="isPlatform">新增项目</vxe-button>
        <vxe-button class="reset" icon="el-icon-refresh" @click="resetSearch" >重置</vxe-button>
        <vxe-button class="search" icon="el-icon-search" @click="search" >查询</vxe-button>
      </el-row>
      <el-form ref="searchForm" :model="searchForm">
        <el-form-item label="项目名称：">
          <el-input v-model="searchForm.projectName" @keyup.enter.native="enterSearch"/>
        </el-form-item>
        <el-form-item label="项目管理企业："  class="col-center">
          <el-input v-model="searchForm.projectManagerEntName" @keyup.enter.native="enterSearch"/>
        </el-form-item>
      </el-form>
    </div>
    <div class="zj-search-response">
      <zj-table ref="searchTable"
                :api="zjControl.queryPubProjectPage"
                :params="searchForm" >
        <zj-table-column field="id" title="项目编号"/>
        <zj-table-column field="projectName" title="项目名称"/>
        <zj-table-column field="projectManagerEntName" title="项目管理企业"/>
        <zj-table-column field="remark" title="项目说明"/>
        <zj-table-column field="productType" title="开通产品"/>
        <zj-table-column title="操作" fixed="right" width="180">
          <template v-slot="{row}">
            <zj-button type="text" @click="toSetting(row)" :api="zjBtn.queryPubProjectConfigurationDetail">项目配置</zj-button>
            <zj-button type="text" @click="toEdit(row)" :api="zjBtn.updatePubProject">修改</zj-button>
            <zj-button type="text" @click="toDel(row)" :api="zjBtn.deletePubProject" v-if="isPlatform">删除</zj-button>
          </template>
        </zj-table-column>
      </zj-table>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      searchForm: {
        projectName: '',
        projectManagerEntName: ''
      },
      zjControl: {
        getPubProjectDirectory: this.$api.pubProjectSetting.getPubProjectDirectory,
        queryPubProjectPage: this.$api.pubProjectSetting.queryPubProjectPage,
        addPubProject: this.$api.pubProjectSetting.addPubProject,
        deletePubProject: this.$api.pubProjectSetting.deletePubProject,
        queryPubProjectConfigurationDetail: this.$api.pubProjectSetting.queryPubProjectConfigurationDetail,
        updatePubProject: this.$api.pubProjectSetting.updatePubProject
      },
      isPlatform: true
    };
  },
  created() {
    this.getApi();
    this.getDic();
  },
  methods: {
    getDic() {
      this.zjControl.getPubProjectDirectory().then(ret => {
       this.isPlatform = ret.data.isPlatform;
      });
    },
    toAddProject () {
      this.$router.push({name: 'addPlatformProject', params: {rowData: {id: null}}});
    },
    toEdit (row) {
      this.$router.push({name: 'editPlatformProject', params: {rowData: {id: row.id}}});
    },
    toSetting (row) {
      this.$router.push({name: 'bizParamsSetting', params: {rowData: {id: row.id}}})
    },
    toDel (row) {
      this.$messageBox({
        type: 'warning',
        content: '您确定要删除该项目配置吗？',
        showConfirmButton: true,
        showCancelButton:true,
        center: true
      }).then(() => {
        this.zjControl.deletePubProject({projectId: row.id}).then(() => {
          this.$refs.searchTable.iRefresh();
          this.$messageBox({
            type: 'success',
            content: '操作成功!',
            title: '提示',
            showConfirmButton: true,
            center: true,
          });
        });
      })
    }
  }
};
</script>
<style lang="less" scoped>
</style>
