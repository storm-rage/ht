import TraceTree from './tree.vue'

export function install (Vue) {
  if (install.installed) {
    return
  }

  install.installed = true

  Vue.component(TraceTree.name, TraceTree)
}

TraceTree.install = install

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(TraceTree)
}

export default TraceTree
