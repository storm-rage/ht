// 企业银行账户
import request from '@common/axios/request'

const corporateBankAccount = {
  //获取字典
  getDictionary:(params)=>{
    return request.get('/my-ent-bank/get-my-ent-bank-dic',{params})
  },
  //列表查询
  queryMyEntBankPage:(params) => {
    return request.get('/my-ent-bank/query-my-ent-bank-page',{params})
  },
  //修改
  updateMyEntBank:(params) => {
    return request.post('/my-ent-bank/update-my-ent-bank',params)
  }
}

export default corporateBankAccount
