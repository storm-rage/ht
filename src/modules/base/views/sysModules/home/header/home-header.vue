<template>
  <header class="home-header">
    <div class="title">{{nowTimeTip}}好！{{userInfo.userName}}</div>
    <div class="login-time">上次登录时间：2022-10-10 11:55:55</div>
  </header>
</template>
<script>
import {mapState} from "vuex";

export default {
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    }),
    nowTimeTip () {
      const date = new Date();
      const hour = date.getHours();
      if (hour>=0&&hour<12) {
        return '上午';
      }else if (hour === 12) {
        return '中午';
      }else if (hour>12 && hour<18) {
        return '下午';
      }else {
        return '晚上';
      }
    }
  },
};
</script>
<style lang="less" scoped>
.home-header {
  background-color: #FFFFFF;
  padding: 15px 20px;
  .title {
    font-weight: bold;
    font-size: 16px;
    color: #303133;
  }
  .login-time {
    margin-top: 4px;
    font-size: 14px;
    font-weight: 400;
    color: #606266;
  }
}
</style>
