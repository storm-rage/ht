const expireClearingManageRouter = [
  {
    path: '/expireClearingManage',
    name: 'expireClearingManage',
    component: () => import('../views/clearingManage/expireClearingManage/query/list.vue'),
    meta: {
      isMock: true,
      title: '到期清算',
      root: '清算管理',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    },
  },
  {
    path: '/billClearingApply',
    name: 'billClearingApply',
    component: () => import('../views/clearingManage/expireClearingManage/billClearing/billApply/index.vue'),
    meta: {
      isMock: true,
      title: '凭证清算申请',
      root: '到期清算',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    },
  },
  {
    path: '/billBalanceClearingApply',
    name: 'billBalanceClearingApply',
    component: () => import('../views/clearingManage/expireClearingManage/billClearing/billBalanceApply/index.vue'),
    meta: {
      isMock: true,
      title: '凭证尾款清算申请',
      root: '到期清算',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    },
  },
  {
    path: '/orderClearingApply',
    name: 'orderClearingApply',
    component: () => import('../views/clearingManage/expireClearingManage/orderClearing/orderApply/index.vue'),
    meta: {
      isMock: true,
      title: '订单清算申请',
      root: '到期清算',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    },
  },
  {
    path: '/orderBalanceClearingApply',
    name: 'orderBalanceClearingApply',
    component: () => import('../views/clearingManage/expireClearingManage/orderClearing/orderBalanceApply/index.vue'),
    meta: {
      isMock: true,
      title: '订单尾款清算申请',
      root: '到期清算',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    },
  },
  {
    path: '/orderAdvanceClearingApply',
    name: 'orderAdvanceClearingApply',
    component: () => import('../views/clearingManage/expireClearingManage/orderClearing/orderAdvanceApply/index.vue'),
    meta: {
      isMock: true,
      title: '提前还款清算申请',
      root: '到期清算',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    },
  }
];
export default expireClearingManageRouter;
