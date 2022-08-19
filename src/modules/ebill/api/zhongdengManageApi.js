import request from '@common/axios/request'
import download from "@utils/download";

//中登登记管理API
const zdManage = {  
  //中登-计算登记日期
  registerDate: (params) => {
    return request.post('/zhongdeng-manage/calculate-zhongdeng-register-date', params )
  },
   //中登-计算登记费用
   registerFee: (params) => {
    return request.post('/zhongdeng-manage/calculate-zhongdeng-register-fee', params )
  },
  //中登-校验登录
  checkLogin: (params) => {
    return request.get('/zhongdeng-manage/check-login-state', {params} )
  },
  //中登-确认登记费用
  confirmFee: (params) => {
    return request.post('/zhongdeng-manage/confirm-zhongdeng-register-fee', params )
  },
  //中登-删除附件
  deleteAttach: (params) => {
    return request.post('/zhongdeng-manage/delete-attach', params )
  },
  //中登-字典
  getDictionary: (params) => {
    return request.get('/zhongdeng-manage/get-dictionary', {params} )
  },
  //----------------以下名字没改--------
  //中登-融资详情凭证信息
  getDictionary: (params) => {
    return request.get('/zhongdeng-manage/get-financing-bill-infos', {params} )
  },
  //中登-融资详情交易信息
  getDictionary: (params) => {
    return request.get('/zhongdeng-manage/get-financing-trans-detail', {params} )
  },
  //中登-订单保理详情
  getDictionary: (params) => {
    return request.get('/zhongdeng-manage/get-order-detail', {params} )
  },
  //中登-获取验证码
  getDictionary: (params) => {
    return request.get('/zhongdeng-manage/get-phone-validate-code', {params} )
  },
  //中登-获取图形验证码
  getDictionary: (params) => {
    return request.get('/zhongdeng-manage/get-validate-code', {params} )
  },
  //中登-中登登记详情
  getDictionary: (params) => {
    return request.get('/zhongdeng-manage/get-zhongdeng-register-info', {params} )
  },
  //中登-登录中登
  deleteAttach: (params) => {
    return request.post('/zhongdeng-manage/login-zhongdeng', params )
  },
  //中登-凭证融资列表
  getDictionary: (params) => {
    return request.get('/zhongdeng-manage/query-bill-financing-page', {params} )
  },
}
export default zdManage
