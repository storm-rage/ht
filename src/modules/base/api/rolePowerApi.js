/**
 * 角色权限（rolePower）接口
 */
import request from '@common/axios/request'

const rolePower = {
  //查询权限列表
  getRolePower:(params) => {
    return request.post('/sys-role-power/get-role-power',params)
  },
  //角色列表查询
  queryRolePage:(params) => {
    return request.get('/sys-role-power/query-role-page',{params})
  },
  //更新角色权限
  updateRolePower:(params) => {
    return request.post('/sys-role-power/update-role-power',params)
  },
  //新增角色
  addRole:(params) => {
    return request.post('/sys-role-power/add-role',params)
  },
  //获取角色代码
  getRoleCode:(params) => {
    return request.get('/sys-role-power/get-role-code', {params})
  },
}

export default rolePower
