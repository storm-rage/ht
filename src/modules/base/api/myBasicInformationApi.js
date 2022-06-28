// 我的基本信息
import request from '@common/axios/request'

const myBasicInformation = {
  //获取详情
  getDetail:(params) => {
    return request.get('/account-center/get-ent-invoice-info',{params})
  },
  //修改开票信息
  updateInfo:(params) => {
    return request.post('/account-center/update-user-invoice-info',params)
  },
  //企业信息
  getEntInfo:(params)=>{
    return request.get('/account-center/get-ent-info',{params})
  },
  //个人信息
  getUserInfo:(params)=>{
    return request.get('/account-center/get-user-info',{params})
  },
  //修改邮箱地址
  updateUserInfo:(params) => {
    return request.post('/account-center/update-user-info',params)
  },
  queryEntUsersInfoPage:(params) => {
    return request.get('/account-center/query-ent-users-info-page',{params})
  }
}

export default myBasicInformation
