import request from '@common/axios/request'

//企业端-融资管理-融资交易查询api
const financingTransactionSearch = {
  //融资交易查询-凭证/入库融资详情
  getBillFinancingTranDetail: (params) => {
    return request.get('/financing-tran-query/get-bill-financing-tran-detail', { params })
  },
  //融资交易查询-获取数据字典
  getFinancingTranDirectory: (params) => {
    return request.get('/financing-tran-query/get-financing-tran-directory', { params })
  },
  //融资交易查询-订单融资详情
  getOrderFinancingTranDetail: (params) => {
    return request.get('/financing-tran-query/get-order-financing-tran-detail', { params })
  },
  //融资交易查询-查询
  queryFinancingTranPage: (params) => {
    return request.get('/financing-tran-query/query-financing-tran-page', { params })
  },
}
export default financingTransactionSearch
