import request from '@common/axios/request'
import download from "@utils/download";

//企业端-融资管理-融资申请api
const financingApply = {
  //融资申请-下载融资协议
  downloadFinancAgreeTemplate: (params) => {
    return download('/financing-apply/download-financ-agree-template',   params, 1, 'get')
  },
  //融资申请-数据字典
  getDirectory: (params) => {
    return request.get('/financing-apply/get-directory', { params })
  },
  //融资申请-入库/凭证融资详情
  getFinancingApplyBillDetail: (params) => {
    return request.get('/financing-apply/get-financing-apply-bill-detail', { params })
  },
  //融资申请-订单融资详情
  getFinancingApplyOrderDetail: (params) => {
    return request.get('/financing-apply/get-financing-apply-order-detail', {params} )
  },
  //融资申请-获取tab
  getFinancingApplyTab: (params) => {
    return request.get('/financing-apply/get-financing-apply-tab', {params} )
  },
  //融资申请-获取贸易关系列表
  getOrderFinancingCredit: (params) => {
    return request.get('/financing-apply/get-order-financing-credit', {params} )
  },
  //融资申请-获取阶段性协议列表
  getPhasedAgreement: (params) => {
    return request.get('/financing-apply/get-phased_agreement', {params} )
  },
  //融资申请-获取入库融资/凭证融资列表
  queryFinancingApplyBillPage: (params) => {
    return request.get('/financing-apply/query-financing-apply-bill-page', {params} )
  },
  //融资申请-入库/凭证融资提交
  submitFinancingBillApply: (params) => {
    return request.post('/financing-apply/submit-financing-bill-apply', params )
  },
  //融资申请-订单融资提交
  submitFinancingOrderApply: (params) => {
    return request.post('/financing-apply/submit-financing-order-apply', params )
  },

  /**
   * 贸易背景资料管理api
   * */
  //获取数据字典
  getTradeBackDictionary: (params) => {
    return request.get('/financing-apply/get-trade-back-dictionary', {params} )
  },
  //贸易背景管理-获取详情
  getTradeBackgroundInfo: (params) => {
    return request.get('/financing-apply/get-trade-background-info', {params} )
  },
  //贸易背景管理-合同维护
  maintainContract: (params) => {
    return request.post('/financing-apply/maintain-contract', params )
  },
  //贸易背景管理-发票维护
  maintainInvoice: (params) => {
    return request.post('/financing-apply/maintain-invoice', params )
  },
  //贸易背景管理-其它附件维护
  maintainOtherAttach: (params) => {
    return request.post('/financing-apply/maintain-other-attach', params )
  },
  //贸易背景管理-附件上传
  uploadMaintainFile: (params) => {
    return request.post('/financing-apply/upload-maintain-file', params )
  },
}
export default financingApply
