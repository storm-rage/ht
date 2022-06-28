<template>
  <div class="navbar">
<!--    &lt;!&ndash; logo &ndash;&gt;-->
    <div class="navbar-logo">
        <img src="@assets/img/layout/Logo.png"/>
    </div>
    <!-- 一级目录 -->
    <div class="navbar-left">
      <el-menu
          :default-active="navMenuActive.toString()"
          class="navbar-menu"
          mode="horizontal">
        <el-menu-item
            v-for="(item, index) in menuTreeList"
            :key="index"
            :index="index.toString()"
            @click="changeNavMenuActive(index)" >
          {{ item.name }}
        </el-menu-item>
      </el-menu>
    </div>

    <!-- 右侧信息 -->
    <div class="navbar-right">
      <el-dropdown trigger="click" class="navbar-right-menu" @command="toChangeProject" v-if="currentProject.projectName">
        <span class="menu-dropdown-link">
        {{currentProject.projectName}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown" v-if="isChangeProject">
          <el-dropdown-item :command="item" v-for="(item,index) in projects" :key="index">{{item.projectName}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div class="navbar-right-info">{{ userInfo.entName }}</div>
<!--      <div class="vxe-icon&#45;&#45;question"></div>-->
      <div class="navbar-right-item navbar-logout" @click="logout" title="退出登录"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Navbar',
  data () {
    return {
      currentProject: {}
    };
  },
  methods: {
    // 改变激活的导航菜单
    changeNavMenuActive (val) {
      this.$store.dispatch('menu/setNavMenuActive', val)
      this.$store.dispatch('menu/setMenuOpen',true)
    },
    // 登出
    logout () {

      this.$api.login.logout().then(()=>{
		  //清除local存储的信息
		  sessionStorage.clear()
		  localStorage.clear()
		  window.clearVuexAlong()
		  this.$store.commit('resetState')
		  this.$store.dispatch('menu/SET_MENU_ACTIVE','')
		  this.defaultOpenedsArray = []
        this.$router.replace({name: 'login'})
        // location.reload()
        // setTimeout(() => {
        //   location.reload()
        // }, 50)
      })
    },
    toChangeProject (item) {
      if (item.id==this.currentProject.id) {
        return;
      } else {
        this.$api.baseCommon.changeProject({
          loginChannel: '0',
          projectId: item.id
        }).then(ret => {
          this.currentProject = item;
          const data = ret.data;
          const loginRes = Object.assign({}, this.userInfo, data,{currentProject: item});
          if (data.faceCheck || data.userServiceAgreementFlag === '1') {
            const loginSuccess = JSON.parse(JSON.stringify({
              loginRes
            }));
            // loginRes.password = this.userData.password
            sessionStorage.setItem('frLoginRes',JSON.stringify(loginRes))
            this.goChild('faceRecognition',loginSuccess)
          } else {
            this.$store.dispatch('project/changeProject', {data,projectInfo: item}).then(() =>  {
              /*
              this.$router.push('/')*/
              this.$store.commit('tab/tabClear');
              window.location.href='/home';
            });
          }
        });
      }
    },
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo,
      menuTreeList: state => state.menu.menuTreeList,
      navMenuActive: state => state.menu.navMenuActive,
      collapseFlag: state => state.menu.collapseFlag,
      projectInfo: state => state.project.projectInfo,
      projects: state => state.project.projectList,
      isChangeProject: (state) => {
        return state.project.projectList&&state.project.projectList.length;
      }
    })
  },
  mounted() {
    this.currentProject = this.projectInfo;
  },
  watch: {
    $route(val) {
      let tooltip = document.getElementsByClassName('vxe-table--tooltip-wrapper')[0]
      if (tooltip) {
        document.body.removeChild(tooltip)
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "~@assets/less/variables";
@navbar-hg: 50px;
.navbar {
 /* height: 45px;*/
  height: @navbar-hg;
  overflow: hidden;
  background: #FFFFFF;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  border-bottom: 1px solid #eee;

  .navbar-logo{
      float: left;
      width: 225px;
      padding:5px 0 0 60px;
      height: 100%;
      img{
        width: 80px;
        margin: auto;
        height: 35px;
      }
  }

  .navbar-left {
    height: 100%;
    float: left;
    .navbar-menu {
      li {
        &.el-menu-item {
          color: #333;
          padding: 0;
          margin: 0 20px;
          &.is-active {
            font-weight: bold;
            color: @primary-main-color;
            border-bottom: 4px solid @primary-main-color;
            /*border-bottom: 4px solid #409EFF;*/
          }
        }
      }
    }
    .navbar-menu.el-menu--horizontal {
      border-bottom: 0;
    }
    .navbar-menu.el-menu--horizontal>.el-menu-item {
      height: @navbar-hg;
      line-height: @navbar-hg;
    }
    .navbar-menu.el-menu--horizontal .el-menu-item:not(.is-disabled):focus,
    .navbar-menu.el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
      /*color: #409EFF;*/
      color: @primary-main-color;
    }
  }
  .navbar-right {
    float: right;
    height: 100%;
    line-height: @navbar-hg;
    .navbar-right-info {
      vertical-align: top;
      display: inline-block;
      height: @navbar-hg;
      line-height: @navbar-hg;
      margin-right: 30px;
      font-size: 14px;
      color: #909399;
    }
    .navbar-right-menu {
      display: inline-block;
      height: @navbar-hg;
      line-height: @navbar-hg;
      font-size: 14px;
      color: #909399;
      vertical-align: top;
      &:focus,&:active,&:hover{
        outline: none;
      }
      .menu-dropdown-link {
        position: relative;
        display: inline-block;
        padding-right: 10px;
        padding-left: 10px;
        margin-right: 10px;
        /*&:after {
          content: '';
          position: absolute;
          height: 15px;
          width: 1px;
          right: 0;
          background: #999999;
          top: 42%;
        }*/
      }
    }
    .navbar-right-item {
      /*margin-top: 5px;*/
      margin-top: calc(@navbar-hg / 5)!important;
      margin-right: 10px;
      width: 30px;
      height: 30px;
      display: inline-block;
      cursor: pointer;
    }
    .navbar-logout{
      margin-right: 30px;
      background: url(~@assets/img/layout/icon-logout.png) no-repeat center;
    }
  }
}
</style>
