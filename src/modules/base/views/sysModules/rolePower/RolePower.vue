<template>
  <div class="rolePower content-wrap" ref="rolePower">
    <!-- 左侧 -->
    <div class="role-left">
      <div class="role-title">
        <h3>角色列表</h3>
        <el-row>
          <el-input @keyup.enter.native="search" size="mini" placeholder="请输入角色名" v-model="searchValue"/>
          <zj-button type="text" @click="search"><i class="el-icon-search"></i></zj-button>
        </el-row>
      </div>
      <el-scrollbar>
        <div class="role-item"
             @click="getList(item.id)"
             :class="currentId == item.id ? 'active' : ''"
             v-for="(item, index) in currentRoleList"
             :key="index">
          【{{item.id}}】{{item.name}}
        </div>
      </el-scrollbar>
      <el-pagination
        align="center"
        small
        :page-size="10"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        layout="prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
    <!-- 中间图标 -->
    <div class="role-center">
      <i class="el-icon-d-arrow-right"/>
    </div>
    <!-- 右侧 -->
    <div class="role-right">
      <el-scrollbar  wrap-class="scrollbar-wrapper">
        <el-tree
          ref="rolePowerTree"
          v-show="currentId"
          class="zj-power"
          :data="sysPowerList"
          :show-checkbox="true"
          :props="{ label: 'name' }"
          @check="changeRolePower"
          node-key="code">
        </el-tree>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
  import rolePower from './js/rolePower'
  export default rolePower
</script>

<style lang="less" src="./css/rolePower.less" />
