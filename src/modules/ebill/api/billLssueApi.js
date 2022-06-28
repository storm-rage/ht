import request from '@common/axios/request'
const billLssue = {
  //列表查询
  queryList: (params)=>{
    // return request.get('/my-bill/query-receive-bill-list',{params})
    return new Promise((resolve, reject) => {
      resolve({data: {total: "1",rows:[
        {id:1}
      ]}})
    })
  }
}
export default billLssue
