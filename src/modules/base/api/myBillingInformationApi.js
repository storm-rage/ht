// 我的开票信息
import request from '@common/axios/request'

const myBillingInformation = {
  getDetail:(params) => {
    return request.get('/account-center/get-ent-invoice-info',{params})
  },
  updateInfo:(params) => {
    return request.post('/account-center/update-user-invoice-info',params)
  }
}

export default myBillingInformation
