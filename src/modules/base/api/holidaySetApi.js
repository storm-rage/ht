import request from '@common/axios/request'
import download from "@utils/download";
export default {
  /**
   * 节假日设置-数据字典
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  getHolidayDirectory(params) {
    return request.get('/holiday-set/get-holiday-directory',{params});
  },
  /**
   * 节假日设置-日历查询
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  getHolidayList (params) {
    return request.get('/holiday-set/get-holiday-list',{params});
  },
  /**
   * 节假日设置-下载模板
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  getHolidayTemplate (params) {
    // return request.get('/holiday-set/get-holiday-template',{params});
    return download('/holiday-set/get-holiday-template', params, 1, 'get')
  },
  /**
   * 节假日设置-导入模板
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  importHolidayTemplate(params) {
    return request.post('/holiday-set/import-holiday-template',params);
  },
};
