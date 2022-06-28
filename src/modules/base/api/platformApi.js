/**
 * 平台参数设置 接口
 */
import request from '@common/axios/request'
import download from "@utils/download";

const platform = {
  //获取字典
  getDictionary:(params)=>{
    return request.get('/sys-platform/get-finance-apply-directory',{params})
  },
  //查询设置
  queryPlatform:(params) =>{
    return request.get('/sys-platform/query-sys-plat-form',{params})
  },
  //修改参数
  updatePlatform:(params) => {
    return request.post('/sys-platform/update-sys-plat-form',params)
  },
  //开单模式变更
  billModelChange:(params) => {
    return request.get('/sys-platform/check-bill-model-is-changed',{params})
  },
  //清算模式变更
  clearModelChange:(params) => {
    return request.get('/sys-platform/check-clear-model-is-changed',{params})
  },
  downProtocol:(params) => {
    return download('/sys-platform/download-protocol', params, 1, 'post');
  }
}

export default platform
