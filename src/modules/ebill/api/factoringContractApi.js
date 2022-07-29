/**
 * 保理合同申请，复核，查询（企业端）
 * 保理合同查询（运营端）
 */
import request from '@common/axios/request'

export default {
  //=======================我签约的保理合同（企业端）API====================
  /**
   * 我签约的保理合同-字典
   */
  getEbContractDirectory(params){
    return request.get('/eb-contract-manage-enterprise/get-eb-contract-enums',{params})
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
   * 我签约的保理合同-详情
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  queryMyEbContractDetail(params) {
    return request.get('/eb-contract-manage-enterprise/query-eb-contract-enterprise-detail', {params})
  },
  //=======================保理合同签约申请（企业端）API====================
  /**
   * 获取字典
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  getEbContractApplyDirectory(params){
    return request.get('/eb-contract-apply/get-eb-contract-enums',{params})
  },
  /**
   * 保理合同签约申请-列表
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  queryEbContractEnterSignPage(params){
    return request.get('/eb-contract-apply/query-eb-contract-apply-sign-page',{params})
  },
  /**
   * 保理合同签约申请-去签约-详情
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  queryEbContractEnterSignApplyDetail(params){
    return request.get('/eb-contract-apply/query-eb-contract-apply-sign-detail',{params})
  },
  /**
   * 保理合同签约申请-去签约-申请
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  submitEbContractApply(params){
    return request.post('/eb-contract-apply/submit-eb-contract-apply',params)
  },
  //=======================保理合同签约复核（企业端）API====================
  /**
   * 获取字典
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  getEbContractReviewDirectory(params){
    return request.get('/eb-contract-apply-review/get-eb-contract-enums',{params})
  },
  /**
   * 保理合同签约申请-去签约-详情
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  queryEbContractReviewSignDetail(params) {
    return request.get('/eb-contract-apply-review/query-eb-contract-review-sign-detail', {params})
  },
  /**
   * 保理合同签约复核-列表
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  queryEbContractReviewSignPage(params){
    return request.get('/eb-contract-apply-review/query-eb-contract-review-sign-page',{params})
  },
  /**
   * 保理合同签约复核-复核(通过,拒绝)
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  submitEbContractApplyReview(params) {
    return request.post('/eb-contract-apply-review/submit-eb-contract-apply-review',params)
  },
  //=================================运营端Api================================
  getEbContractYyDirectory(params){
    return request.get('/eb-contract-management/get-eb-contract-enums',{params})
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
   *企业信息管理-详情-根据核心企业ID查询附件
   */
  getEbContractFileByEnterId(params){
    return request.get('/eb-contract-management/get-eb-contract-file-enter-id',{params})
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
