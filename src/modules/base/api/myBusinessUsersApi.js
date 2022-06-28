//我的企业用户
import request from '@common/axios/request'
const myBusinessUsers = {
  queryEntUsersInfoPage:(params) => {
    return request.get('/account-center/query-ent-users-info-page',{params})
  }
}

export default myBusinessUsers
