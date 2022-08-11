import request from '@common/axios/request'
import download from "@utils/download";

//凭证签发复核api
const openBillAudit = {
  //凭证签发复核-数据字典
  getDirectory: (params) => {
    return request.get('/open-bill-audit/directory', { params })
  },
  //凭证签发复核-查询
  tableApi: (params) => {
    return request.get('/open-bill-audit/list', { params })
  },
  //凭证签发复核-详情-获取对账单明细列表
  billDetailList: (params) => {
    return request.get('/open-bill-audit/bill-detail-list', { params })
  },
  //凭证签发复核-详情
  getBillDetail: (params) => {
    return request.get('/open-bill-audit/detail', { params } )
  },
  //凭证签发复核-批量
  auditBatch: (params) => {
    return request.post('/open-bill-audit/audit-batch',  params )
  },
}
export default openBillAudit
