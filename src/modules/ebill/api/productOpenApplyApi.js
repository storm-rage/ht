/**
 * 产品开通申请api
 */
import request from '@common/axios/request'
const productOpenApply = {
  /**
   * 业务申请-产品开通申请-数据字典
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  getDataDirectory (params) {
    return request.get('/product-open-apply/get-data-directory',{params})
  },
  /**
   * 业务申请-产品开通申请-列表查询
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  queryProudctApplyPage (params) {
    return request.get('/product-open-apply/query-product-open-apply-page',{params})
  },
  /**
   * 业务申请-产品开通申请-详情
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  getProductOpenApplyDetail(params) {
    return request.get('/product-open-apply/get-product-open-apply-detail',{params})
  },
  submitProductOpenAplly (params) {
    return request.post('/product-open-apply/submit-product-open-apply',params);
  }
}
export default productOpenApply
