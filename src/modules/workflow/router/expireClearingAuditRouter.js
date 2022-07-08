const expireClearingAuditRouter = [
  {
    path: '/billClearingAudit',
    name: 'billClearingAudit',
    component: () => import('../views/clearingManage/expireClearingManage/billClearingAudit'),
    meta: {
      isMock: false,
      title: '凭证清算复核',
      root: '我的代办',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  {
    path: '/billClearingDetail',
    name: 'billClearingDetail',
    component: () => import('../views/clearingManage/expireClearingManage/billClearingDetail'),
    meta: {
      isMock: false,
      title: '凭证清算交易详情',
      root: '我的代办',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  {
    path: '/billBalanceClearingAudit',
    name: 'billBalanceClearingAudit',
    component: () => import('../views/clearingManage/expireClearingManage/billBalanceClearingAudit'),
    meta: {
      isMock: false,
      title: '凭证尾款清算复核',
      root: '我的代办',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  {
    path: '/billBalanceClearingDetail',
    name: 'billBalanceClearingDetail',
    component: () => import('../views/clearingManage/expireClearingManage/billBalanceClearingDetail'),
    meta: {
      isMock: false,
      title: '凭证尾款清算交易详情',
      root: '我的代办',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  }
];
export default expireClearingAuditRouter;
