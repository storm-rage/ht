/**
 * 额度变更申请和复核，查询接口
 */
import request from '@common/axios/request'
import download from "@utils/download";

const billQuotaManage = {
  /**
   * 合同管理-额度变更申请/复核-数据字典
   * @returns {Promise<AxiosResponse<any>>}
   */
  getDataDirectory(params) {
    return request.get('/adjust-credit-apply/get-data-directory', {params})
  },
  /**
   * 合同管理-额度变更申请/复核-下载额度调整申请书
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  downloadTemplate(params, type = 1, method = 'post') {
    return download('/adjust-credit-apply/download-template', params, type, method)
  },
  /**
   * 合同管理-额度变更申请/复核-提交校验
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  submitCheck(params) {
    return request.post('/adjust-credit-apply/submit-check', params)
  },
  //======================================额度变更申请==================================================
  /**
   * 合同管理-额度变更申请-查询
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  queryAdjustCreditApplyList(params) {
    return request.get('/adjust-credit-apply/query-adjust-credit-apply-list', {params})
  },
  /**
   * 合同管理-额度变更申请-保理合同详情
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  getContractDetail(params) {
    return request.get('/adjust-credit-apply/get-contract-detail', {params})
  },
  /**
   * 合同管理-额度变更申请-额度信息详情
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  getAdjustCreditApplyDetail(params) {
    return request.get('/adjust-credit-apply/get-adjust-credit-apply-detail', {params})
  },
  /**
   * 合同管理-额度变更申请-申请提交
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  submitAdjustCreditApply(params) {
    return request.post('/adjust-credit-apply/submit-adjust-credit-apply', params)
  },
  //======================================复核===============================================
  /**
   * 合同管理-额度变更复核-提交
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  submitAdjustCreditReview(params) {
    return request.post('/adjust-credit-apply/submit-adjust-credit-review', params)
  },
  /**
   * 合同管理-额度变更复核-列表查询
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  queryAdjustCreditReviewPage(params) {
    return request.get('/adjust-credit-apply/query-adjust-credit-review-page', {params})
  },
  /**
   * 合同管理-额度变更复核-详情
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  getAdjustCreditReviewDetail(params) {
    return request.get('/adjust-credit-apply/get-adjust-credit-review-detail', {params})
  },
  //==================================额度变更交易查询接口================================
  /**
   * 额度变更交易查询-交易列表
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  queryList(params) {
    return request.get('/credit-change-deal/list', {params})
  },
  /**
   * 额度变更交易查询-数据字典
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  getCreditQueryDic(params) {
    return request.get('/credit-change-deal/directory', {params})
  },
  /**
   * 额度变更交易查询-详情
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  getCreditQueryDetail(params) {
    return request.get('/credit-change-deal/detail', {params})
  },
  /**
   * 额度变更交易查询-详情-获取协议信息
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  getAgreement(params) {
    return request.get('/credit-change-deal/get-agreement', {params})
  }
};
export default billQuotaManage
