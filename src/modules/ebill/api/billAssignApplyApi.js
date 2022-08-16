/**
 * 凭证转让申请api
 */
import request from '@common/axios/request'

const billAssignApply = {
  /**
   * 凭证转让申请-查询
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  tableApi: (params) => {
    return request.get('/eb-bill-apply/query-eb-bill-apply-page', { params })
  },
  /**
   * 凭证转让申请-获取可转让金额
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  getEbBillPage: (params) => {
    return request.get('/eb-bill-apply/get-eb-bill-amount', { params })
  },
  /**
  * 凭证转让申请-单笔凭证转多个企业
  * @param params
  * @returns {Promiseponse<any>>}
  */
  submitEbBillOneToMany: (params) => {
    return request.post('/eb-bill-apply/sumbit-eb-bill-one-to-many', params)
  },
  /**
 * 凭证转让申请-多笔凭证转单个企业
 * @param params
 * @returns {Promiseponse<any>>}
 */
  submitEbBillManyToOne: (params) => {
    return request.post('/eb-bill-apply/sumbit-eb-bill-many-to-one', params)
  }
}
export default billAssignApply
