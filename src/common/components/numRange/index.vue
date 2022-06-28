<template>
  <div>
    <el-input class="amt-range"
      ref="startNum"
      v-model="startNumModel"
      v-bind="startAttrs"
      v-on="startEvents"
      @keyup.enter.native="$emit('keyupEnterNative')"
    >
    </el-input>
    <span> — </span>
    <el-input class="amt-range"
      ref="endNum"
      v-model="endNumModel"
      v-bind="endAttrs"
      v-on="endEvents"
      @keyup.enter.native="$emit('keyupEnterNative')"
    >
    </el-input>
  </div>
</template>

<script>
export default {
  name: 'ZjNumRange',
  props: {
    // 开始值的绑定值
    startNum: { type: String, default: '' },
    // 结束值的绑定值
    endNum: { type: String, default: ''},
    // 分隔符
    separator: { type: String, default: '至' },
    /** datePicker基础属性 */
    // 完全只读
    readonly: Boolean,
    // 禁用
    disabled: Boolean,
    // 文本框可输入
    editable: Boolean,
    // 是否显示清除按钮
    clearable: { type: Boolean, default: true },
    // 输入框尺寸
    size: String,
    // 占位内容
    startPlaceholder:String,
    endPlaceholder: String,
    // 对齐方式
    align: String,
    // 自定义清空图标的类名
    clearIcon: String
  },
  methods: {
    startFocus () {
      return this.$refs.startNum.focus()
    },
    endFocus () {
      return this.$refs.endNum.focus()
    }
  },
  computed: {
    // 开始值的绑定值
    startNumModel: {
      get () {
        return this.startNum
      },
      set (val) {
        let regx = /^\d+?$/
        if(!regx.test(val)){
          this.$emit('update:startNum', '')
        } else {
          this.$emit('update:startNum', val)
        }
      }
    },
    // 结束值的绑定值
    endNumModel: {
      get () {
        return this.endNum
      },
      set (val) {
        let regx = /^\d+?$/
        if(!regx.test(val)){
          this.$emit('update:endNum', '')
        } else {
          this.$emit('update:endNum', val)
        }
      }
    },
    // 开始值基础属性
    startAttrs () {
      return {
        readonly: this.readonly,
        disabled: this.disabled,
        editable: this.editable,
        clearable: this.clearable,
        size: this.size,
        placeholder: this.startPlaceholder || this.placeholder,
        align: this.align,
        clearIcon: this.clearIcon
      }
    },
    // 开始值基本事件
    startEvents() {
      return {
        // 当 input 失去焦点时触发 组件实例
        'blur': (params) => {
          this.$emit('startBlur', params)
        },
        // 当 input 获得焦点时触发 组件实例
        'focus': (params) => {
          this.$emit('startFocus', params)
        }
      }
    },
    // 结束值基础属性
    endAttrs () {
      return {
        readonly: this.readonly,
        disabled: this.disabled,
        editable: this.editable,
        clearable: this.clearable,
        size: this.size,
        placeholder: this.endPlaceholder || this.placeholder,
        align: this.align,
        prefixIcon: this.prefixIcon,
        clearIcon: this.clearIcon
      }
    },
    // 结束值
    endEvents() {
      return {
        // 当 input 失去焦点时触发 组件实例
        'blur': (params) => {
          this.$emit('endBlur', params)
        },
        // 当 input 获得焦点时触发 组件实例
        'focus': (params) => {
          this.$emit('endFocus', params)
        }
      }
    }
  },
}
</script>

<style lang="less" scoped>
</style>
