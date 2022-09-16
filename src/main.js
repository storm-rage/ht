// for IE11+ import
import 'babel-polyfill'
// base import
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import api from './modules/api'
import store from './store'
// plugin style import
import ElementUI from './common/elementUI'
import VxeTable from './common/vxeTable'
import i18n from './common/i18n';

import {
  ZjComponents,
  ZjDirectives,
  ZjFilters,
  ZjCommonMixins,
  Moment
} from './common';
//图标
import 'font-awesome/css/font-awesome.css';
// 项目字体图标
import '@assets/iconfont/index.css';
// zejin plugin style import
import format from '@utils/format.js'
//项目less样式
import '@assets/public.less'
// 图片查看
import Viewer from './common/viewer'

Vue.use(ElementUI);
Vue.use(VxeTable);
Vue.use(ZjDirectives)
Vue.use(ZjComponents)
Vue.use(ZjCommonMixins.globalMixins)
Vue.use(format)
Vue.use(Viewer)
Vue.use(api)
Vue.use(Moment);
Vue.config.productionTip = false

let vm = new Vue({
  el: '#app',
  data: {
    Hub: new Vue() //组件之间的交互
  },
  router,
  store,
  i18n,
  render: h => h(App)
})
export default vm
