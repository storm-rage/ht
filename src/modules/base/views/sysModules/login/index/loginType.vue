<template>
  <div class="zj-login-type">
    <div class="flex-item" @click="handleClick('1')">
      <el-link :type="currentVal==='1'?'primary':''" :underline="false">账号登陆</el-link>
    </div>
    <div class="flex-item" @click="handleClick('2')">
      <el-link :type="currentVal==='2'?'primary':''" :underline="false">手机验证码登陆</el-link>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    value: String
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
  margin-top: 25px;
  .flex-item {
    margin-right: 20px;
    text-align: center;
    .el-link {
      font-weight: Bold;
      font-size: 16px;
      color: #303133;
      &.el-link--primary {
        padding: 0!important;
        border-bottom: 3px solid @primary-main-color;
        color: @primary-main-color;
      }
    }
  }
}
</style>
