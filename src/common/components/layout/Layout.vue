<template>
  <div class="layout">
    <el-container style="height: 100%">

      <!-- 头部 -->
      <el-header style="padding: 0;height: auto">
        <navbar />
      </el-header>

      <el-container class="h-c-100_50">
        <!-- 左侧菜单栏 -->
        <el-aside :class="collapseFlag ? 'w50px' : 'w200px'" class="zj-layout-aside">
          <sidebar />
        </el-aside>

        <!-- 内容 -->
        <div :class="collapseFlag ? 'w-c-100_50px' : 'w-c-100_200px'">
          <!-- 标签 -->
          <tab class="layout-tab" v-if="$route.name !== 'home'"/>
          <!-- 主内容区 -->
          <el-main class="w100 h-c-100_41 zj-aside-shrink" style="padding: 0">

            <!-- 展示 -->
            <app-main
              :class="$route.name==='home' ? 'appMainHome' : 'appMain' "
            />
            <div class="shrinkBox" @click="collapseFlagClick">
<!--              <i class="el-icon-d-arrow-right" v-if="collapseFlag"/>-->
<!--              <i class="el-icon-d-arrow-left" v-else/>-->
              <i :class="collapseFlag ? 'el-icon-d-arrow-right' : 'el-icon-d-arrow-left'"/>
            </div>
          </el-main>
        </div>

      </el-container>

    </el-container>
  </div>
</template>

<script>
  import { Sidebar, Navbar, Tab,  AppMain } from './components/Layout.js'
  import {mapState} from "vuex";
  export default {
    name: 'Layout',
    components: {
      Sidebar,
      Navbar,
      Tab,
      AppMain
    },
    computed: {
      ...mapState({
        collapseFlag: state => state.menu.collapseFlag,
      })
    },
    methods:{
      collapseFlagClick(){
        this.$store.dispatch('menu/setCollapseFlag',!this.collapseFlag)
      }
    }
  }
</script>

<style lang="less" scoped>
  .layout {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #EFF3F6;
    overflow: hidden;
  }
  .appMain{
    width: 100%;
    //border-radius: 10px;
  }
  .appMainHome{
    width: 100%;
  }

</style>
