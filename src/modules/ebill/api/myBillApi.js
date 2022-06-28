import request from '@common/axios/request'
const myBill = {
  //列表查询
  queryReceivedBillList: (params) => {
    return request.get('/my-bill/query-receive-bill-list',{params})
  }
}
export default myBill
