import request from '@common/axios/request'

//企业端-融资管理-融资复核api
const financingReview = {
  //融资复核-数据字典
  getDirectory: (params) => {
    return request.get('/financing-review/get-directory', { params })
  },
  //融资复核-详情
  getFinancingReviewDetail: (params) => {
    return request.get('/financing-review/get-financing-review-detail', { params })
  },
  //融资复核-查询
  queryFinancingReviewPage: (params) => {
    return request.get('/financing-review/query-financing-review-page', { params })
  },
  //融资复核-提交
  submitFinancingReview: (params) => {
    return request.post('/financing-review/submit-financing-review',  params )
  },
}
export default financingReview
