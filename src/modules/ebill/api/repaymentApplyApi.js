import request from '@common/axios/request'
import download from "@utils/download";

//提前还款申请api
const repaymentApply = {
  //提前还款申请-下载协议
  downloadRepaymentApply: (params) => {
    return download('/pre-repayment-apply/download-pre-repayment-apply-template', params, 1, 'get')
  },
  //提前还款申请-数据字典
  getDirectory: (params) => {
    return request.get('/pre-repayment-apply/get-directory', { params })
  },
  //提前还款申请-查询
  tableApi: (params) => {
    return request.get('/pre-repayment-apply/query-pre-repayment-page', { params })
  },
  //提前还款申请-详情
  getRepaymentDetail: (params) => {
    return request.get('/pre-repayment-apply/get-pre-repayment-detail', { params })
  },
  //提前还款申请-提交
  repaymentSubmit: (params) => {
    return request.post('/pre-repayment-apply/submit-pre-repayment-apply',  params )
  },
}
export default repaymentApply
