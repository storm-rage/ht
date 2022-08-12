// /**
//  * 贸易关系管理接口-供应商（企业端）
//  */
//  import request from '@common/axios/request'

//  const tradeRelations = {
//     //新增贸易关系
//     relationAdd:(params) => {
//       return request.post('/trade-relation-ent/add-trade-relation-ent',params)
//     },
//     //新增贸易关系校验
//     relationAddtradeCheck:(params) => {
//       return request.get('/trade-relation-ent/check-trade-relation-add',{params})
//     },
//     //修改贸易关系校验
//     relationUpdate:(params) => {
//       return request.get('/trade-relation-ent/check-trade-relation-update',{params})
//     },
//       //字典
//     tradeRelationsGetDirectory: () => {
//       return request.get('/trade-relation-ent/get-trade-relation-dictionary')
//     },
//     //预览协议
//     relationUpdate:(params) => {
//         return request.get('/trade-relation-ent/get-agreement-detail',{params})
//     },
//     //查询贸易关系
//     relationLsit:(params) => {
//       return request.get('/trade-relation-ent/query-trade-relation-ent-page',{params})
//     },
//     //贸易关系操作记录(交易记录列表查询)
//     recordPage:(params) => {
//       return request.get('/trade-relation-ent/query-trade-relation-record-ent-page',{params})
//     },
//     //修改贸易关系
//     relationEnt:(params) => {
//       return request.post('/trade-relation-ent/update-trade-relation-ent',params)
//     },
//     //上传证明材料
//     materialAttach:(params) => { 
//       return request.post('/trade-relation-ent/upload-trade-material-attach',params)
//     },
    
//   }
  
//   export default tradeRelations