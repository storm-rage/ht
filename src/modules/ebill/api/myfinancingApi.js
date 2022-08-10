import request from '@common/axios/request'
import download from "@utils/download";

//我的融资api
const myFinancing = {
  //我的融资-导出
  exportMyFinancingList: (params) => {
    return download('/my-financing/export-my-financing-list',  params, 1, 'get')
  },
  //我的融资-详情
  getMyFinancingDetail: (params) => {
    return request.get('/my-financing/get-my-financing-detail', { params })
  },
  //我的融资-获取数据字典
  getMyFinancingDirectory: (params) => {
    return request.get('/my-financing/get-my-financing-directory', { params })
  },
  //我的融资-查询
  queryMyFinancingPage: (params) => {
    return request.get('/my-financing/query-my-financing-page', { params })
  },
}
export default myFinancing
