/**
 * 基础信息维护交易查询API
 */
import request from '@common/axios/request'
const maintainTransaction = {
  //数据字典
  getDirectory: (params) => {
    return request.get('/basic-info-apply-record/get-directory',{params})
  },
  //列表查询
  tableApi: (params) => {
    return request.get('/basic-info-apply-record/query-basic-info-apply-record-page',{params})
  },
  //详情
  getDetail: (params) => {
    return request.get('/basic-info-apply-record/get-basic-info-apply-detail',{params})
  }
}
export default maintainTransaction
