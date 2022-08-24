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
    // 产品申请
    'CPSQ': {
      // 初审状态（apply）
      'C002': {
        auditPath: 'businessFirstAudit',
        detailPath: 'businessFirstAuditDetail'
      },
      // 复审状态
      'C003': {
        auditPath: 'businessReviewAudit',
        detailPath: 'businessReviewAuditDetail'
      },
      // 复核驳回状态
      'c006': {
        auditPath: 'businessFirstBackAudit',
        detailPath: 'businessFirstBackAuditDetail'
      },
      // 已办和办结状态
      doneDetailPath: 'businessFirstAuditDetail',
    }
  },
  // 业务管理
  HTXQ: {
// 业务管理-合同续签
    HTXQ: {
      // 复审状态
      'C003': {
        auditPath: 'contractReSignReviewAudit',
        detailPath: 'contractReSignReviewAuditDetail'
      },
      // 复核驳回状态
      'c006': {
        auditPath: 'contractReSignBackAudit',
        detailPath: 'contractReSignBackAuditDetail'
      },
      // 已办和办结状态
      doneDetailPath: 'contractReSignReviewAuditDetail',
    },
    // 业务管理-业务参数维护
    YWCSWH: {
      // 复审状态
      'C003': {
        auditPath: 'tradeChangeReviewAudit',
        detailPath: 'tradeChangeReviewAuditDetail'
      },
      // 复核驳回状态
      'c006': {
        auditPath: 'tradeChangeBackAudit',
        detailPath: 'tradeChangeBackAuditDetail'
      },
      // 已办和办结状态
      doneDetailPath: 'tradeChangeReviewAuditDetail',
    },
    // 业务管理-额度管理
    EDGL: {
      // 复审状态
      'C003': {
        auditPath: 'quotaChangeReviewAudit',
        detailPath: 'quotaChangeReviewAuditDetail'
      },
      // 复核驳回状态
      'c006': {
        auditPath: 'quotaChangeBackAudit',
        detailPath: 'quotaChangeBackAuditDetail'
      },
      // 已办和办结状态
      doneDetailPath: 'quotaChangeReviewAuditDetail',
    }
  },
  // 确认收款
  QRSK: {
    // 凭证收款
    '00': {
      // 待保理公司复审
      'A002': {
        auditPath: 'billConfirmPaymentAudit',
        detailPath: 'billConfirmPaymentDetail'
      },
      'A003': {
        auditPath: 'quotaChangeBackAudit',
        detailPath: 'quotaChangeBackAuditDetail'
      },
      // 已办和办结状态
      doneDetailPath: 'quotaChangeReviewAuditDetail',
    },
    // 非凭证收款
    '01': {
      'A002': {
        auditPath: 'quotaChangeBackAudit',
        detailPath: 'quotaChangeBackAuditDetail'
      },
      'A003': {
        auditPath: 'quotaChangeBackAudit',
        detailPath: 'quotaChangeBackAuditDetail'
      },
      // 已办和办结状态
      doneDetailPath: 'quotaChangeReviewAuditDetail',
    }
  },

  // 合同管理
  HTGL: {
    auditPath: 'factoringContractAudit',
    detailPath: 'factoringContractApplyDetail'
  },

  // 阶段性协议维护
  JDXXY: {
    auditPath: 'multistageAgreementMaintain',
    detailPath: 'multistageAgreementDetailToDo'
  },

  // 融资审核
  RZCS: {
    auditPath: 'financingReviewToDoReview',
    detailPath: 'financingReviewToDoDetail',
    // 已办和办结状态
    doneDetailPath: '',
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
