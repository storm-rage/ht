/**
 * 汇总凭证打印接口
 */
import request from '@common/axios/request'

const voucherPrint = {
    //单笔凭证打印-数据字典
    getSingleVoucherDirectory: (params) => {
        return request.get('/more-voucher-print/get-more-voucher-directory', { params })
    },
    //凭证打印-打印凭证
    getVoucherPrint: (params) => {
        return request.get('/more-voucher-print/get-more-voucher-print', { params })
    },
    //凭据打印-查询
    queryVoucherList: (params) => {
        return request.get('/more-voucher-print/query-more-voucher-list', { params })
    },
    //凭证打印-更新打印次数
    updateVoucherPrintTimes: (params) => {
        return request.post('/more-voucher-print/update-more-voucher-print-num', params)
    },
}

export default voucherPrint
