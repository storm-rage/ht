<template>
  <div class="siderbar" :class="collapseFlag ? 'min-siderbar' : ''">
    <el-scrollbar class="zj-p-b-5 siderbar-scrollbar"  wrapStyle="overflow-x: auto;">
      <el-menu
        ref="zjElMenu"
        :default-active="activeMenu"
        default-expand-all
        style="border-right: 0;height: 100%"
        :class="collapseFlag ? 'w50px' : '' "
        :collapse="collapseFlag"
        background-color="#2D313F"
        text-color="#fff"
      >
        <div class="menu-tree">
          <el-menu-item :class="{'is-active':$route.name === 'home'}"  index="home" @click="toHome">
            <i class="icon-img" :class="['ht-iconfont hd-shouye_home',{'menu-collapse': collapseFlag}]"/>
            <span slot="title">平台首页</span>
          </el-menu-item>
        </div>
        <menu-tree :menuData="sideMenuTreeList" :collapse="collapseFlag"/>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MenuTree from "./MenuTree";
/**
 * 自定义侧边栏
 */
export default {
  name: 'Sidebar',
  components:{
    MenuTree
  },
  data () {
    return {
      // 侧边菜单树状列表
      sideMenuTreeList: [],
      // // 当前激活的菜单id
      activeMenu:''
    }
  },
  methods: {
    toHome () {
      this.$router.push({ name: 'home' })
    },
    initMenuRouter(router) {
      let currentRouteName = router.name
      let isCustomSelectRouteName = false
      //设置选中
      if(this.row.parent){
        currentRouteName = this.row.parent
        isCustomSelectRouteName = true
      }
      // 加载当前菜单树
      this.sideMenuTreeList = this.menuTreeList || []
      this.activeMenu = this.menuActive
      //设置菜单栏选中
      if(!isCustomSelectRouteName && router.meta.parent){
        this.$store.dispatch('menu/SET_MENU_ACTIVE',router.meta.parent)
        this.activeMenu = router.meta.parent
      }else{
        if(currentRouteName === 'home'){
          this.$store.dispatch('menu/SET_MENU_ACTIVE','')
          this.activeMenu = ''
        }else{
          this.$store.commit('menu/SET_MENU_ACTIVE',currentRouteName)
          this.$nextTick(() => {
            this.activeMenu = this.menuActive
          })
        }
      }
    }
  },
  computed: {
    ...mapState({
      collapseFlag: state => state.menu.collapseFlag,
      menuActive: state => state.menu.menuActive, //菜单树选中
      menuTreeList: state => state.menu.menuTreeList//菜单树
    })
  },
  watch: {
    menuActive(val){
      this.$store.dispatch('menu/SET_MENU_ACTIVE',val)
      this.activeMenu = val
    },
    '$route'(newRou){
      this.initMenuRouter(newRou)
    }
  },
  created(){
    this.getRow()
  },
  mounted(){
    this.initMenuRouter(this.$route)
  }
}
</script>
<style lang="less">
//收缩
.min-siderbar{
  .el-scrollbar__wrap{
    overflow: hidden;
  }
  .menu-tree{
    .el-submenu__title{
      span,.el-submenu__icon-arrow{
        display: none;

      }
    }
    //选中
    .el-submenu.is-active{
      .el-submenu__title{
        padding-left: 15px!important;
      }
    }
    //子选中
    .el-menu-item.is-active{
      padding-left: 0!important;
    }
  }
}
</style>
<style lang="less">
//取消菜单动画时间
.collapse-transition{
  transition: 0s height ease-in-out,0s padding-top ease-in-out, 0s padding-bottom ease-in-out!important;
  -webkit-transition: 0s height ease-in-out,0s padding-top ease-in-out, 0s padding-bottom ease-in-out!important;
}
.el-zoom-in-left-enter-active,.el-zoom-in-left-leave-active{
  opacity: 1;
  -webkit-transition: opacity 0s cubic-bezier(.23,1,.32,1),-webkit-transform 0s cubic-bezier(.23,1,.32,1)!important;
  transition: opacity 0s cubic-bezier(.23,1,.32,1),-webkit-transform 0s cubic-bezier(.23,1,.32,1)!important;
  transition: transform 0s cubic-bezier(.23,1,.32,1),opacity 0s cubic-bezier(.23,1,.32,1)!important;
  transition: transform 0s cubic-bezier(.23,1,.32,1),
  opacity 0s cubic-bezier(.23,1,.32,1),
  -webkit-transform 0s cubic-bezier(.23,1,.32,1)!important;
}
//取消子级菜单动画
.el-menu-item{
  transition: all 0ms step-end!important;
}
</style>
