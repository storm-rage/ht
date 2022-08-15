/**
 * 发票查询api
 */
 import request from '@common/axios/request'
 import download from "@utils/download";
 const invoiceQuery = {
  // 数据字典
  getDirectory: (params) => {
    return request.get('/invoice-query/get-directory',{params})
  },
  // 查询
  getQueryInvoicePage: (params) => {
    return request.get('/invoice-query/query-invoice-page',{params})
  },
  // 导出
  exportInvoice: (params) => {
    return download('/invoice-query/export-invoice', params, 1, 'get')
  },
 }
 export default invoiceQuery