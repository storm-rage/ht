import request from '@common/axios/request'
const login = {
  //获取手机验证码
  sendMobileCaptcha:(params) => {
    return request.post('/login/hadaySendMessage',params)
  },
  // 登录
  login: (params) => {
    return request.post('/login/login', params)
  },
  verifyThirdToken: () => {
    return request.get('login/verifyThirdToken?token=QTgzQUE4OTM5RjI1NzU5MkREMTI4Q0M2RkYyMDAyRDNEQkMxMTdFQkI0QjBERERB&timestamp=20220810165805')
  },
  // 单点登录
  ssoLogin: (params) => {
    return request.get('/login/sso',{params})
  },
  //登出
  logout: (params) => {
    return request.post('/login/logout',params)
  },


  // 首次登录修改密码
  upDatePassword:(params) => {
    return request.post('/login/save-new-password',params)
  },


  // 人脸识别获取二维码
  getFaceQrode:(params) => {
    return request.post('/login/face-check-qrcode',params)
  },
  // 人脸识别结果-查询
  queryFaceResult:() => {
    return request.post('/login/face-check-query', null,{ isUnLock: true })
  },

  // 用户服务协议-查询
  queryUserProtocol:(params) => {
    return request.post('/login/query-user-protocol-for-supplier',params)
  },
  // 人脸识别-签署
  signUserProtocol:(params) => {
    return request.post('/login/sign-user-protocol',params)
  },
}
export default login;
