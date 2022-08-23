import request from '@common/axios/request'
import download from "@utils/download";

//电子债权凭证查询api
const voucherQuery = {
  //电子债权凭证查询-导出
  exportElectronicClaimsBill: (params) => {
    return download('/electronic-claims-bill/export-electronic-claims-bill', params, 1, 'get')
  },
  //电子债权凭证查询-凭证详情
  getElectronicClaimsBillDetail: (params) => {
    return request.post('/electronic-claims-bill/get-electronic-claims-bill-detail',  params )
  },
  //电子债权凭证查询-凭证轨迹
  getElectronicClaimsBillDetailTrace: (params) => {
    return request.post('/electronic-claims-bill/get-electronic-claims-bill-detail-trace',  params )
  },
  //电子债权凭证查询-贸易背景
  getElectronicClaimsBillDetailTrade: (params) => {
    return request.post('/electronic-claims-bill/get-electronic-claims-bill-detail-trade', params )
  },
  //电子债权凭证查询-数据字典
  getElectronicClaimsBillDirectory: (params) => {
    return request.get('/electronic-claims-bill/get-electronic-claims-bill-directory', {params} )
  },
  //电子债权凭证查询-列表
  queryElectronicClaimsBillPage: (params) => {
    return request.get('/electronic-claims-bill/query-electronic-claims-bill-page', {params} )
  },
  // //中登接口暂挂
  // //中登-计算登记日期
  // registerDate: (params) => {
  //   return request.post('/zhongdeng-manage/calculate-zhongdeng-register-date', params )
  // },
  //  //中登-计算登记费用
  //  registerFee: (params) => {
  //   return request.post('/zhongdeng-manage/calculate-zhongdeng-register-fee', params )
  // },
  // //中登-校验登录
  // checkLogin: (params) => {
  //   return request.get('/zhongdeng-manage/check-login-state', {params} )
  // },
  // //中登-确认登记费用
  // confirmFee: (params) => {
  //   return request.post('/zhongdeng-manage/confirm-zhongdeng-register-fee', params )
  // },
  // //中登-删除附件
  // deleteAttach: (params) => {
  //   return request.post('/zhongdeng-manage/delete-attach', params )
  // },
  // //中登-字典
  // getDictionary: (params) => {
  //   return request.get('/zhongdeng-manage/get-dictionary', {params} )
  // },
  // //中登-融资详情凭证信息
  // detailspz: (params) => {
  //   return request.get('/zhongdeng-manage/get-financing-bill-infos', {params} )
  // },
  // //中登-融资详情交易信息
  // detailsjy: (params) => {
  //   return request.get('/zhongdeng-manage/get-financing-trans-detail', {params} )
  // },
  // //中登-订单保理详情
  // detailsbl: (params) => {
  //   return request.get('/zhongdeng-manage/get-order-detail', {params} )
  // },
  // //中登-获取验证码
  // getCode: (params) => {
  //   return request.get('/zhongdeng-manage/get-phone-validate-code', {params} )
  // },
  // //中登-获取图形验证码
  // getPictureCode: (params) => {
  //   return request.get('/zhongdeng-manage/get-validate-code', {params} )
  // },
  // //中登-中登登记详情
  // detailszd: (params) => {
  //   return request.get('/zhongdeng-manage/get-zhongdeng-register-info', {params} )
  // },
  // //中登-登录中登
  // zdLongin: (params) => {
  //   return request.post('/zhongdeng-manage/login-zhongdeng', params )
  // },
  // //中登-凭证融资列表
  // pzrzList: (params) => {
  //   return request.get('/zhongdeng-manage/query-bill-financing-page', {params} )
  // },
  // //中登-天眼查企业信息
  // tianyancha: (params) => {
  //   return request.post('/zhongdeng-manage/query-ent-info-by-tianyancha', params )
  // },
  //  //中登-订单保理列表
  //  orderPage: (params) => {
  //   return request.get('/zhongdeng-manage/query-order-page', {params} )
  // },
  // //中登-提交登记
  // submitZd: (params) => {
  //   return request.post('/zhongdeng-manage/submit-zhongdeng-register-info', params )
  // },
  // //中登-修改合同信息
  // changeManage: (params) => {
  //   return request.post('/zhongdeng-manage/update-contract-info', params )
  // },
  // //中登-修改出让人
  // changePerson: (params) => {
  //   return request.post('/zhongdeng-manage/update-debtor-info', params )
  // },
  // //中登-上传附件
  // submitDetil: (params) => {
  //   return request.post('/zhongdeng-manage/upload-attach', params )
  // },
}
export default voucherQuery
