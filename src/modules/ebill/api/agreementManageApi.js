/**
 * 阶段性协议管理api
 */
import request from '@common/axios/request'

const agreementManage = {

  // 企业端
  /**
   * 企业端-阶段性协议管理-数据字典
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  getPhasedAgreeDirectory: (params) => {
    return request.get('/phased-agreement/get-phased-agree-directory',{params})
  },
  /**
   * 企业端-阶段性协议维护-合同删除
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  delContract: (params) => {
    return request.post('/phased-agreement/del-contract',params)
  },
  /**
   * 企业端-我的阶段性协议-贸易关系列表查询
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  getMyTradeRelationList: (params) => {
    return request.get('/phased-agreement/get-my-trade-relation-list',{params})
  },
  /**
   * 企业端-我的阶段性协议-贸易关系-维护记录列表查询
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  getMyTradeRelationRecord: (params) => {
    return request.get('/phased-agreement/get-my-trade-relation-record',{params})
  },
  /**
   * 企业端-阶段性协议维护-贸易关系列表查询
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  getTradeRelationList: (params) => {
    return request.get('/phased-agreement/get-trade-relation-list',{params})
  },
  /**
   * 企业端-我的阶段性协议-贸易关系-维护记录-详情
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  getTradeRelationRecordDetail: (params) => {
    return request.get('/phased-agreement/get-trade-relation-record-detail', {params})
  },
  /**
   * 企业端-我的阶段性协议-阶段性协议信息列表查询
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  queryMyPhasedAgreePage: (params) => {
    return request.get('/phased-agreement/query-my-phased-agree-page', {params})
  },
  /**
   * 企业端-阶段性协议维护-阶段性协议列表查询
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  queryPhasedAgreePage: (params) => {
    return request.get('/phased-agreement/query-phased-agree-page', {params})
  },
  /**
   * 企业端-阶段性协议维护-阶段性协议提交
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  submitPhasedAgree: (params) => {
    return request.post('/phased-agreement/submit-phased-agree',params)
  },

  //运营端
  /**
   * 运营端-阶段性协议维护-阶段性协议-删除
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  deletePhasedAgree: (params) => {
    return request.post('/phased-agreement/delete-phased-agree',params)
  },
  /**
   * 运营端-阶段性协议维护-阶段性协议新增
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  getAddDetail: (params) => {
    return request.get('/phased-agreement/get-add-detail', {params})
  },
  /**
   * 运营端-阶段性协议维护-详情
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  getBackPhasedAgreeInfo: (params) => {
    return request.get('/phased-agreement/get-back-phased-agree-info', {params})
  },
  /**
   * 运营端-阶段性协议-列表查询
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  queryBackPhasedAgreePage: (params) => {
    return request.get('/phased-agreement/query-back-phased-agree-page', {params})
  },
  /**
   * 运营端-阶段性协议维护-阶段性协议-保存
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  savePhasedAgree: (params) => {
    return request.post('/phased-agreement/save-phased-agree',params)
  },
  /**
   * 运营端-阶段性协议维护-阶段性协议-确认提交
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  submitBackPhasedAgree: (params) => {
    return request.post('/phased-agreement/submit-back-phased-agree',params)
  },
}
export default agreementManage
