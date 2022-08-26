/**
 *阶段性协议管理Api（工作流）
 */
import request from '@common/axios/request';

const multistageAgreementWorkflow = {

  // 运营端
  /**
   * 运营端-阶段性协议维护-阶段性协议-删除
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  deletePhasedAgree: (params) => {
    return request.post('/phased-agreement/delete-phased-agree',params)
  },
  /**
   * 待办-阶段性协议维护-阶段性协议-删除
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  deleteWaitPhasedAgree: (params) => {
    return request.post('/phased-agreement/delete-wait-phased-agree',params)
  },
  /**
   * 运营端-阶段性协议维护-阶段性协议新增
   */
  getAddDetail(params) {
    return request.get('/phased-agreement/get-add-detail', {params})
  },
  /**
   * 运营端-阶段性协议维护-详情
   */
  getBackPhasedAgreeInfo(params) {
    return request.get('/phased-agreement/get-back-phased-agree-info', {params})
  },
  /**
   * 待办-阶段性协议维护-详情
   */
  getWaitPhasedAgreeInfo(params) {
    return request.get('/phased-agreement/get-wait-phased-agree-info', {params})
  },
  /**
   * 运营端-我的阶段性协议-阶段性协议信息列表查询
   */
   queryBasePhasedAgreePage(params) {
    return request.get('/phased-agreement/query-base-phased-agree-page', {params})
  },

  /**
   * 运营端-阶段性协议-列表查询
   */
  queryBackPhasedAgreePage(params) {
    return request.get('/phased-agreement/query-back-phased-agree-page', {params})
  },
  
  /**
   * 阶段性协议-是否能维护
   */
   checkBackPhasedAgreeParam(params) {
    return request.post('/phased-agreement/check-back-phased-agree-param', params)
  },

  
  /**
   * 运营端-阶段性协议维护-阶段性协议-保存
   */
  savePhasedAgree(params) {
    return request.post('/phased-agreement/save-phased-agree', params)
  },
  /**
   * 待办-阶段性协议维护-阶段性协议-保存
   */
  saveWaitPhasedAgree(params) {
    return request.post('/phased-agreement/save-wait-phased-agree', params)
  },
  /**
   * 运营端-阶段性协议维护-阶段性协议-确认提交
   */
  submitBackPhasedAgree(params) {
    return request.post('/phased-agreement/submit-back-phased-agree', params)
  },
  /**
   * 待办-阶段性协议维护-阶段性协议-确认提交
   */
  submitWaitBackPhasedAgree(params) {
    return request.post('/phased-agreement/submit-wait-back-phased-agree', params)
  },
  /**
   * 运营端-阶段性协议管理-数据字典
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  getBackPhasedAgreeDirectory: (params) => {
    return request.get('/phased-agreement/get-back-phased-agree-directory',{params})
  },
}
export default multistageAgreementWorkflow
