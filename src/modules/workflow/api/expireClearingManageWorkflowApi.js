/**
 *运营端-到期清算Api（工作流）
 */
import request from '@common/axios/request';

export default {
  /**
   *到期清算-复核-获取详情
   */
  getReviewDetails(params) {
    return request.post('/eb-account-bill-clear/get-review-details', params)
  },
  /**
   *到期清算-作废
   */
  clearAbort(params) {
    return request.post('/eb-account-bill-clear/clear-abort', params)
  },
  /**
   *到期清算-提交申请
   */
  submitClearApply(params) {
    return request.post('/eb-account-bill-clear/submit-clear-apply', params)
  },
  /**
   *到期清算-复核
   */
  clearReview(params) {
    return request.post('/eb-account-bill-clear/clear-review', params)
  },
};
