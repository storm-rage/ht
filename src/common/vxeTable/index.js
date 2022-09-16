import XEUtils from 'xe-utils'
import '@assets/vxe-table-theme/index.scss'
// import 'vxe-table/lib/index.css'
import VXETable from 'vxe-table'
export default {
  install: function (Vue) {
    VXETable.formats.mixin({
      // 格式化日期
      formatDate ({ cellValue }) {
        return XEUtils.toDateString(cellValue, 'yyyy-MM-dd')
      },
      // 格式日期时间
      formatDateTime ({ cellValue }) {
        return XEUtils.toDateString(cellValue, 'yyyy-MM-dd HH:mm:ss')
      },
      // 格式化银行卡，默认每4位空格隔开
      formatBankcard ({ cellValue }) {
        return XEUtils.commafy(XEUtils.toValueString(cellValue), { spaceNumber: 4, separator: ' ' })
      },
      // 格式化利率
      formatColumnRate ({ cellValue }, digits = 4) {
        if (cellValue) {
          return XEUtils.commafy(XEUtils.toNumber(cellValue), {spaceNumber:0, digits })+'%'
        }
        return '——';
      },
      // 如果是空值格式化为——
      formatColumnValue({ cellValue }) {
        if (cellValue) {
          return cellValue
        }
        return '——';
      }
    })
    Vue.use(VXETable)
    //通用库
    Vue.prototype.XEUtils = XEUtils
  }
}
