<template>
  <el-tabs v-bind="$attrs"
           v-on="$listeners"
           type="card"
           class="zj-tabs-card">
    <slot></slot>
  </el-tabs>
</template>

<script>
export default {
  name: "ZjTabs",
}
</script>
<style lang="less" scope>
@import "~@assets/less/variables";
.zj-tabs-card {
  &.el-tabs{
    .el-tabs__header{
      border: none;
      .el-tabs__nav{
        border: none;
        .el-tabs__active-bar {
          display: none;
        }
        .el-tabs__item{
          border-top: none;
          border-left: none;
          border-right: none;
          border-bottom: 3px solid rgba(0,0,0,0);
          color: @tabs-nav-color;
          padding: 0!important;
          margin: 0 20px!important;
          &.is-active{
            padding: 0!important;
            color: @primary-main-color;
            border-bottom: 3px solid @primary-main-color;
          }
          &:hover{
            color: @primary-main-color;
          }

        }
      }

    }
  }
  &.tabs-wrap{
    border: 1px solid @primary-main-color;
    padding: 15px;
    margin-bottom: 20px;
    margin-top: -1px;
    border-radius: 5px;
    border-top-left-radius: 0;
    overflow: auto;
    clear: both;
  }
}
.search-page{
  >.zj-tabs-card,>.el-tabs{
    >.el-tabs__header{
      margin-bottom: 0!important;
    }
    >.el-tabs__content{
      padding: 0!important;
    }
  }

}
</style>
