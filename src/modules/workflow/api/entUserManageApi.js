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
    //企业用户数据字典
    getUserDictionary: () => {
        return request.get('/sys-user/get-sys-user-dictionary')
    },
    /**
     *用户信息管理-提交
     */
    todoUserSubmit(params) {
        return request.post('/sys-user/todo-user-submit', params)
    },
    /**
     *用户信息管理-获取企业用户详情信息
     */
    getUserInformationDetail(params) {
        return request.post('/sys-user/get-todo-user-information-detail', params)
    },
    /**
     *用户信息管理-客户详情
     */
    getUserInformationKhDetail(params) {
        return request.get('/sys-user/get-todo-user-information-kh-detail', { params })
    },
    /**
     *用户信息管理-操作记录
     */
    getBusinessParamLog(params) {
        return request.get('/sys-user/get-todo-eb-business-param-log', { params })
    },
}

export default entUserManage