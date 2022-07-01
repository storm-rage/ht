<template>
  <div :class="[
    type === 'textarea' ? 'el-textarea' : 'el-input',
    inputSize ? 'el-input--' + inputSize : '',
    {
      'is-disabled': inputDisabled,
      'el-input-group': $slots.prepend || $slots.append,
      'el-input-group--append': $slots.append,
      'el-input-group--prepend': $slots.prepend,
      'el-input--prefix': $slots.prefix || prefixIcon,
      'el-input--suffix': $slots.suffix || suffixIcon || clearable || showPassword
    }
    ]"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false">
    <!-- 前置元素 -->
    <div class="el-input-group__prepend" v-if="$slots.prepend">
      <slot name="prepend"></slot>
    </div>
    <el-tooltip class="item" :popper-class="!tooltipContent ? 'zj-tooltip' : ''" effect="dark" :visible-arrow="false" ref="tooltip" :content="tooltipContent" placement="top-start" :disabled="toolTipDisabled">
      <input
        :id="elementId"
        class="el-input__inner"
        :disabled="disabled"
        autocomplete="off"
        spellcheck="false"
        :autofocus="autofocus"
        :maxlength="maxlength"
        :minlength="minlength"
        @focus="focus"
        @blur="blur"
        @input="change"
        @mouseup="preventDefault"
        @change="change"
        :readonly="readonly || !editable"
        :name="name"
        :value="formatterValue"
        :placeholder="placeholder"
      />
    </el-tooltip>
    <!-- 前置内容 -->
    <span class="el-input__prefix" v-if="$slots.prefix || prefixIcon">
      <slot name="prefix"></slot>
      <i class="el-input__icon"
          v-if="prefixIcon"
          :class="prefixIcon">
      </i>
    </span>
    <!-- 后置内容 -->
    <span
      class="el-input__suffix"
      v-if="$slots.suffix || suffixIcon || showClear || validateState && needStatusIcon">
      <span class="el-input__suffix-inner">
        <template v-if="!showClear">
          <slot name="suffix"></slot>
          <i class="el-input__icon"
            v-if="suffixIcon"
            :class="suffixIcon">
          </i>
        </template>
        <i v-if="showClear"
          class="el-input__icon el-icon-circle-close el-input__clear"
          @click="clear"
        ></i>
      </span>
      <i class="el-input__icon"
        v-if="validateState"
        :class="['el-input__validateIcon', validateIcon]">
      </i>
    </span>
    <!-- 后置元素 -->
    <div class="el-input-group__append" v-if="$slots.append">
      <slot name="append"></slot>
    </div>
  </div>
</template>

<script>
import emitter from 'element-ui/src/mixins/emitter'
export default {
  name: 'ZjInputNumber',
  mixins: [emitter],
  inject: {
    elForm: {
      default: ''
    },
    elFormItem: {
      default: ''
    }
  },
  props: {
    value: [String, Number],
    isNum: {
      type: Boolean,
      default: true
    },
    maxlength: [Number, String],
    minlength: [Number, String],
    toolTipDisabled: {
      type: Boolean,
      default: true
    },
    max: {
      type: Number,
      default: 99999999999999.99
    },
    min: {
      type: Number,
      default: 0
    },
    activeChange: {
      type: Boolean,
      default: false
    },
    size: String,
    disabled: Boolean,
    readonly: Boolean,
    precision: {
      type: Number,
      default: 2
    },
    //是否格式化成金额
    formatterMoney: {
      type: [Boolean,Function],
      default: false
    },
    formatter: {
      type: Function
    },
    parser: {
      type: Function
    },
    suffixIcon: String,
    prefixIcon: String,
    clearable: {
      type: Boolean,
      default: false
    },
    showPassword: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    elementId: {
      type: String
    },
    editable: {
      type: Boolean,
      default: true
    },
    name: {
      type: String
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    validateEvent: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      type: 'input',
      focused: false,
      currentValue: this.value,
      tooltipContent: null
    }
  },
  computed: {
    precisionValue () {
      if (!this.currentValue) return this.currentValue
      return this.precision ? parseFloat(this.currentValue).toFixed(this.precision) : this.currentValue
    },
    // 格式化显示的内容，如果有formatter函数，如果不显示tooltip则格式化输入框的，如果显示tooltip则格式化tooltip的内容
    formatterValue () {
      if (this.formatter && this.precisionValue !== null) {
        if (this.toolTipDisabled) {
          // return this.currentValue
          return this.formatter(this.precisionValue)
        } else {
          return this.precisionValue
        }
      }else if(this.formatterMoney && this.precisionValue && !this.focused) {
        if (typeof this.formatterMoney === 'function') {
          return this.formatterMoney(this.precisionValue);
        }else {
          return String(this.money(this.precisionValue)).trim();
        }
      } else {
        return this.precisionValue
      }
    },
    _elFormItemSize () {
      return (this.elFormItem || {}).elFormItemSize
    },
    validateState () {
      return this.elFormItem ? this.elFormItem.validateState : ''
    },
    needStatusIcon () {
      return this.elForm ? this.elForm.statusIcon : false
    },
    validateIcon () {
      return {
        validating: 'el-icon-loading',
        success: 'el-icon-circle-check',
        error: 'el-icon-circle-close'
      }[this.validateState]
    },
    inputSize () {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size
    },
    inputDisabled () {
      return this.disabled || (this.elForm || {}).disabled
    },
    nativeInputValue () {
      return this.value === null || this.value === undefined
        ? ''
        : String(this.value)
    },
    showClear () {
      return (
        this.clearable &&
        !this.inputDisabled &&
        !this.readonly &&
        this.nativeInputValue &&
        (this.focused || this.hovering)
      )
    }
  },
  methods: {
    preventDefault (e) {
      e.preventDefault()
    },
    // input设置输入框value，并传出。
    setValue (val) {
      // const r = new RegExp('\\d*(\\.\\d{0,'+this.precision+'})?');val = Number(r.exec(String(val))[0])
      if (val && !isNaN(this.precision)) val = Number(Number(val).toFixed(this.precision))
      const { min, max } = this
      if (val !== null) {
        if (val > max) {
          val = max
        } else if (val < min) {
          val = min
        }
      }
      this.$nextTick(() => {
        this.currentValue = val
        this.tooltipContent = this.formatter ? this.formatter(this.currentValue) : toString(this.currentValue)
        this.$emit('input', val)
        this.$emit('change', val)
        if (this.validateEvent) {
          this.dispatch('ElFormItem', 'el.form.change', [val])
        }
      })
    },
    // input获得焦点
    focus (event) {
      this.focused = true
      this.$emit('focus', event)
    },
    // input失去焦点
    blur () {
      this.focused = false
      this.$emit('blur')
      if (this.validateEvent) {
        this.dispatch('ElFormItem', 'el.form.blur', this.currentValue)
      }
    },
    // Input值在改变
    change (event) {

      let val = event.target.value.trim();

      const len = 14;
      if(val.indexOf('.')>-1){
        let newV = '';
        if(val.split('.')[0].length>len){
          newV = val.split('.')[0].slice(0,len)
        }else{
          newV = val.split('.')[0]
        }
        if(val.split('.')[1].length>this.precision){
          newV  +='.'+ val.split('.')[1].slice(0,this.precision)
        }else{
          newV  +='.'+ val.split('.')[1]
        }
        event.target.value = newV
      }else{
        event.target.value = val.slice(0,len)
      }

      if (event.type === 'change' && this.activeChange) return
      if (event.type === 'input' && !this.activeChange) return

      if (this.parser) {
        val = this.parser(val)
      }
      const isEmptyString = val.length === 0
      if (isEmptyString) {
        this.setValue(null)
        return
      }
      if (this.isNum) { // 如果是数字类型
        if (event.type === 'input' && val.match(/^-?\.?$|\.$/)) return
        //存在千分符情况(copy情况下)
        if (val.indexOf(',')) {
          val = String(val).trim().replace(/,/g,'');
        }
        val = Number(val)
        // console.log(isNaN(val), 'isNaN', val, 'val')
        if (!isNaN(val)) {
          this.currentValue = val
          this.setValue(val)
        } else {
          event.target.value = this.currentValue
        }
      } else { // 其他类型的判断 比如银行卡
        if (event.type === 'input' && val.match(/^\d*$/g)) {
          this.setValue(val)
        } else {
          event.target.value = this.currentValue
        }
      }
      this.tooltipContent = this.formatter ? this.formatter(this.currentValue) : toString(this.currentValue)
    },
    // 清除input值
    clear () {
      this.$emit('input', null)
      this.$emit('change', null)
      this.$emit('clear')
      this.tooltipContent = null
    }
  },
  mounted () {
    this.tooltipContent = this.formatter ? this.formatter(this.currentValue) : toString(this.currentValue)
  },
  watch: {
    value (val) {
      this.currentValue = val
      if (val === null) { this.$refs.tooltip.hide() } else { this.$refs.tooltip.show() }
    }
  }
}
</script>

<style lang='less'>
.zj-tooltip{
  background: transparent !important;
}
</style>
