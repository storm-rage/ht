<template>
  <div class="zj-login-type" :class="{'is-one-login': isOneLogin}">
    <div class="flex-item" @click="handleClick('1')">
      <span class="text" :class="{'active': currentVal==='1'}">账号登陆</span>
    </div>
    <div class="flex-item" @click="handleClick('2')">
      <span class="text" :class="{'active': currentVal==='2'}">手机验证码登陆</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    value: String,
    // 是否首次登录
    isOneLogin: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentVal: this.value
    }
  },
  methods: {
    handleClick(val) {
      this.currentVal = val;
      this.$emit("input", val);
      this.$emit('change', val)
    }
  }
}
</script>
<style lang="less">
@import "~@assets/less/variables";
.zj-login-type {
  display: flex;
  align-items: center;
  margin-top: 10%;
  // 首次登录情况样式
  &.is-one-login {
    @media only screen and (max-height: 1080px) {
      & {
        margin-top: 5%;
      }
    }
  }
  .flex-item {
    text-align: center;
    .text {
      display: inline-block;
      font-weight: Bold;
      font-size: 18px;
      color: #303133;
      &.active {
        color: @primary-main-color;
        &::after {
          content: '';
          display: block;
          margin-top: 2%;
          width: 100%;
          height: 3px;
          background-color: @primary-main-color;
        }
      }
    }
  }
  .flex-item+.flex-item {
    margin-left: 30px;
  }
}
</style>
