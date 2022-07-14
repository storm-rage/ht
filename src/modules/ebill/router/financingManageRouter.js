const financingManageRouter = [
  {
    path: '/financingManage',
    name: 'financingManage',
    component: () => import('../views/financingManage/index'),
    meta: {
      isMock: true,
      title: '融资管理',
      root: '融资管理',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  {
    path: '/orderFinancingDetail',
    name: 'orderFinancingDetail',
    component: () => import('../views/financingManage/orderFinancing/detail'),
    meta: {
      isMock: true,
      title: '融资申请详情',
      root: '融资管理',
      keepAlive: true,
      refreshIndex: 0,
      parent:'financingManage',
      notRequireAuth: true
    }
  },
  {
    path: '/voucherFinancingDetail',
    name: 'voucherFinancingDetail',
    component: () => import('../views/financingManage/voucherFinancing/financingOrVoucherApply'),
    meta: {
      isMock: true,
      title: '融资申请详情',
      root: '融资管理',
      keepAlive: true,
      refreshIndex: 0,
      parent:'financingManage',
      notRequireAuth: true
    }
  },
  {
    path: '/tradeBackgroundMaintain',
    name: 'tradeBackgroundMaintain',
    component: () => import('../views/financingManage/voucherFinancing/tradeBackgroundMaintain'),
    meta: {
      isMock: true,
      title: '贸易背景维护-融资',
      root: '融资管理',
      keepAlive: true,
      refreshIndex: 0,
      parent:'voucherFinancingDetail',
      notRequireAuth: true
    }
  },

]
export default financingManageRouter
