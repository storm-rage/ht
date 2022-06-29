<template>
  <div>
    <div class="zj-search-condition">
      <el-row class="button-row">
        <zj-button class="append" icon="el-icon-circle-plus-outline" @click="toAddProject" :api="zjBtn.bankDockSetAdd" v-if="isPlatform">新增项目</zj-button>
      </el-row>
    </div>
    <div class="zj-search-response">
      <zj-table ref="searchTable"
                :api="zjControl.bankDockSetGetPage"
                :params="searchForm" >
        <zj-table-column field="projectName" title="项目名称"/>
        <zj-table-column field="bankType" title="银行类型">
          <template v-slot="{row}">
            <span>{{typeMap(dictionary.bankType,row.bankType)}}</span>
          </template>
        </zj-table-column>
        <zj-table-column field="bankName" title="银行名称"/>
        <zj-table-column field="busiGroupCode" title="商圈"/>
        <zj-table-column field="remark" title="说明"/>
        <zj-table-column title="操作" fixed="right" width="180">
          <template v-slot="{row}">
            <zj-button type="text" @click="toSetting(row)" :api="zjBtn.bankDockSetUpdate">配置</zj-button>
            <zj-button type="text" @click="toDetail(row)" :api="zjBtn.bankDockSetGetDetail">详情</zj-button>
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
        projectManagerEntName: '',
        busiGroupCode: ''
      },
      zjControl: {
        getPubProjectDirectory: this.$api.pubProjectSetting.getPubProjectDirectory,
        queryPubProjectPage: this.$api.pubProjectSetting.queryPubProjectPage,
        addPubProject: this.$api.pubProjectSetting.addPubProject,
        deletePubProject: this.$api.pubProjectSetting.deletePubProject,
        queryPubProjectConfigurationDetail: this.$api.pubProjectSetting.queryPubProjectConfigurationDetail,
        updatePubProject: this.$api.pubProjectSetting.updatePubProject,
        bankDockSetGetDict: this.$api.pubProjectSetting.bankDockSetGetDict,//获取字典
        bankDockSetAdd: this.$api.pubProjectSetting.bankDockSetAdd,//添加
        bankDockSetGetDetail: this.$api.pubProjectSetting.bankDockSetGetDetail,//查询详情
        bankDockSetGetPage: this.$api.pubProjectSetting.bankDockSetGetPage,//查询列表
        bankDockSetUpdate: this.$api.pubProjectSetting.bankDockSetUpdate,//修改
      },
      isPlatform: true,
      bankType:'',
      dictionary:{},
    };
  },
  created() {
    this.getApi();
    this.getDic();
  },
  methods: {
    getDic() {
      this.zjControl.bankDockSetGetDict().then(ret => {
       // this.isPlatform = ret.data.isPlatform;
        this.dictionary = ret.data;
      });
    },
    toAddProject () {
      this.$router.push({name: 'bankDockingParamAdd', params: {rowData: {id: null}}});
    },
    toEdit (row) {
      this.$router.push({name: 'editPlatformProject', params: {rowData: {id: row.id}}});
    },
    toSetting (row) {
      this.$router.push({name: 'bankDockingParamSetting', params: {rowData: {id: row.id}}})
    },
    toDetail (row) {
      this.$router.push({name: 'bankDockingParamDetail', params: {rowData: {id: row.id}}})
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
