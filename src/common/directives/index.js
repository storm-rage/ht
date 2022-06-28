
export default {
  install: function (Vue, option) {
    // v-dialogDrag: 弹窗拖拽
    Vue.directive('dialogDrag', {
      bind(el, binding, vnode, oldVnode) {
        const dialogHeaderEl = el.querySelector('.el-dialog__header')
        const dragDom = el.querySelector('.el-dialog')
        dialogHeaderEl.style.cursor = 'move'

        // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
        const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null)

        dialogHeaderEl.onmousedown = (e) => {
          // 鼠标按下，计算当前元素距离可视区的距离
          const disX = e.clientX - dialogHeaderEl.offsetLeft
          const disY = e.clientY - dialogHeaderEl.offsetTop

          // 获取到的值带px 正则匹配替换
          let styL, styT

          // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
          if (sty.left.includes('%')) {
            styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100)
            styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100)
          } else {
            styL = +sty.left.replace(/\px/g, '')
            styT = +sty.top.replace(/\px/g, '')
          }

          document.onmousemove = function(e) {
            // 通过事件委托，计算移动的距离
            const l = e.clientX - disX
            const t = e.clientY - disY

            // 移动当前元素
            // dragDom.style.left = `${l + styL}px`
            dragDom.style.top = `${t + styT}px`

            if (Math.abs(l + styL) >= (document.body.clientWidth-dragDom.offsetWidth)/2 && (l + styL) < 0) {
              dragDom.style.left = -(document.body.clientWidth-dragDom.offsetWidth)/2 + 'px'
            } else if (Math.abs(l + styL) >= (document.body.clientWidth-dragDom.offsetWidth)/2 && (l + styL) > 0) {
              dragDom.style.left = (document.body.clientWidth-dragDom.offsetWidth)/2 + 'px'
            } else {
              dragDom.style.left = `${l + styL}px`
            }

            // 将此时的位置传出去
            // binding.value({x:e.pageX,y:e.pageY})
          }

          document.onmouseup = function(e) {
            document.onmousemove = null
            document.onmouseup = null
          }
        }
      }
    })

    // v-dialogDragWidth: 弹窗宽度拖大 拖小
    Vue.directive('dialogDragWidth', {
      bind(el, binding, vnode, oldVnode) {
        // console.error('binding:', binding)
        // console.error('binding.value.$el:', binding.value)
        // console.error('el:', el)
        const dragDom = el.querySelector('.el-dialog')
        //鼠标按下的位置
        let drowX = null;
        let drowY = null;
        el.onmousedown = (e) => {
          // //按下时初始化坐标-用于判断是放大缩小
          // drowX = e.clientX
          // drowY = e.clientY
          // document.onmousemove = function(e) {
          //   e.preventDefault() // 移动时禁用默认事件
          //   let dragDomWidth = parseInt(dragDom.style.width)
          //   let dragDomHeight = parseInt(dragDom.style.height || dragDom.clientHeight)
          //   dragDom.style.width = dragDomWidth + ( e.clientX - drowX ) + 'px'
          //   dragDom.style.height = dragDomHeight + ( e.clientY - drowY ) + 'px'
          //   //再次初始按下
          //   drowX = e.clientX
          //   drowY = e.clientY
          // }

          //只能左下角移动
          el.querySelector('.dragBox').onmousemove = function(e) {
            //按下时初始化坐标-用于判断是放大缩小
            drowX = e.clientX
            drowY = e.clientY
            document.onmousemove = function(e) {
              e.preventDefault() // 移动时禁用默认事件
              let dragDomWidth = parseInt(dragDom.style.width)
              let dragDomHeight = parseInt(dragDom.style.height || dragDom.clientHeight)
              dragDom.style.width = dragDomWidth + ( e.clientX - drowX ) + 'px'
              dragDom.style.height = dragDomHeight + ( e.clientY - drowY ) + 'px'
              //再次初始按下
              drowX = e.clientX
              drowY = e.clientY
            }
          }
          document.onmouseup = function(e) {
            document.onmousemove = null
            document.onmouseup = null
          }
        }


      }
    })

  }
}

