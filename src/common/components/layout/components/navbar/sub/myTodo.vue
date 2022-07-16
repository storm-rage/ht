<template>
  <div class="navbar-my-todo">
    <span class="text" @click="toRouter">
      <i class="ht-iconfont hd-wodishijiao_submit"></i>&nbsp;我的待办
    </span>
  </div>
</template>
<script>
export default {
  methods: {
    toRouter () {
      this.$router.push({name: 'myTodo'})
    }
  }
};
</script>
<style lang="less" scoped>
@import "~@assets/less/variables";
.navbar-my-todo {
  cursor: pointer;
  width: 120px;
  .text {
    padding: 6px 15px;
    &:hover {
      background-color: #F5F7FA;
      border-radius: 14px;
      color: @primary-main-color;
    }
  }
}
</style>
