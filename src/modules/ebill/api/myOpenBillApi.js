import request from '@common/axios/request'
import download from "@utils/download";

//我签发的凭证api
const myOpenBill = {
  //我签发的凭证-导出
  exportBill: (params) => {
    return download('/my-open-bill/export-my-open-bill', params, 1, 'get')
  },
  //我签发的凭证-数据字典
  getDirectory: (params) => {
    return request.get('/my-open-bill/get-my-open-bill-directory', { params })
  },
  //我签发的凭证-查询
  tableApi: (params) => {
    return request.get('/my-open-bill/query-my-open-bill-page', { params })
  },
  //我签发的凭证-详情
  getOpenBillDetail: (params) => {
    return request.post('/my-open-bill/get-my-open-bill-detail', params)
  },
  //我签发的凭证-贸易背景
  getOpenBillTrade: (params) => {
    return request.post('/my-open-bill/get-my-open-bill-detail-trade', params)
  },
  //我签发的凭证-凭证轨迹
  getOpenBillTtrace: (params) => {
    return request.post('/my-open-bill/get-my-open-bill-detail-trace', params)
  },
  //我签发的凭证-撤销
  cancelSubmit: (params) => {
    return request.post('/my-open-bill/cancel-submit', params)
  },
  //我签发的凭证-作废申请
  invalidApply: (params) => {
    return request.post('/my-open-bill/invalid-apply', params)
  },
}
export default myOpenBill
