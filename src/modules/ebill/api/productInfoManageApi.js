/**
 * 产品信息管理api
 */
import request from '@common/axios/request'

const productInfoManage = {
  /**
   * 产品信息管理-新增产品配置
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  addProductSetting: (params) => {
    return request.post('/pub-product-setting/add-product-setting',params)
  },
  /**
   * 产品信息管理-查看产品详情
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  queryProductDetail: (params) => {
    return request.get('/pub-product-setting/query-product-detail',{params})
  },
  /**
   * 产品信息管理-数据字典
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  queryProductDirectory: (params) => {
    return request.get('/pub-product-setting/query-product-directory',{params})
  },
  /**
   * 产品信息管理-产品列表
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  queryProductPage: (params) => {
    return request.get('/pub-product-setting/query-product-page',{params})
  },
  /**
   * 产品信息管理-修改产品配置
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  updateProductSetting: (params) => {
    return request.post('/pub-product-setting/update-product-setting',params)
  },
}
export default productInfoManage
