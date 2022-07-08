const confirmPaymentRouter = [
  {
    path: '/billConfirmPaymentAudit',
    name: 'billConfirmPaymentAudit',
    component: () => import('../views/clearingManage/confirmPayment/billPaymentAudit'),
    meta: {
      isMock: false,
      title: '凭证确认收款审核',
      root: '我的代办',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  {
    path: '/billConfirmPaymentDetail',
    name: 'billConfirmPaymentDetail',
    component: () => import('../views/clearingManage/confirmPayment/billPaymentDetail'),
    meta: {
      isMock: false,
      title: '凭证收款交易详情',
      root: '我的代办',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  {
    path: '/otherConfirmPaymentAudit',
    name: 'otherConfirmPaymentAudit',
    component: () => import('../views/clearingManage/confirmPayment/otherPaymentAudit'),
    meta: {
      isMock: false,
      title: '非凭证确认收款审核',
      root: '我的代办',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  {
    path: '/otherConfirmPaymentDetail',
    name: 'otherConfirmPaymentDetail',
    component: () => import('../views/clearingManage/confirmPayment/otherPaymentDetail'),
    meta: {
      isMock: false,
      title: '订单保理收款交易详情',
      root: '我的代办',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  {
    path: '/advancePaymentAudit',
    name: 'advancePaymentAudit',
    component: () => import('../views/clearingManage/confirmPayment/advancePaymentAudit'),
    meta: {
      isMock: false,
      title: '确认提前还款审核',
      root: '我的代办',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  {
    path: '/advancePaymentDetail',
    name: 'advancePaymentDetail',
    component: () => import('../views/clearingManage/confirmPayment/advancePaymentDetail'),
    meta: {
      isMock: false,
      title: '确认提前还款详情',
      root: '我的代办',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  }
];
export default confirmPaymentRouter;
