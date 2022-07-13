<template>
  <div class="home-content">
    <el-row :gutter="20" type="flex">
      <el-col :span="14">
        <data-driver></data-driver>
      </el-col>
      <el-col :span="10">
        <home-notice></home-notice>
      </el-col>
    </el-row>
    <el-row class="zj-m-t-20" :gutter="20" type="flex">
      <el-col :span="14">
        <home-todo></home-todo>
      </el-col>
      <el-col :span="10">
        <home-message></home-message>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import DataDriver from './dataDriver/index'
import HomeNotice from './notice';
import HomeTodo from './todo';
import HomeMessage from './message'
export default {
  components: {
    DataDriver,
    HomeNotice,
    HomeTodo,
    HomeMessage
  }
}
</script>
<style lang="less" scoped>
.home-content {
  padding: 20px;
}
</style>
