import request from '@common/axios/request'
import download from "@utils/download";

//融资台账查询api 
// 凭证保理融资台账/订单保理融资台账
const FactoringLedger = {
  // ---------------凭证保理融资台账
  //凭证保理融资台账-导出
  exportMyFinancingList: (params) => {
    return download('/rd-factoring-ledger/export',  params, 1, 'get')
  },
  //凭证保理融资台账-详情
  getMyFinancingDetail: (params) => {
    return request.get('/my-financing/get-my-financing-detail', { params })
  },
  //凭证保理融资台账-获取数据字典
  getMyFinancingDirectory: (params) => {
    return request.get('/rd-factoring-ledger/directory', { params })
  },
  //凭证保理融资台账-查询
  queryMyFinancingPage: (params) => {
    return request.get('/my-financing/query-my-financing-page', { params })
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
}
export default FactoringLedger
