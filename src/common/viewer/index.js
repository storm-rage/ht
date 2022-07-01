// 图片查看
import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'
export default {
  install: function (Vue) {
    Vue.use(VueViewer, {
      defaultOptions: {
        zIndex: 9999
      }
    })
  }
}
