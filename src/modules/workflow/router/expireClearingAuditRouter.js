const expireClearingAuditRouter = [
  {
    path: '/billClearingAudit',
    name: 'billClearingAudit',
    component: () => import('../views/clearingManage/expireClearingManage/billClearing/review/audit'),
    meta: {
      title: '凭证清算复核',
      parent: 'myTodo',
      keepAlive: true,
      refreshIndex: 0
    }
  },
  // 驳回复核详情
  {
    path: '/billClearingDetail',
    name: 'billClearingDetail',
    component: () => import('../views/clearingManage/expireClearingManage/billClearing/detail/detail'),
    meta: {
      title: '凭证清算交易详情',
      parent: 'myTodo',
      keepAlive: true,
      refreshIndex: 0
    }
  },
  {
    path: '/billClearingBackAudit',
    name: 'billClearingBackAudit',
    component: () => import('../views/clearingManage/expireClearingManage/billClearing/back/audit'),
    meta: {
      title: '凭证清算驳回审核',
      parent: 'myTodo',
      keepAlive: true,
      refreshIndex: 0
    }
  },
  {
    path: '/billBalanceClearingAudit',
    name: 'billBalanceClearingAudit',
    component: () => import('../views/clearingManage/expireClearingManage/billBalanceClearing/review/audit'),
    meta: {
      title: '凭证尾款清算复核',
      parent: 'myTodo',
      keepAlive: true,
      refreshIndex: 0
    }
  },
  {
    path: '/billBalanceClearingBackAudit',
    name: 'billBalanceClearingBackAudit',
    component: () => import('../views/clearingManage/expireClearingManage/billBalanceClearing/back/audit'),
    meta: {
      title: '凭证尾款清算驳回审核',
      parent: 'myTodo',
      keepAlive: true,
      refreshIndex: 0
    }
  },
  {
    path: '/billBalanceClearingDetail',
    name: 'billBalanceClearingDetail',
    component: () => import('../views/clearingManage/expireClearingManage/billBalanceClearing/detail/detail'),
    meta: {
      title: '凭证尾款清算交易详情',
      parent: 'myTodo',
      keepAlive: true,
      refreshIndex: 0
    }
  },
  {
    path: '/orderClearingAudit',
    name: 'orderClearingAudit',
    component: () => import('../views/clearingManage/expireClearingManage/orderClearing/review/audit'),
    meta: {
      title: '订单清算复核',
      parent: 'myTodo',
      keepAlive: true,
      refreshIndex: 0
    }
  },
  {
    path: '/orderClearingBackAudit',
    name: 'orderClearingBackAudit',
    component: () => import('../views/clearingManage/expireClearingManage/orderClearing/back/audit'),
    meta: {
      title: '订单清算驳回审核',
      parent: 'myTodo',
      keepAlive: true,
      refreshIndex: 0
    }
  },
  {
    path: '/orderClearingDetail',
    name: 'orderClearingDetail',
    component: () => import('../views/clearingManage/expireClearingManage/orderClearing/detail/detail'),
    meta: {
      title: '订单清算交易详情',
      parent: 'myTodo',
      keepAlive: true,
      refreshIndex: 0
    }
  },
  {
    path: '/orderBalanceClearingAudit',
    name: 'orderBalanceClearingAudit',
    component: () => import('../views/clearingManage/expireClearingManage/orderBalanceClearing/review/audit'),
    meta: {
      title: '订单尾款清算复核',
      parent: 'myTodo',
      keepAlive: true,
      refreshIndex: 0
    }
  },
  {
    path: '/orderBalanceClearingBackAudit',
    name: 'orderBalanceClearingBackAudit',
    component: () => import('../views/clearingManage/expireClearingManage/orderBalanceClearing/back/audit'),
    meta: {
      title: '订单尾款清算驳回审核',
      parent: 'myTodo',
      keepAlive: true,
      refreshIndex: 0
    }
  },
  {
    path: '/orderBalanceClearingDetail',
    name: 'orderBalanceClearingDetail',
    component: () => import('../views/clearingManage/expireClearingManage/orderBalanceClearing/detail/detail'),
    meta: {
      title: '订单尾款清算交易详情',
      parent: 'myTodo',
      keepAlive: true,
      refreshIndex: 0
    }
  },
  {
    path: '/orderAdvanceClearingAudit',
    name: 'orderAdvanceClearingAudit',
    component: () => import('../views/clearingManage/expireClearingManage/orderAdvanceClearing/review/audit'),
    meta: {
      title: '提前还款清算复核',
      parent: 'myTodo',
      keepAlive: true,
      refreshIndex: 0
    }
  },
  {
    path: '/orderAdvanceClearingBackAudit',
    name: 'orderAdvanceClearingBackAudit',
    component: () => import('../views/clearingManage/expireClearingManage/orderAdvanceClearing/back/audit'),
    meta: {
      title: '提前还款清算驳回审核',
      parent: 'myTodo',
      keepAlive: true,
      refreshIndex: 0
    }
  },
  {
    path: '/orderAdvanceClearingDetail',
    name: 'orderAdvanceClearingDetail',
    component: () => import('../views/clearingManage/expireClearingManage/orderAdvanceClearing/detail/detail'),
    meta: {
      title: '提前还款清算交易详情',
      parent: 'myTodo',
      keepAlive: true,
      refreshIndex: 0
    }
  }
];
export default expireClearingAuditRouter;
