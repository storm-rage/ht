<template>
  <div class="siderbar" :class="collapseFlag ? 'min-siderbar' : ''">
    <div class="logoBox">
      <div class="user" @click="toHome">
        <span :class="[
          collapseFlag ? 'p-c-s' : ''
        ]">
          <img src="~@assets/img/layout/homeWorker.png" alt="">
        </span>
        <label v-if="!collapseFlag">工作台</label>
        <i :class="[
          defaultOpenedsArray.length ? 'el-icon-s-unfold' : 'el-icon-s-fold',
          collapseFlag ? 'd-none' : ''
        ]" @click="collapseFlagClick"/>
      </div>
    </div>
    <el-scrollbar class="h-c-100_41 zj-p-t-5 zj-p-b-5 shadowRight" wrapStyle="overflow-x: auto;">
      <el-menu
        ref="zjElMenu"
        :default-active="activeMenu"
        :default-openeds="defaultOpenedsArray"
        default-expand-all
        style="border-right: 0;height: 100%"
        :class="collapseFlag ? 'w50px' : '' "
        :collapse="collapseFlag"
      >
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
      activeMenu:'',
      //是否关闭左侧树
      defaultOpenedsArray:[]
    }
  },
  methods: {
    toHome () {
      this.$router.push({ name: 'home' })
    },
    toRouter (menu) {
      this.$router.push(menu.url)
    },
    //跳转至个人信息
    goUserInfoVue(){
      this.$router.push({name:'userInfo'})
      this.$store.dispatch('menu/SET_MENU_ACTIVE','')
    },
    setDefaultOpenedsArray (isExpandAll=true) {// 设置默认展开
      this.defaultOpenedsArray = [];
    },
    //初始化顶部栏选中 --- 递归
    getNavActive(children,name){
      let key = []
      if(Array.isArray(children)){
        for(let i=0; i<children.length; i++){
          if(children[i].url === name){
            key.push(true)
            break
          }
          else if(children[i].children){
            key = [...this.getNavActive(children[i].children,name),...key]
          }else {
            key.push(false)
          }
        }
      }
      return key
    },
    //菜单折叠
    collapseFlagClick(){
      // this.$store.dispatch('menu/setCollapseFlag',!this.collapseFlag)
      let idList = this.sideMenuTreeList.map(item => item.id)
      this.$refs.zjElMenu.openedMenus.length ? this.defaultOpenedsArray = [] : this.defaultOpenedsArray = idList
    },
    initMenuRouter(router) {
      let routeName = router.name
      let editFlag = false
      //设置选中
      if(this.row.parent){
        routeName = this.row.parent
        editFlag = true
      }
      //查找顶部选中
      for(let i=0; i<this.menuTreeList.length; i++){
        let newArr = this.getNavActive(this.menuTreeList[i].children,routeName)
        if(newArr.findIndex(item => item===true) >= 0){
          this.$store.dispatch('menu/setNavMenuActive', i)
          let mentT = JSON.parse(JSON.stringify(this.$store.state.menu.menuTreeList))
          this.sideMenuTreeList = mentT || []
          if(!editFlag){
            router.meta.parent ? this.activeMenu = router.meta.parent : this.activeMenu = routeName
          }else{
            this.activeMenu = routeName
          }
          break
        }
      }
      // 加载当前菜单树
      let mentT = JSON.parse(JSON.stringify(this.$store.state.menu.menuTreeList))
      this.sideMenuTreeList = mentT || []
      this.activeMenu = this.menuActive
      //设置菜单栏选中
      // this.$store.dispatch('tab/addCache',newRou)
      if(!editFlag && router.meta.parent){
        this.$store.dispatch('menu/SET_MENU_ACTIVE',router.meta.parent)
        this.activeMenu = router.meta.parent
      }
      else{
        if(routeName === 'home'){
          this.$store.dispatch('menu/SET_MENU_ACTIVE','')
          this.setDefaultOpenedsArray();
          this.activeMenu = ''
        }else{
          // this.$store.dispatch('menu/SET_MENU_ACTIVE',routeName)
          this.$store.commit('menu/SET_MENU_ACTIVE',routeName)
          this.$nextTick(() => {
            this.activeMenu = this.menuActive
          })
          // mounted代码
          // this.$store.dispatch('menu/SET_MENU_ACTIVE',routeName)
          // this.activeMenu = routeName
        }
      }
    }

  },
  computed: {
    ...mapState({
      navMenuActive: state => state.menu.navMenuActive, //顶部选中
      collapseFlag: state => state.menu.collapseFlag,
      menuActive: state => state.menu.menuActive, //菜单树选中
      userInfo: state => state.user.userInfo,
      menuTreeList: state => state.menu.menuTreeList,//菜单树
      menuOpen: state => state.menu.menuOpen,
    })
  },
  watch: {
    navMenuActive(val){
      this.sideMenuTreeList = []
      // this.menuLoading = true
      if(!this.$store){return}

      let mentT = JSON.parse(JSON.stringify(this.$store.state.menu.menuTreeList))
      if(!mentT.length){return}
      // this.menuLoading = false
      this.$nextTick(() => {
        this.sideMenuTreeList = mentT || []
      })
    },
    menuActive(val){
      this.$store.dispatch('menu/SET_MENU_ACTIVE',val)
      this.activeMenu = val
    },
    menuOpen(val){
      this.$store.dispatch('menu/setMenuOpen', false)
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
<style lang="less" scoped>
.logoBox{
  width: 100%;
  /*background-color: #33649D;*/
  background-color: #FFFFFF;
  border-bottom: 1px solid #eee;
  .logo{
    height: 106px;
    img{
      width: 96%;
      margin: 45px auto 0 3%;
    }
  }
  .user{
    position: relative;
    height: 40px;
    text-align: center;
    line-height: 40px;
    border-right: 1px solid rgba(0,0,0,0.2);
    span{
      font-size: 18px;
      color: #9df8cc;
      margin-right: 5px;
      img {
        width: 20px;
        height: 20px;
        vertical-align: middle;
      }
    }
    label{
      color: #333333;
      letter-spacing: 1px;
    }
    .d-none{
      display: none;
    }
    .p-c-s{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
    }
    i{
      cursor: pointer;
      position: absolute;
      right: 9%;
      top: 50%;
      transform: translateY(-50%);
      font-size: 18px;

    }
  }
}
</style>
<style lang="less">
.el-submenu__icon-arrow{
  font-weight: bold!important;
  font-size: 14px!important;
  margin-top: -6px!important;
  /*color: burlywood!important;*/
  color: #BDCFDF !important;
}
.el-submenu.is-active.is-opened{
  .el-submenu__icon-arrow{
    color: rgba(222, 184, 135, 0.71) !important;
  }
}
</style>
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
.shadowRight{
  box-shadow: 1px 10px 1px 10px rgba(0,0,0,0.2);
  /*z-index: 99999999;*/
  margin-right: 1px;
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
