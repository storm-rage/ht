<template>
<div>
  <div class="zj-search-form" :class="{'no-bottom-border':noBottomBorder}" v-if="$slots.searchForm">
    <!-- 左边按钮 -->
    <el-row class="button-row zj-f-l" v-if="$slots.leftBtns" style="position: relative;z-index: 10">
      <slot name="leftBtns"></slot>
    </el-row>
    <!-- 右边搜索按钮 -->
    <el-row class="button-row">
      <slot name="rightBtns">
        <vxe-button class="reset" icon="el-icon-refresh" @click="resetSearch">重置</vxe-button>
        <vxe-button class="search" icon="el-icon-search" @click="search">查询</vxe-button>
      </slot>
    </el-row>
    <!-- 搜索条件 -->
    <slot name="searchForm"></slot>
    <!-- 搜索条件下面操作类按钮 -->
<!--    <el-row class="zj-search-body" v-if="$slots.operateBtns">-->
<!--      <div class="btnBox">-->
<!--        <slot name="operateBtns"></slot>-->
<!--      </div>-->
<!--    </el-row>-->
    <!--  其他按钮组合-->
    <div v-if="$slots.btnGroups">
      <slot name="btnGroups"></slot>
    </div>
  </div>
   <!-- 列表 -->
  <div class="zj-search-table">
    <slot></slot>
  </div>
</div>
</template>

<script>
/**
 * 列表布局组件，样式详见assets目录
 */
export default {
  name: 'ZjListLayout',
  props: {
    /**
     * 搜索栏是否需要底部border:10px
     */
    noBottomBorder: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    }
  }
}
</script>
<style lang="less">
@import "~@assets/less/listLayout/header.less";
@import "~@assets/less/listLayout/searchBody.less";
@import "~@assets/less/listLayout/searchForm.less";
@import "~@assets/less/listLayout/tableList.less";
</style>
