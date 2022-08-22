/**
 * 凭证转复核api
 */
import request from '@common/axios/request'

const billAssignReview = {
  /**
   * 查询
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  tableApi: (params) => {
    return request.get('/eb-bill-apply-review/query-eb-bill-apply-review-page', { params })
  },
  /**
  * 详情
  * @param params
  * @returns {Promise<AxiosResponse<any>>}
  */
  getBillApplyReviewDetail: (params) => {
    return request.get('/eb-bill-apply-review/get-eb-bill-apply-review-detail', { params })
  },
  /**
   * 复核
   * @param params
   * @returns {Promiseponse<any>>}
   */
  sumbitEbBillReview: (params) => {
    return request.post('/eb-bill-apply-review/sumbit-eb-bill-review', params)
  }
}
export default billAssignReview
