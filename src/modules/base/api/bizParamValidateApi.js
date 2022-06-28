//平台业务参数配置验证 接口
import request from '@common/axios/request'
import { getStr } from '@utils'


const bizParamValidate = {
  //平台业务参数配置验证-配置位置
  queryConfLink: (params) => {
    return request.get('/business-param-conf-Validation/conf-link',{params})
  },
  //平台业务参数配置验证-电子凭据融资
  queryCredentialsFinancingValidate: (params) =>
  {
    return request.post('/business-param-conf-Validation/credentials-financing-validate',params)
  },
  //平台业务参数配置验证-电子凭据开立
  queryCredentialsOpenValidate: (params) =>
  {
    return request.post('/business-param-conf-Validation/credentials-open-validate',params)
  },
  //平台业务参数配置验证-电子凭据转让
  queryCredentialsTransferValidate: (params) =>
  {
    return request.post('/business-param-conf-Validation/credentials-transfer-validate',params)
  },
  //平台业务参数配置验证-数据字典
  getDirectory: (params) =>
  {
    return request.get('/business-param-conf-Validation/get-directory',{params})
  },
  //平台业务参数配置验证-项目
  queryProjectValidate: (params) =>
  {
    return request.post('/business-param-conf-Validation/project-validate',params)
  },

}

export default bizParamValidate
