// 个人中心
import request from '@common/axios/request'

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
    return request.post('/personal-center/update-user-info', { params })
  },
  //文件上传
  uploadFile: (params) => {
    return request.post('/personal-center/upload-file', { params })
  },
}

export default myBasicInformation
