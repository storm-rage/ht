/**
 * 保理合同申请，复核，查询（企业端）
 * 保理合同代办查询（运营端）
 */
import request from '@common/axios/request'

export default {
  //=======================企业端API====================
  /**
   * 保理合同签约申请-列表
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  queryEbContractSignPage(params) {
    return request.get('/eb-contract-manage-enterprise/query-eb-contract-enter-sign-page', {params})
  },
  /**
   * 我签约的保理合同-列表
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  queryMyEbContractPage(params) {
    return request.get('/eb-contract-manage-enterprise/query-eb-contract-enterprise-page', {params})
  },
  /**
   * 保理合同签约申请-去签约-详情
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  queryEbContractSignDetail(params) {
    return request.get('/eb-contract-manage-enterprise/query-eb-contract-enter-sign-detail', {params})
  },
  /**
   * 我签约的保理合同-详情
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  queryMyEbContractDetail(params) {
    return request.get('/eb-contract-manage-enterprise/query-eb-contract-enterprise-detail', {params})
  },
  /**
   * 保理合同签约申请-去签约-申请
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  submitEbContractApply(params) {
    return request.get('/eb-contract-manage-enterprise/submit-eb-contract-apply', {params})
  },
  //=================================运营端Api================================
  /**
   * 保理合同-待办-合同确认 or 取消
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  confirmEbContract (params) {
    return request.get('/eb-contract-management/confirm-eb-contract', {params})
  },
  /**
   * 保理合同-待办-额度变更-确认or 取消
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  confirmEbContractCredit (params) {
    return request.post('/eb-contract-management/confirm-eb-contract-credit', params)
  },
  /**
   * 保理合同-待办-额度变更-详情
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  getEbContractCreditDetail(params) {
    return request.get('/eb-contract-management/get-eb-contract-credit-detail', {params})
  },
  /**
   * 保理合同查询-详情
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  getEbContractDetail (params) {
    return request.get('/eb-contract-management/get-eb-contract-detail', {params})
  },
  /**
   * 保理合同-待办-合同处理详情
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  getEbContractFlowDetail (params) {
    return request.get('/eb-contract-management/get-eb-contract-flow-detail', {params})
  },
  /**
   * 保理合同-待办-合同处理详情-合同附件分页
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  getEbContractFlowFile (params) {
    return request.get('/eb-contract-management/get-eb-contract-flow-file', {params})
  },
  /**
   * 保理合同查询-列表查询
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  queryEbContractPage (params) {
    return request.get('/eb-contract-management/query-eb-contract-page', {params})
  }
};
