/**
 * 注册管理接口
 */
import request from '@common/axios/request'
import download from "@utils/download";

const registerAudit = {
  //字典
  queryEntDataDirectory: () => {
    return request.get('/platform-audit/query-sys-enterprise-data-directory')
  },
  //列表查询
  queryRegisterEntPage: (params) => {
    return request.get('/platform-audit/query-register-ent-page', {params})
  },
  //导出数据
  // exportRegisterEnt: (params) => {
  //   return download('/platform-audit/export-register-ent', params, 1, 'get')
  // },
  //查询详情
  getAuditDetail: (params) => {
    return request.get('/platform-audit/get-platform-audit-detail', {params})
  },
  //获取所属项目
  getProjectList:(params) => {
    return request.post('/platform-audit/get-project-list',params)
  },
  //文件上传
  uploadAttach:(params)=>{
    return request.post('/platform-audit/upload-attach',params)
  },
  //下载附件
  downloadFile: (params) => {
    return download('/platform-audit/download-file',params,1,'post')
  },
  //下载流
  downloadFlow: (params) => {
    return request.post('/platform-audit/download-file', params,{ responseType: 'blob' })
  },
  //联网核查
  validateReal:(params)=>{
    return request.post('/platform-audit/validate-mobile-real-name',params)
  },

  //获取核心企业审核信息
  getCoreAuditInfo:(params)=>{
    return request.get('/platform-audit/get-core-ent-audit-info',{params})
  },
  //获取供应商贸易关系推荐函信息
  getSupTradeInfo:(params)=>{
    return request.get('/platform-audit/get-supplier-trade-info',{params})
  },
  //提交审核
  submitAudit:(params)=>{
    return request.post('/platform-audit/submit-platform-audit',params)
  },

  //资料确认
  submitConfirm:(params)=>{
    return request.post('/platform-audit/submit-audit-confirm',params)
  },

  //查询待发证用户信息
  getCertUserInfo:(params)=>{
    return request.get('/platform-audit/get-issue-cert-user-info',{params})
  },
  //制Key
  makeCertKey:(params) => {
    return request.post('/platform-audit/make-cert-key',params)
  },
  //发证完成
  submitEntIssuedCert:(params) => {
    return request.post('/platform-audit/submit-ent-issued-cert',params)
  }
}

export default registerAudit
