/**
 * 贸易关系管理接口-平台方（运营端）
 */
import request from '@common/axios/request'

const platformRelations = {
  //详情 
  relationDetail: (params) => {
    return request.get('/trade-relation-platform/get-trade-relation-detail', { params })
  },
  //字典 
  getDirectory: () => {
    return request.get('/trade-relation-platform/get-directory')
  },
  //查询贸易关系管理列表 
  relationLsit: (params) => {
    return request.get('/trade-relation-platform/query-trade-relation-platform-page', { params })
  },

  //审核拒绝 
  refuse: (params) => {
    return request.post('/trade-relation-platform/audit-trade-relation-reject', params)
  },
  //审核通过 
  pass: (params) => {
    return request.post('/trade-relation-platform/audit-trade-relation-success', params)
  },
  //冻结 
  freeze: (params) => {
    return request.post('/trade-relation-platform/freeze-trade-relation', params)
  },
  //解冻 
  unfreeze: (params) => {
    return request.post('/trade-relation-platform/unfreeze-trade-relation', params)
  },

}

export default platformRelations