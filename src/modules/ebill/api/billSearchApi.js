import request from '@common/axios/request'
import download from "@utils/download";

const billSearch = {
  //对账单查询-导出
  exportStatementAccountBill: (params) => {
    return download('/statement-account-bill/export-statement-account-bill',params,1,'get')
  },
  //数据字典
  getDirectory: (params) => {
    return request.get('/statement-account-bill/get-directory',{params})
  },
  //SRM详情
  querySrmAccountBillPage: (params) => {
    return request.get('/statement-account-bill/query-srm-account-bill-page',{params})
  },
  //查询
  queryStatementSrmAccountBillPage: (params) => {
    return request.get('/statement-account-bill/query-statement-account-bill-page',{params})
  },
  //TMS详情
  queryTrmAccountBillPage: (params) => {
    return request.get('/statement-account-bill/query-trm-account-bill-page',{params})
  },
}
export default billSearch
