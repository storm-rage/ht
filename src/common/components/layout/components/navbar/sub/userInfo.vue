<template>
  <div class="navbar-user-info">
    <el-dropdown trigger="click" placement="bottom" class="navbar-right-menu" @command="handleClickDropdown" v-if="userInfo.userName">
        <span class="menu-dropdown-link">
         <i class="ht-iconfont hd-touxiang_avatar"></i>&nbsp;{{ userInfo.userName }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="center">个人中心</el-dropdown-item>
        <el-dropdown-item command="logout">退   出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import {mapState} from "vuex";

export default {
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  methods: {
    handleClickDropdown (name) {
      if(name==='center') {
        // todo: 跳转个人中心
        this.$router.push('/personalCenter')
      }else if (name === 'logout') {
        this.$confirm('您确定要退出吗？','提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.logout();
        })
      }
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
      })
    }
  },
}
</script>
<style lang="less" scoped>
.navbar-user-info {
  font-weight: 400;
  color: #303133;
  .navbar-right-menu {
    .menu-dropdown-link {
      cursor: pointer;
    }
  }
}
</style>
