/**
 * 业务管理工作流API
 */
import request from '@common/axios/request'

export default {
  /**
   * 业务管理-风控检查
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  checkRisk (params) {
    return request.post('/business-manage/check-risk',params);
  },
  /**
   * 业务管理-合同续签复核详情
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  getContractRenewalRecheckDetail (params) {
    return request.get('/business-manage/get-contract-renewal-recheck-detail',{params});
  },
  /**
   * 业务管理-业务申请初审详情
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  getFirstAuditDetail (params) {
    return request.get('/business-manage/get-first-audit-detail',{params});
  },
  /**
   * 业务管理-额度管理复核详情
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  getLimitRecheckDetail (params) {
    return request.get('/business-manage/get-limit-recheck-detail',{params});
  },
  /**
   * 业务管理-业务申请复审详情（初审）
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  getRecheckDetail (params) {
    return request.get('/business-manage/get-recheck-detail',{params});
  },
  /**
   * 业务管理-业务维护复审详情（单个贸易背景维护）
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  getTradeRecheckDetail (params) {
    return request.get('/business-manage/get-trade-recheck-detail',{params});
  },
  /**
   * 业务管理-业务申请初审提交
   * 工作流
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  submitFirstAudit (params) {
    return request.post('/business-manage/submit-first-audit',params);
  },
  /**
   * 业务管理-业务申请复审提交（初审）
   * 工作流
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  submitRecheck (params) {
    return request.post('/business-manage/submit-recheck',params);
  },
  /**
   * 业务管理-业务维护复审提交(单个贸易背景维护）)
   * 工作流
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  submitTradeRecheck (params) {
    return request.post('/business-manage/submit-trade-recheck',params);
  },
  /**
   * 业务管理-合同续签复核
   * 工作流
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  recheckContractRenewal (params) {
    return request.post('/business-manage/recheck-contract-renewal',params);
  },
  /**
   * 业务管理-额度管理复核
   * 工作流
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  recheckLimit (params) {
    return request.post('/business-manage/recheck-limit',params);
  }
}
