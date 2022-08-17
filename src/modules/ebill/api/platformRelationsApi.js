/**
 * 贸易关系管理接口-平台方（运营端）
 */
 import request from '@common/axios/request'

 const platformRelations = {
    
    //新增贸易关系校验
    relationAddtradeCheck:(params) => {
      return request.get('/trade-relation-ent/check-trade-relation-add',{params})
    },
    //详情 1
    relationDetail:(params) => {
      return request.get('/trade-relation-platform/get-trade-relation-detail',{params})
    },
      //字典 1
    getDirectory: () => {
      return request.get('/trade-relation-platform/get-directory')
    },
    //预览协议
    relationUpdate:(params) => {
        return request.get('/trade-relation-ent/get-agreement-detail',{params})
    },
    //查询贸易关系管理列表 1
    relationLsit:(params) => {
      return request.get('/trade-relation-platform/query-trade-relation-platform-page',{params})
    },
    //贸易关系操作记录(交易记录列表查询)
    recordPage:(params) => {
      return request.get('/trade-relation-ent/query-trade-relation-record-ent-page',{params})
    },
    //审核拒绝 1
    refuse:(params) => {
      return request.post('/trade-relation-platform/audit-trade-relation-reject',params)
    },
    //审核通过 1
    pass:(params) => { 
      return request.post('/trade-relation-platform/audit-trade-relation-success',params)
    },
    //冻结 1
    freeze:(params) => { 
      return request.post('/trade-relation-platform/freeze-trade-relation',params)
    },
    //解冻 1
    unfreeze:(params) => { 
      return request.post('/trade-relation-platform/unfreeze-trade-relation',params)
    },
    
  }
  
  export default platformRelations