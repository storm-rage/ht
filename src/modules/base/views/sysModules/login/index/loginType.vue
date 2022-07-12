<template>
  <div class="zj-login-type">
    <div class="flex-item" @click="handleClick('1')">
      <el-link :type="currentVal==='1'?'primary':''" :underline="false">密码登陆</el-link>
    </div>
    <div class="flex-item" @click="handleClick('2')">
      <el-link :type="currentVal==='2'?'primary':''" :underline="false">验证码登陆</el-link>
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
.zj-login-type {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
  .flex-item {
    flex: 1;
    text-align: center;
    .el-link {
      font-size: 17px;
    }
  }
}
</style>
