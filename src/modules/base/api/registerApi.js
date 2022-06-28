/**
 * register注册接口
 */
import request from '@common/axios/request'
import download from "@utils/download";

const register = {
    //营业执照ocr
    sendOcrBusiness:(params) => {
      return request.post('/sys-ent-register/send-ocr-business',params)
    },
    //身份证ocr
    sendOcrCert:(params) => {
      return request.post('/sys-ent-register/send-ocr-cert',params)
    },
    //我的买方企业
    judgeBuyers:(params) => {
      return request.post('/sys-ent-register/judge-buyers',params)
    },
    //获取企业数据字典
    queryDirectory:(params) => {
      return request.get('/sys-ent-register/query-sys-enterprise-data-directory',{params})
    },
    //发送手机验证码
    sendMobileCaptcha:(params)=>{
      return request.get('/sys-ent-register/send-mobile-captcha',{params})
    },
    //注册申请
    registerApply:(params) => {
      return request.post('/sys-ent-register/register-apply',params)
    },
    //获取企业信息
    getEntInfo:(params) => {
      return request.get('/sys-ent-register/get-register-ent-info',{params})
    },
    //保存企业信息
    saveEntInfo:(params) => {
      return request.post('/sys-ent-register/save-register-ent-info',params)
    },
    //获取用户信息
    getUserInfo:(params) => {
      return request.get('/sys-ent-register/get-register-ent-user',{params})
    },
    //保存用户信息
    saveUserInfo:(params) => {
      return request.post('/sys-ent-register/save-register-ent-user',params)
    },
    //文件上传
    uploadAttach:(params)=>{
      return request.post('/sys-ent-register/upload-attach',params)
    },
    //下载附件
    downloadFile:(params) => {
      return download('/sys-ent-register/download-file',params,1,'post')
    },
    //下载附件流
    dowmFlowFile:(params)=>{
      return request.post('/sys-ent-register/download-file',params,{ responseType: 'blob' })
    },
    //下载企业注册资料zip文件
    downloadRegisterZip:(params) => {
      return download('/sys-ent-register/download-register-zip',params,1,'post')
    }
}

export default register
