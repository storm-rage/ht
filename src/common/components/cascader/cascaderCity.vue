<template>
  <el-cascader
    v-model="value"
    :options="options"
    :props="{ expandTrigger: 'hover' }"
    :placeholder="placeholder"
    @blur="blur"
    clearable
    filterable>
  </el-cascader>
</template>

<script>
export default {
  name: 'CascaderCity',
  props: {
    // 省
    province: String,
    // 市
    city: String,
    // 是否选择区/县
    townOptional: {
      type:Boolean,
      default:true
    },
    // 区/县
    town: String,
    // 输入框占位文本
    placeholder: String,
    // blur事件
    blur: { type: Function, default: () => {} }
  },
  data () {
    return {
      // 数据源
      options: [],
    }
  },
  created() {
    // 获取 省 市 区/县 数据字典
    this.$api.baseCommon.getCity().then(res => {
      if (res.provinceCodes && res.provinceCodes.length) {
        // 生成 省 市 区/县 树结构
        this.options = this.getCityTree(res.provinceCodes)
      }
    })
  },
  methods: {
    // 生成 省 市 区/县 树结构 （cityList - 按treeCode排序后的List）
    getCityTree (cityList) {
      // 树
      let cityTree = []
      // 当前节点省
      let currentProvince
      // 当前节点市
      let currentCity
      // 当前节点区/县
      let currentTown
      // 遍历列表
      cityList.map(item => {
        if (item.treeCode.length === 3) {
          // treeCode 3位为省 加到根节点
          currentProvince = {
            value: item.treeCode,
            label: item.districtName
          }
          cityTree.push(currentProvince)
        } else if (item.treeCode.length === 6) {
          // treeCode 6位为市 加到当前省节点
          currentCity = {
            value: item.treeCode,
            label: item.districtName
          }
          currentProvince.children ? currentProvince.children.push(currentCity) : currentProvince.children = [currentCity]
        } else if (this.townOptional && item.treeCode.length === 9) {
          // treeCode 9位为区/县 如果需要区/县加到当前市节点
          currentTown = {
            value: item.treeCode,
            label: item.districtName
          }
          currentCity.children ? currentCity.children.push(currentTown) : currentCity.children = [currentTown]
        }
      })
      return cityTree
    }
  },
  computed: {
    // 选中项绑定值
    value: {
      get () {
        return this.townOptional ? [this.province, this.city, this.town] : [this.province, this.city]
      },
      set (val) {
        console.log(val)
        this.$emit('update:province', val[0])
        this.$emit('update:city', val[1])
        this.townOptional && this.$emit('update:town', val[2])
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
