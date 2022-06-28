// for IE11+ import
import 'babel-polyfill'
// base import
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import api from './modules/api'
import store from './store'
// plugin style import
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import XEUtils from 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'
import moment from 'moment'
import bignumber from 'bignumber.js'
import 'font-awesome/css/font-awesome.css'
import {
  ZjComponents,
  ZjDirectives,
  ZjI18N as i18n,
  ZjFilters,
  ZjCommonMixins
} from './common';
// 项目字体图标
import '@assets/iconfont/index.css';
// zejin plugin style import
import format from '@utils/format.js'
//项目less样式
import '@assets/public.less'

// resetMessage
// 图片查看
import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'
// import mock from './mock'

Vue.use(ElementUI)
Vue.prototype.XEUtils = XEUtils
Vue.use(VXETable)
Vue.use(ZjDirectives)
Vue.use(ZjComponents)
Vue.use(ZjCommonMixins.routerMixins)
Vue.use(format)
Vue.use(VueViewer, {
  defaultOptions: {
    zIndex: 9999
  }
})
// Vue.use(mock)

Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$ELEMENT = { size: 'small' }
Vue.prototype.$moment = moment
Vue.prototype.$bignumber = bignumber
Vue.prototype.back = () => router.back(-1)


let vm = new Vue({
  el: '#app',
  data: {
    Hub: new Vue() //组件之间的交互
  },
  i18n,
  router,
  store,
  render: h => h(App)
})
export default vm
