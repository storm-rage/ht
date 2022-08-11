import request from '@common/axios/request'

//凭证作废复核api
const billRejectAudit = {
  //凭证作废复核-查询
  tableApi: (params) => {
    return request.get('/eb-bill-reject-audit/query-reject-audit-page', { params })
  },
  //凭证作废复核-详情
  getRejectAuditDetail: (params) => {
    return request.get('/eb-bill-reject-audit/get-reject-audit-detail', { params })
  },
  //凭证作废复核-提交
  submitRejectAudit: (params) => {
    return request.get('/eb-bill-reject-audit/submit-reject-audit', { params })
  }
}
export default billRejectAudit
