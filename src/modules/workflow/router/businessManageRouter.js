const businessManageRouter = [
  {
    path: '/businessFirstAudit',
    name: 'businessFirstAudit',
    component: () => import('../views/businessManage/firstAudit.vue'),
    meta: {
      title: '供应商业务申请初审',
      parent: 'myTodo',
      keepAlive: true,
      refreshIndex: 0
    }
  },
  {
    path: '/businessReviewAudit',
    name: 'businessReviewAudit',
    component: () => import('../views/businessManage/businessReviewAudit.vue'),
    meta: {
      title: '供应商业务申请复核',
      parent: 'myTodo',
      keepAlive: true,
      refreshIndex: 0
    }
  },
  {
    path: '/tradeChangeReviewAudit',
    name: 'tradeChangeReviewAudit',
    component: () => import('../views/businessManage/tradeChangeReviewAudit.vue'),
    meta: {
      title: '供应商业务申请维护复核',
      parent: 'myTodo',
      keepAlive: true,
      refreshIndex: 0
    }
  },
  {
    path: '/tradeChangeBackAudit',
    name: 'tradeChangeBackAudit',
    component: () => import('../views/businessManage/tradeChangeBackAudit.vue'),
    meta: {
      title: '供应商业务申请驳回维护',
      parent: 'myTodo',
      keepAlive: true,
      refreshIndex: 0
    }
  },
  {
    path: '/contractReSignReviewAudit',
    name: 'contractReSignReviewAudit',
    component: () => import('../views/businessManage/contractReSignReviewAudit.vue'),
    meta: {
      title: '续签合同申请复核',
      parent: 'myTodo',
      keepAlive: true,
      refreshIndex: 0
    }
  },
  {
    path: '/contractReSignBackAudit',
    name: 'contractReSignBackAudit',
    component: () => import('../views/businessManage/contractReSignBackAudit.vue'),
    meta: {
      title: '续签合同申请驳回维护',
      parent: 'myTodo',
      keepAlive: true,
      refreshIndex: 0
    }
  },
  {
    path: '/quotaChangeReviewAudit',
    name: 'quotaChangeReviewAudit',
    component: () => import('../views/businessManage/quotaChangeReviewAudit.vue'),
    meta: {
      title: '供应商额度申请复核',
      parent: 'myTodo',
      keepAlive: true,
      refreshIndex: 0
    }
  },
  {
    path: '/quotaChangeBackAudit',
    name: 'quotaChangeBackAudit',
    component: () => import('../views/businessManage/quotaChangeBackAudit.vue'),
    meta: {
      title: '供应商额度申请驳回维护',
      parent: 'myTodo',
      keepAlive: true,
      refreshIndex: 0
    }
  },
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
