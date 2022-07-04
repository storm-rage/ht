//我的代办
import request from '@common/axios/request'
const myItems = {
  //列表查询
  queryReceivedBillList: (params) => {
    return request.get('/my-bill/query-receive-bill-list',{params})
  }
}
export default myItems
