/**
 * 我的待办路由常量
 * @type {{}}
 */

export const myItemsPath = {
  // 注册审核
  QYZC: {
    // 审核路由
    auditPath: 'registerAuditApplyAudit',
    // 详情路由
    detailPath: 'registerAuditApplyAudit'
  },

  // 企业管理
  QYGL: {
    // 审核路由
    auditPath: 'entApplyAudit',
    // 详情路由
    detailPath: 'entApplyAuditDetail'
  },

  // 用户管理
  YHGL: {
    auditPath: 'maintainUserAudit',
    detailPath: 'maintainUserDetail'
  },

  // 产品开通申请
  CPKT: {
    auditPath: 'productApplyAudit',
    detailPath: ''
  },

  // 业务管理
  HTXQ: {
    auditPath: '',
    detailPath: ''
  },

  // 确认收款
  QRSK: {
    auditPath: '',
    detailPath: ''
  },

  // 合同管理
  HTGL: {
    auditPath: '',
    detailPath: ''
  },

  // 阶段性协议维护
  JDXXY: {
    auditPath: '',
    detailPath: ''
  },

  // 清算申请
  QSSQ: {
    auditPath: '',
    detailPath: ''
  },

  // 贸易关系管理
  MYGXGL: {
    auditPath: '',
    detailPath: ''
  }
}