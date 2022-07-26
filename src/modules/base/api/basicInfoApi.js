/**
 * 平台基础信息设置 接口
 */
 import request from '@common/axios/request'
//  import download from "@utils/download";
 
 const basicInfo = {
   //查询平台系统设置
   platFormList:(params)=>{
     return request.get('/sys-platform/query-sys-plat-form',{params})
   },
   //修改参数
   platFormEad:(params) => {
     return request.post('/sys-platform/update-sys-plat-form',params)
   },
 }
 
 export default basicInfo
 