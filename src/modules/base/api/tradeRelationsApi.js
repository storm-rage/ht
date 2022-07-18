/**
 * 贸易关系管理接口
 */
 import request from '@common/axios/request'

 const tradeRelations = {
    //新增贸易关系
    relationAdd:(params) => {
      return request.post('/trade-relation-ent/add-trade-relation-ent',{params})
    },
    //新增海天一级供应商
    relationAddtrade:(params) => {
      return request.post('/trade-relation-ent/add-trade-relation-one-lev',{params})
    },
    //新增贸易关系校验
    relationAddtradeCheck:(params) => {
      return request.post('/trade-relation-ent/check-trade-relation-add',{params})
    },
    //修改贸易关系校验
    relationUpdate:(params) => {
      return request.post('/trade-relation-ent/check-trade-relation-update',{params})
    },
    //查询贸易关系
    relationLsit:(params) => {
      return request.get('/trade-relation-ent/query-trade-relation-ent-page',{params})
    },
    //贸易关系操作记录
    recordPage:(params) => {
      return request.post('/trade-relation-ent/query-trade-relation-record-ent-page',{params})
    },
    //修改贸易关系
    relationEnt:(params) => {
      return request.post('/trade-relation-ent/update-trade-relation-ent',{params})
    },
    //海天一级供应商贸易关系修改
    relationOne:(params) => {
      return request.post('/trade-relation-ent/update-trade-relation-one-lev',{params})
    },
    //上传证明材料
    materialAttach:(params) => {
      return request.post('/trade-relation-ent/upload-trade-material-attach',{params})
    },
    
  }
  
  export default tradeRelations