const EVENTS = {
    CLICK: 'on-node-click',
    MOUSEOUT: 'on-node-mouseout',
    MOUSEOVER: 'on-node-mouseover'
}

function createListener (handler, data) {
    if (typeof handler === 'function') {
        return function (e) {
            // fixed bug #48
            if (e.target.className.indexOf('org-tree-node-btn') > -1) return

            handler.apply(null, [e, data])
        }
    }
}

// 判断是否叶子节点
const isLeaf = (data, prop) => {
    return !(Array.isArray(data[prop]) && data[prop].length > 0)
}

// 创建 node 节点
export function renderNode (h, data, context) {
    const { props } = context
    const cls = ['org-tree-node']
    const childNodes = []
    const children = data[props.props.children]

    if (isLeaf(data, props.props.children)) {
        cls.push('is-leaf')
    } else if (props.collapsable && !data[props.props.expand]) {
        cls.push('collapsed')
    }

    // 创建标题
    if (!data.parentCode) {
      childNodes.push(renderField(h, {key: 'title', value: data.writerName}, 'org-tree-title', context))
    }

    childNodes.push(renderLabel(h, data, context))

    if (!props.collapsable || data[props.props.expand]) {
        childNodes.push(renderChildren(h, children, context))
    }

    return h('div', {
        domProps: {
            className: cls.join(' ')
        }
    }, childNodes)
}

// 创建展开折叠按钮
export function renderBtn (h, data, { props, listeners }) {
    const expandHandler = listeners['on-expand']

    let cls = ['org-tree-node-btn']

    if (data[props.props.expand]) {
        cls.push('expanded')
    }

    return h('span', {
        domProps: {
            className: cls.join(' ')
        },
        on: {
            click: e => expandHandler && expandHandler(e,data)
        }
    })
}

// 创建字段节点
export function renderField (h, data, className, { props, listeners }) {

  const pdfHandler = listeners['on-pdf']

  let field
  switch (data.key) {
    case 'title':
      field = '开单企业：'
      break;
    case 'label':
      field = '持有企业：'
      break;
    case 'ebillCode':
      field = '融单编号：'
      break;
    case 'ebillAmt':
      field = '融单金额：'
      break;
    case 'tranType':
      field = '来源方式：'
      break;
    case 'holderDate':
      field = '持有日期：'
      break;
    case 'agreements':
      field = 'agreements'
      break;
  }

  if (field === 'agreements' && Array.isArray(data.value) && data.value.length) {
    console.error('data.value:', data.value)
    let arr = []
    for (let i = 0; i < data.value.length; i++) {
      let obj = h('span', {
        domProps: {
          className: 'field-pdf'
        },
        on: {
          click: e => pdfHandler && pdfHandler(e, data.value[i])
        }
      }, `《${data.value[i].agreementName}》`)
      arr.push(obj)
    }

    return h('div', {
        domProps: {
          className: className + ' node-pdf-inner'
        }
      }, arr)

  } else if (field !== 'agreements') {
    return h('div', {
        domProps: {
          className: className
        }
      }, [
        h('span', {
          domProps: {
            className: 'field-label'
          }
        }, field),
        h('span', {
          domProps: {
            className: 'field-value'
          }
        }, data.value),
      ]
    )
  }
}

// 创建图片
export function renderImg (h, className, type) {
  return h('img', {
    domProps: {
      className: className,
      src: require(`./imgs/${type}_icon.png`)
    },
  })
}

// 创建 label 节点
export function renderLabel (h, data, context) {
    const { props, listeners } = context
    // const label = data[props.props.label]

    const renderContent = props.renderContent

    // event handlers
    const clickHandler = listeners[EVENTS.CLICK]
    const mouseOutHandler = listeners[EVENTS.MOUSEOUT]
    const mouseOverHandler = listeners[EVENTS.MOUSEOVER]

    const childNodes = []
    if (typeof renderContent === 'function') {
        let vnode = renderContent(h, data)
        vnode && childNodes.push(vnode)
    } else {
        // childNodes.push(label)
        for (let key in props.props) {
          if (key !== 'children' && key !== 'expand' && key !== 'parentCode' && key !== 'writerName') {
            childNodes.push(renderField(h, {key: key, value: data[key]}, 'org-tree-node-field', context))
          }
        }
        if (data.rzFlag === '1') { // 显示"融"
          childNodes.push(renderImg(h, 'org-tree-node-img', 'fanacing'))
        }
        if (data.signFlag === '1') { // 显示 "代签收"
          childNodes.push(renderImg(h, 'org-tree-node-img', 'sign'))
        }
    }

    if (props.collapsable && !isLeaf(data, props.props.children)) {
        childNodes.push(renderBtn(h, data, context))
    }

    let cls = ['org-tree-node-label-inner']
    let { labelWidth, labelClassName, selectedClassName, selectedKey } = props

    if (typeof labelWidth === 'number') {
        labelWidth += 'px'
    }

    if (typeof labelClassName === 'function') {
        labelClassName = labelClassName(data)
    }

    // 置灰节点
    if (data.effectiveFlag === '0') {
      cls.push('disabled')
    }
    // 高亮节点
    if (data.thisFlag === '1') {
      cls.push('highlight')
    }

    labelClassName && cls.push(labelClassName)

    // add selected class and key from props
    if (typeof selectedClassName === 'function') {
        selectedClassName = selectedClassName(data)
    }

    selectedClassName && selectedKey && data[selectedKey] && cls.push(selectedClassName)

    let parentCss = 'org-tree-node-label'
    if (data.effectiveFlag === '0') {
      parentCss = 'org-tree-node-label disabled'
    }
    return h('div', {
            domProps: {
                className: parentCss
            }
        }, [
            h('div', {
                domProps: {
                    className: cls.join(' ')
                },
                style: { width: labelWidth },
                on: {
                    'click': createListener(clickHandler, data),
                    'mouseout': createListener(mouseOutHandler, data),
                    'mouseover': createListener(mouseOverHandler, data)
                }
            }, childNodes),
        ]
    )
}

// 创建 node 子节点
export function renderChildren (h, list, context) {
    if (Array.isArray(list) && list.length) {
        const children = list.map(item => {
            return renderNode(h, item, context)
        })

        return h('div', {
            domProps: {
                className: 'org-tree-node-children'
            }
        }, children)
    }
    return ''
}

export function render (h, context) {
    const {props} = context

    return renderNode(h, props.data, context)
}

export default render
