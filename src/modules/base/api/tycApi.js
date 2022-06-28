/**
 * 天眼查接口
 */

import request from '@common/axios/request'

const tyc = {
  //开通模块查询
  getTycList: () => {
    return request.get('/sys-tyc/get-tyc-model-List')
  },
  //风险数据查询（报红）
  checkTycInfo:(params) => {
    return request.get('/sys-tyc/check-tyc-Info',{params})
  },
  //不分页详情
  queryTycInfo:(params) => {
    return request.get('/sys-tyc/query-tyc-Info',{params})
  },
  //分页详情
  queryTycInfoPage:(params) => {
    return request.get('/sys-tyc/query-tyc-Info-page',{params})
  },
}

export default tyc
