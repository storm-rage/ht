<template>
  <header class="home-header" v-if="showHeader">
    <div class="title">{{nowTimeTip}}好！{{userInfo.userName}}</div>
    <div class="login-time">上次登录时间：{{userInfo.lastLoginTime}}</div>
    <div class="close" v-if="showClose">
      <el-button size="mini" icon="el-icon-close" @click="showHeader = false" style="color: #606266;padding: 2px 4px;">
        <span class="close-time" v-if="closeTime && closeTime!=0">
          {{closeTime}}
        </span>
      </el-button>
    </div>
  </header>
</template>
<script>
import {mapState} from "vuex";

export default {
  data() {
    return {
      showHeader: true,
      closeTime: 5,
      timeClose: null
    }
  },
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
    },
    showClose() {
      let wClientY = document.documentElement.clientHeight
      return wClientY <= 768
    }
  },
  created() {
    if (this.showClose) {
      this.timeClose = window.setInterval(()=>{
        this.closeTime--
        if(this.closeTime <= 0) {
          window.clearInterval(this.timeClose)
          this.showHeader = false
        }
      },1000)
    }
  },
  beforeDestroy() {
    this.timeClose && window.clearInterval(this.timeClose)
  },
};
</script>
<style lang="less" scoped>
.home-header {
  background-color: #FFFFFF;
  padding: 15px 20px;
  position: relative;
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
  /deep/ .close {
    position: absolute;
    top: 10px;
    right: 10px;
    .el-button i {
      display: none;
      + span {
        margin-left: 0;
      }
    }
    .el-button:hover {
      > i {
        display: block;
      }
      .close-time {
        display: none;
      }
    }
  }
}
</style>
