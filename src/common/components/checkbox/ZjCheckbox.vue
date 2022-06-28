<template>
  <div style="width: 100%" class="sw-checkbox">
    <template v-if="type === 'button'">
      <el-checkbox-button v-if="hasCheckAll" v-model="checkAllValue" @change="handleCheckAllChange" :disabled="disabled">全选</el-checkbox-button>
      <el-checkbox-group v-model="checked" @change="handleCheckedChange" class="zj-checkbox-button" :class="checkboxButtonClass" :disabled="disabled">
          <el-checkbox-button v-for="item in list" :label="item.key" :key="item.key" :disabled="disabled">{{ item.label }}</el-checkbox-button>
      </el-checkbox-group>
    </template>
    <template v-else>
      <span v-if="label" class="zj-f-l check-label">{{label}}</span>
      <span class="zj-f-l" style="width: calc(100% - 100px);">
        <el-checkbox v-if="hasCheckAll" v-model="checkAllValue" @change="handleCheckAllChange">全选</el-checkbox>
        <el-checkbox-group v-model="checked" @change="handleCheckedChange" class="zj-checkbox" :disabled="disabled" styl="display: inline-block;">
          <el-checkbox v-for="item in list" :label="item.key" :key="item.key" :disabled="item.disabled || disabled">{{ item.label }}</el-checkbox>
        </el-checkbox-group>
      </span>

    </template>
  </div>
</template>

<script>
export default {
  name: 'ZjCheckbox',
  props: {
    // 选择列表
    list: Array,
    // 选中值
    value: Array,
    // 类型 默认,button
    type: String,
    // 类型 默认,button
    label: String,
    // 是否有全选
    hasCheckAll: { type: Boolean, default: true },
    // 是否默认全选
    checkAll: Boolean,
    //whl-是否禁用
    disabled:{type:Boolean,default: false}
  },
  //后面加的，实时同步选中
  watch:{
    value(newArr){
      this.checked = newArr
      if(newArr.length <= 0){
        this.checkAllValue = false
      }
    }
  },
  data () {
    return {
      // 全选
      checkAllValue: false,
      // button时动态样式
      checkboxButtonClass: '',
      // 当前选中列表
      checked: []
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.checked = this.value //恢复选中
      this.checkboxButtonClass = this.hasCheckAll ? 'zj-checkbox-button-checked' : ''
      if (this.checkAll) {
        this.checkAllValue = true
        this.handleCheckAllChange(this.checkAllValue)
      }
    })
  },
  methods: {
    handleCheckAllChange (val) {
      this.checked = val ? this.list.map((item) => { return item.key }) : []
      this.$emit('update:value', this.checked)
      //后面附加的
      this.$emit('handleCheckedChange',{
        string:this.checked.join(','),
        array:this.checked
      })
    },
    handleCheckedChange(checked) {
      if (this.hasCheckAll) {
        this.checkAllValue = checked.length === this.list.length
      }
      this.$emit('update:value', checked)
      //后面附加的
      this.$emit('handleCheckedChange',{
        string:this.checked.join(','),
        array:this.checked
      })
    }
  }
}
</script>

<style lang="less" scoped>
.check-label {
  margin-top: 10px;
  margin-left: 10px;
  font-size: 12px;
}
.zj-checkbox {
  /*margin-left: 10px;*/
  width: 100%;
}
.zj-checkbox-button {
  display: inline-block;
  vertical-align: top;
}
.zj-checkbox-button-checked {
  /deep/ .el-checkbox-button.is-checked:first-child .el-checkbox-button__inner {
    box-shadow: -1px 0 0 0 #8cc5ff !important;
  }
  /deep/ .el-checkbox-button:first-child .el-checkbox-button__inner {
    border-radius: 0;
    box-shadow: none !important;
  }
}
/deep/ .el-checkbox-button__inner {
  border-left: 1px solid #DCDFE6;
}

</style>
