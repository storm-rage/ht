/**
 * 客户信息查询API
 */
 import request from '@common/axios/request'
 import download from "@utils/download";
 const entInfoQuery = {
  /**
   * 查询-字典
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
   getDirectory: (params) => {
    return request.get('/ent-info-query/get-ent-info-query-directory',{params})
  },
  /**
   * 查询
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
   queryEntInfo: (params) => {
    return request.get('/ent-info-query/query-ent-info-page',{params})
  },
  /**
   * 详情
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
   getEntInfoDetail: (params) => {
    return request.get('/ent-info-query/get-ent-info-detail',{params})
  },
  /**
   * 导出
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
   exportEntInfoList: (params) => {
    return download('/ent-info-query/export-ent-info-list',params, 1, 'get')
  },
 }
 export default entInfoQuery