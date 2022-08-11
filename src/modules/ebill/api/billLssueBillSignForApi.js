/**
 * 凭证签收api
 */
import request from '@common/axios/request'
import download from "@utils/download";

const billLssueBillSignFor = {
  /**
   * 凭证签收-详情
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  getBillSignBillInfoDetail: (params) => {
    return request.post('/eb-bill-sign/get-bill-sign-bill-info-detail', params)
  },
  /**
   * 获取数据字典
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  getBillSignDictionary: (params) => {
    return request.get('/eb-bill-sign/get-bill-sign-dictionary', {params})
  },
  /**
   * 融单签收-查询融单签收协议信息-单个协议查看
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  getOneBillSignAgreement: (params) => {
    return request.post('/eb-bill-sign/get-one-bill-sign-agreement',params)
  },
  /**
   * 融单签收-审核通过
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  passBillSign: (params) => {
    return request.post('/eb-bill-sign/pass-bill-sign', params)
  },
  /**
   * 凭证签收-查询
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  queryBillSignPage: (params) => {
    return request.get('/eb-bill-sign/query-bill-sign-page', {params})
  },
  /**
   * 融单签收-审批拒绝
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  rejectBillSign: (params) => {
    return request.post('/eb-bill-sign/reject-bill-sign',params)
  },
}
export default billLssueBillSignFor
