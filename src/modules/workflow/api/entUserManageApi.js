/**
 * 企业用户待办api
 */
import request from '@common/axios/request'

const entUserManage = {
    //--------------------------------------------- 企业信息管理 ---------------------------------------------
    /**
     *企业信息管理-提交
     */
    todoEnterpriseSubmit(params) {
        return request.post('/sys-enterprise/todo-enterprise-submit', params)
    },
    /**
     *企业信息管理-详情
     */
    getTodoEnterprise(params) {
        return request.get('/sys-enterprise/get-todo-sys-enterprise', { params })
    },
    /**
     *企业信息管理-客户详情
     */
    getTodoEnterpriseKhInfo(params) {
        return request.get('/sys-enterprise/get-todo-sys-enterprise-kh-info', { params })
    },

    //--------------------------------------------- 用户信息管理 ---------------------------------------------


}

export default entUserManage