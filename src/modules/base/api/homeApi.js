import request from '@common/axios/request'
export default {
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

};
