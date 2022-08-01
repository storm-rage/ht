import request from '@common/axios/request'
import download from "@utils/download";

//提前还款复核api
const repaymentReview = {
  //提前还款复核-下载协议
  downloadRepaymentApply: (params) => {
    return download('/pre-repayment-review/download-pre-repayment-review-template', params, 1, 'get')
  },
  //提前还款复核-数据字典
  getDirectory: (params) => {
    return request.get('/pre-repayment-review/get-directory', { params })
  },
  //提前还款复核-查询
  tableApi: (params) => {
    return request.get('/pre-repayment-review/query-pre-repayment-review-page', { params })
  },
  //提前还款复核-详情
  getRepaymentDetail: (params) => {
    return request.get('/pre-repayment-review/get-pre-repayment-review-detail', { params })
  },
  //提前还款复核-提交
  repaymentSubmit: (params) => {
    return request.post('/pre-repayment-review/submit-pre-repayment-review', params )
  },
}
export default repaymentReview
