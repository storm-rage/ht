import { isNumeric, getPreDayDate } from '@utils'
import getLodop from '@utils/print'

const printMixins = {
  props: {
    type: {
      type: [String, Number]
    },
    excess: {
      type: [String, Number]
    },
    printData: {
      type: [Object, Array]
    }
  },
  data () {
    return {
      data: {},
      size: {
        limit: 1040,
        content: {
          top: 0,
          left: 0,
          width: 800,
          height: 'BottomMargin:30'
        },
        footer: {
          top: 1080,
          left: 345,
          width: 100,
          height: 30
        }
      },
      cssStyle: "<style>.zj-voucher { font-family: '宋体';color: #000000;}.zj-voucher .break { page-break-after: always }.zj-voucher table {border-collapse: collapse;width: 100%;}.zj-voucher td {font-size: 11px;line-height: 20px;border: 1px solid #000000;text-align: center;}.zj-voucher.zj-higher td {line-height: 24px;padding: 3px 5px;}.zj-voucher .zj-center {text-align: center;}.zj-voucher .zj-right {text-align: right;}.zj-voucher .zj-left {text-align: left;}.zj-voucher .zj-bolder {font-weight: bold;}.zj-voucher .zj-fr {float: right;}.zj-voucher .zj-fl {float: left;}.zj-voucher .zj-img-inline {margin-left: 20px;margin-bottom: -40px;width: 120px;}.zj-voucher .zj-img-text {margin-bottom: 60px;}.zj-voucher .zj-title {display: inline;font-size: 18px;font-weight: bold;margin-top: 25px;border-bottom: 3px double #000000;}.zj-voucher .no-border {border: none;}.zj-voucher .zj-mb-10 {margin-bottom: 10px;}.zj-voucher .zj-seat {visibility: hidden;}.zj-voucher .zj-seat td {line-height: 1px;visibility: hidden;border: none;}.zj-voucher .zj-pre-line {display: inline-block;width: 200px;border-bottom: 1px solid #000000;vertical-align: sub;}.zj-voucher .zj-title-larger {line-height: 40px;font-size: 24px;font-weight: bold;}.zj-voucher .zj-red {color: #f00;}.zj-voucher .zj-pr {position: relative;}.zj-voucher .border-bottom-dashed {border-bottom: 1px dashed #cccccc;}</style>"
    }
  },
  computed: {
    dynamicHeight () {
      return this.outerHeight(document.getElementById(`voucher${this.type}`))
    }
  },
  methods: {
    getVoucherClass (index) {
      if (index + 1 !== this.printData.length) {
        return 'break'
      } else {
        return ''
      }
    },
    getPreTitle (excess) {
      return isNumeric(~~this.excess) && ~~this.excess ? `(补打${this.excess})` : ''
    },
    translatePx (num) {
      return Math.floor((num * 0.1) / 25.4 * 96)
    },
    outerHeight (el) {
      var style = window.getComputedStyle(el) || el.currentStyle
      var height = el.offsetHeight + parseInt(style.marginTop) + parseInt(style.marginBottom)
      return height
    },
    print (params) {
      let LODOP = getLodop()
      if (LODOP) {
        this.$log.lock('提示', '打印预览中，请勿操作界面')
        this.$nextTick(() => {
          let style = this.cssStyle
          let now = getPreDayDate(new Date(), 0, '-')
          let multi = this.configList[this.type].multi
          let filed = this.configList[this.type].filed
          let dynamicHeight = 0
          multi && this.printData.forEach((item, index) => {
            item.$printDate = now
            dynamicHeight = this.$refs.header[index].clientHeight
            item[filed].forEach((i, idx) => {
              dynamicHeight += this.$refs.loop[index].clientHeight
              if (dynamicHeight > this.size.limit) {
                this.$refs.loop[idx - 1].setAttribute('style', 'page-break-before: always')
              }
            })
          })
          // 初始化打印控件
          LODOP.PRINT_INIT('')
          // // 设置打印完毕是否自动关闭预览窗口
          LODOP.SET_PRINT_MODE('AUTO_CLOSE_PREWINDOW', true)
          // // 设置页脚
          LODOP.ADD_PRINT_TEXT(this.size.footer.top, this.size.footer.left, this.size.footer.width, this.size.footer.height, '第#页，共&页')
          LODOP.SET_PRINT_STYLEA(0, 'ItemType', 2)
          LODOP.ADD_PRINT_HTM(
            this.size.content.top,
            '1%',
            '98%',
            '100%',
            `${style}<body>${document.getElementById(`voucher${this.type}`).innerHTML}</body>`
          )
          LODOP.PREVIEW()
          // this.$log.close()
        })
      }
    }
  }
}

export default printMixins
