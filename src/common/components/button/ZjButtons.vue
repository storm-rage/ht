<template>
  <vxe-button v-bind="attrs" v-on="events" v-if="show" @click="zjButtonClick">
    <template v-if="$slots.default"><slot></slot></template>
    <template v-if="$slots.dropdowns" v-slot:dropdowns><slot name="dropdowns"></slot></template>
  </vxe-button>
</template>

<script>
export default {
  name: 'ZjButton',
  props: {
    // 权限api
    api: [Function, String],
    /** button基本属性 */
    // 内容（支持开启国际化）
    content: String,
    // text,submit,reset,button
    type: String,
    // medium,small,mini
    size: String,
    // 用来标识这一项
    name: [String, Number],
    // 前缀图标
    icon: String,
    // 圆角边框
    round: Boolean,
    // 圆角按钮
    circle: Boolean,
    // 按钮的图标 perfect, primary, success, info, warning, danger
    status: String,
    // 是否禁用
    disabled: Boolean,
    // 是否加载中
    loading: Boolean,
    // 固定显示下拉面板的方向 top, bottom
    placement: String,
    // 是否将弹框容器插入于 body 内（对于嵌入到表格或者弹窗中被遮挡时需要设置为 true）
    transfer: Boolean
  },
  computed: {
    // button基本属性
    attrs () {
      return {
        content: this.content,
        type: this.type,
        size: this.size,
        name: this.name,
        icon: this.icon,
        round: this.round,
        circle: this.circle,
        status: this.status ? this.status : this.type === 'text' ? 'primary' : this.status,
        disabled: this.disabled,
        loading: this.loading,
        placement: this.placement,
        transfer: this.transfer
      }
    },
    // button基本事件
    events() {
      return {
        // 下拉列表按钮点击时会触发该事件 { name, $event }
        'dropdown-click': (params) => {
          this.$emit('dropdown-click', params)
        }
      }
    },
    // 权限控制 显示/隐藏
    show () {
      if (typeof this.api === 'function' || typeof this.api === 'undefined') {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    // 点击事件
    zjButtonClick () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="less" scoped>
  .vxe-button{
    text-overflow:initial !important;
  }
  .vxe-button.type--button{
    &.theme--success[plain]{
      background-color: rgba(103, 194, 58, 0.25);
      color: #67c23a;
      &:hover{
        color: #fff;
        background-color: rgba(103, 194, 58, 0.8);
      }
    }
    &.theme--danger[plain]{
      background-color: rgba(245, 108, 108, 0.25);
      color: #f56c6c;
      &:hover{
        color: #fff;
        background-color: rgba(245, 108, 108, 0.8);
      }
    }
    &.theme--drakblue{
      background-color: #32659D;
      color: #f6f1f1;
      &:hover{
        color: white;
        background-color: rgba(50, 101, 157, 0.9);
      }
    }
  }
</style>
