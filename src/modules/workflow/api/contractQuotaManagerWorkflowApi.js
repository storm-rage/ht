/**
 * 合同和额度变更工作流API
 */
import request from '@common/axios/request';
export default {
  /**
   * 保理合同-待办-合同确认 or 取消
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  confirmEbContract (params) {
    return request.get('/eb-contract-todone/confirm-eb-contract',{params})
  },
  /**
   * 保理合同-待办-额度变更-确认or 取消
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  confirmEbContractCredit (params) {
    return request.post('/eb-contract-todone/confirm-eb-contract-credit',params)
  },
  /**
   * 保理合同-待办-额度变更-详情
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  getEbContractCreditDetail(params) {
    return request.get('/eb-contract-todone/get-eb-contract-credit-detail',{params})
  },
  /**
   * 保理合同-待办-合同处理详情
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  getEbContractFlowDetail (params) {
    return request.get('/eb-contract-todone/get-eb-contract-flow-detail',{params})
  },
  /**
   * 保理合同-待办-合同处理详情-合同附件分页
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  getEbContractFlowFile (params) {
    return request.get('/eb-contract-todone/get-eb-contract-flow-file',{params})
  },
};
