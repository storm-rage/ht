import request from '@common/axios/request'
export default {
  //=============================数据驾驶舱======================================
  /**
   * 首页-消息未读数量
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
   getMessageReadCount(params) {
    return request.get('/platform-home/get-message-station-read-count', { params })
  },

  //=============================数据驾驶舱======================================
  /**
   * 数据驾驶舱-核心企业
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  getCoreDataCockpit(params) {
    return request.get('/workbench-data-cockpit/get-core-data-cockpit', { params })
  },
  /**
   * 数据驾驶舱-保理公司
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  getFactoringDataCockpit(params) {
    return request.get('/workbench-data-cockpit/get-factoring-data-cockpit', { params })
  },
  /**
   * 数据驾驶舱-平台运营
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  getPlatformDataCockpit(params) {
    return request.get('/workbench-data-cockpit/get-platform-data-cockpit', { params })
  },
  /**
   * 数据驾驶舱-供应商
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  getSupplierDataCockpit(params) {
    return request.get('/workbench-data-cockpit/get-supplier-data-cockpit', { params })
  },
  //=============================数据展示======================================
  /**
   * 保理-融资金额
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  getFinancingAmt(params) {
    return request.get('/workbench-graph/get-financing-amt', { params, data: {unlock: true} })
  },
  /**
   * 保理-放款金额
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  getLoanAmt(params) {
    return request.get('/workbench-graph/get-loan-amt', { params, data: {unlock: true} })
  },
  /**
   * 供应商-订单融资金额
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  getOrderFinancingAmt(params) {
    return request.get('/workbench-graph/get-order-financing-amt', { params, data: {unlock: true} })
  },
  /**
   * 供应商-我的凭证
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  getMyBill(params) {
    return request.get('/workbench-graph/get-my-bill', { params, data: {unlock: true} })
  },
  /**
   * 核心企业-凭证签发总金额
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  getPayableIssuanceAmt(params) {
    return request.get('/workbench-graph/get-payable-issuance-total-amt', { params, data: {unlock: true} })
  },
  //=============================公告======================================
  /**
   * /平台首页-查询系统公告列表
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
   getSysNoticePage(params) {
    return request.get('/platform-home/get-sys-notice-page', { params, data: {unlock: true} })
  },
  /**
   * /平台首页-系统公告详情
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
   getSysNoticeDetail(params) {
    return request.get('/platform-home/get-sys-notice-detail', { params, data: {unlock: true} })
  },
  /**
   * /平台首页-系统公告全部已读
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
   postSysNoticeRead(params) {
    return request.get('/platform-home/get-sys-notice-read', { params, data: {unlock: true} })
  },
  //=============================站内信======================================
  /**
   * /平台首页-查询站内信
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
   getMoreMessage(params) {
    return request.get('/platform-home/get-more-message-station', { params, data: {unlock: true} })
  },
  /* /平台首页-站内信详情
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
   getMessageDetail(params) {
    return request.get('/platform-home/get-message-station-by-id', { params, data: {unlock: true} })
  },
  /* /平台首页-站内信详情全部已读
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
   postMessageRead(params) {
    return request.get('/platform-home/get-message-station-read-by-id', { params, data: {unlock: true} })
  },
};
