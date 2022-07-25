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
};
