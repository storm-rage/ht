import request from '@common/axios/request'

//查询统计-融资交易查询api
const financingTransactionQuery = {
  //融资交易查询-详情
  getFinancingTransDetail: (params) => {
    return request.get('/financing-trans-query/get-financing-trans-detail', { params })
  },
  //融资交易查询-获取数据字典
  getFinancingTransDirectory: (params) => {
    return request.get('/financing-trans-query/get-financing-trans-directory', { params })
  },
  //融资交易查询-查询
  queryFinancingTransPage: (params) => {
    return request.get('/financing-trans-query/query-financing-trans-page', { params })
  },
  //融资交易查询-凭证信息
  getFinancingBillInfos: (params) => {
    return request.get('/financing-trans-query/get-financing-bill-infos', { params })
  },
  //凭证信息-详情
  getOtherInfoByBill: (params) => {
    return request.get('/financing-trans-query/get-other-info-by-bill', { params })
  },
}
export default financingTransactionQuery
