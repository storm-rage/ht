/**
*运营端-到期清算Api
*/
import request from '@common/axios/request.js';
import download from "@utils/download";

const expireClearingManage = {
    /**
    *到期清算-复核-获取详情
    */
    getReviewDetails(params) {
        return request.post('/eb-account-bill-clear/get-review-details', params)
    },
    /**
    *到期清算-清算详情
    */
    getClearDetails(params) {
        return request.post('/eb-account-bill-clear/get-clear-details', params)
    },
    /**
    *到期清算-提交申请
    */
    submitClearApply(params) {
        return request.post('/eb-account-bill-clear/submit-clear-apply', params)
    },
    /**
    *到期清算-复核
    */
    clearReview(params) {
        return request.post('/eb-account-bill-clear/clear-review', params)
    },
    /**
    *订单保理清算-订单清算清单-列表导出
    */
    exportOrderBill(params) {
        return request.get('/eb-account-bill-clear/export-order-bill', { params })
    },
    /**
    *订单保理清算-提前还款清算清单-列表导出
    */
    exportPrepayBill(params) {
        return request.get('/eb-account-bill-clear/export-prepay-bill', { params })
    },
    /**
    *到期清算-作废
    */
    clearAbort(params) {
        return request.post('/eb-account-bill-clear/clear-abort', params)
    },
    /**
    *获取数据字典
    */
    getBillClearDictionary(params) {
        return request.get('/eb-account-bill-clear/get-bill-clear-dictionary', { params })
    },
    /**
    *订单保理清算-订单尾款清算清单-列表查询
    */
    queryBalanceOrderClearPage(params) {
        return request.get('/eb-account-bill-clear/query-balance-order-clear-page', { params })
    },
    /**
    *订单保理清算-提前还款清算清单-列表查询
    */
    queryPrepayBillClearPage(params) {
        return request.get('/eb-account-bill-clear/query-prepay-bill-clear-page', { params })
    },
    /**
    *凭证保理清算-凭证尾款清算清单-列表导出
    */
    exportBalanceAccountBill(params) {
        return request.get('/eb-account-bill-clear/export-balance-account-bill', { params })
    },
    /**
    *凭证保理清算-凭证尾款清算清单-列表查询
    */
    queryBalanceBillClearPage(params) {
        return request.get('/eb-account-bill-clear/query-balance-bill-clear-page', { params })
    },
    /**
    *到期清算-根据选择的清算记录获取融资详情
    */
    getFinanceDetails(params) {
        return request.post('/eb-account-bill-clear/get-finance-details', params)
    },
    /**
    *订单保理清算-订单尾款清算清单-列表导出
    */
    exportBalanceOrderBill(params) {
        return request.get('/eb-account-bill-clear/export-balance-order-bill', { params })
    },
    /**
    *凭证保理清算-凭证清算清单-列表导出
    */
    exportAccountBill(params) {
        return download('/eb-account-bill-clear/export-account-bill',params,1,'get')
    },
    /**
    *凭证保理清算-凭证清算清单-列表查询
    */
    queryBillClearPage(params) {
        return request.get('/eb-account-bill-clear/query-bill-clear-page', { params })
    },
    /**
    *订单保理清算-订单清算清单-列表查询
    */
    queryOrderClearPage(params) {
        return request.get('/eb-account-bill-clear/query-order-clear-page', { params })
    }
}
export default expireClearingManage