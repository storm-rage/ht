/**
 * 基础协议模板查询接口
 */
 import request from '@common/axios/request'
 import download from "@utils/download";

 const modelAggreement = {
    // //下载附件
    // downloadFile:(params) => {
    //     return download('/sys-ent-register/download-file',params,1,'post')
    //   },

    //基础协议模板查询-模板下载
    downloadTemplate:(params) => {
      return download('/agree-template/download-template',params,1,'post')
    },
    
    //基础协议模板查询-数据字典
    getDirectory:(params) => {
      return request.get('/agree-template/get-directory',{params})
    },
    //基础协议模板-列表查询
    agreementList:(params) => {
      return request.get('/agree-template/query-agreement-template-page',{params})
    },
  }
  
  export default modelAggreement