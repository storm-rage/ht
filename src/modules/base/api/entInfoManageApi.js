/**
 * 企业信息管理接口
 */
import request from '@common/axios/request'
import download from "@utils/download";

const entInfoManage = {
  // 企业信息管理--列表查询
  queryEnterprise: (params) => {
    return request.get('/sys-enterprise/query-sys-enterprise-page', { params })
  },
  // 企业信息管理--新增
  addEnterprise: (params) => {
    return request.post('/sys-enterprise/add-sys-enterprise', params)
  },
    // 企业信息管理--新增-确认
    getEnterpriseConfirm: (params) => {
      return request.get('/sys-enterprise/get-sys-enterprise-confirm', { params })
    },
  // 企业信息管理--新增趋势
  getEnterpriseRegister: (params) => {
    return request.get('/sys-enterprise/get-sys-enterprise-register-trend', { params })
  },
  //企业信息管理--列表导出
  exportEnterpriseList: (params) => {
    return download('/sys-enterprise/export-sys-enterprise', params, 1, 'get')
  },
  // 企业信息管理--详情
  getEnterprise: (params) => {
    return request.get('/sys-enterprise/get-sys-enterprise', { params })
  },
  // 企业信息管理--修改
  updateEnterprise: (params) => {
    return request.post('/sys-enterprise/update-sys-enterprise', params)
  },
   // 企业信息管理--暂存
   saveEnterprise: (params) => {
    return request.post('/sys-enterprise/save-sys-enterprise', params)
  },
  //企业信息管理--获取企业数据字典
  queryEntDictionary: () => {
    return request.get('/sys-enterprise/query-sys-enterprise-data-directory')
  },
  //企业信息管理-获取操作记录
  getEbBusinessParamLog: (params) => {
    return request.get('/sys-enterprise/get-eb-business-param-log', {params})
  },
}

export default entInfoManage
