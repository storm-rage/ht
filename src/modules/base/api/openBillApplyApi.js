/**
 * 凭证签发申请接口
 */
import request from '@common/axios/request'

const openBillApply = {
    //============================= 线上 ======================================
    //线上对账单-查询
    onlineList: (params) => {
        return request.get('/open-bill-apply/query-statement-account-online-page', {params})
    },
    //线上对账单-详情
    onlineDetail: (params) => {
        return request.get('/open-bill-apply/get-statement-account-online-detail', { params })
    },
    //线上对账单-签发凭证
    onlineBill: (params) => {
        return request.post('/open-bill-apply/online-open-bill-apply', params)
    },
    //线上对账单-修改
    updateStatementOnline: (params) => {
        return request.get('/open-bill-apply/update-statement-account-online', {params})
    },
    //线上对账单-提交复核
    openBillCommit: (params) => {
        return request.post('/open-bill-apply/online-open-bill-commit', params)
    },

    //============================= 线下 ======================================
    //线下对账单-删除
    accountOffline: (params) => {
        return request.post('/open-bill-apply/delete-statement-account-offline', params)
    },
    //下载批量开立凭证导入模板
    openBill: (params) => {
        return request.post('/open-bill-apply/download-batch-open-bill-template', params)
    },
    // 线下对账单-维护附件字典
    getOpenBillDictionary: (params) => {
        return request.get('/open-bill-apply/get-open-bill-dictionary', { params })
    },
    //线下对账单-维护附件
    accountOfflineAttach: (params) => {
        return request.get('/open-bill-apply/get-statement-account-offline-attach', { params })
    },
    //对账单-签发凭证
    billApply: (params) => {
        return request.post('/open-bill-apply/open-bill-apply', params)
    },
    //对账单-提交复核
    billCommit: (params) => {
        return request.post('/open-bill-apply/open-bill-commit', params)
    },
    //贸易合同-合同维护（新增，修改，删除，上传）
    maintainContract: (params) => {
        return request.post('/open-bill-apply/offline-statement-maintain-contract', params)
    },
    //发票信息-发票维护（新增，修改，删除，上传）
    maintainInvoice: (params) => {
        return request.post('/open-bill-apply/offline-statement-maintain-invoice', params)
    },
    //其他附件（新增，修改，删除，上传）
    maintainOther: (params) => {
        return request.post('/open-bill-apply/offline-statement-maintain-other', params)
    },
    //接收海顺返回结果
    receiveResult: (params) => {
        return request.post('/open-bill-apply/open-bill-receive-result', params)
    },
    //线下对账单-查询
    offlineList: (params) => {
        return request.get('/open-bill-apply/query-statement-account-offline-page', {params})
    },
    //上传开立凭证文件-保存数据
    billData: (params) => {
        return request.post('/open-bill-apply/save-batch-open-bill-data', params)
    },
    //上传开立凭证文件
    billExcel: (params) => {
        return request.post('/open-bill-apply/upload-batch-open-bill-excel', params)
    },
}
export default openBillApply