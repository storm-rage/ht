/**
 * 首页-站内信
 */
import request from '@common/axios/request'
const message = {
  // 站内信-列表查询
  getList: (params)=>{
    return request.get('/get-pub-message-station/get-message-station',{ params })
  },
  // 站内信-更多
  getMore: (params)=>{
    return request.get('/get-pub-message-station/get-more-message-station', { params })
  },
  // 单个站内信详情
  getDetail: (params)=>{
    return request.get('/get-pub-message-station/get-message-station-by-id',{ params })
  },
  // 代办任务-待处理
  queryBackLog: ()=>{
    return null
  },
}

export default message
