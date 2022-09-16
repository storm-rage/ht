<template>
  <el-date-picker
    class="zj-date-picker"
    ref="date"
    v-model="dateModel"
    v-bind="attrs"
    v-on="events">
  </el-date-picker>
</template>

<script>
export default {
  name: 'ZjDatePicker',
  props: {
    // 日期绑定值
    date: String,

    // 开始天数边界值
    startDayEdge:{type: String, default:''},
    // 结束天数边界值
    endDayEdge:{type: String, default:''},

    // 是否小于当天
    lessNow: Boolean,
    // 是否大于当天
    overNow: Boolean,
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
    placeholder: String,
    // 显示类型 year/month/date/dates/ week/datetime/datetimerange/ daterange/monthrange
    type: { type: String, default: 'date' },
    // 显示在输入框中的格式
    format: { type: String, default: 'yyyy-MM-dd' },
    // 对齐方式
    align: String,
    // DatePicker 下拉框的类名
    popperClass: String,
    /*
      当前时间日期选择器特有的选项
      shortcuts - 设置快捷选项，需要传入 { text, onClick } 对象 Object[]
        text - 标题文本 string
        onClick - 选中后的回调函数，参数是 vm，可通过触发 'pick' 事件设置选择器的值。例如 vm.$emit('pick', new Date()) function
       disabledDate - 设置禁用状态，参数为当前日期，要求返回 Boolean Function
       cellClassName - 设置日期的 className Function(Date)
       firstDayOfWeek - 周起始日 1 到 7 Number
       onPick - 选中日期后会执行的回调，只有当 daterange 或 datetimerange 才生效 Function({ maxDate, minDate })
     */
    pickerOptions: Object,
    // 可选，绑定值的格式。不指定则绑定值为 Date 对象
    valueFormat: { type: String, default: 'yyyyMMdd' },
    // 自定义头部图标的类名
    prefixIcon: String,
    // 自定义清空图标的类名
    clearIcon: String
  },
  watch:{
    date: {
      handler(newDate) {
        if(newDate){
          this.dateModel = newDate.replace(/-/g,'')
        }
      },
      immediate: true // 在首次赋值时也能触发
    }
  },
  methods: {
    // 默认的禁用日期
    disabledDate (date) {
      let newDate = new Date()
      let newDateTime = newDate.getTime()
      if (this.lessNow) {
        return date.getTime() > this.$moment()
      } else if (this.overNow) {
        return date.getTime() < this.$moment().subtract(1, 'd')
      }
      //天数
      else if (this.startDayEdge || this.endDayEdge){
        let startDayEdge = new Date(this.startDayEdge * 24 * 60 * 60 *1000 + newDateTime)
        let endDayEdge = new Date(this.endDayEdge * 24 * 60 * 60 *1000 + newDateTime)
        return date.getTime() < startDayEdge.getTime() || date.getTime() > endDayEdge.getTime()
      }
    },
    /** datePicker基本方法 */
    // 使 input 获取焦点
    focus () {
      return this.$refs.date.focus()
    }
  },
  computed: {
    // 日期绑定值
    dateModel: {
      get () {
        return this.date
      },
      set (val) {
        this.$emit('update:date', val)
      }
    },
    // datePicker基础属性
    attrs () {
      return {
        readonly: this.readonly,
        disabled: this.disabled,
        editable: this.editable,
        clearable: this.clearable,
        size: this.size,
        placeholder: this.placeholder,
        type: this.type,
        format: this.format,
        align: this.align,
        popperClass: this.popperClass,
        pickerOptions: Object.assign({
          disabledDate: this.disabledDate
        }, this.pickerOptions),
        valueFormat: this.valueFormat,
        prefixIcon: this.prefixIcon,
        clearIcon: this.clearIcon
      }
    },
    // datePicker基本事件
    events() {
      return {
        // 用户确认选定的值时触发 组件绑定值。格式与绑定值一致，可受 value-format 控制
        'change': (params) => {
          this.$emit('change', params)
        },
        // 当 input 失去焦点时触发 组件实例
        'blur': (params) => {
          this.$emit('blur', params)
        },
        // 当 input 获得焦点时触发 组件实例
        'focus': (params) => {
          this.$emit('focus', params)
        }
      }
    }
  }
}
</script>

<style lang="less">
  @dateCloseWidth:28px;
  .zj-date-picker{
    position: relative!important;
    .el-input__inner{
      padding-left: @dateCloseWidth!important;
      z-index: 999999;
      min-width: 140px;
    }
    &:hover{
      .el-input__suffix{
        position: absolute!important;
        left:calc(@dateCloseWidth + 5px + -100%) !important;
      }
    }
  }
</style>
