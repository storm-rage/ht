<template>
<div>
    <div class="logImg">
      <div style="width:100%;margin-bottom: 10px;"><img class="loginBody"></div>
      <span class="logSpan">海天供应链金融平台</span>
    </div>
  <div class="zj-login-type">
    <div class="flex-item" @click="handleClick('1')">
      <el-link :type="currentVal==='1'?'primary':''" :underline="false">账号登陆</el-link>
    </div>
    <div class="flex-item" @click="handleClick('2')">
      <el-link :type="currentVal==='2'?'primary':''" :underline="false">手机验证码登陆</el-link>
    </div>
  </div>
  </div>
</template>
<script>
export default {
  props: {
    value: String
  },
  data () {
    return {
      currentVal: this.value
    }
  },
  methods: {
    handleClick (val) {
      this.currentVal = val;
      this.$emit("input", val);
      this.$emit('change',val)
    }
  }
}
</script>
<style lang="less">
.logImg{
    width: 100%;
    height: 80px;
    text-align: center;
    .loginBody{
      display: inline-block;
      height: 40px;
      width: 65px;
      box-sizing: content-box;
      background: url("~@assets/img/login/bg_logo.png") no-repeat;
      background-size: 100% 100%;
      text-align: center;
    }
    .logSpan{
      width: 100%;
      height: 20px;
      font-size: 20px;
      font-weight: 600;
      color: #000;
    }
  }
.zj-login-type {
  display: flex;
  align-items: center;
  // justify-content: center;
  margin-bottom: 25px;
  .flex-item {
    // flex: 1;
    margin-right: 20px;
    text-align: center;
    .el-link {
      font-size: 16px;
    }
  }
}
</style>
