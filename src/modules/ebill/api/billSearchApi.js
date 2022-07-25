/**
 * 对账单查询api
 */
import request from '@common/axios/request'
import download from "@utils/download";

const billSearch = {
  /**
   * 对账单查询-导出
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  exportStatementAccountBill: (params) => {
    return download('/statement-account-bill/export-statement-account-bill',params,1,'get')
  },
  /**
   * 对账单查询-数据字典
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  getDirectory: (params) => {
    return request.get('/statement-account-bill/get-directory',{params})
  },
  /**
   * 对账单查询-SRM详情
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  querySrmAccountBillPage: (params) => {
    return request.get('/statement-account-bill/query-srm-account-bill-page',{params})
  },
  /**
   * 对账单查询-查询
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  queryStatementSrmAccountBillPage: (params) => {
    return request.get('/statement-account-bill/query-statement-account-bill-page',{params})
  },
  /**
   * 对账单查询-TMS详情
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  queryTrmAccountBillPage: (params) => {
    return request.get('/statement-account-bill/query-tms-account-bill-page',{params})
  },
}
export default billSearch
