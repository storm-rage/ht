import XEUtils from 'xe-utils'
import '@assets/vxe-table-theme/index.scss'
// import 'vxe-table/lib/index.css'
import VXETable from 'vxe-table'
export default {
  install: function (Vue) {
    Vue.use(VXETable)
    //通用库
    Vue.prototype.XEUtils = XEUtils
  }
}
