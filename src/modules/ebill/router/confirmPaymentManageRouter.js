const confirmPaymentManageRouter = [
  {
    path: '/confirmPaymentQuery',
    name: 'confirmPaymentQuery',
    component: () => import('../views/clearingManage/confirmPaymentManage/query/list.vue'),
    meta: {
      isMock: true,
      title: '确认收款',
      root: '清算管理',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    },
  },
  {
    path: '/billConfirmPaymentApply',
    name: 'billConfirmPaymentApply',
    component: () => import('../views/clearingManage/confirmPaymentManage/billConfirmPaymentApply/index.vue'),
    meta: {
      isMock: true,
      title: '凭证确认收款申请',
      root: '确认收款',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    },
  },
  {
    path: '/otherConfirmPaymentApply',
    name: 'otherConfirmPaymentApply',
    component: () => import('../views/clearingManage/confirmPaymentManage/otherConfirmPaymentApply/index.vue'),
    meta: {
      isMock: true,
      title: '非凭证确认收款申请',
      root: '确认收款',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    },
  },
];
export default confirmPaymentManageRouter;
