/**
 * 我的对账单api
 */
import request from '@common/axios/request'

const myAccountBill = {
  /**
   * 我的对账单-数据字典
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  getDirectory: (params) => {
    return request.get('/my-account-bill/get-directory', { params })
  },
  /**
   * 我的对账单-查询
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  tableApi: (params) => {
    return request.get('/my-account-bill/query-my-account-bill-page', { params })
  },
  /**
  * 我的对账单-开立凭证
  * @param params
  * @returns {Promiseponse<any>>}
  */
  applyOpenVoucherBatch: (params) => {
    return request.post('/my-account-bill/apply-open-voucher-batch', params)
  }
}
export default myAccountBill
