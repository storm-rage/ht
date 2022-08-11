/**
 * 汇总凭证打印接口
 */
import request from '@common/axios/request'

const voucherPrint = {
    //单笔凭证打印-数据字典
    getRolePower: (params) => {
        return request.get('/voucher-print/get-single-voucher-directory', { params })
    },
    //凭证打印-打印凭证
    queryRolePage: (params) => {
        return request.get('/voucher-print/get-voucher-print', { params })
    },
    //凭据打印-查询
    updateRolePower: (params) => {
        return request.get('/voucher-print/query-voucher-list', { params })
    },
    //凭证打印-更新打印次数
    addRole: (params) => {
        return request.post('/voucher-print/update-voucher-print-times', params)
    },
}

export default voucherPrint
