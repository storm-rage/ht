const businessManageRouter = [
  {
    path: '/businessFirstAudit',
    name: 'businessFirstAudit',
    component: () => import('../views/businessManage/biz/apply/firstAudit.vue'),
    meta: {
      title: '供应商业务申请初审',
      parent: 'myTodo',
      keepAlive: true,
      refreshIndex: 0
    }
  },
  //初审详情
  {
    path: '/businessFirstAuditDetail',
    name: 'businessFirstAuditDetail',
    component: () => import('../views/businessManage/biz/apply/firstAuditDetail.vue'),
    meta: {
      title: '供应商业务申请交易详情',
      parent: 'myTodo',
      keepAlive: true,
      refreshIndex: 0
    }
  },
  {
    path: '/businessReviewAudit',
    name: 'businessReviewAudit',
    component: () => import('../views/businessManage/biz/review/audit.vue'),
    meta: {
      title: '供应商业务申请复核',
      parent: 'myTodo',
      keepAlive: true,
      refreshIndex: 0
    }
  },
  // 复审详情
  {
    path: '/businessReviewAuditDetail',
    name: 'businessReviewAuditDetail',
    component: () => import('../views/businessManage/biz/review/detail.vue'),
    meta: {
      title: '供应商业务申请交易详情',
      parent: 'myTodo',
      keepAlive: true,
      refreshIndex: 0
    }
  },
  // 初审驳回
  {
    path: '/businessFirstBackAudit',
    name: 'businessFirstBackAudit',
    component: () => import('../views/businessManage/biz/back/firstBackAudit.vue'),
    meta: {
      title: '供应商业务申请驳回审核',
      parent: 'myTodo',
      keepAlive: true,
      refreshIndex: 0
    }
  },
  // 初审驳回详情
  {
    path: '/businessFirstBackAuditDetail',
    name: 'businessFirstBackAuditDetail',
    component: () => import('../views/businessManage/biz/back/firstBackAuditDetail.vue'),
    meta: {
      title: '供应商业务申请交易详情',
      parent: 'myTodo',
      keepAlive: true,
      refreshIndex: 0
    }
  },
  {
    path: '/tradeChangeReviewAudit',
    name: 'tradeChangeReviewAudit',
    component: () => import('../views/businessManage/tradeChange/review/audit.vue'),
    meta: {
      title: '供应商业务申请维护复核',
      parent: 'myTodo',
      keepAlive: true,
      refreshIndex: 0
    }
  },
  {
    path: '/tradeChangeReviewAuditDetail',
    name: 'tradeChangeReviewAuditDetail',
    component: () => import('../views/businessManage/tradeChange/review/detail.vue'),
    meta: {
      title: '供应商业务申请交易详情',
      parent: 'myTodo',
      keepAlive: true,
      refreshIndex: 0
    }
  },
  {
    path: '/tradeChangeBackAudit',
    name: 'tradeChangeBackAudit',
    component: () => import('../views/businessManage/tradeChange/back/audit.vue'),
    meta: {
      title: '供应商业务申请驳回维护',
      parent: 'myTodo',
      keepAlive: true,
      refreshIndex: 0
    }
  },
  {
    path: '/tradeChangeBackAuditDetail',
    name: 'tradeChangeBackAuditDetail',
    component: () => import('../views/businessManage/tradeChange/back/detail.vue'),
    meta: {
      title: '供应商业务申请交易详情',
      parent: 'myTodo',
      keepAlive: true,
      refreshIndex: 0
    }
  },
  {
    path: '/contractReSignReviewAudit',
    name: 'contractReSignReviewAudit',
    component: () => import('../views/businessManage/contractReSign/review/audit.vue'),
    meta: {
      title: '续签合同申请复核',
      parent: 'myTodo',
      keepAlive: true,
      refreshIndex: 0
    }
  },
  // 续签合同申请复核详情
  {
    path: '/contractReSignReviewAuditDetail',
    name: 'contractReSignReviewAuditDetail',
    component: () => import('../views/businessManage/contractReSign/review/detail.vue'),
    meta: {
      title: '供应商业务申请交易详情',
      parent: 'myTodo',
      keepAlive: true,
      refreshIndex: 0
    }
  },
  {
    path: '/contractReSignBackAudit',
    name: 'contractReSignBackAudit',
    component: () => import('../views/businessManage/contractReSign/back/audit.vue'),
    meta: {
      title: '续签合同申请驳回维护',
      parent: 'myTodo',
      keepAlive: true,
      refreshIndex: 0
    }
  },
  // 续签合同申请驳回维护详情
  {
    path: '/contractReSignBackAuditDetail',
    name: 'contractReSignBackAuditDetail',
    component: () => import('../views/businessManage/contractReSign/back/detail.vue'),
    meta: {
      title: '供应商业务申请交易详情',
      parent: 'myTodo',
      keepAlive: true,
      refreshIndex: 0
    }
  },
  {
    path: '/quotaChangeReviewAudit',
    name: 'quotaChangeReviewAudit',
    component: () => import('../views/businessManage/quotaChange/review/audit.vue'),
    meta: {
      title: '供应商额度申请复核',
      parent: 'myTodo',
      keepAlive: true,
      refreshIndex: 0
    }
  },
  // 供应商额度申请复核详情页面
  {
    path: '/quotaChangeReviewAuditDetail',
    name: 'quotaChangeReviewAuditDetail',
    component: () => import('../views/businessManage/quotaChange/review/detail.vue'),
    meta: {
      title: '供应商业务申请交易详情',
      parent: 'myTodo',
      keepAlive: true,
      refreshIndex: 0
    }
  },
  {
    path: '/quotaChangeBackAudit',
    name: 'quotaChangeBackAudit',
    component: () => import('../views/businessManage/quotaChange/back/audit.vue'),
    meta: {
      title: '供应商额度申请驳回维护',
      parent: 'myTodo',
      keepAlive: true,
      refreshIndex: 0
    }
  },
  // 供应商额度申请驳回详情
  {
    path: '/quotaChangeBackAuditDetail',
    name: 'quotaChangeBackAuditDetail',
    component: () => import('../views/businessManage/quotaChange/back/detail.vue'),
    meta: {
      title: '供应商业务申请交易详情',
      parent: 'myTodo',
      keepAlive: true,
      refreshIndex: 0
    }
  },
  // 暂时无用
  {
    path: '/businessApplyDetail',
    name: 'businessApplyDetail',
    component: () => import('../views/businessManage/detail.vue'),
    meta: {
      title: '供应商业务申请交易详情',
      parent: 'myTodo',
      keepAlive: true,
      refreshIndex: 0
    }
  }
]
export default businessManageRouter
