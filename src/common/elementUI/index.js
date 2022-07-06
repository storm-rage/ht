// import 'element-ui/lib/theme-chalk/index.css'
import '@assets/element-theme/index.css';
import ElementUI from 'element-ui'

export default {
  install: function (Vue) {
    Vue.use(ElementUI)
    Vue.prototype.$ELEMENT = { size: 'small' }
  }
}
