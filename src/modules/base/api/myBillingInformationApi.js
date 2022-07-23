// 我的开票信息
import request from '@common/axios/request'

const myBillingInformation = {
  // getDetail:(params) => {
  //   return request.get('/account-center/get-ent-invoice-info',{params})
  // },
  updateInvoiceInfo:(params) => {
    return request.post('/personal-center/update-user-invoice-info',params)
  }
}

export default myBillingInformation
