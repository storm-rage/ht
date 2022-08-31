import request from '@common/axios/request'
import download from "@utils/download";

//融资台账查询api
// 凭证保理融资台账/订单保理融资台账
const factoringLedger = {
  // ---------------凭证保理融资台账
  //凭证保理融资台账-导出
  rdexport: (params) => {
    return download('/rd-factoring-ledger/export',  params, 1, 'get')
  },
  //凭证保理融资台账-融资申请详情
  rdDetailrzxq: (params) => {
    return request.get('/rd-factoring-ledger/financing-detail', { params })
  },
  //凭证保理融资台账-凭证信息详情
  rdDetailpzxx: (params) => {
    return request.get('/rd-factoring-ledger/voucher-detail', { params })
  },
  //凭证保理融资台账-凭证信息切换列表数据
  changeData: (params) => {
    return request.get('/rd-factoring-ledger/voucher-other-detail', { params })
  },
  //凭证保理融资台账-获取数据字典
  rdgetDirectory: (params) => {
    return request.get('/rd-factoring-ledger/directory', { params })
  },
  //凭证保理融资台账-查询
  rdqueryPage: (params) => {
    return request.get('/rd-factoring-ledger/page', { params })
  },
  // ---------------订单保理融资台账
    //订单保理融资台账-导出
    exportddbl: (params) => {
      return download('/ddbl-factoring-ledger/export',  params, 1, 'get')
    },
    //订单保理融资台账-阶段性协议信息
    ddblAgreementDetail: (params) => {
      return request.get('/ddbl-factoring-ledger/agreement-detail', { params })
    },
   //订单保理融资台账-融资申请详情
   ddblFinancingDetail: (params) => {
    return request.get('/ddbl-factoring-ledger/financing-detail', { params })
  },
    //订单保理融资台账-列表
    ddblPage: (params) => {
      return request.get('/ddbl-factoring-ledger/page', { params })
    },
  //订单保理融资台账-列表
  ddblDirectory: (params) => {
    return request.get('/ddbl-factoring-ledger/directory', { params })
  },
}
export default factoringLedger
