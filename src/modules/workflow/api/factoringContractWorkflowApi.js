/**
 *合同待办-待办（运营端）Api
 */
import request from '@common/axios/request.js';
export default {
  /**
   *保理合同-待办-合同确认 or 取消
   */
  confirmEbContract(params){
    return request.post('/eb-contract-todone/confirm-eb-contract',params)
  },
  /**
   *保理合同-待办-合同处理详情
   */
  getEbContractFlowDetail(params){
    return request.get('/eb-contract-todone/get-eb-contract-flow-detail',{params})
  },
  /**
   *保理合同-待办-合同处理详情-合同附件分页
   */
  queryEbContractFlowFilePage(params){
    return request.get('/eb-contract-todone/get-eb-contract-flow-file',{params})
  }
}
