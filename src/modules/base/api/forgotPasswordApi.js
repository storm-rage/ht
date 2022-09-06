/**
 * 忘记密码  接口
 */
import request from '@common/axios/request'

const forgotPasswordApi = {
  //1.发送手机验证码
  sendPhoneCode:(params) => {
    return request.post('/forget-password/send-message-for-change-password',params)
  },
  //2.校验手机验证码
  validateCode:(params) => {
    return request.post('/forget-password/validate-param',params)
  },
  //4.保存新密码
  saveNewPassword:(params) => {
    return request.post('/forget-password/save-new-password',params)
  }
}

export default forgotPasswordApi
