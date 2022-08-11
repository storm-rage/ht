<template>
  <div class="zj-table">
    <vxe-table
      class="vxe-table-element zj-vxe-table"
      ref="zjTable"
      v-bind="attrs"
      v-on="events">
      <slot></slot>
    </vxe-table>
    <vxe-pager
      class="zj-table_pager"
      v-if="pager"
      ref="zjPager"
      data-placement="bottom"
      v-bind="pagerAttrs"
      v-on="pagerEvents">
      <template v-slot:left>
        <!--   原始     <slot name="pager-left"></slot>-->
        <span v-if="pagerSlot"><slot name="pager-left"></slot></span>
        <span v-if="!pagerSlot && tablePagerTotal>0">
          {{
                '显示'
                + ((tablePagerCurrentPage*tablePagerPageSize)-tablePagerPageSize+1)
                + '到' +
                ( (tablePagerCurrentPage*tablePagerPageSize) > tablePagerTotal ?  tablePagerTotal : tablePagerCurrentPage*tablePagerPageSize)
                + '条记录，总共 '
                + tablePagerTotal
                + '条记录'
            }}
        </span>
      </template>
      <template v-slot:right>
        <slot name="pager-right"></slot>
      </template>
    </vxe-pager>
  </div>
</template>

<script>
  export default {
    name: 'ZjTable',
    props: {
      /** 自定义属性 */
      // 请求参数
      params: Object,
      // 请求api
      api: [Function,String],
      // 数据列表
      dataList: Array,
      // 是否分页
      pager: { type: Boolean, default: true },
      /** table基本属性 */
      // 唯一标识
      id: String,
      // 表格数据（与 loadData 行为一致，更新数据是不会重置状态）
      data: Array,
      // 是否重新加载
      isRender: { type: Boolean, default: false },
      // 表格的高度；支持铺满父容器或者固定高度，如果设置 auto 为铺满父容器（如果设置自适应时，必须确保存在父节点且不允许存在相邻元素） auto, %, px
      height: [Number, String],
      // 表格的最大高度 %, px
      maxHeight: [Number, String],
      // 自动监听父元素的变化去重新计算表格（对于父元素可能存在动态变化的场景可能会用到）
      autoResize: { type: Boolean, default: true },
      // 自动跟随某个属性的变化去重新计算表格，和手动调用 recalculate 方法是一样的效果（对于通过某个属性来控制显示/隐藏切换的场景可能会用到）
      syncResize: [Boolean, String, Number],
      // 所有的列是否允许拖动列宽调整大小
      resizable: {
        type: Boolean,
        default: true
      },
      // 是否带有斑马纹（需要注意的是，在可编辑表格场景下，临时插入的数据不会有斑马纹样式）
      stripe: {
        type: Boolean,
        default: false
      },
      // 是否带有边框 default（默认）, full（完整边框）, outer（外边框）, inner（内边框）, none（无边框）
      border: { type: [Boolean, String], default: false },
      // 是否为圆角边框
      round: Boolean,
      // 表格的尺寸 medium, small, mini
      size: { type: String, default: 'small' },
      // 表格是否显示加载中
      loading: Boolean,
      // 所有的列对齐方式 left（左对齐）, center（居中对齐）, right（右对齐）
      align: String,
      // 所有的表头列的对齐方式 left（左对齐）, center（居中对齐）, right（右对齐）
      headerAlign: String,
      // 所有的表尾列的对齐方式 left（左对齐）, center（居中对齐）, right（右对齐）
      footerAlign: String,
      // 是否显示表头
      showHeader: { type: Boolean, default: true },
      // 是否要高亮当前行
      highlightCurrentRow: Boolean,
      // 鼠标移到行是否要高亮显示
      highlightHoverRow: { type: Boolean, default: true },
      // 是否要高亮当前列
      highlightCurrentColumn: Boolean,
      // 鼠标移到列是否要高亮显示
      highlightHoverColumn: Boolean,
      // 只对 edit-config 配置时有效，是否在编辑时高亮单元格边框
      highlightCell: Boolean,
      // 给行附加 className，也可以是函数 Function({row, rowIndex, $rowIndex})
      rowClassName: [String, Function],
      // 给单元格附加 className，也可以是函数 Function({row, rowIndex, $rowIndex, column, columnIndex, $columnIndex})
      cellClassName: [String, Function],
      // 给表头的行附加 className，也可以是函数 Function({$rowIndex})
      headerRowClassName: [String, Function],
      // 给表头的单元格附加 className，也可以是函数 Function({$rowIndex, column, columnIndex, $columnIndex})
      headerCellClassName: [String, Function],
      // 给表尾的行附加 className，也可以是函数 Function({$rowIndex})
      footerRowClassName: [String, Function],
      // 给表尾的单元格附加 className，也可以是函数 Function({$rowIndex, column, columnIndex, $columnIndex})
      footerCellClassName: [String, Function],
      // 给单元格附加样式，也可以是函数 Function({$rowIndex, column, columnIndex, $columnIndex})
      cellStyle: [Object, Function],
      // 给表头单元格附加样式，也可以是函数 Function({$rowIndex, column, columnIndex, $columnIndex})
      headerCellStyle: [Object, Function],
      // 给表尾单元格附加样式，也可以是函数 Function({$rowIndex, column, columnIndex, $columnIndex})
      footerCellStyle: [Object, Function],
      // 给行附加样式，也可以是函数 Function({$rowIndex, column, columnIndex, $columnIndex})
      rowStyle: [Object, Function],
      // 给表头行附加样式，也可以是函数 Function({$rowIndex, column, columnIndex, $columnIndex})
      headerRowStyle: [Object, Function],
      // 给表尾行附加样式，也可以是函数 Function({$rowIndex, column, columnIndex, $columnIndex})
      footerRowStyle: [Object, Function],
      // 是否显示表尾
      showFooter: Boolean,
      // 表尾的数据获取方法 Function({columns, data}) 返回一个二维数组
      footerMethod: Function,
      // 合并行或列，该函数 Function({row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, data}) 返回计算后的值
      spanMethod: Function,
      // 表尾合并行或列，该函数 Function({$rowIndex, column, columnIndex, $columnIndex, data}) 返回计算后的值
      footerSpanMethod: Function,
      // 设置所有内容过长时显示为省略号（如果是固定列建议设置该值，提升渲染速度） ellipsis（只显示省略号）,title（并且显示为原生 title）,tooltip（并且显示为 tooltip 提示）
      showOverflow: { type: [Boolean, String], default: 'tooltip' },
      // 设置表头所有内容过长时显示为省略号 ellipsis（只显示省略号）,title（并且显示为原生 title）,tooltip（并且显示为 tooltip 提示）
      showHeaderOverflow: [Boolean, String],
      // 设置表尾所有内容过长时显示为省略号 ellipsis（只显示省略号）,title（并且显示为原生 title）,tooltip（并且显示为 tooltip 提示）
      showFooterOverflow: [Boolean, String],
      // 所有列宽度 auto, px, %
      columnWidth: [Number, String],
      // 所有最小列宽度；会自动将剩余空间按比例分配 auto, px, %
      columnMinWidth: { type: [Boolean, String], default: '150' },
      // 是否需要为每一列的 VNode 设置 key 属性（非特殊情况下不需要使用）
      columnKey: Boolean,
      // 是否需要为每一行的 VNode 设置 key 属性（非特殊情况下没必要设置）
      rowKey: Boolean,
      // 自定义行数据唯一主键的字段名（行数据必须要有唯一主键，默认自动生成）
      rowId: String,
      // 保持原始值的状态，被某些功能所依赖，比如编辑状态、还原数据等（开启后性能直线下降，具体取决于数据量）
      keepSource: Boolean,
      // 自定义堆叠顺序（对于某些特殊场景，比如被遮挡时可能会用到）
      zIndex: Number,
      /*
        序号配置项
        startIndex - 设置序号的起始值 Number
        seqMethod - 自定义序号的方法 Function({ row, rowIndex, column, columnIndex }) 返回处理后的值 Function
       */
      seqConfig: Object,
      /*
        排序配置项
        defaultSort - 默认排序（只会在初始化时被触发一次） Object
          field - 列字段名 String
          order - 排序方式 asc（升序）,desc（降序）, null String
         orders - 自定义轮转顺序 asc, desc, null Array
         sortMethod - 自定义所有列的排序方法，当触发排序时会调用该函数 Function({ data, column, property, order }) 返回排序后的结果 Function
         remote - 所有列是否使用服务端排序，如果设置为 true 则不会对数据进行处理 Boolean
         trigger - 触发方式 default（点击按钮触发）, cell（点击表头触发） String
         showIcon - 是否显示列头排序图标 Boolean
         iconAsc - 自定义升序的图标 String
         iconDesc - 自定义降序的图标 String
       */
      sortConfig: Object,
      /*
        筛选配置项
        remote - 所有列是否使用服务端筛选，如果设置为 true 则不会对数据进行处理 Boolean
        showIcon - 是否显示列头筛选图标 Boolean
        iconNone - 自定义无条件时显示的图标 String
        iconMatch - 自定义带条件时显示的图标 String
       */
      filterConfig: Object,
      /*
        导出配置项
        filename - 文件名 String
        sheetName - 表名（只对支持的文档类型有效） String
        type - 文件类型 csv, html, xml, txt String
        types - 可选文件类型列表 csv, html, xml, txt Array
        mode - 输出数据的方式 current, selected, all String
        modes - 输出数据的方式列表 current, selected, all Array
        original - 是否为源数据（某些场景下支持 true， 比如虚拟滚动、优化的固定列..，如果需要支持导入，则必须设置为 true） Boolean
        message - 是否显示内置的消息提示 Boolean
        isHeader - 是否需要表头 Boolean
        isFooter - 是否需要表尾 Boolean
        download - 是否马上下载，如果设置为 false 则通过返回结果为内容的 Promise Boolean
        data - 自定义数据 Array
        columns - 自定义列（如果指定了 columns 则 columnFilterMethod 默认为空） Array
        columnFilterMethod - 列过滤方法，该函数 Function(column,$columnIndex) 的返回值用来决定是否过滤掉列 Function
        dataFilterMethod - 数据过滤方法，该函数 Function(row,$rowIndex) 的返回值用来决定是否过滤掉数据行 Function
        footerFilterMethod - 表尾过滤方法，该函数 Function(cells,$rowIndex) 的返回值用来决定是否过滤掉表尾行 Function
        remote - 是否服务端导出 Boolean
        exportMethod - 只对 remote=true 有效，该函数 Function({ options }) 用于自定义导出或服务端导出，返回 Promise Function
       */
      exportConfig: [Boolean, Object],
      /*
        导入配置项
        mode - 导入数据的方式 covering, insert String
        message - 是否显示内置的消息提示 Boolean
        types - 导入的文件类型列表 csv, html, xml, txt 导入的文件类型列表 Array
        remote - 是否服务端导入 Boolean
        importMethod - 只对 remote=true 有效，该函数 Function({ file, options }) 用于自定义导入或服务端导入，返回 Promise Function
       */
      importConfig: [Boolean, Object],
      /*
        打印配置项
        sheetName - 表名（只对支持的文档类型有效） String
        mode - 输出数据的方式 current, selected, all String
        modes - 输出数据的方式列表 current, selected, all Array
        original - 是否为源数据（某些场景下支持 true， 比如虚拟滚动、优化的固定列..，如果需要支持导入，则必须设置为 true） Boolean
        isHeader - 是否需要表头 Boolean
        isFooter - 是否需要表尾 Boolean
        data - 自定义数据 Array
        columns - 自定义列（如果指定了 columns 则 columnFilterMethod 默认为空） Array
        columnFilterMethod - 列过滤方法，该函数 Function(column,$columnIndex) 的返回值用来决定是否过滤掉列 Function
        dataFilterMethod - 数据过滤方法，该函数 Function(row,$rowIndex) 的返回值用来决定是否过滤掉数据行 Function
        footerFilterMethod - 表尾过滤方法，该函数 Function(cells,$rowIndex) 的返回值用来决定是否过滤掉表尾行 Function
       */
      printConfig: Object,
      /*
        单选框配置项
        reserve - 是否保留勾选状态，对于某些场景下非常有用，比如分页之后还保留之前选中的状态（需要有 row-id） Boolean
        labelField -  单选框显示的字段名，可以直接显示在单选框中 String
        checkRowKey - 默认选中开指定行（只会在初始化时被触发一次，需要有 row-id） Row.rowId
        checkMethod - 是否允许选中的方法，该方法 Function({row}) 的返回值用来决定这一行的 Radio 是否可以选中 Function
        trigger - 触发方式 default（默认）, cell（点击单元格触发）, row（点击行触发） String
        highlight - 高亮选中行 Boolean
       */
      radioConfig: Object,
      /*
        复选框配置项
        reserve - 是否保留勾选状态，对于某些场景下非常有用，比如分页之后还保留之前选中的状态（需要有 row-id） Boolean
        labelField - 复选框显示的字段名，可以直接显示在复选框中 String
        checkField - 绑定选中属性，如果设置了该属性渲染速度更快（建议数据量大时使用，行数据中必须存在该字段，否则无效） String
        showHeader - 是否显示全选按钮（如果 checkStrictly=true 则默认为 false） Boolean
        checkAll - 默认勾选所有（只会在初始化时被触发一次） Boolean
        checkRowKeys - 默认勾选开指定行（只会在初始化时被触发一次，需要有 row-id） Array<Row.rowId>
        checkStrictly - 是否严格的遵循父子不互相关联的做法 Boolean
        strict - 严格模式，当数据为空或全部禁用时，列表为禁用状态 Boolean
        checkMethod - 是否允许勾选的方法，该方法 Function({row}) 的返回值用来决定这一行的 checkbox 是否可以勾选 Function
        trigger - 触发方式 default（默认）, cell（点击单元格触发）, row（点击行触发） String
        highlight - 高亮勾选行 Boolean
        range - 开启复选框范围勾选功能（启用后通过鼠标在复选框的列圈选指定行） Boolean
       */
      checkboxConfig: Object,
      /*
        tooltip 配置项
        enabled - 所有单元格开启 tooltip 显示 Boolean
        theme - tooltip 的主题颜色 dark,light String
        enterable - 鼠标是否可进入到 tooltip 中 Boolean
        leaveDelay - 鼠标移出后延时多少才隐藏 tooltip Number
        contentMethod - 该方法 Function({items?, row?, rowIndex?, $rowIndex, column, columnIndex, $columnIndex, type, cell, $event}) 接收一个字符串，可以通过返回值来重写默认的提示内容 Function
       */
      tooltipConfig: Object,
      /*
        展开行配置项
        labelField - 展开列显示的字段名，可以直接显示在单元格中 String
        expandAll - 默认展开所有行（只会在初始化时被触发一次） Boolean
        expandRowKeys - 默认展开指定行（只会在初始化时被触发一次，需要有 row-id） Array<Row.rowId>
        accordion - 每次只能展开一行 Boolean
        trigger - 触发方式 default（点击按钮触发）, cell（点击单元格触发）, row（点击行触发） String
        lazy - 是否使用懒加载 Boolean
        loadMethod - 该方法 Function({row, row, rowIndex?, $rowIndex?}) 用于异步加载展开后的内容（必须返回 Promise<any[]> 对象） Function
        toggleMethod - 该方法 Function({expanded, column, columnIndex, $columnIndex, row, rowIndex?, $rowIndex?}) 在展开或关闭触发之前调用，可以通过返回值来决定是否允许继续执行 Function
        visibleMethod - 该函数 Function({column, columnIndex, $columnIndex, row, rowIndex?, $rowIndex?}) 的返回值用来决定是否允许显示展开按钮 Function
        iconOpen - 自定义展开后显示的图标 String
        iconClose - 自定义收起后显示的图标 String
        iconLoaded - 自定义懒加载中显示的图标 String
       */
      expandConfig: Object,
      /*
        展开行配置项
        children - 树子节点的属性 String
        indent - 树节点的缩进 Number
        line - 树节点的连接线（启用连接线会降低渲染性能） Boolean
        expandAll - 默认展开所有子孙树节点（只会在初始化时被触发一次） Boolean
        expandRowKeys - 默认展开指定树节点（只会在初始化时被触发一次，需要有 row-id） Array<Row.rowId>
        accordion - 对于同一级的节点，每次只能展开一个 Boolean
        trigger - 触发方式 default（点击按钮触发）, cell（点击单元格触发）, row（点击行触发） String
        lazy - 是否使用懒加载（启用后只有指定 hasChild 的节点才允许被点击） Boolean
        hasChild - 只对 lazy 启用后有效，标识是否存在子节点，从而控制是否允许被点击 String
        loadMethod - 该方法 Function({row}) 用于异步加载子节点（必须返回 Promise<any[]> 对象） Function
        toggleMethod - 该方法 Function({expanded, row, column, columnIndex, $columnIndex}) 在展开或关闭触发之前调用，可以通过返回值来决定是否允许继续执行 Function
        iconOpen - 自定义展开后显示的图标 String
        iconClose - 自定义收起后显示的图标 String
        iconLoaded - 自定义懒加载中显示的图标 String
       */
      treeConfig: [Boolean, Object],
      /*
        快捷菜单配置项 Object
        header - 表头的快捷菜单 Object
          disabled - 是否禁用右键 Boolean
          options - 菜单配置 Array<Array>
            code - 菜单键值 String
            name - 菜单名称（支持开启国际化） String
            prefixIcon - 前缀图标 className String
            suffixIcon - 后缀图标 className String
            className - 菜单项的 className String
            visible - 是否可视 Boolean
            disabled - 是否禁用 Boolean
            children - 二级菜单（最多只允许有二级） Array
              code - 菜单键值 String
              name - 菜单名称 String
              prefixIcon - 前缀图标 className String
              visible - 是否可视 Boolean
              disabled - 是否禁用 Boolean
        body - 内容的快捷菜单 Object
          disabled - 是否禁用右键 Boolean
          options - 菜单配置 Array<Array>
            code - 菜单键值 String
            name - 菜单名称（支持开启国际化） String
            prefixIcon - 前缀图标 className String
            suffixIcon - 后缀图标 className String
            className - 菜单项的 className String
            visible - 是否可视 Boolean
            disabled - 是否禁用 Boolean
            children - 二级菜单（最多只允许有二级） Array
              code - 菜单键值 String
              name - 菜单名称 String
              prefixIcon - 前缀图标 className String
              visible - 是否可视 Boolean
              disabled - 是否禁用 Boolean
        footer - 表尾的快捷菜单 Object
          disabled - 是否禁用右键 Boolean
          options - 菜单配置 Array<Array>
            code - 菜单键值 String
            name - 菜单名称（支持开启国际化） String
            prefixIcon - 前缀图标 className String
            suffixIcon - 后缀图标 className String
            className - 菜单项的 className String
            visible - 是否可视 Boolean
            disabled - 是否禁用 Boolean
            children - 二级菜单（最多只允许有二级） Array
              code - 菜单键值 String
              name - 菜单名称 String
              prefixIcon - 前缀图标 className String
              visible - 是否可视 Boolean
              disabled - 是否禁用 Boolean
        trigger - 触发方式 default（默认触发）, cell（右键单元格触发） String
        visibleMethod - 该函数 Function({type, options, columns, row?, rowIndex?, column?, columnIndex?}) 的返回值用来决定是否允许显示右键菜单（对于需要对菜单进行权限控制时可能会用到） Function
        className - 菜单面板的 className String
       */
      contextMenu: [Boolean, Object],
      /*
        鼠标配置项（只对 edit-config.mode=cell 有效）
        selected - 开启单元格选中功能 Boolean
       */
      mouseConfig: Object,
      /*
        按键配置项
        isArrow - 开启方向键功能 Boolean
        isDel - 开启删除键功能 Boolean
        isEnter - 开启回车键功能 Boolean
        isTab - 开启 Tab 键功能 Boolean
        isEdit - 开启任意键进入编辑（功能键除外） Boolean
        editMethod - 只对 isEdit=true 有效，用于重写选中编辑处理逻辑，该函数 Function({row, rowIndex, column, columnIndex}) 可以返回 false 来阻止默认行为
       */
      keyboardConfig: Object,
      /*
        可编辑配置项
        trigger - 触发方式 manual（手动触发方式，只能用于 mode=row）,click（点击触发编辑）,dblclick（双击触发编辑） String
        mode - 编辑模式 cell（单元格编辑模式）,row（行编辑模式） String
        showIcon - 是否显示列头编辑图标 Boolean
        showStatus - 只对 keep-source 开启有效，是否显示单元格值的修改状态 Boolean
        autoClear - 当点击非编辑列之后，是否自动清除单元格的激活状态 Boolean
        activeMethod - 该方法 Function({row, rowIndex, column, columnIndex}) 的返回值用来决定该单元格是否允许编辑 Function
        icon - 自定义可编辑列的状态图标 String
       */
      editConfig: [Boolean, Object],
      /*
        校验配置项
        autoPos - 是否自动定位到校验不通过的单元格 Boolean
        message - 校验提示框的方式 default（如果不设置高度，则默认第一行使用 tooltip，之后使用 inline）, none（关闭提示）, inline（强制使用内联的提示）, tooltip（强制使用 tooltip 提示） String
        maxWidth - 校验提示框的最大宽度（对于某些特殊场景可能会用到） String, Number
       */
      validConfig: Object,
      /*
        校验规则配置项
        required - 是否必填 Boolean
        min - 校验值最小长度（如果 type=number 则比较值大小） Number
        max - 校验值最大长度（如果 type=number 则比较值大小） Number
        type - 数据校验的类型 number, string String
        pattern - 正则校验 RegExp, String
        validator - 自定义校验方法 Function({ cellValue, rule, rules, row, rowIndex，column, columnIndex }) 返回一个 Promise<new Error("提示消息")> Promise<e?: Error>
        message - 校验提示内容（支持开启国际化） String
        trigger - 触发校验方式（如果为空，则为常规校验方式； 如果指定触发方式，则只会在匹配情况下进行校验） blur,change String
        maxWidth - 提示框的最大宽度（对于某些特殊场景可能会用到） Number
       */
      editRules: Object,
      /*
        空内容渲染配置项
        name - 渲染器名称 String
        props - 渲染的参数（请查看目标渲染的 Props） Object
        attrs - 渲染的属性（请查看目标渲染的 Attribute） Object
        events - 渲染组件的事件（请查看目标渲染的 Events） Object
       */
      emptyRender: [Boolean, Object],
      /*
        自定义列配置项
        storage - 是否启用 localStorage 本地保存，会将列操作状态保留在本地 Boolean, Object
          visible - 启用显示/隐藏列状态 Boolean
          resizable - 启用列宽状态 Boolean
         checkMethod - 自定义列是否允许列选中的方法，该方法 Function({column}) 的返回值用来决定这一列的 checkbox 是否可以选中 Function
       */
      customConfig: [Boolean, Object],
      // 表格动画效果开关（关闭后视觉效果更快）
      animat: Object,
      // 可以设置为 true 来避免初始化渲染时的闪动
      cloak: Boolean,
      // 当表格发生拖动、滚动...等行为时，至少多少毫秒之后才允许触发 hover 事件
      delayHover: Number,
      /*
        横向虚拟滚动配置（tree-config 启用后无效）
        gt - 指定大于指定列时自动启动横向虚拟滚动，如果为 0 则总是启用，如果为 -1 则关闭（注：启用横向虚拟滚动之后将不能支持分组表头） Number
        oSize - 当剩余数据少于指定列时触发重新渲染 Number
        rSize - 每次渲染条数 Number
        vSize - 指定可视区域条数 Number
       */
      scrollX: Object,
      /*
        纵向虚拟滚动配置（注：当 tree-config 启用后纵向虚拟滚动将无效）
        gt - 指定大于指定行时自动启动纵向虚拟滚动，如果为 0 则总是启用，如果为 -1 则关闭（注：启用纵向虚拟滚动之后将不能支持动态行高） Number
        oSize - 当剩余数据少于指定行时触发重新渲染 Number
        rSize - 每次渲染条数 Number
        vSize - 指定可视区域条数 Number
        adaptive - 自动适配最优的渲染方式 Boolean
       */
      scrollY: Object,
      /** pager基本属性 */
      // 尺寸 medium,small,mini
      pagerSize: String,
      // 是否加载中
      pagerLoading: Boolean,
      // 自定义布局 PrevJump,PrevPage,Number,JumpNumber,NextPage,NextJump,Sizes,Jump,FullJump,PageCount,Total
      pagerLayouts: { type: Array,  default: () => {
          return ['FullJump', 'PrevJump', 'PrevPage', 'JumpNumber', 'NextPage', 'NextJump','Sizes']
        }
      },
      //-----------后加----------
      pagerSlot:{type:Boolean,default:true},//是否自定义插槽内容
      // 当前页
      pagerCurrentPage: { type: Number, default: 1 },
      // 每页大小
      pagerPageSize: { type: Number, default: 10 },
      // 总条数
      pagerTotal: Number,
      // 显示页码按钮的数量
      pagerPagerCount: Number,
      // 每页大小选项列表
      pagerPageSizes: Array,
      // left（左对其）, center（居中对其）, right（右对齐）
      pagerAlign: String,
      // 带边框
      pagerBorder: Boolean,
      // 带背景颜色
      pagerBackground: {
        type:Boolean,
        default:true
      },
      // 配套的样式
      pagerPerfect: Boolean,
      // 当只有一页时自动隐藏
      pagerAutoHidden: Boolean,
      // 自定义上一页图标
      pagerIconPrevPage: String,
      // 自定义向上跳页图标
      pagerIconJumpPrev: String,
      // 自定义向下跳页图标
      pagerIconJumpNext: String,
      // 自定义下一页图标
      pagerIconnextPage: String,
      // 自定义跳页显示图标
      pagerIconJumpMore: String
    },
    data () {
      return {
        // show:this.pager,
        // 列表数据
        tableData: this.data,
        // 当前页
        tablePagerCurrentPage: this.pagerCurrentPage,
        // 每页大小
        tablePagerPageSize: this.pagerPageSize,
        // 总条数
        tablePagerTotal: this.pagerTotal,
        // 缓存上一次参数
        cacheParams: {},
        //请求控制
        reqKey:true,
        //view分页
        viewsData:{}
      }
    },
    mounted () {
      if(typeof(this.api) === 'string'){return}
      this.getList()
    },
    methods: {
      // 获取列表数据 flag - true列表返回第一页
      getList (flag, params) {
        if (flag) {
          this.tablePagerCurrentPage = 1
        }
        if (this.api && typeof this.api === 'function') {
          // 请求获取列表数据
          this.getApiData(params)
        } else {
          // 数据列表
          if (this.pager) {
            // 前端分页
            let start = this.tablePagerPageSize * (this.tablePagerCurrentPage - 1)
            let end = this.tablePagerPageSize * this.tablePagerCurrentPage
            this.tableData = (this.dataList || []).slice(start, end)
            this.tablePagerTotal = (this.dataList || []).length
            let dataObj = {
              current:this.tablePagerCurrentPage,
              total:this.tablePagerTotal,
              rows:[...[],...this.tableData]
            }
            this.$emit('after-load',dataObj)
          } else {
            // 不分页
            this.tableData = this.dataList || []
          }

          window.setTimeout(()=>{
            this.reqKey = true
          },100)

        }
      },
      // 请求获取列表数据
      getApiData (params) {
        this.api(Object.assign({},
          this.params || params,
          // params || this.params,
          { page: this.tablePagerCurrentPage, rows: this.tablePagerPageSize })).then(res => {

          //抛出事件
          // 1.用于统计
          let dataObj = Object.assign({},res.data)
          dataObj.current = this.tablePagerCurrentPage
          this.$emit('before-load',dataObj)
          // 2.用于查看器
          this.$emit('viewChange')
          //缓存响应参数，用于view组件的分页
          this.viewsData = Object.assign({},res.data)

          this.cacheParams = Object.assign({}, params || this.params)
          if (res.data && (!res.data.rows || !res.data.rows.length) && this.pagerCurrentPage !== 1) {
            this.tablePagerCurrentPage = this.pagerCurrentPage - 1
            this.getApiData()
          } else {
            this.tableData = res.data ? res.data.rows : []
            this.tablePagerTotal = res.data ? res.data.total : 0
            this.$emit('after-load',this.tableData);
          }
          window.setTimeout(()=>{
            this.reqKey = true
          },100)

          if (this.isRender) {
            this.$emit('handRender')
          }
        }).catch(err => {
          this.$emit('dataError',err)
        })
      },
      // 列表刷新 flag - true列表返回第一页 cache - true使用缓存参数
      iRefresh (flag, cache) {
        this.getList(flag, cache ? this.cacheParams : null)
      },
      // 分页发生改变时会触发该事件 { type, currentPage, pageSize, $event }
      pagerPageChange (params) {
        if(!this.reqKey){return}
        this.reqKey = false
        this.tablePagerCurrentPage = params.currentPage
        this.tablePagerPageSize = params.pageSize
        this.getList(false, true)
      },
      /** table基本方法 */
      // 加载数据（对于表格数据需要重载、局部递增场景下可能会用到）
      loadData (data) {
        return this.$refs.zjTable.loadData(data)
      },
      // 加载数据并清除所有状态（对于表格数据需要重载、局部递增的场景中可能会用到）
      reloadData (data) {
        return this.$refs.zjTable.reloadData(data)
      },
      // 手动处理数据（对于手动更改了排序、筛选...等条件后需要重新处理数据时可能会用到）
      updateData () {
        return this.$refs.zjTable.updateData()
      },
      // 同步 data 数据；如果用了该方法，那么组件将不再记录增删改的状态，只能自行实现对应逻辑（对于某些特殊的场景，比如深层树节点元素发生变动时可能会用到）
      syncData () {
        return this.$refs.zjTable.syncData()
      },
      // 局部加载行数据并恢复到初始状态（对于行数据需要局部更改的场景中可能会用到）
      reloadRow (row, record, field) {
        return this.$refs.zjTable.reloadRow(row, record, field)
      },
      // 用于懒加载展开行，重新加载展开行的内容
      reloadExpandContent (rows) {
        return this.$refs.zjTable.reloadExpandContent(rows)
      },
      // 用于懒加载树表格，重新加载子节点
      reloadTreeChilds (rows) {
        return this.$refs.zjTable.reloadTreeChilds(rows)
      },
      // 加载列配置（对于表格列需要重载、局部递增场景下可能会用到）
      loadColumn (columns) {
        return this.$refs.zjTable.loadColumn(columns)
      },
      // 加载列配置并恢复到初始状态（对于表格列需要重载、局部递增场景下可能会用到）
      reloadColumn (columns) {
        return this.$refs.zjTable.reloadColumn(columns)
      },
      // 刷新列配置（对于动态修改属性、显示/隐藏列等场景下可能会用到）
      refreshColumn () {
        return this.$refs.zjTable.refreshColumn()
      },
      // 创建 Row|Rows 对象（对于某些特殊场景需要对数据进行手动插入时可能会用到）
      createRow (records) {
        return this.$refs.zjTable.createRow(records)
      },
      // 创建 data 对象（对于某些特殊场景可能会用到，会自动对数据的字段名进行检测，如果不存在就自动定义）
      createData (records) {
        return this.$refs.zjTable.createData(records)
      },
      // 往表格插入临时数据，从第一行新增一行或多行新数据
      insert (records) {
        return this.$refs.zjTable.insert(records)
      },
      // 往表格插入临时数据，从指定位置插入一行或多行；第二个参数：row 指定位置（不支持树表格）、null从第一行插入、-1 从最后插入
      insertAt (records, row) {
        return this.$refs.zjTable.insertAt(records, row)
      },
      // 只对 keep-source 开启有效，还原指定行 row 或者整个表格的数据
      revertData (rows, field) {
        return this.$refs.zjTable.revertData(rows, field)
      },
      // 删除指定行数据，指定 row 或 [row, ...] 删除多条数据，如果为空则删除所有数据
      remove (rows) {
        return this.$refs.zjTable.remove(rows)
      },
      // 删除复选框选中的行数据
      removeCheckboxRow () {
        return this.$refs.zjTable.removeCheckboxRow()
      },
      // 删除单选框选中的行数据
      removeRadioRow () {
        return this.$refs.zjTable.removeRadioRow()
      },
      // 删除当前行选中的行数据
      removeCurrentRow () {
        return this.$refs.zjTable.removeCurrentRow()
      },
      // 根据 row 获取相对于 data 中的索引
      getRowIndex (row) {
        return this.$refs.zjTable.getRowIndex(row)
      },
      // 根据 row 获取相对于当前数据中的索引
      _getRowIndex (row) {
        return this.$refs.zjTable._getRowIndex(row)
      },
      // 根据 row 获取渲染中的虚拟索引
      $getRowIndex (row) {
        return this.$refs.zjTable.$getRowIndex(row)
      },
      // 根据 tr 元素获取对应的 row 信息
      getRowNode (tr) {
        return this.$refs.zjTable.getRowNode(tr)
      },
      // 获取表格的可视列，也可以指定索引获取列
      getColumns (columnIndex) {
        return this.$refs.zjTable.getColumns(columnIndex)
      },
      // 根据列获取列的唯一主键
      getColid (column) {
        return this.$refs.zjTable.getColid(column)
      },
      // 根据列的唯一主键获取列
      getColumnById (colid) {
        return this.$refs.zjTable.getColumnById(colid)
      },
      // 根据列的字段名获取列
      getColumnByField (field) {
        return this.$refs.zjTable.getColumnByField(field)
      },
      // 获取当前表格的列（收集到的全量列、全量表头列、处理条件之后的全量表头列、当前渲染中的表头列）
      getTableColumn () {
        return this.$refs.zjTable.getTableColumn()
      },
      // 根据 column 获取相对于 columns 中的索引
      getColumnIndex (column) {
        return this.$refs.zjTable.getColumnIndex(column)
      },
      // 根据 column 获取渲染中的虚拟索引
      $getColumnIndex (column) {
        return this.$refs.zjTable.$getColumnIndex(column)
      },
      // 根据 column 获取相对于当前表格列中的索引（分组表头可能会用到）
      _getColumnIndex (column) {
        return this.$refs.zjTable._getColumnIndex(column)
      },
      // 根据 th/td 元素获取对应的 column 信息
      getColumnNode (cell) {
        return this.$refs.zjTable.getColumnNode(cell)
      },
      // 获取当前排序的 column 信息
      getSortColumn () {
        return this.$refs.zjTable.getSortColumn()
      },
      // 获取当前表格的数据（完整的全量表体数据、处理条件之后的全量表体数据、当前渲染中的表体数据、当前渲染中的表尾数据
      getTableData () {
        return this.$refs.zjTable.getTableData()
      },
      // 根据行的唯一主键获取行
      getRowById (rowid) {
        return this.$refs.zjTable.getRowById(rowid)
      },
      // 根据行获取行的唯一主键
      getRowid (rowid) {
        return this.$refs.zjTable.getRowid(rowid)
      },
      // 获取数据，和 data 的行为一致，也可以指定索引获取数据
      getData (rowIndex) {
        return this.$refs.zjTable.getData(rowIndex)
      },
      // 获取表格数据集（获取新增、删除、更改的数据，对于增删改查表格非常方便）
      getRecordset () {
        return this.$refs.zjTable.getRecordset()
      },
      // 用于 edit-config，获取新增的临时数据
      getInsertRecords () {
        return this.$refs.zjTable.getInsertRecords()
      },
      // 获取已删除的数据
      getRemoveRecords () {
        return this.$refs.zjTable.getRemoveRecords()
      },
      // 只对 keep-source 开启有效，获取已修改的数据
      getUpdateRecords () {
        return this.$refs.zjTable.getUpdateRecords()
      },
      // 用于 highlight-current-column，获取当前列
      getCurrentColumn () {
        return this.$refs.zjTable.getCurrentColumn()
      },
      // 用于 highlight-current-row，获取当前行的行数据
      getCurrentRecord () {
        return this.$refs.zjTable.getCurrentRecord()
      },
      // 用于 type=radio，获取当已选中的行数据
      getRadioRecord () {
        return this.$refs.zjTable.getRadioRecord()
      },
      // 用于 radio-config.reserve，获取已保留选中的行数据（不包含当前列表）
      getRadioReserveRecord () {
        return this.$refs.zjTable.getRadioReserveRecord()
      },
      // 用于 type=checkbox，获取已选中的行数据
      getCheckboxRecords () {
        return this.$refs.zjTable.getCheckboxRecords()
      },
      // 用于 checkbox-config.reserve，获取已保留选中的行数据（不包含当前列表）
      getCheckboxReserveRecords () {
        return this.$refs.zjTable.getCheckboxReserveRecords()
      },
      // 用于 type=checkbox，获取半选状态的行数据
      getCheckboxIndeterminateRecords () {
        return this.$refs.zjTable.getCheckboxIndeterminateRecords()
      },
      // 用于 expand-config，用于展开行，获取已展开的行数据
      getRowExpandRecords () {
        return this.$refs.zjTable.getRowExpandRecords()
      },
      // 用于 tree-config，用于树表格，获取已展开的节点（注意，即使父节点被收起，只要该节点还处于展开状态都能获取到）
      getTreeExpandRecords () {
        return this.$refs.zjTable.getTreeExpandRecords()
      },
      // 用于 edit-config，获取已激活的行数据
      getActiveRecord () {
        return this.$refs.zjTable.getActiveRecord()
      },
      // 用于 mouse-config.selected，获取选中的单元格信息
      getSelectedCell () {
        return this.$refs.zjTable.getSelectedCell()
      },
      // 获取表格的滚动状态
      getScroll () {
        return this.$refs.zjTable.getScroll()
      },
      // 用于 edit-config，判断行是否为激活编辑状态
      isActiveByRow (row) {
        return this.$refs.zjTable.isActiveByRow(row)
      },
      // 用于 edit-config，判断行是否为新增的临时数据
      isInsertByRow (row) {
        return this.$refs.zjTable.isInsertByRow(row)
      },
      // 只对 keep-source 开启有效，判断行数据是否发生改变
      isUpdateByRow (row, field) {
        return this.$refs.zjTable.isUpdateByRow(row, field)
      },
      // 用于 type=checkbox，判断复选行是否被全部选中
      isAllCheckboxChecked (row, field) {
        return this.$refs.zjTable.isAllCheckboxChecked(row, field)
      },
      // 用于 type=checkbox，判断复选行数据是否勾选
      isCheckedByCheckboxRow (row) {
        return this.$refs.zjTable.isCheckedByCheckboxRow(row)
      },
      // 用于 type=radio，判断单选行数据是否勾选
      isCheckedByRadioRow (row) {
        return this.$refs.zjTable.isCheckedByRadioRow(row)
      },
      // 用于 expand-config，判断行是否为展开状态
      isExpandByRow (row) {
        return this.$refs.zjTable.isExpandByRow(row)
      },
      // 用于 expand-config.lazy，用于懒加载展开行，判断展开行是否懒加载完成
      isRowExpandLoaded (row) {
        return this.$refs.zjTable.isRowExpandLoaded(row)
      },
      // 用于 tree-config，判断行是否为树形节点展开状态
      isTreeExpandByRow (row) {
        return this.$refs.zjTable.isTreeExpandByRow(row)
      },
      // 用于 tree-config.lazy，用于懒加载树表格，判断树节点是否懒加载完成
      isTreeExpandLoaded (row) {
        return this.$refs.zjTable.isTreeExpandLoaded(row)
      },
      // 判断指定列是否为筛选状态，如果为空则判断所有列
      isFilter (column) {
        return this.$refs.zjTable.isFilter(column)
      },
      // 用于 filters，修改筛选列表（在筛选条件更新之后可以调用 updateData 函数处理表格数据）
      setFilter (column, options) {
        return this.$refs.zjTable.setFilter(column, options)
      },
      // 用于 edit-config，激活行编辑，如果是 mode=cell 则默认激活第一个单元格
      setActiveRow (row) {
        return this.$refs.zjTable.setActiveRow(row)
      },
      // 用于 edit-config，激活单元格编辑
      setActiveCell (row, field) {
        return this.$refs.zjTable.setActiveCell(row, field)
      },
      // 用于 mouse-config.selected，选中指定的单元格
      setSelectCell (row, field) {
        return this.$refs.zjTable.setSelectCell(row, field)
      },
      // 用于 expand-config，设置展开行，二个参数设置这一行展开与否
      setRowExpansion (rows, checked) {
        return this.$refs.zjTable.setRowExpansion(rows, checked)
      },
      // 用于 expand-config，设置所有行的展开与否（如果是关闭所有行，可以使用 clearRowExpand 快速清除）
      setAllRowExpansion (checked) {
        return this.$refs.zjTable.setAllRowExpansion(checked)
      },
      // 用于 tree-config，设置展开树形节点，二个参数设置这一行展开与否
      setTreeExpansion (rows, checked) {
        return this.$refs.zjTable.setTreeExpansion(rows, checked)
      },
      // 用于 tree-config，设置所有树节点的展开与否（如果是关闭所有树节点，可以使用 clearTreeExpand 快速清除）
      setAllTreeExpansion (checked) {
        return this.$refs.zjTable.setAllTreeExpansion(checked)
      },
      // 用于 highlight-current-row，设置某一行为高亮状态
      setCurrentRow (row) {
        return this.$refs.zjTable.setCurrentRow(row)
      },
      // 用于 highlight-current-column，设置某列行为高亮状态
      setCurrentColumn (column) {
        return this.$refs.zjTable.setCurrentColumn(column)
      },
      // 用于 type=radio，设置某一行为选中状态
      setRadioRow (row) {
        return this.$refs.zjTable.setRadioRow(row)
      },
      // 用于 type=checkbox，设置行为选中状态，第二个参数为选中与否
      setCheckboxRow (rows, checked) {
        return this.$refs.zjTable.setCheckboxRow(rows, checked)
      },
      // 用于 type=checkbox，设置所有行的选中状态
      setAllCheckboxRow (checked) {
        return this.$refs.zjTable.setAllCheckboxRow(checked)
      },
      // 用于 type=checkbox，切换某一行的选中状态
      toggleCheckboxRow (row) {
        return this.$refs.zjTable.toggleCheckboxRow(row)
      },
      // 用于 type=checkbox，切换所有行的选中状态
      toggleAllCheckboxRow () {
        return this.$refs.zjTable.toggleAllCheckboxRow()
      },
      // 用于 type=expand，切换展开行的状态
      toggleRowExpansion (row) {
        return this.$refs.zjTable.toggleRowExpansion(row)
      },
      // 用于 tree-config，切换展开树形节点的状态
      toggleTreeExpansion (row) {
        return this.$refs.zjTable.toggleTreeExpansion(row)
      },
      // 用于 highlight-current-row，手动清空当前高亮的状态
      clearCurrentRow () {
        return this.$refs.zjTable.clearCurrentRow()
      },
      // 用于 highlight-current-column，手动清空当前高亮的状态
      clearCurrentColumn () {
        return this.$refs.zjTable.clearCurrentColumn()
      },
      // 用于 type=radio，手动清空用户的选择
      clearRadioRow () {
        return this.$refs.zjTable.clearRadioRow()
      },
      // 用于 radio-config.reserve，手动清空用户保留选中的行数据
      clearRadioReserve () {
        return this.$refs.zjTable.clearRadioReserve()
      },
      // 用于 type=checkbox，手动清空用户的选择
      clearCheckboxRow () {
        return this.$refs.zjTable.clearCheckboxRow()
      },
      // 用于 checkbox-config.reserve，手动清空用户保留选中的行数据
      clearCheckboxReserve () {
        return this.$refs.zjTable.clearCheckboxReserve()
      },
      // 用于 type=expand，手动清空展开行状态，数据会恢复成未展开的状态
      clearRowExpand () {
        return this.$refs.zjTable.clearRowExpand()
      },
      // 用于 expand-config.lazy，手动清空懒加载展开行的状态，数据会恢复成未展开的状态，当再次展开时会重新加载
      clearRowExpandLoaded () {
        return this.$refs.zjTable.clearRowExpandLoaded()
      },
      // 用于 tree-config，手动清空树形节点的展开状态，数据会恢复成未展开的状态
      clearTreeExpand () {
        return this.$refs.zjTable.clearTreeExpand()
      },
      // 用于 tree-config.lazy，手动清空懒加载树节点的状态，数据会恢复成未展开的状态，当再次展开时会重新加载
      clearTreeExpandLoaded () {
        return this.$refs.zjTable.clearTreeExpandLoaded()
      },
      // 手动清空排序条件，数据会恢复成未排序的状态
      clearSort () {
        return this.$refs.zjTable.clearSort()
      },
      // 手动清空筛选条件（如果不传 column 则清空所有筛选条件），数据会恢复成未筛选的状态
      clearFilter (field) {
        return this.$refs.zjTable.clearFilter(field)
      },
      // 手动清除单元格选中状态
      clearSelected () {
        return this.$refs.zjTable.clearSelected()
      },
      // 手动清除单元格激活状态
      clearActived () {
        return this.$refs.zjTable.clearActived()
      },
      // 手动清空单元格内容，如果不创参数，则清空整个表格内容，如果传了行则清空指定行内容，如果传了指定字段，则清空该字段内容
      clearData (rows, field) {
        return this.$refs.zjTable.clearData(rows, field)
      },
      // 手动清除滚动相关信息，还原到初始状态
      clearScroll () {
        return this.$refs.zjTable.clearScroll()
      },
      // 手动清除校验
      clearValidate () {
        return this.$refs.zjTable.clearValidate()
      },
      // 手动清除表格所有条件，还原到初始状态（对于增删改查的场景中可能会用到，比如在数据保存之后清除表格缓存）
      clearAll () {
        return this.$refs.zjTable.clearAll()
      },
      /*
        手动重置列的显示隐藏、列宽拖动的状态；如果为 true 则重置所有状态（如果已关联工具栏，则会同步更新）
        visible - 是否重置可视列状态 Boolean
        resizable - 是否重置列宽拖动状态 Boolean
       */
      resetColumn (options) {
        return this.$refs.zjTable.resetColumn(options)
      },
      // 手动关闭筛选面板（某些特殊场景可能会用到）
      closeFilter () {
        return this.$refs.zjTable.closeFilter()
      },
      // 手动关闭 tooltip 提示（某些特殊场景可能会用到）
      clostTooltip () {
        return this.$refs.zjTable.clostTooltip()
      },
      // 手动关闭快捷菜单（某些特殊场景可能会用到）
      closeMenu () {
        return this.$refs.zjTable.closeMenu()
      },
      // 手动更新表尾（对于某些需要频繁更新的场景下可能会用到）
      updateFooter () {
        return this.$refs.zjTable.updateFooter()
      },
      // 更新单元格状态（当使用自定义渲染时可能会用到）
      updateStatus () {
        return this.$refs.zjTable.updateStatus()
      },
      // 隐藏指定列
      hideColumn () {
        return this.$refs.zjTable.hideColumn()
      },
      // 显示指定列
      showColumn () {
        return this.$refs.zjTable.showColumn()
      },
      // 如果有滚动条，则滚动到对应的位置
      scrollTo (scrollLeft, scrollTop) {
        return this.$refs.zjTable.scrollTo(scrollLeft, scrollTop)
      },
      // 如果有滚动条，则滚动到对应的行（对于某些特定的场景可能会用到，比如定位到某一行
      scrollToRow (row) {
        return this.$refs.zjTable.scrollToRow(row)
      },
      // 如果有滚动条，则滚动到对应的列（对于某些特定的场景可能会用到，比如定位到某一列）
      scrollToColumn (column) {
        return this.$refs.zjTable.scrollToColumn(column)
      },
      // 手动对表格进行排序（如果 order 为空则自动切换排序）
      sort (field, order) {
        return this.$refs.zjTable.sort(field, order)
      },
      // 重新计算表格（对于某些特殊场景可能会用到，比如隐藏的表格、重新计算列宽...等）
      recalculate () {
        return this.$refs.zjTable.recalculate()
      },
      // 刷新滚动操作，手动同步滚动相关位置（对于某些特殊的操作，比如滚动条错位、固定列不同步）
      refreshScroll () {
        return this.$refs.zjTable.refreshScroll()
      },
      // 表格校验函数，如果指定 row 或 rows 则校验指定一行或多行，否则校验整个表格。该回调函数会在校验结束后被调用 callback(errMap)。若不传入回调函数，则会返回一个 promise
      validate (rows, callback) {
        return this.$refs.zjTable.validate(rows, callback)
      },
      // 表格完整校验函数，和 validate 的区别就是会对全量数据的所有规则进行完整校验
      fullValidate (rows, callback) {
        return this.$refs.zjTable.fullValidate(rows, callback)
      },
      /*
        将表格数据导出（只支持基本数据结构，目前不支持分组、合并等；树结构和虚拟滚动只允许导出数据源）
        filename - 文件名 String
        sheetName - 表名（只对支持的文档类型有效） String
        type - 文件类型 String
        types - 可选文件类型列表 Array
        mode - 输出数据的方式 String
        modes - 输出数据的方式列表 Array
        original - 是否为源数据（某些场景下支持 true， 比如虚拟滚动、优化的固定列..，如果需要支持导入，则必须设置为 true） Boolean
        message - 是否显示内置的消息提示 Boolean
        isHeader - 是否需要表头 Boolean
        isFooter - 是否需要表尾 Boolean
        download - 是否马上下载，如果设置为 false 则通过返回结果为内容的 Promise Boolean
        data - 自定义数据 Array
        columns - 自定义列（如果指定了 columns 则 columnFilterMethod 默认为空） Array
        columnFilterMethod - 列过滤方法，该函数 Function(column,$columnIndex) 的返回值用来决定是否过滤掉列 Function
        dataFilterMethod - 数据过滤方法，该函数 Function(row,$rowIndex) 的返回值用来决定是否过滤掉数据行 Function
        footerFilterMethod - 表尾过滤方法，该函数 Function(cells,$rowIndex) 的返回值用来决定是否过滤掉表尾行 Function
        remote - 是否服务端导出 Boolean
        exportMethod - 只对 remote=true 有效，该函数 Function({ options }) 用于自定义导出或服务端导出，返回 Promise Function
       */
      exportData (options) {
        return this.$refs.zjTable.exportData(options)
      },
      /*
        打开高级导出（只对 export-config 启用后有效）
        将表格数据导出（只支持基本数据结构，目前不支持分组、合并等；树结构和虚拟滚动只允许导出数据源）
        filename - 文件名 String
        sheetName - 表名（只对支持的文档类型有效） String
        type - 文件类型 String
        types - 可选文件类型列表 Array
        mode - 输出数据的方式 String
        modes - 输出数据的方式列表 Array
        original - 是否为源数据（某些场景下支持 true， 比如虚拟滚动、优化的固定列..，如果需要支持导入，则必须设置为 true） Boolean
        message - 是否显示内置的消息提示 Boolean
        isHeader - 是否需要表头 Boolean
        isFooter - 是否需要表尾 Boolean
        download - 是否马上下载，如果设置为 false 则通过返回结果为内容的 Promise Boolean
        data - 自定义数据 Array
        columns - 自定义列（如果指定了 columns 则 columnFilterMethod 默认为空） Array
        columnFilterMethod - 列过滤方法，该函数 Function(column,$columnIndex) 的返回值用来决定是否过滤掉列 Function
        dataFilterMethod - 数据过滤方法，该函数 Function(row,$rowIndex) 的返回值用来决定是否过滤掉数据行 Function
        footerFilterMethod - 表尾过滤方法，该函数 Function(cells,$rowIndex) 的返回值用来决定是否过滤掉表尾行 Function
        remote - 是否服务端导出 Boolean
        exportMethod - 只对 remote=true 有效，该函数 Function({ options }) 用于自定义导出或服务端导出，返回 Promise Function
        isPrint - 是否需要打印按钮 Boolean
       */
      openExport (options) {
        return this.$refs.zjTable.openExport(options)
      },
      /*
        将数据导入表格（只支持基本数据结构，目前不支持分组、合并等）
        mode - 导入数据的方式 String
        message - 是否显示内置的消息提示 Boolean
        types - 导入的文件类型列表 Array
        remote - 是否服务端导入 Boolean
        importMethod - 只对 remote=true 有效，该函数 Function({ file, options }) 用于自定义导入或服务端导入，返回 Promise Function
       */
      importData (options) {
        return this.$refs.zjTable.importData(options)
      },
      /*
        打开高级导入（只对 import-config 启用后有效）
        mode - 导入数据的方式 String
        message - 是否显示内置的消息提示 Boolean
        types - 导入的文件类型列表 Array
        remote - 是否服务端导入 Boolean
        importMethod - 只对 remote=true 有效，该函数 Function({ file, options }) 用于自定义导入或服务端导入，返回 Promise Function
       */
      openImport (options) {
        return this.$refs.zjTable.openImport(options)
      },
      /*
        打印（只支持基本数据结构，目前不支持分组、合并等）
        sheetName - 表名（只对支持的文档类型有效） String
        mode - 输出数据的方式 String
        modes - 输出数据的方式列表 Array
        original - 是否为源数据（某些场景下支持 true， 比如虚拟滚动、优化的固定列..，如果需要支持导入，则必须设置为 true） Boolean
        isHeader - 是否需要表头 Boolean
        isFooter - 是否需要表尾 Boolean
        data - 自定义数据 Array
        columns - 自定义列（如果指定了 columns 则 columnFilterMethod 默认为空） Array
        columnFilterMethod - 列过滤方法，该函数 Function(column,$columnIndex) 的返回值用来决定是否过滤掉列 Function
        dataFilterMethod - 数据过滤方法，该函数 Function(row,$rowIndex) 的返回值用来决定是否过滤掉数据行 Function
        footerFilterMethod - 表尾过滤方法，该函数 Function(cells,$rowIndex) 的返回值用来决定是否过滤掉表尾行 Function
       */
      print (options) {
        return this.$refs.zjTable.print(options)
      },
      /*
        读取本地文件
        multiple - 是否允许多选 Boolean
        types - 支持选取的文件类型 Array
        message - 是否显示内置的消息提示 Boolean
       */
      readFile (options) {
        return this.$refs.zjTable.readFile(options)
      },
    },
    computed: {
      // table基本属性
      attrs() {
        return {
          id: this.id,
          data: this.tableData,
          height: this.height,
          maxHeight: this.maxHeight,
          autoResize: this.autoResize,
          syncResize: this.syncResize,
          resizable: this.resizable,
          stripe: this.stripe,
          border: this.border,
          round: this.round,
          size: this.size,
          loading: this.loading,
          align: this.align,
          headerAlign: this.headerAlign,
          footerAlign: this.footerAlign,
          showHeader: this.showHeader,
          highlightCurrentRow: this.highlightCurrentRow,
          highlightHoverRow: this.highlightHoverRow,
          highlightCurrentColumn: this.highlightCurrentColumn,
          highlightHoverColumn: this.highlightHoverColumn,
          highlightCell: this.highlightCell,
          rowClassName: this.rowClassName,
          cellClassName: this.cellClassName,
          headerRowClassName: this.headerRowClassName,
          headerCellClassName: this.headerCellClassName,
          footerRowClassName: this.footerRowClassName,
          footerCellClassName: this.footerCellClassName,
          cellStyle: this.cellStyle,
          headerCellStyle: this.headerCellStyle,
          footerCellStyle: this.footerCellStyle,
          rowStyle: this.rowStyle,
          headerRowStyle: this.headerRowStyle,
          footerRowStyle: this.footerRowStyle,
          showFooter: this.showFooter,
          footerMethod: this.footerMethod,
          spanMethod: this.spanMethod,
          footerSpanMethod: this.footerSpanMethod,
          showOverflow: this.showOverflow,
          showHeaderOverflow: this.showHeaderOverflow,
          showFooterOverflow: this.showFooterOverflow,
          columnWidth: this.columnWidth,
          columnMinWidth: this.columnMinWidth,
          columnKey: this.columnKey,
          rowKey: this.rowKey,
          rowId: this.rowId,
          keepSource: this.keepSource,
          zIndex: this.zIndex,
          seqConfig: this.seqConfig,
          sortConfig: this.sortConfig,
          filterConfig: this.filterConfig,
          exportConfig: this.exportConfig,
          importConfig: this.importConfig,
          printConfig: this.printConfig,
          radioConfig: this.radioConfig,
          checkboxConfig: this.checkboxConfig,
          tooltipConfig: this.tooltipConfig,
          expandConfig: this.expandConfig,
          treeConfig: this.treeConfig,
          contextMenu: this.contextMenu,
          mouseConfig: this.mouseConfig,
          keyboardConfig: this.keyboardConfig,
          editConfig: this.editConfig,
          validConfig: this.validConfig,
          editRules: this.editRules,
          emptyRender: this.emptyRender,
          customConfig: this.customConfig,
          animat: this.animat,
          cloak: this.cloak,
          delayHover: this.delayHover,
          scrollX: this.scrollX,
          scrollY: this.scrollY
        }
      },
      // table基本事件
      events() {
        return {
          // 当表格被激活且键盘被按下时会触发的事件 { $event }
          'keydown': (params) => {
            this.$emit('keydown', params)
          },
          // 只对 highlightCurrentRow 有效，当手动选中行并且值发生改变时触发的事件 { row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, $event }
          'current-change': (params) => {
            this.$emit('current-change', params)
          },
          // 只对 type=radio 有效，当手动勾选并且值发生改变时触发的事件 { row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, $event }
          'radio-change': (params) => {
            this.$emit('radio-change', params)
          },
          // 只对 type=checkbox 有效，当手动勾选全选时触发的事件 { records, reserves, indeterminates, checked, $event }
          'checkbox-change': (params) => {
            this.$emit('checkbox-change', params)
          },
          // 只对 type=checkbox 有效，当手动勾选全选时触发的事件 { records, reserves, indeterminates, checked, $event }
          'checkbox-all': (params) => {
            this.$emit('checkbox-all', params)
          },
          // 单元格被点击时会触发该事件 { row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, triggerRadio, triggerCheckbox, triggerTreeNode, triggerExpandNode, $event }
          'cell-click': (params) => {
            this.$emit('cell-click', params)
          },
          // 单元格被双击时会触发该事件 { row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, $event }
          'cell-dblclick': (params) => {
            this.$emit('cell-dblclick', params)
          },
          // 只对 context-menu 配置时有效，单元格被鼠标右键时触发该事件 { type, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, $event }
          'cell-context-menu': (params) => {
            this.$emit('cell-context-menu', params)
          },
          // 当单元格 hover 进入时会触发该事件 { row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, $event }
          'cell-mouseenter': (params) => {
            this.$emit('cell-mouseenter', params)
          },
          // 当单元格 hover 退出时会触发该事件 { row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, $event }
          'cell-mouseleave': (params) => {
            this.$emit('cell-mouseleave', params)
          },
          // 表头单元格被点击时会触发该事件 { $rowIndex, column, columnIndex, $columnIndex, triggerResizable, triggerSort, triggerFilter, $event }
          'header-cell-click': (params) => {
            this.$emit('header-cell-click', params)
          },
          // 表头单元格被双击时会触发该事件 { $rowIndex, column, columnIndex, $columnIndex, $event }
          'header-cell-dblclick': (params) => {
            this.$emit('header-cell-dblclick', params)
          },
          // 只对 context-menu 配置时有效，表头单元格被鼠标右键时触发该事件 { type, column, columnIndex, $event }
          'header-cell-context-menu': (params) => {
            this.$emit('header-cell-context-menu', params)
          },
          // 表尾单元格被点击时会触发该事件 { items, $rowIndex, column, columnIndex, $columnIndex, $event }
          'footer-cell-click': (params) => {
            this.$emit('footer-cell-click', params)
          },
          // 表尾单元格被双击时会触发该事件 { items, $rowIndex, column, columnIndex, $columnIndex, $event}
          'footer-cell-dblclick': (params) => {
            this.$emit('footer-cell-dblclick', params)
          },
          // 只对 context-menu 配置时有效，表尾单元格被鼠标右键时触发该事件 { type, column, columnIndex, $event}
          'footer-cell-context-menu': (params) => {
            this.$emit('footer-cell-context-menu', params)
          },
          // 当排序条件发生变化时会触发该事件 { column, property, order, $event }
          'sort-change': (params) => {
            this.$emit('sort-change', params)
          },
          // 当筛选条件发生变化时会触发该事件 { column, property, values, datas, filters, $event }
          'filter-change': (params) => {
            this.$emit('filter-change', params)
          },
          // 当列宽拖动发生变化时会触发该事件 { $rowIndex, column, columnIndex, $columnIndex, $event }
          'resizable-change': (params) => {
            this.$emit('resizable-change', params)
          },
          // 当行展开或收起时会触发该事件 { expanded, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, $event }
          'toggle-row-expand': (params) => {
            this.$emit('toggle-row-expand', params)
          },
          // 当树节点展开或收起时会触发该事件 { expanded, row, column, columnIndex, $columnIndex, $event }
          'toggle-tree-expand': (params) => {
            this.$emit('toggle-tree-expand', params)
          },
          // 只对 context-menu 配置时有效，当点击快捷菜单时会触发该事件 { menu, type, row, rowIndex, column, columnIndex, $event }
          'context-menu-click': (params) => {
            this.$emit('context-menu-click', params)
          },
          // 只对 edit-config 配置时有效，单元格编辑状态下被关闭时会触发该事件 { row, rowIndex, $rowIndex, column, columnIndex, $columnIndex }
          'edit-closed': (params) => {
            this.$emit('edit-closed', params)
          },
          // 只对 edit-config 配置时有效，单元格被激活编辑时会触发该事件 { row, rowIndex, $rowIndex, column, columnIndex, $columnIndex }
          'edit-actived': (params) => {
            this.$emit('edit-actived', params)
          },
          // 只对 edit-config 配置时有效，当单元格激活时如果是禁用状态时会触发该事件 { row, rowIndex, $rowIndex, column, columnIndex, $columnIndex }
          'edit-disabled': (params) => {
            this.$emit('edit-disabled', params)
          },
          // 只对 edit-rules 配置时有效，当数据校验不通过时会触发该事件 { rule, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex }
          'valid-error': (params) => {
            this.$emit('valid-error', params)
          },
          // 表格滚动时会触发该事件 { type, scrollTop, scrollLeft, isX, isY, $event }
          'scroll': (params) => {
            this.$emit('scroll', params)
          },
          // 表格滚动时会触发该事件 { type, $event }
          'custom': (params) => {
            this.$emit('custom', params)
          }
        }
      },
      pagerAttrs() {
        return {
          /** pager基本属性 */
          size: this.pagerSize,
          loading: this.pagerLoading,
          // layouts: this.tablePagerTotal > this.pagerPageSize ? this.pagerLayouts : [],
          layouts: this.pager ? this.pagerLayouts : [],
          currentPage: Number(this.tablePagerCurrentPage),
          pageSize: this.tablePagerPageSize,
          total: Number(this.tablePagerTotal),
          pagerCount: this.pagerPagerCount,
          pageSizes: this.pagerPageSizes,
          align: this.pagerAlign,
          border: this.pagerBorder,
          background: this.pagerBackground,
          perfect: this.pagerPerfect,
          autoHidden: this.pagerAutoHidden,
          iconPrevPage: this.pagerIconPrevPage,
          iconJumpPrev: this.pagerIconJumpPrev,
          iconJumpNext: this.pagerIconJumpNext,
          iconnextPage: this.pagerIconnextPage,
          iconJumpMore: this.pagerIconJumpMore
        }
      },
      // pager基本事件
      pagerEvents() {
        return {
          // 分页发生改变时会触发该事件 { type, currentPage, pageSize, $event }
          'page-change': this.pagerPageChange
        }

      },
    },
    watch: {
      dataList () {
        this.getList()
      },
      api () {
        this.getList()
      }
    },
  }
</script>

<style lang="less">
.zj-table {
  .zj-vxe-table {
    .vxe-table--body-wrapper{
      .el-tag +.el-tag{
        margin-left: 2px;
      }
    }
  }

}
</style>
<!--<style lang="less" src="./ZjTable.less"/>-->
