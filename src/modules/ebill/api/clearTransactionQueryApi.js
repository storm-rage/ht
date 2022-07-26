import request from '@common/axios/request'

//清算交易查询api
const clearTransactionQuery = {
  //清算交易查询-详情
  getExpireClearDetail: (params) => {
    return request.get('/expire-clear-query/get-expire-clear-detail', {params})
  },
  //清算交易查询-获取数据字典
  getDirectory: (params) => {
    return request.get('/expire-clear-query/get-dictionary',{params})
  },
  //清算交易查询-查询
  queryExpireClearPage: (params) => {
    return request.get('/expire-clear-query/query-expire-clear-page',{params})
  },
}
export default clearTransactionQuery
