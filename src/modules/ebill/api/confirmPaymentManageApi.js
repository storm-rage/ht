/**
 * 清算管理-确认付款
 */
import request from '@common/axios/request'
export default {
  /**
   *确认收款-数据字典
   */
  getDirectory(params){
    return request.get('/confirm-receipt/get-directory',{params})
  },
  /**
   * 确认收款-资金流水列表
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  queryCapitalFlowPage(params) {
    return request.get('/confirm-receipt/query-capital-flow-page',{params})
  },
  //==============================凭证收款=================================
  /**
   * 确认收款-凭证收款列表
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  queryBillPage(params) {
    return request.get('/confirm-receipt/query-bill-page', {params});
  },

  /**
   * 确认收款-凭证确认收款
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  billConfirmReceipt(params) {
    return request.post('/confirm-receipt/bill-confirm-receipt', params);
  },
  /**
   * 确认收款-凭证确认收款申请
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  billConfirmReceiptApply(params) {
    return request.post('/confirm-receipt/bill-confirm-receipt-apply', params);
  },
  /**
   *确认收款-凭证收款申请详情
   */
  getBillReceiptApplyDetail(params){
    return request.get('/confirm-receipt/get-bill-receipt-apply-detail',{params})
  },
  //==============================非凭证收款=================================
  /**
   * 确认收款-非凭证收款列表
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  queryNoBillPage (params) {
    return request.get('/confirm-receipt/query-no-bill-page', {params})
  },
  /**
   * 确认收款-非凭证确认收款申请
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  noBillConfirmReceiptApply(params) {
    return request.post('/confirm-receipt/no-bill-confirm-receipt-apply', params);
  },
  /**
   *确认收款-非凭证收款申请详情
   */
  getNoBillReceiptApplyDetail(params){
    return request.get('/confirm-receipt/get-no-bill-receipt-apply-detail',{params})
  }
};
