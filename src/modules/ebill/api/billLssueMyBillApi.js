/**
 * 我的凭证api
 */
import request from '@common/axios/request'
import download from "@utils/download";

const billLssueMyBill = {
  /**
   * 我的凭证-查询
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  queryHoldBillList: (params) => {
    return request.get('/my-eb-bill/query-hold-bill-list', {params})
  },
  /**
   * 我的凭证-导出
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  exportHoldBillList: (params) => {
    return download('/my-eb-bill/export-hold-bill-list',params,1,'get')
  },
  /**
   * 我的凭证-详情
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  getHoldBillDetail: (params) => {
    return request.post('/my-eb-bill/get-hold-bill-detail',params)
  },
  /**
   * 凭证详情-凭证轨迹
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  getHoldBillDetailTrace: (params) => {
    return request.post('/my-eb-bill/get-hold-bill-detail-trace',params)
  },
  /**
   * 凭证详情-贸易背景
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  getHoldBillDetailTrade: (params) => {
    return request.post('/my-eb-bill/get-hold-bill-detail-trade',params)
  },
}
export default billLssueMyBill
