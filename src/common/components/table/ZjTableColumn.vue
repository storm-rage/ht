<template>
  <vxe-table-column v-bind="attrs" v-if="$scopedSlots.default">
    <template v-slot="scope">
      <slot v-bind="scope"></slot>
    </template>
  </vxe-table-column>
  <vxe-table-column v-bind="attrs" v-else-if="$scopedSlots.header">
    <template v-slot:header="scope">
      <slot v-bind="scope" name="header"></slot>
    </template>
  </vxe-table-column>
  <vxe-table-column v-bind="attrs" v-else-if="$scopedSlots.footer">
    <template v-slot:footer="scope">
      <slot v-bind="scope" name="footer"></slot>
    </template>
  </vxe-table-column>
  <vxe-table-column v-bind="attrs" v-else-if="type === 'expand' && $scopedSlots.content">
    <template v-slot:content="scope">
      <slot v-bind="scope" name="content"></slot>
    </template>
  </vxe-table-column>
  <vxe-table-column v-bind="attrs" v-else-if="filterRender && $scopedSlots.filter">
    <template v-slot:filter="scope">
      <slot v-bind="scope" name="filter"></slot>
    </template>
  </vxe-table-column>
  <vxe-table-column v-bind="attrs" v-else-if="editRender && $scopedSlots.edit">
    <template v-slot:edit="scope">
      <slot v-bind="scope" name="edit"></slot>
    </template>
  </vxe-table-column>
  <vxe-table-column v-bind="attrs" v-else></vxe-table-column>
</template>

<script>
export default {
  name: 'ZjTableColumn',
  props: {
    /** tableColumn基本属性 */
    /*
      列的类型
      seq - 序号
      checkbox - 复选框
      radio - 单选框
      expand - 展开行
      html - HTML 标签，不支持与其他功能列共存（动态渲染任意 HTML 是非常危险的，很容易导致 XSS 攻击，请确保内容是可信的）
     */
    type: String,
    // 列字段名
    field: String,
    // 列标题
    title: String,
    // 列宽度（如果为空则均匀分配剩余宽度，如果全部列固定了，可能会存在宽屏下不会铺满，可以配合 "%" 或者 "min-width" 布局） px, %
    width: [Number, String],
    // 最小列宽度，会自动将剩余空间按比例分配 px, %
    minWidth: [Number, String],
    // 列是否允许拖动列宽调整大小
    resizable: { type: Boolean, default: null },
    // 列是否显示
    visible: { type: Boolean, default: null },
    // 将列固定在左侧或者右侧（注意：固定列应该放在左右两侧的位置） left（固定左侧）, right（固定右侧）
    fixed: String,
    // 列对齐方式 left（左对齐）, center（居中对齐）, right（右对齐）
    align: { type: String, default: 'center' },
    // 表头列的对齐方式 left（左对齐）, center（居中对齐）, right（右对齐）
    headerAlign: String,
    // 表尾列的对齐方式 left（左对齐）, center（居中对齐）, right（右对齐）
    footerAlign: String,
    // 当内容过长时显示为省略号 ellipsis（只显示省略号）, title（并且显示为原生 title）, tooltip（并且显示为 tooltip 提示）
    showOverflow: { type: [Boolean, String], default: null },
    // 当表头内容过长时显示为省略号 ellipsis（只显示省略号）, title（并且显示为原生 title）, tooltip（并且显示为 tooltip 提示）
    showHeaderOverflow: { type: [Boolean, String], default: null },
    // 当表尾内容过长时显示为省略号 ellipsis（只显示省略号）, title（并且显示为原生 title）, tooltip（并且显示为 tooltip 提示）
    showFooterOverflow: { type: [Boolean, String], default: null },
    // 给单元格附加 className，也可以是函数 Function({row, rowIndex, $rowIndex, column, columnIndex, $columnIndex})
    className: [String, Function],
    // 给表头的单元格附加 className，也可以是函数 Function({$rowIndex, column, columnIndex, $columnIndex})
    headerClassName: [String, Function],
    // 给表尾的单元格附加 className，也可以是函数 Function({$rowIndex, column, columnIndex, $columnIndex})
    footerClassName: [String, Function],
    // 格式化显示内容 Function({cellValue, row, column})
    formatter: [Function, Array, String],
    // 只对 type=seq 有效，自定义索引方法 Function({row, rowIndex, column, columnIndex})
    indexMethod: Function,
    // 是否允许列排序
    sortable: Boolean,
    // 只对 sortable 有效，自定义排序的属性
    sortBy: [String, Array],
    // 自定义排序方法，Array.sort(a, b)
    sortMethod: Function,
    // 是否使用服务端排序，如果设置为 true 则不会对数据进行处理
    remoteSort: { type: Boolean, default: null },
    /*
      配置筛选条件（注：筛选只能用于列表，如果是树结构则过滤根节点）
      label - 显示的值 String
      value - 实际的值 Any
      checked - 默认是否选中 Boolean
      resetValue - 重置时的默认值 Any
      data - 自定义渲染的数据值（当使用自定义模板时可能会用到） Any
     */
    filters: { type: Array, default: null },
    // 只对 filters 有效，筛选是否允许多选
    filterMultiple: { type: Boolean, default: true },
    // 只对 filters 有效，自定义筛选方法 Function({value, row, column})
    filterMethod: Function,
    /*
      筛选渲染器配置项
      name - 渲染器名称 input, textarea, select, $input, $textarea, $select String
      props - 渲染的参数（请查看目标渲染的 Props） Object
      attrs - 渲染的属性（请查看目标渲染的 Attribute） Object
      events - 渲染组件的事件（请查看目标渲染的 Events） Object
      content - 渲染组件的内容（仅用于特殊组件） String
     */
    filterRender: Object,
    // 只对特定功能有效，单元格值类型（例如：导出数据类型设置） auto（默认自动转换），number（数值）, string（字符串
    cellType: String,
    /*
      默认的渲染器配置项
      name - 渲染器名称 input, textarea, select, $input, $textarea, $select String
      props - 渲染的参数（请查看目标渲染的 Props） Object
      attrs - 渲染的属性（请查看目标渲染的 Attribute） Object
      options - 只对 name=select 有效，下拉选项列表 Array
      optionProps - 只对 name=select 有效，下拉选项属性参数配置 Object
      optionGroups - 只对 name=select 有效，下拉分组选项列表 Array
      optionGroupProps - 只对 name=select 有效，下拉分组选项属性参数配置 Object
      events - 渲染组件的事件（请查看目标渲染的 Events） Object
      content - 渲染组件的内容（仅用于特殊组件） String
     */
    cellRender: Object,
    /*
      可编辑渲染器配置项
      name - 渲染器名称 input, textarea, select, $input, $textarea, $select String
      props - 渲染的参数（请查看目标渲染的 Props） Object
      attrs - 渲染的属性（请查看目标渲染的 Attribute） Object
      options - 只对 name=select 有效，下拉选项列表 Array
      optionProps - 只对 name=select 有效，下拉选项属性参数配置 Object
      optionGroups - 只对 name=select 有效，下拉分组选项列表 Array
      optionGroupProps - 只对 name=select 有效，下拉分组选项属性参数配置 Object
      events - 渲染组件的事件（请查看目标渲染的 Events） Object
      content - 渲染组件的内容（仅用于特殊组件） String
      autofocus - 如果是自定义渲染可以指定聚焦的选择器，例如 .my-input String
      autoselect - 是否在激活编辑之后自动选中输入框内容 Boolean
      defaultValue - 默认值（插入数据时列的默认值） Any
      immediate - 输入值实时同步更新（如果设置为 true，但可编辑时性能将会直线下降） Boolean
     */
    editRender: Object,
    /*
      内容渲染配置项
      name - 渲染器名称 input, textarea, select, $input, $textarea, $select String
      props - 渲染的参数（请查看目标渲染的 Props） Object
      attrs - 渲染的属性（请查看目标渲染的 Attribute） Object
      options - 只对 name=select 有效，下拉选项列表 Array
      optionProps - 只对 name=select 有效，下拉选项属性参数配置 Object
      optionGroups - 只对 name=select 有效，下拉分组选项列表 Array
      optionGroupProps - 只对 name=select 有效，下拉分组选项属性参数配置 Object
      events - 渲染组件的事件（请查看目标渲染的 Events） Object
     */
    contentRender: Object,
    // 只对 tree-config 配置时有效，指定为树节点
    treeNode: Boolean,
    // 额外的参数（可以用来存放一些私有参数）
    params: Object
  },
  computed: {
    // tableColumn基本属性
    attrs () {
      return {
        type: this.type,
        field: this.field,
        title: this.title,
        width: this.width,
        minWidth: this.minWidth,
        resizable: this.resizable,
        visible: this.visible,
        fixed: this.fixed,
        align: this.align,
        headerAlign: this.headerAlign,
        footerAlign: this.footerAlign,
        showOverflow: this.showOverflow,
        showHeaderOverflow: this.showHeaderOverflow,
        showFooterOverflow: this.showFooterOverflow,
        className: this.className,
        headerClassName: this.headerClassName,
        footerClassName: this.footerClassName,
        formatter: this.formatter,
        indexMethod: this.indexMethod,
        sortable: this.sortable,
        sortBy: this.sortBy,
        sortMethod: this.sortMethod,
        remoteSort: this.remoteSort,
        filters: this.filters,
        filterMultiple: this.filterMultiple,
        filterMethod: this.filterMethod,
        filterRender: this.filterRender,
        cellType: this.cellType,
        cellRender: this.cellRender,
        editRender: this.editRender,
        contentRender: this.contentRender,
        treeNode: this.treeNode,
        params: this.params
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
