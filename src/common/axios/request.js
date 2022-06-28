import Vue from "vue"
import axios from 'axios'
import router from '@/router'
import ZjLog from '../components/log/ZjLog'
import { messageBox } from '../components/messageBox'
import store from "@/store";
//引入
import sw_cookie from "../utils/cookie";

Vue.use(messageBox);
const qs = require('qs');
const service = axios.create({
  timeout: 120000,
  dataType: 'json',
  baseURL: process.env.VUE_APP_BASE_URL
})


/**
 * 请求前拦截
 * 用于处理需要在请求前的操作
 */

service.interceptors.request.use(config => {
  //是否使用mock
  if (config.isMock) {
    config.baseURL = `/mock${config.baseURL}`
  }
  if(config.data && typeof(config.data) === 'object' && config.data.unlock){
    ZjLog.unLock()
  }else{
    ZjLog.lock()
  }
  if (config.isUpload) { // 上传转换数据格式
    const form = new FormData()
    for (let key in config.data) {
      form.append(key, config.data[key])
    }
    config.data = form
  }
  if (config.method === 'get') {
    config.paramsSerializer = function (params) {
      return qs.stringify(params, {arrayFormat: 'comma'})
    }
  }
  return config
}, (error) => {
  ZjLog.unLock()
  return Promise.reject(error)
})

/**
 * 请求响应拦截
 * 用于处理需要在请求返回后的操作
 */
let errCount = true
const errorHandle = (status,response) => {
  if(!errCount){return}
  switch (response.code) {
    case 403:
      clearToken()
      new Vue().$messageBox({
        type: 'warning',
        content: response.msg || '未登录或者登录已超时，请重新登录',
        messageResolve: () => {
          router.replace({
            path: '/login'
          })
        }
      })
      break
    default:
      new Vue().$messageBox({ type: 'warning', content: response.msg || '系统繁忙' })
      break
  }

  errCount = false
  window.setTimeout(()=>{
    errCount = true
  },1000)

}

service.interceptors.response.use(response => {
  ZjLog.unLock()
  if (response.config.isMock) {
    return Promise.resolve(response.data)
  }
  if (response.status === 200 || response.data.code === '200') { // json
    if (response.headers['content-type'] && response.headers['content-type'].indexOf('application/json') !== -1) {
      //判断
      if (response.data.code === 200 || response.data.code === '200') {
        return Promise.resolve(response.data)
      } else {
        if (response.data.code) {
          //正常报错
          if (response.data.code !== 200 && response.data.code !== '200') {
            errorHandle(response.data.code, response.data)
            return Promise.reject(response.data)
          } else{
            return Promise.resolve(response.data)
          }
        } else {

          if (response.config.baseURL.indexOf('/bpmx') !== -1) { // 再保理
            return response.data;
          } else { // 融单2.0
            //blob转json
            const reader = new FileReader()
            reader.onload = function () {
              let res = JSON.parse(reader.result)
              errorHandle(res.code, res)
            }
            reader.readAsText(response.data)
            return Promise.reject(response.data)
          }

        }
      }
    } else { // other
      if (response.config.responseType === 'arraybuffer') {
        return Promise.resolve(response.data)
      } else if (response.config.responseType === 'blob') {
        return Promise.resolve(response)
      } else {
        return Promise.resolve(response)
      }
    }
  } else {
    return Promise.reject(response.data)
  }
}, error => {
  ZjLog.unLock()
  if (error.response) {
    errorHandle(error.response.status, error.response)
    return Promise.reject(error)
  } else {
    if (error.message.includes('timeout')) {
      // 请求超时
      new Vue().$messageBox({ type: 'error', content: '请求超时，请检查网络是否正常连接' })
      return Promise.reject(new Error())
    } else {
      // 请求失败
      new Vue().$messageBox({ type: 'error', content: '请求失败，请检查网络是否已连接' })
      return Promise.reject(new Error())
    }
  }
})

// 清除缓存
function clearToken() {
  //清除local存储的信息
  sessionStorage.clear()
  let localArr = ['regType','vuexAlong']
  localArr.forEach(item => {
    localStorage.removeItem(item)
  })
  window.clearVuexAlong()
  store.commit('resetState')
  //清除cookie
  let cookieArr = ['userName','powerArr','XSRF-TOKEN','SESSION']
  cookieArr.forEach(item =>{
    sw_cookie.remove(item)
  })
}


export default service
