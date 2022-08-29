// 个人中心api
import request from '@common/axios/request'
import download from "@utils/download";

const myBasicInformation = {
  //数据字典
  getDirectory: (params) => {
    return request.get('/personal-center/get-directory', { params })
  },
  //我的基本信息
  getUserInfo: (params) => {
    return request.get('/personal-center/get-my-basic-info', { params })
  },
  //维护企业信息详情
  getEntInfo: (params) => {
    return request.get('/personal-center/get-ent-info', { params })
  },
  //维护企业信息修改
  updateUserInfo: (params) => {
    return request.post('/personal-center/update-ent-info', params )
  },
  //文件上传
  uploadFile: (params) => {
    return request.post('/personal-center/upload-file', params )
  },
  //下载协议模板
  downloadTemplate: (params, type = 1, method = 'post') => {
    return download('/personal-center/download-template', params, type, method)
  },
   //维护个人信息详情
   getPersonalInfo: (params) => {
    return request.get('/personal-center/get-personal-info', { params })
  },
   //维护个人信息修改
   updatePersonalInfo: (params) => {
    return request.post('/personal-center/update-personal-info', params )
  },
   //更换操作人员
   updateOperator: (params) => {
    return request.post('/personal-center/update-operator', params)
  },
}

export default myBasicInformation
