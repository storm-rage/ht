/**
 *融资审核管理Api（工作流）
 */
import request from '@common/axios/request';

const financingAuditManageWorkflow = {
  //融资审核-数据字典
  getAuditDirectory: (params) => {
    return request.post('/financing-audit/get-audit-directory',params)
  },
  //融资审核-待办详情-根据凭证信息获取对账单信息
  getWaitAccountBillDetail(params) {
    return request.get('/financing-audit/get-wait-accountBill-detail', {params})
  },
  //融资审核-待办详情-申请信息
  getWaitFinancingDetail(params) {
    return request.get('/financing-audit/get-wait-financing-detail', {params})
  },
  //融资审核-待办详情-融资凭证信息
  getWaitVoucherDetail(params) {
    return request.get('/financing-audit/get-wait-voucher-detail', {params})
  },
  //融资审核-保理公司初审提交
  submitFirstAudit(params) {
    return request.post('/financing-audit/submit-first-audit', params)
  },
  //融资审核-保理公司复审提交
  submitReviewAudit(params) {
    return request.post('/financing-audit/submit-review-audit', params)
  },

}
export default financingAuditManageWorkflow
