/**
 * 应收债权转让通知API
 */
import request from '@common/axios/request'

export default {
  /**
   * 应收账款转让通知回执-确认回执
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  confirmAssignmentNoticeReceipt(params) {
    return request.post('/assignment-notice-record/confirm-assignment-notice-receipt', params)
  },
  /**
   * 应收账款转让通知回执-详情
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  getAssignmentNoticeReceiptDetail(params) {
    return request.get('/assignment-notice-record/get-assignment-notice-receipt-detail', {params})
  },
  /**
   * 应收账款转让通知查询-详情
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  getAssignmentNoticerRecordDetail (params) {
    return request.get('/assignment-notice-record/get-assignment-notice-record-detail', {params})
  },
  /**
   * 应收账款转让通知回执-查询
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  queryAssignmentNoticeReceiptPage (params) {
    return request.get('/assignment-notice-record/query-assignment-notice-receipt-page', {params})
  },
  /**
   * 应收账款转让通知查询-查询
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  queryAssignmentNoticeRecordPage (params) {
    return request.get('/assignment-notice-record/query-assignment-notice-record-page', {params})
  }
};
