import { Message, MessageBox, Loading } from 'element-ui'

let ZjLog = {}
let zjLoadingInstance
let zjLoadingCount = 0

ZjLog.lock = (msg, options) => {
  if (zjLoadingCount === 0 && !zjLoadingInstance) {
    zjLoadingInstance = Loading.service(Object.assign({
      target: document.querySelector('body') || document.body,
      text: msg || '正在加载...',
      background: 'rgba(0, 0, 0, 0.7)'
    }, options))
  }
  zjLoadingCount++
}
ZjLog.unLock = (force) => {
  zjLoadingCount--
  if ((zjLoadingCount <= 0 && zjLoadingInstance) || force) {
    zjLoadingInstance.close()
    zjLoadingInstance = null
  }
  zjLoadingCount = Math.max(0,zjLoadingCount)
}

ZjLog.messageBox = (options) => {
  return MessageBox(options)
}

ZjLog.alert = (message, callback, options = {}) => {
  return MessageBox(Object.assign({
    title: '温馨提示',
    message: message,
    type: 'warning',
    closeOnPressEscape: false,
    closeOnClickModal: false,
    callback: (action) => {
      if (callback && action == 'confirm') {
        callback()
      }
    }
  }, options))
}

ZjLog.info = (message, callback, options = {}) => {
  return MessageBox(Object.assign({
    message: message,
    type: 'info',
    closeOnPressEscape: false,
    closeOnClickModal: false,
    callback: (action) => {
      if (callback && action == 'confirm') {
        callback()
      }
    }
  }, options))
}

ZjLog.success = (message, callback, options = {}) => {
  return MessageBox(Object.assign({
    message: message,
    type: 'success',
    closeOnPressEscape: false,
    closeOnClickModal: false,
    callback: (action) => {
      if (callback && action == 'confirm') {
        callback()
      }
    }
  }, options))
}

ZjLog.Success = (message, callback, options = {}) => {
  return Message(Object.assign({
    message: message,
    type: 'success',
    closeOnPressEscape: false,
    closeOnClickModal: false,
    callback: (action) => {
      if (callback && action == 'confirm') {
        callback()
      }
    }
  }, options))
}

ZjLog.warning = (message, callback, options = {}) => {
  return MessageBox(Object.assign({
    message: message,
    type: 'warning',
    closeOnPressEscape: false,
    closeOnClickModal: false,
    callback: (action) => {
      if (callback && action == 'confirm') {
        callback()
      }
    }
  }, options))
}

ZjLog.error = (message, callback, options = {}) => {
  return MessageBox(Object.assign({
    message: message,
    type: 'error',
    closeOnPressEscape: false,
    closeOnClickModal: false,
    callback: (action) => {
      if (callback && action == 'confirm') {
        callback()
      }
    }
  }, options))
}

ZjLog.confirm = (message, callback, options = {}) => {
  return MessageBox(Object.assign({
    message: message,
    type: 'info',
    showCancelButton: true,
    closeOnPressEscape: false,
    closeOnClickModal: false,
    callback: (action) => {
      if (callback && action == 'confirm') {
        callback(true)
      } else if (callback && action == 'cancel') {
        callback(false)
      }
    }
  }, options))
}

ZjLog.inputText = (message, callback, options = {}) => {
  return MessageBox(Object.assign({
    message: message,
    $type: 'prompt',
    showInput: true,
    showCancelButton: true,
    closeOnPressEscape: false,
    closeOnClickModal: false
  }, options)).then(({ value }) => {
    callback(true, value)
  }).catch(() => {
    callback(false)
  })
}

ZjLog.close = () => {
  return MessageBox.close()
}

export default ZjLog
