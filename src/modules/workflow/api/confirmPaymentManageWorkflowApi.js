/**
 * 清算管理-确认付款工作流API
 */
import request from '@common/axios/request';

export default {
  //==============================凭证收款=================================
  /**
   * 确认收款-凭证收款复审详情
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  getBillReceiptReviewDetail(params) {
    return request.get('/confirm-receipt/get-bill-receipt-review-detail',{params})
  },
  /**
   * 确认收款-凭证收款复审
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  billReceiptReview(params) {
    return request.post('/confirm-receipt/bill-receipt-review', params);
  },
  /**
   *确认收款-凭证收款待处理提交（驳回情况）
   */
  billReceiptPending(params){
    return request.post('/confirm-receipt/bill-receipt-pending',params)
  },
  /**
   *确认收款-凭证收款待处理详情（驳回情况）
   */
  getBillReceiptPendingDetail(params){
    return request.get('/confirm-receipt/get-bill-receipt-pending-detail',{params})
  },
  //==============================非凭证收款=================================
  /**
   * 确认收款-非凭证收款复审详情
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  getNoBillReceiptReviewDetail(params) {
    return request.get('/confirm-receipt/get-no-bill-receipt-review-detail', {params})
  },
  /**
   * 确认收款-非凭证收款复审
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  noBillReceiptReview(params) {
    return request.post('/confirm-receipt/no-bill-receipt-review', params);
  },
  /**
   *确认收款-非凭证收款待处理提交
   */
  noBillReceiptPending(params){
    return request.post('/confirm-receipt/no-bill-receipt-pending',params)
  },
  /**
   *确认收款-非凭证收款待处理详情
   */
  getNoBillReceiptPendingDetail(params){
    return request.get('/confirm-receipt/get-no-bill-receipt-pending-detail',{params})
  }
};
