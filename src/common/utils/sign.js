import getService from '@pubConf/http/request'
import { MessageBox, Message } from 'element-ui'

export default function signService (router, type) {
  const request = getService(router, type)
  return function sign () {
    return new Promise((resolve, reject) => {
      request.get('common/send-authorize-message', { loadingMsg: '签名处理中...' }).then(res => {
        MessageBox.prompt('请输入短信验证码', '验证', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: function (action, instance, done) {
            if (action === 'confirm') {
              if (instance.inputValue) {
                request.get('common/check-authorize-message', { loadingMsg: '正在验证...', params: { checkCode: instance.inputValue } }).then(r => {
                  done()
                  resolve()
                })
              } else {
                Message.warning({
                  message: '短信验证码不可为空'
                })
              }
            } else {
              reject(new Error('error'))
              done()
            }
          }
        })
      })
    })
  }
}
