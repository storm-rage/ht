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
  }
];
export default expireClearingManageRouter;
