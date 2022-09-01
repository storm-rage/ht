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
   * 业务管理-合同续签校验
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  checkContractRenewal (params) {
    return request.post('/business-manage/check-contract-renewal',params);
  },
  /**
   * 业务管理-合同额度变更
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
   applyLimitChange (params) {
    return request.post('/business-manage/apply-limit-change',params);
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
   * 业务管理-额度续签提交
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  applyLimit (params) {
    return request.post('/business-manage/apply-limit',params);
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
   * 业务管理-维护贸易关系
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  maintainTradeRelation (params) {
    return request.post('/business-manage/maintain-trade-relation',params);
  }
}
export default businessManage
