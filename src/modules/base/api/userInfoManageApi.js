/**
 * 用户信息管理接口
 */
import request from '@common/axios/request'
import download from "@utils/download";

const userInfoManage = {
  //企业用户列表查询
  queryUserPage:(params) => {
    return request.get('/sys-user/query-enterprise-users-page',{params})
  },
  //企业用户维护记录列表查询
  queryLogsPage:(params) => {
    return request.get('/sys-user/query-enterprise-users-logs-page',{params})
  },
  //企业用户数据字典
  getUserDictionary:()=>{
    return request.get('/sys-user/get-sys-user-dictionary')
  },
  //列表导出
  exportUsers:(params)=>{
    return download('/sys-user/export-enterprise-users',params,1,'get')
  },
  //新增企业用户
  addUser:(params) => {
    return request.post('/sys-user/add-user',params)
  },
  //获取企业用户可以绑定的正常企业信息
  queryEntInformation:() => {
    return request.post('/sys-user/query-ent-information',{})
  },
  //获取企业用户可以绑定角色信息
  queryEntUserRoleInformation:() => {
    return request.post('/sys-user/query-ent-user-role-information',{})
  },
  //企业用户文件上传
  uploadAttach:(params)=>{
    return request.post('/sys-user/upload-attach',params)
  },
  //下载附件
  downloadFile:(params) => {
    return download('/sys-user/download-file',params,1,'post')
  },
  //下载附件流
  downloadFlow:(params) => {
    return request.post('/sys-user/download-file',params,{ responseType: 'blob' })
  },
  //企业 详情 入口检测
  getUserInformationDetail:(params) => {
    return request.post('/sys-user/get-user-information-detail',params)
  },
  //绑定云证书
  bindCloudCerUser:(params)=>{
    return request.post('/sys-user/bind-cloud-cert-user',params)
  },
  //制key
  makeCertKey:(params) => {
    return request.post('/sys-user/make-cert-key',params)
  },
  //获取企业用户详情信息
  getUserInformation:(params) => {
    return request.post('/sys-user/get-user-information',params)
  },
  //联网核查
  validateMobileRealName:(params) => {
    return request.post('/sys-user/validate-mobile-real-name',params)
  },
  //冻结用户
  freezeUser:(params) => {
    return request.post('/sys-user/freeze-user',params)
  },
  //解冻用户
  unfreezeUser:(params) => {
    return request.post('/sys-user/unfreeze-user',params)
  },
  //重置密码
  resetPassword:(params)=>{
    return request.post('/sys-user/reset-password',params)
  },
  //注销用户
  cancelUser:(params) => {
    return request.post('/sys-user/cancel-user',params)
  },
  //修改企业用户
  updateUser:(params) => {
    return request.post('/sys-user/update-user',params)
  },
   //获取企业信息-确认
   getEnterpriseConfirm:(params) => {
    return request.post('/sys-user/get-sys-enterprise-confirm', params )
  },
  //获取维护记录字典
  getUserLogsDictionary:() => {
    return request.get('/sys-user/get-sys-user-logs-dictionary')
  },
  //获取维护记录列表
  queryUserLogsPage:(params) => {
    return request.get('/sys-user/query-enterprise-users-logs-page',{params})
  },
  //获取证书序列号
  getUserCert:()=>{
    return request.post('/sys-user/get-user-cert',{})
  }
}

export default userInfoManage
