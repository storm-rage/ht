import messageBoxComponent from "./ZjMessageBox";

const defaultProps = {
  type: 'default',
  title: '提示',
  content: '',
  otherContent: '',
  showClose: false,
  tipContent: '',
  showCancelButton: false,
  cancelText: '取消',
  confirmText: '确认',
};
const messageBox = {
  install: function (Vue, opt) {
    let messageBoxTpl = Vue.extend(messageBoxComponent) // 创建vue构造器
    let $vm = new messageBoxTpl(); //实例化vue实例
    document.body.appendChild($vm.$mount().$el);
    Vue.prototype.$messageBox = function (options) {
      return new Promise((resolve, reject) => {
        $vm.messageResolve = resolve;
        $vm.messageReject = reject;
        Object.assign($vm, opt, defaultProps) // 恢复默认值
        if (typeof options === 'string') { // 对参数进行判断
          Object.assign($vm, opt)
          $vm.content = options // 传入props
        } else {
          Object.assign($vm, opt, options) // 合并参数与实例
        }
        $vm.show = true;
      });
    }
    Vue.prototype.$hideMessageBox = function (options) {
      $vm.show = false
    }
  }
}
export {
  messageBox
}
