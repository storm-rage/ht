const confirmPaymentRouter = [
  {
    path: '/billConfirmPaymentAudit',
    name: 'billConfirmPaymentAudit',
    component: () => import('../views/clearingManage/confirmPayment/billPaymentAudit'),
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
    component: () => import('../views/clearingManage/confirmPayment/billPaymentDetail'),
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
    component: () => import('../views/clearingManage/confirmPayment/otherPaymentAudit'),
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
    component: () => import('../views/clearingManage/confirmPayment/otherPaymentDetail'),
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
    component: () => import('../views/clearingManage/confirmPayment/billPaymentBackAudit'),
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
    component: () => import('../views/clearingManage/confirmPayment/billPaymentBackDetail'),
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
    component: () => import('../views/clearingManage/confirmPayment/otherPaymentBackAudit'),
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
    component: () => import('../views/clearingManage/confirmPayment/otherPaymentBackDetail'),
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
    component: () => import('../views/clearingManage/confirmPayment/advancePaymentAudit'),
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
    component: () => import('../views/clearingManage/confirmPayment/advancePaymentDetail'),
    meta: {
      title: '确认提前还款详情',
      parent: 'myTodo',
      keepAlive: true,
      refreshIndex: 0
    }
  }
];
export default confirmPaymentRouter;
