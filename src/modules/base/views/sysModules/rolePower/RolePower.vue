<template>
  <div class="rolePower content-wrap" ref="rolePower">
    <!-- 左侧 -->
    <div class="role-left">
      <!--   权限配置查询列表   -->
      <div class="zj-search-form">
        <el-form ref="searchForm" :model="searchForm">
          <el-row>
            <el-col :span="12">
              <el-form-item label="角色代码：">
                <el-input v-model="searchForm.code" @keyup.enter.native="search"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="角色名称：">
                <el-input v-model="searchForm.roleNameLike" @keyup.enter.native="search"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-row class="button-row">
          <zj-button type="primary" icon="el-icon-circle-plus-outline" @click="addRole">新增角色</zj-button>
          <zj-button class="reset" icon="el-icon-refresh" @click="resetSearch">重置</zj-button>
          <zj-button class="search" icon="el-icon-search" @click="search">查询</zj-button>
        </el-row>
        <zj-table ref="searchTable" :api="zjControl.search" :params="searchForm" :dataList="currentRoleList"
                  @radio-change="handleRadioChange" :printConfig="{trigger:row}"
                  :radio-config="{highlight: true}">
          <zj-table-column type="radio" width="40px" fixed="left"/>
          <zj-table-column field="id" title="id" width="40px"/>
          <zj-table-column field="code" title="角色代码" width="80px"/>
          <zj-table-column field="name" title="角色名称"/>
          <zj-table-column field="descr" title="角色描述"/>
        </zj-table>
      </div>
    </div>
    <!-- 中间图标 -->
    <div class="role-center"></div>
    <!-- 右侧 -->
    <div class="role-right">
      <div class="power-config">权限配置</div>
      <el-scrollbar  wrap-class="scrollbar-wrapper">
        <el-tree
          ref="rolePowerTree"
          class="zj-power"
          :data="sysPowerList"
          :show-checkbox="true"
          :props="{ label: 'name' }"
          @check="changeRolePower"
          node-key="code">
        </el-tree>
      </el-scrollbar>
    </div>
    <el-dialog
      title="新增角色"
      :visible.sync="dialogVisible"
      width="80%"
    >
      <div class="content-block">
        <div class="role-left">
          <el-form :model="form" ref="form" :rules="rules" label-width="160px">
            <zj-content-block>
              <zj-content>
                <el-form-item label="角色代码：">
                  {{form.code}}
                </el-form-item>
                <el-form-item label="角色名称：" prop="name">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="角色描述：" prop="descr" class="descr">
                  <el-input type="textarea" v-model="form.descr" style="width: 220px"></el-input>
                </el-form-item>
              </zj-content>
            </zj-content-block>
          </el-form>
        </div>
        <div class="role-center"></div>
        <div class="role-right">
          <div class="power-config">权限配置</div>
          <el-scrollbar  wrap-class="scrollbar-wrapper">
            <el-tree
              ref="rolePowerTreeAdd"
              class="zj-power"
              :data="sysPowerList"
              :show-checkbox="true"
              @check="selectRolePower"
              :props="{ label: 'name' }"
              node-key="code">
            </el-tree>
          </el-scrollbar>
        </div>
      </div>

      <div slot="footer" class="zj-center" style="display: block;width: 100%">
        <el-button style="width: 100px" size="small" @click="close">取消</el-button>
        <el-button style="width: 100px" size="small" type="primary" @click="submit">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import rolePower from './js/rolePower'
  export default rolePower
</script>

<style lang="less" src="./css/rolePower.less" />
