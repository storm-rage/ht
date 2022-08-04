import request from '@common/axios/request'

//转让交易查询api
const transferTransactionQuery = {
  //转让交易查询-详情
  getBillTransferDetail: (params) => {
    return request.get('/bill-transfer-record/get-bill-transfer-detail', {params})
  },
  //转让交易查询-数据字典
  getDirectory: (params) => {
    return request.get('/bill-transfer-record/get-directory',{params})
  },
  //转让交易查询-凭证查询
  queryBillRecordPage: (params) => {
    return request.get('/bill-transfer-record/query-bill-record-page',{params})
  },
  //转让交易查询-查询
  queryBillTransferRecordPage: (params) => {
    return request.get('/bill-transfer-record/query-bill-transfer-record-page',{params})
  },
}
export default transferTransactionQuery
