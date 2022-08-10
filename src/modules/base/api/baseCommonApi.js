// 融单管理接口
import request from '@common/axios/request'
import download from "@utils/download";
import { getStr } from '@utils'

const baseCommon = {
  //下载附件
  downloadFile: (params, type = 1, method = 'post') => {
    return download('/common/download-file', params, type, method)
  },
  //查看
  viewFile: (params, config = { responseType: 'blob' }) => {
    return request.post('/common/download-file', params, config)
  },
  // pdf-img
  downloadPdf: (params) => {
    return request.post('/common/download-file', params, { responseType: 'blob' })
  },
  //----------------------------------------   云证书    ------------------------------------------------------------
  //获取验证码
  sendAuthorizeMessage: (params) => {
    return request.get('/common/send-authorize-message', { params })
  },
  //发送验证码--确认
  checkAuthorizeMessage: (params) => {
    return request.get('/common/check-authorize-message', { params })
  },
  //-------------------------------------------
  // 获取 省 市 区/县 数据字典
  queryDictList: () => {
    return request.get('/common/query-sys-district-dict-list')
  },
  //省
  getProvince: () => {
    return request.get('/common/query-province-list', {})
  },
  //市
  getCity: (params) => {
    return request.get('/common/query-city-list', { params })
  },
  //县
  getCounty: (params) => {
    return request.get('/common/query-town-list', { params })
  },
  //文件上传
  uploadFile: (params) => {
    return request.post('/common/upload-file', params)
  },
  // 获取图片验证码
  getCaptcha: () => {
    return request.get('/common/captcha', { responseType: 'arraybuffer' })
  },
  //权限获取权限api
  getPermission: (params) => {
    var data = []
    let perObj = {} //保存api对象
    for (let i in params) {
      if (params[i] && getStr(String(params[i]).replace(/"/g, '\''), "'/", "',").length) {
        data.push('/' + getStr(String(params[i]).replace(/"/g, '\''), "'/", "',"))
        perObj[i] = '/' + getStr(String(params[i]).replace(/"/g, '\''), "'/", "',")
      } else if (params[i] && getStr(params[i].toString().replace(/"/g, '\''), "'/", "',") !== '') {
        data.push(getStr(String(params[i]).replace(/"/g, '\''), "'/", "',"))
        perObj[i] = getStr(String(params[i]).replace(/"/g, '\''), "'/", "',")
      }
    }
    return request.post('/common/get-auth-info', data).then(res => {
      return new Promise((resolve) => {
        for (var key in perObj) {
          let flag = res.data.findIndex(item => item === perObj[key])
          if (flag < 0) {
            params[key] = ''
          }
        }
        resolve(params)
      })
    })
  },
  //是否节假日
  isHoliday: (params) => {
    return request.post('/common/is-holiday', params)
  },
  changeProject: (params) => { // 切换项目
    return request.post('/login/change-project', params)
  },
  changeEnterprise: (params) => { // 切换企业
    return request.post('/login/change-enterprise', params)
  },
  // 根据地址获取产品名
  queryProductNameBySite: (params) => {
    return request.get('/common/query-product-name-by-site', params)
  },
  //贸易背景
  getCommonBillDetailTrade: (params) => {
    return request.post('/bill-common/get-common-bill-detail-trade', params)
  }
}

export default baseCommon
