/**
 * 节假日设置接口
 */
 import request from '@common/axios/request'
 import download from "@utils/download";

 const holidayRouter = {
    //节假日设置-数据字典
    holidayDirectory:(params) => {
      return request.get('/holiday-set/get-holiday-directory',{params})
    },
    //节假日设置-日历查询
    holidayList:(params) => {
      return request.get('/holiday-set/get-holiday-list',{params})
    },
    //节假日设置-下载模板
    holidayTemplate:(params) => {
      return download('/holiday-set/get-holiday-template',{params},1,'get')
     },
    //节假日设置-导入模板
    holidayListTo:(params) => {
      return request.post('/holiday-set/import-holiday-template',params)
  },
  }
  
  export default holidayRouter