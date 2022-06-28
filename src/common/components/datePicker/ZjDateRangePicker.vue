<template>
  <div>
    <el-date-picker
      class="zj-date-range-picker"
      ref="startDate"
      v-model="startDateModel"
      v-bind="startAttrs"
      v-on="startEvents"
    >
    </el-date-picker>
    <span> {{ separator }} </span>
    <el-date-picker
      class="zj-date-range-picker"
      ref="endDate"
      v-model="endDateModel"
      v-bind="endAttrs"
      v-on="endEvents"
    >
    </el-date-picker>
  </div>
</template>

<script>
export default {
  name: 'ZjDateRangePicker',
  props: {
    // 开始日期绑定值
    startDate: { type: String, default: '' },
    // 结束日期绑定值
    endDate: { type: String, default: '' },
    // 开始边界值
    startEdge:{type: String, default:''},
    // 结束边界值
    endEdge:{type: String, default:''},
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
    startPickerOptions: Object,
    endPickerOptions: Object,
    pickerOptions: Object,
    // 可选，绑定值的格式。不指定则绑定值为 Date 对象
    valueFormat: { type: String, default: 'yyyyMMdd' },
    // 自定义头部图标的类名
    prefixIcon: String,
    // 自定义清空图标的类名
    clearIcon: String
  },
  methods: {
    // 默认的禁用开始日期
    startDisabledDate (date) {
      let startEdge = new Date(this.startEdge.substr(0,4)+'/'+this.startEdge.substr(4,2)+'/'+this.startEdge.substr(6,2))
      let endEdge = new Date(this.endEdge.substr(0,4)+'/'+this.endEdge.substr(4,2)+'/'+this.endEdge.substr(6,2))
      if (this.endDate) {
        return date.getTime() > this.$moment(this.endDate) || date.getTime() < startEdge.getTime()
      }else{
        return date.getTime() < startEdge.getTime() || date.getTime() > endEdge.getTime();
      }
    },
    // 默认的禁用结束日期
    endDisabledDate (date) {
      let startEdge = new Date(this.startEdge.substr(0,4)+'/'+this.startEdge.substr(4,2)+'/'+this.startEdge.substr(6,2))
      let endEdge = new Date(this.endEdge.substr(0,4)+'/'+this.endEdge.substr(4,2)+'/'+this.endEdge.substr(6,2))

      if (this.startDate) {
        return date.getTime() < this.$moment(this.startDate) || date.getTime() > endEdge.getTime()
      }else{
        return date.getTime() > endEdge.getTime() || date.getTime() < startEdge.getTime();
      }

      // if (this.startDate) {
      //   return date.getTime() < this.$moment(this.startDate)
      // }
    },
    /** datePicker基本方法 */
    // 使 input 获取焦点
    startFocus () {
      return this.$refs.startDate.focus()
    },
    endFocus () {
      return this.$refs.endDate.focus()
    }
  },
  watch:{
    startDate(newDate){
      if(newDate){
        this.startDateModel = newDate.replace(/-/g,'')
      }
    },
    endDate(newDate){
      if(newDate){
        this.endDateModel = newDate.replace(/-/g,'')
      }
    }
  },
  computed: {
    // 开始日期绑定值
    startDateModel: {
      get () {
        return this.startDate
      },
      set (val) {
        this.$emit('update:startDate', val)
      }
    },
    // 结束日期绑定值
    endDateModel: {
      get () {
        return this.endDate
      },
      set (val) {
        this.$emit('update:endDate', val)
      }
    },
    // 开始日期 datePicker基础属性
    startAttrs () {
      return {
        readonly: this.readonly,
        disabled: this.disabled,
        editable: this.editable,
        clearable: this.clearable,
        size: this.size,
        placeholder: this.startPlaceholder || this.placeholder,
        type: this.type,
        format: this.format,
        align: this.align,
        popperClass: this.popperClass,
        pickerOptions: Object.assign({
          disabledDate: this.startDisabledDate
        }, this.pickerOptions, this.startPickerOptions),
        valueFormat: this.valueFormat,
        prefixIcon: this.prefixIcon,
        clearIcon: this.clearIcon
      }
    },
    // 开始日期 datePicker基本事件
    startEvents() {
      return {
        // 用户确认选定的值时触发 组件绑定值。格式与绑定值一致，可受 value-format 控制
        'change': (params) => {
          this.$emit('startChange', params)
        },
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
    // 结束日期 datePicker基础属性
    endAttrs () {
      return {
        readonly: this.readonly,
        disabled: this.disabled,
        editable: this.editable,
        clearable: this.clearable,
        size: this.size,
        placeholder: this.endPlaceholder || this.placeholder,
        type: this.type,
        format: this.format,
        align: this.align,
        popperClass: this.popperClass,
        pickerOptions: Object.assign({
          disabledDate: this.endDisabledDate
        }, this.pickerOptions, this.endPickerOptions),
        valueFormat: this.valueFormat,
        prefixIcon: this.prefixIcon,
        clearIcon: this.clearIcon
      }
    },
    // 结束日期 datePicker基本事件
    endEvents() {
      return {
        // 用户确认选定的值时触发 组件绑定值。格式与绑定值一致，可受 value-format 控制
        'change': (params) => {
          this.$emit('endChange', params)
        },
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

<style lang="less">
  @dateCloseWidth:28px;

  .zj-date-range-picker{
    position: relative;
    .el-input__inner{
      padding-left: @dateCloseWidth;
      z-index: 999999;
    }
    &:hover{
      .el-input__suffix{
        position: absolute;
        left:calc(@dateCloseWidth + 5px + -100%)
      }
    }
  }
</style>
