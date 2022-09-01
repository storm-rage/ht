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
      'C006': {
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
      'C006': {
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
      'C006': {
        auditPath: 'tradeChangeBackAudit',
        detailPath: 'tradeChangeBackAuditDetail'
      },
      // 已办和办结状态
      doneDetailPath: 'tradeChangeReviewAuditDetail',
    },
    // 业务管理-额度管理
    EDXQ: {
      // 复审状态
      'C003': {
        auditPath: 'quotaChangeReviewAudit',
        detailPath: 'quotaChangeReviewAuditDetail'
      },
      // 复核驳回状态
      'C006': {
        auditPath: 'quotaChangeBackAudit',
        detailPath: 'quotaChangeBackAuditDetail'
      },
      // 已办和办结状态
      doneDetailPath: 'quotaChangeReviewAuditDetail',
    },
    EDBG: {
      // 复审状态
      'C003': {
        auditPath: 'quotaChangeReviewAudit',
        detailPath: 'quotaChangeReviewAuditDetail'
      },
      // 复核驳回状态
      'C006': {
        auditPath: 'quotaChangeBackAudit',
        detailPath: 'quotaChangeBackAuditDetail'
      },
      // 已办和办结状态
      doneDetailPath: 'quotaChangeReviewAuditDetail',
    },
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
      // 驳回待处理
      'A003': {
        auditPath: 'billConfirmPaymentBackAudit',
        detailPath: 'billConfirmPaymentBackDetail'
      },
      // 已办和办结状态
      doneDetailPath: 'billConfirmPaymentDetail',
    },
    // 非凭证收款
    '01': {
      // 待保理公司复审
      'A002': {
        auditPath: 'otherConfirmPaymentAudit',
        detailPath: 'otherConfirmPaymentDetail'
      },
      // 驳回待处理
      'A003': {
        auditPath: 'otherConfirmPaymentBackAudit',
        detailPath: 'otherConfirmPaymentBackDetail'
      },
      // 已办和办结状态
      doneDetailPath: 'otherConfirmPaymentDetail',
    }
  },
  // 合同管理
  HTGL: {
    auditPath: 'factoringContractAudit',
    detailPath: 'factoringContractApplyDetail',
    // 已办和办结状态
    doneDetailPath: 'factoringContractApplyDetail',
  },

  // 阶段性协议维护
  JDXXY: {
    auditPath: 'multistageAgreementMaintain',
    detailPath: 'multistageAgreementDetailToDo'
  },

  // 融资审核
  RZSHGL:{
    auditPath: 'financingReviewToDoReview',
    detailPath: 'financingReviewToDoDetail',
    // 已办和办结状态
    doneDetailPath: '',
  },

  // 融资复审
  RZFS: {
    auditPath: 'financingReviewToDoReview',
    detailPath: 'financingReviewToDoDetail',
    // 已办和办结状态
    doneDetailPath: '',
  },

  // 清算申请
  QSSQ: {
    //凭证清算申请
    'PZQSSQ': {
      //待保理公司复审
      'S002': {
        auditPath: 'billClearingAudit',
        detailPath: 'billClearingDetail'
      },
      // 驳回待处理
      'S004': {
        auditPath: 'billClearingBackAudit',
        detailPath: 'billClearingDetail'
      },
      // 已办和办结状态
      doneDetailPath: 'billClearingDetail',
    },
    //凭证尾款清算申请
    'PZWKQSSQ': {
      //待保理公司复审
      'S002': {
        auditPath: 'billBalanceClearingAudit',
        detailPath: 'billBalanceClearingDetail'
      },
      // 驳回待处理
      'S004': {
        auditPath: 'billBalanceClearingBackAudit',
        detailPath: 'billBalanceClearingDetail'
      },
      // 已办和办结状态
      doneDetailPath: 'billBalanceClearingDetail',
    },
    //订单清算申请
    'DDQSSQ': {
      //待保理公司复审
      'S002': {
        auditPath: 'orderClearingAudit',
        detailPath: 'orderClearingDetail'
      },
      // 驳回待处理
      'S004': {
        auditPath: 'orderClearingBackAudit',
        detailPath: 'orderClearingDetail'
      },
      // 已办和办结状态
      doneDetailPath: 'orderClearingDetail',
    },
    //订单尾款清算申请
    'DDWKQSSQ': {
      //待保理公司复审
      'S002': {
        auditPath: 'orderBalanceClearingAudit',
        detailPath: 'orderBalanceClearingDetail'
      },
      // 驳回待处理
      'S004': {
        auditPath: 'orderBalanceClearingBackAudit',
        detailPath: 'orderBalanceClearingDetail'
      },
      // 已办和办结状态
      doneDetailPath: 'orderBalanceClearingDetail',
    }
  },

  // 贸易关系管理
  MYGXGL: {
    auditPath: '',
    detailPath: ''
  }
}
