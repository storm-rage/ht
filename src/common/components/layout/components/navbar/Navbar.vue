<template>
  <div class="navbar">
    <!--    &lt;!&ndash; logo &ndash;&gt;-->
    <div class="navbar-logo" :class="{'min-navbar-logo': collapseFlag}">
      <img src="@assets/img/layout/Logo.png"/>
    </div>
    <!-- 左边内容 -->
    <div class="navbar-left">
      <collapse-btn></collapse-btn>
      <change-ent style="flex: 1"></change-ent>
    </div>

    <!-- 右侧信息 -->
    <div class="navbar-right">
      <my-todo></my-todo>
      <message-tip></message-tip>
      <user-info></user-info>
    </div>
  </div>
</template>

<script>
import ChangeEnt from './sub/changeEnt';
import UserInfo from './sub/userInfo';
import MessageTip from './sub/messageTip';
import MyTodo from './sub/myTodo';
import CollapseBtn from './sub/collapseBtn';
import {mapState} from "vuex";

export default {
  name: 'Navbar',
  components: {
    ChangeEnt,
    UserInfo,
    MessageTip,
    MyTodo,
    CollapseBtn
  },
  computed: {
    ...mapState({
      collapseFlag: state => state.menu.collapseFlag,
    })
  },
  data() {
    return {};
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
  height: @navbar-hg;
  overflow: hidden;
  background: #FFFFFF;
  box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
  border-bottom: 1px solid #eee;

  .navbar-logo {
    float: left;
    width: 220px;
    padding: 5px 0 0 20px;
    height: 100%;
    transition: width .1s ease-out;
    &.min-navbar-logo {
      width: 120px;
    }
    img {
      width: 80px;
      margin: auto;
      height: 35px;
    }
  }

  .navbar-left {
    height: 100%;
    float: left;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .navbar-right {
    float: right;
    height: 100%;
    margin-right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
