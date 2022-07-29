const confirmPaymentRouter = [
  {
    path: '/billConfirmPaymentAudit',
    name: 'billConfirmPaymentAudit',
    component: () => import('../views/clearingManage/confirmPayment/billPayment/review/audit'),
    meta: {
      title: '凭证确认收款审核',
      parent: 'myTodo',
      keepAlive: true,
      refreshIndex: 0
    }
  },
  {
    path: '/billConfirmPaymentDetail',
    name: 'billConfirmPaymentDetail',
    component: () => import('../views/clearingManage/confirmPayment/billPayment/detail/detail'),
    meta: {
      title: '凭证收款交易详情',
      parent: 'myTodo',
      keepAlive: true,
      refreshIndex: 0
    }
  },
  {
    path: '/otherConfirmPaymentAudit',
    name: 'otherConfirmPaymentAudit',
    component: () => import('../views/clearingManage/confirmPayment/otherPayment/review/audit'),
    meta: {
      title: '非凭证确认收款审核',
      parent: 'myTodo',
      keepAlive: true,
      refreshIndex: 0
    }
  },
  {
    path: '/otherConfirmPaymentDetail',
    name: 'otherConfirmPaymentDetail',
    component: () => import('../views/clearingManage/confirmPayment/otherPayment/detail/detail'),
    meta: {
      title: '订单保理收款交易详情',
      parent: 'myTodo',
      keepAlive: true,
      refreshIndex: 0
    }
  },
  {
    path: '/billConfirmPaymentBackAudit',
    name: 'billConfirmPaymentBackAudit',
    component: () => import('../views/clearingManage/confirmPayment/billPayment/back/audit'),
    meta: {
      title: '凭证收款驳回审核',
      parent: 'myTodo',
      keepAlive: true,
      refreshIndex: 0
    }
  },
  {
    path: '/billConfirmPaymentBackDetail',
    name: 'billConfirmPaymentBackDetail',
    component: () => import('../views/clearingManage/confirmPayment/billPayment/back/detail'),
    meta: {
      title: '凭证收款交易详情',
      parent: 'myTodo',
      keepAlive: true,
      refreshIndex: 0
    }
  },
  {
    path: '/otherConfirmPaymentBackAudit',
    name: 'otherConfirmPaymentBackAudit',
    component: () => import('../views/clearingManage/confirmPayment/otherPayment/back/audit'),
    meta: {
      title: '非凭证确认收款驳回审核',
      parent: 'myTodo',
      keepAlive: true,
      refreshIndex: 0
    }
  },
  {
    path: '/otherConfirmPaymentBackDetail',
    name: 'otherConfirmPaymentBackDetail',
    component: () => import('../views/clearingManage/confirmPayment/otherPayment/back/detail'),
    meta: {
      title: '凭证收款交易详情',
      parent: 'myTodo',
      keepAlive: true,
      refreshIndex: 0
    }
  },
  {
    path: '/advancePaymentAudit',
    name: 'advancePaymentAudit',
    component: () => import('../views/clearingManage/confirmPayment/advancePayment/review/audit'),
    meta: {
      title: '确认提前还款复核',
      parent: 'myTodo',
      keepAlive: true,
      refreshIndex: 0
    }
  },
  {
    path: '/advancePaymentDetail',
    name: 'advancePaymentDetail',
    component: () => import('../views/clearingManage/confirmPayment/advancePayment/detail/detail'),
    meta: {
      title: '确认提前还款详情',
      parent: 'myTodo',
      keepAlive: true,
      refreshIndex: 0
    }
  }
];
export default confirmPaymentRouter;
