import request from '@common/axios/request'
import download from "@utils/download";

//供应商额度查询api
const supplierQuotaQuery = {
  //供应商额度查询-导出
  exportFactoringCredit: (params) => {
    return download('/factoring-credit-query/export-factoring-credit',params,1,'get')
  },
  //供应商额度查询-数据字典
  getDirectory: (params) => {
    return request.get('/factoring-credit-query/get-directory',{params})
  },
  //供应商额度查询-查询
  queryFactoringCreditPage: (params) => {
    return request.get('/factoring-credit-query/query-factoring-credit-page',{params})
  },
}
export default supplierQuotaQuery
