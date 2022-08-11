const expireClearingManageRouter = [
  {
    path: '/expireClear',
    name: 'expireClear',
    component: () => import('../views/clearingManage/expireClearingManage/query/list.vue'),
    meta: {
      title: '到期清算',
      root: '清算管理',
      keepAlive: true,
      refreshIndex: 0,
    },
  },
  {
    path: '/billClearingApply',
    name: 'billClearingApply',
    component: () => import('../views/clearingManage/expireClearingManage/billClearing/billApply/index.vue'),
    meta: {
      title: '凭证清算申请',
      parent: 'expireClear',
      keepAlive: true,
      refreshIndex: 0
    },
  },
  {
    path: '/billBalanceClearingApply',
    name: 'billBalanceClearingApply',
    component: () => import('../views/clearingManage/expireClearingManage/billClearing/billBalanceApply/index.vue'),
    meta: {
      title: '凭证尾款清算申请',
      parent: 'expireClear',
      keepAlive: true,
      refreshIndex: 0
    },
  },
  {
    path: '/orderClearingApply',
    name: 'orderClearingApply',
    component: () => import('../views/clearingManage/expireClearingManage/orderClearing/orderApply/index.vue'),
    meta: {
      title: '订单清算申请',
      parent: 'expireClear',
      keepAlive: true,
      refreshIndex: 0
    },
  },
  {
    path: '/orderBalanceClearingApply',
    name: 'orderBalanceClearingApply',
    component: () => import('../views/clearingManage/expireClearingManage/orderClearing/orderBalanceApply/index.vue'),
    meta: {
      title: '订单尾款清算申请',
      parent: 'expireClear',
      keepAlive: true,
      refreshIndex: 0
    },
  },
  {
    path: '/orderAdvanceClearingApply',
    name: 'orderAdvanceClearingApply',
    component: () => import('../views/clearingManage/expireClearingManage/orderClearing/orderAdvanceApply/index.vue'),
    meta: {
      title: '提前还款清算申请',
      parent: 'expireClear',
      keepAlive: true,
      refreshIndex: 0
    },
  }
];
export default expireClearingManageRouter;
