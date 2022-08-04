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
}
export default voucherQuery
