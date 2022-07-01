// api集中注入
import Vue from "vue";

const moduleFiles = require.context('./', true, /\/(.*)Api\.js$/)
const modules = moduleFiles.keys().reduce((modules, modulePath) => {
  const key = modulePath.substring(modulePath.lastIndexOf('/') + 1, modulePath.lastIndexOf('Api.'))
  const value = moduleFiles(modulePath).default
  modules[key] = value
  return modules
}, {})

const install = function (Vue) {
  Vue.prototype.$api = modules
}
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
export default {
  install
}
