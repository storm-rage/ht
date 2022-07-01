<template>
  <div class="collapse">
    <div class="collapse-header" @click="handleCollapse">
      <i class="el-collapse-header__arrow el-icon-arrow-left" :class="{'is-active': !isCollapse}"></i>
      <slot name="title">
        {{title}}
      </slot>
      <slot v-if="$slots.tip" name="tip"></slot>
      <span v-if="tipText" class="header-left-tip"><i style="color:#F18C3C;margin-right: 5px;" class="el-icon-info"></i>{{tipText}}</span>
    </div>
    <zj-collapse-item :value="isCollapse" :duration="500">
      <div class="collapse-content">
        <slot></slot>
      </div>
    </zj-collapse-item>
  </div>
</template>
<script>
import ZjCollapseItem from './ZjCollapseItem'

export default {
  name: 'ZjCollapse',
  props: {
    title: {
      type:String,
      default: ''
    },
    tipText: {
      type: String,
      default: ''
    }
  },
  components: {
    ZjCollapseItem
  },
  data() {
    return {
      isCollapse: false
    }
  },
  methods: {
    handleCollapse() {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>
<style lang="less" scoped>
.collapse {
  padding: 10px 15px;
  border: 1px solid #DCDFE6;
  border-radius: 4px;
  .collapse-header {
    text-align: left;
    font-size: 16px;
    color: #222222;
    font-weight: 500;
    padding-bottom: 6px;
    border-bottom: solid 1px #DCDFE6;

    .el-collapse-header__arrow {
      margin: 0 8px 0 auto;
      transition: transform .3s;
      font-weight: 300;
      color: #B7BCC6;

      &.is-active {
        transform: rotate(-90deg);
      }
    }
    .header-left-tip {
      background: rgba(250,171,12,0.20);
      border-radius: 2px;
      margin-left: 23px;
      font-size: 12px;
      padding: 4px 25px 4px 16px;
      color: #909399;
      min-width: 300px;
      font-weight: normal;
    }
  }

  .collapse-content {
    padding: 20px;
  }
}
</style>
