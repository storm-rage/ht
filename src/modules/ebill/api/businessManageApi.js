/**
 * 业务管理API
 */
import request from '@common/axios/request'
const businessManage = {
  /**
   * 业务管理-数据字典
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  getDataDirectory (params) {
    return request.get('/business-manage/get-data-directory',{params})
  },
  /**
   * 业务管理-业务参数列表
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  queryBusinessParamPage (params) {
    return request.get('/business-manage/query-business-param-page',{params})
  },
  /**
   * 业务管理-贸易关系列表
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  getTradeRelationList (params) {
    return request.get('/business-manage/get-trade-relation-list',{params})
  },
  /**
   * 业务管理-业务参数详情
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  getBusinessParamDetail (params) {
    return request.get('/business-manage/get-business-param-detail',{params})
  },
  /**
   * 业务管理-贸易关系详情
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  getTradeRelationDetail (params) {
    return request.get('/business-manage/get-trade-relation-detail',{params})
  },
  /**
   * 业务管理-合同续签申请
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  applyContractRenewal (params) {
    return request.post('/business-manage/apply-contract-renewal',params);
  },
  /**
   * 业务管理-额度管理提交
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  applyLimit (params) {
    return request.post('/business-manage/apply-contract-renewal',params);
  },
  /**
   * 业务管理-检验在途数据
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  checkOnlineData (params) {
    return request.post('/business-manage/check-online-data',params);
  },
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
   * 业务管理-业务申请复审详情
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  getRecheckDetail (params) {
    return request.get('/business-manage/get-recheck-detail',{params});
  },
  /**
   * 业务管理-业务维护复审详情
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  getTradeRecheckDetail (params) {
    return request.get('/business-manage/get-trade-recheck-detail',{params});
  },
  /**
   * 业务管理-维护贸易关系
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  maintainTradeRelation (params) {
    return request.post('/business-manage/maintain-trade-relation',params);
  },
  /**
   * 业务管理-合同续签复核
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  recheckContractRenewal (params) {
    return request.post('/business-manage/recheck-contract-renewal',params);
  },
  /**
   * 业务管理-额度管理复核
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  recheckLimit (params) {
    return request.post('/business-manage/recheck-limit',params);
  },
  /**
   * 业务管理-业务申请初审提交
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  submitFirstAudit (params) {
    return request.post('/business-manage/submit-first-audit',params);
  },
  /**
   * 业务管理-业务申请复审提交
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  submitRecheck (params) {
    return request.post('/business-manage/submit-recheck',params);
  },
  /**
   * 业务管理-业务维护复审提交
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  submitTradeRecheck (params) {
    return request.post('/business-manage/submit-trade-recheck',params);
  }
}
export default businessManage
